import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1708524745728 implements MigrationInterface {
    name = 'Migrations1708524745728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "publications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "topic" text, "writingTechnique" text, "openAiResponse" text, "createdAt" date, "updatedAt" date, "platform" character varying, "mode" character varying, "targetAudience" text, "tokenPrompt" integer, "tokenCompletion" integer, "ownerId" uuid, CONSTRAINT "PK_2c4e732b044e09139d2f1065fae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "hasPaid" boolean NOT NULL DEFAULT false, "isEmailVerified" boolean NOT NULL DEFAULT false, "lastUpdate" date, "refreshToken" character varying, "tokenVerication" character varying, "nbPublication" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_1f8c8e6f10c1958c96e092d8eb0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_1f8c8e6f10c1958c96e092d8eb0"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "publications"`);
    }

}
