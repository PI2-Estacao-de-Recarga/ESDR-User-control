import { MigrationInterface, QueryRunner } from "typeorm";

export class createTablesProd1675278647613 implements MigrationInterface {
    name = 'createTablesProd1675278647613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "qrCode" character varying, "qrCodeText" character varying, "status" character varying, "totalAmount" integer, "externalId" character varying, "documentNumber" character varying, "userId" uuid, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plug" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "dateTimeActivated" TIMESTAMP WITH TIME ZONE, "dateTimeToDeactivate" TIMESTAMP WITH TIME ZONE, "inUse" boolean NOT NULL, "userId" uuid, CONSTRAINT "UQ_198c195571b9f0845bd523ee980" UNIQUE ("name"), CONSTRAINT "PK_4d26ea72e080122716035a224a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying, "name" character varying NOT NULL, "cpf" character varying, "password" character varying NOT NULL, "balance" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "operationType" character varying NOT NULL, "creditAmount" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_18556ee6e49c005fc108078f3ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plug" ADD CONSTRAINT "FK_d1e5d1ebab2513e1845ff93c64c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_7df4a22dbf4c663666e21c21123" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO plug (name, "inUse") VALUES ('Tomada 1', false)`);
        await queryRunner.query(`INSERT INTO plug (name, "inUse") VALUES ('Tomada 2', false)`);
        await queryRunner.query(`INSERT INTO plug (name, "inUse") VALUES ('Tomada 3', false)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_7df4a22dbf4c663666e21c21123"`);
        await queryRunner.query(`ALTER TABLE "plug" DROP CONSTRAINT "FK_d1e5d1ebab2513e1845ff93c64c"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
        await queryRunner.query(`DROP TABLE "operation"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "plug"`);
        await queryRunner.query(`DROP TABLE "payment"`);
    }

}
