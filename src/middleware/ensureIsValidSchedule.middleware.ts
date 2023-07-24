import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/error';
import { AppDataSource } from '../data-source';
import { Schedule } from '../entities';

export const ensureIsValidScheduleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const scheduleData = req.body;
  const { id } = res.locals.token;
  const scheduleRepo = AppDataSource.getRepository(Schedule);

  const businessDay: Date = new Date(scheduleData.date);
  const day: number = businessDay.getDay();
  businessDay.getHours();

  if (day === 0 || day === 6) {
    throw new AppError('Invalid date, work days are monday to friday', 400);
  }

  const [hours] = scheduleData.hour.split(':');
  if (hours < 8 || hours > 18) {
    throw new AppError(`Invalid hour, available times are 8AM to 18PM`, 400);
  }

  const realEstateSchedules = await scheduleRepo
    .createQueryBuilder('schedule')
    .select()
    .where('schedule.realEstateId = :realEstate', {
      realEstate: scheduleData.realEstateId,
    })
    .andWhere('schedule.date = :date', { date: scheduleData.date })
    .andWhere('schedule.hour = :hour', { hour: scheduleData.hour })
    .getOne();

  if (realEstateSchedules) {
    throw new AppError(
      'Schedule to this real estate at this date and time already exists',
      409
    );
  }

  const userSchedule = await scheduleRepo
    .createQueryBuilder('schedule')
    .select()
    .where('schedule.userId = :user', { user: id })
    .andWhere('schedule.date = :date', { date: scheduleData.date })
    .andWhere('schedule.hour = :hour', { hour: scheduleData.hour })
    .getOne();

  if (userSchedule)
    throw new AppError(
      `User schedule to this real estate at this date and time already exists`,
      409
    );

  return next();
};
