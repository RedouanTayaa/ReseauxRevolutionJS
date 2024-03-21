import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710853773360 implements MigrationInterface {
    name = 'Migrations1710853773360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "stripeId"`);
        await queryRunner.query(`ALTER TABLE "publications" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "publications" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "hasPaid" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isEmailVerified" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isEmailVerified" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "hasPaid" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "publications" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "publications" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ADD "stripeId" character varying`);
    }

}
