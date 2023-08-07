import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1691444589863 implements MigrationInterface {
    name = 'Generate1691444589863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`contacts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(240) NOT NULL, \`email\` varchar(45) NOT NULL, \`phone\` varchar(11) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`email\` varchar(45) NOT NULL, \`admin\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(120) NOT NULL, \`phone\` varchar(11) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`contacts\` ADD CONSTRAINT \`FK_30ef77942fc8c05fcb829dcc61d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contacts\` DROP FOREIGN KEY \`FK_30ef77942fc8c05fcb829dcc61d\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`contacts\``);
    }

}
