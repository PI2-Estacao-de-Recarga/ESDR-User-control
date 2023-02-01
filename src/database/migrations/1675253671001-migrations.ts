import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1675253671001 implements MigrationInterface {
    name = 'migrations1675253671001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "plug" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "dateTimeActivated" TIMESTAMP WITH TIME ZONE, "dateTimeToDeactivate" TIMESTAMP WITH TIME ZONE, "inUse" boolean NOT NULL, "userId" uuid, CONSTRAINT "UQ_198c195571b9f0845bd523ee980" UNIQUE ("name"), CONSTRAINT "PK_4d26ea72e080122716035a224a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "plug" ADD CONSTRAINT "FK_d1e5d1ebab2513e1845ff93c64c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO plug (name, "inUse") VALUES ('Tomada 1', false);`);
        await queryRunner.query(`INSERT INTO plug (name, "inUse") VALUES ('Tomada 2', false);`);
        await queryRunner.query(`INSERT INTO plug (name, "inUse") VALUES ('Tomada 3', false);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plug" DROP CONSTRAINT "FK_d1e5d1ebab2513e1845ff93c64c"`);
        await queryRunner.query(`DROP TABLE "plug"`);
    }

}
