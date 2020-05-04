import {MigrationInterface, QueryRunner} from "typeorm";

export class fixModuloproducto1588250545030 implements MigrationInterface {
    name = 'fixModuloproducto1588250545030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_75895eeb1903f8a17816dafe0a` ON `products`", undefined);
        await queryRunner.query("DROP INDEX `IDX_4c4061a568fe2b12acb23a3a0a` ON `products`", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(50) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(50) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_4c4061a568fe2b12acb23a3a0a` ON `products` (`cost`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_75895eeb1903f8a17816dafe0a` ON `products` (`price`)", undefined);
    }

}
