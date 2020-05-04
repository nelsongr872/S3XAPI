import {MigrationInterface, QueryRunner} from "typeorm";

export class fixTableProduct1588357281796 implements MigrationInterface {
    name = 'fixTableProduct1588357281796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `products` DROP COLUMN `price`", undefined);
        await queryRunner.query("ALTER TABLE `products` ADD `price` decimal NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `products` DROP COLUMN `cost`", undefined);
        await queryRunner.query("ALTER TABLE `products` ADD `cost` decimal NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(50) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(50) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `products` DROP COLUMN `cost`", undefined);
        await queryRunner.query("ALTER TABLE `products` ADD `cost` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `products` DROP COLUMN `price`", undefined);
        await queryRunner.query("ALTER TABLE `products` ADD `price` int NOT NULL", undefined);
    }

}
