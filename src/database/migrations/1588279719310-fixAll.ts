import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAll1588279719310 implements MigrationInterface {
    name = 'fixAll1588279719310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(50) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(50) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL DEFAULT 'NULL'", undefined);
    }

}
