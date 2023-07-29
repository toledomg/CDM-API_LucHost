import 'reflect-metadata';
import 'express-async-errors';
import { userRoutes } from './routes/users/user.routes';
import { loginRoutes as loginRoutes } from './routes/users/userLogin.routes';
import { handleErrors } from './errors/error';
import { contactsRoutes } from './routes/users/contacts.routes';
import { Application } from 'express';

const express = require('express');
const cors = require('cors');

const allowedDomains = ['*'];

const app: Application = express();

app.use(express.json());
app.use(
  cors()
  //     {
  //     origin: function (origin: any, callback: any) {
  //       const allowed = allowedDomains.includes(origin);

  //       callback(null, allowed);
  //     },
  //   }
);
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   app.use(cors());
//   next();
// });

app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/contacts', contactsRoutes);

app.use(handleErrors);

export default app;
