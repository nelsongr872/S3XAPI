import {MigrationInterface, QueryRunner} from "typeorm";

export class implementRoleModule1588002196320 implements MigrationInterface {
    name = 'implementRoleModule1588002196320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(20) NOT NULL, `description` text NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user_roles` (`usersId` int NOT NULL, `rolesId` int NOT NULL, INDEX `IDX_99b019339f52c63ae615358738` (`usersId`), INDEX `IDX_13380e7efec83468d73fc37938` (`rolesId`), PRIMARY KEY (`usersId`, `rolesId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(50) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user_roles` ADD CONSTRAINT `FK_99b019339f52c63ae6153587380` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user_roles` ADD CONSTRAINT `FK_13380e7efec83468d73fc37938e` FOREIGN KEY (`rolesId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_13380e7efec83468d73fc37938e`", undefined);
        await queryRunner.query("ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_99b019339f52c63ae6153587380`", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(50) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("DROP INDEX `IDX_13380e7efec83468d73fc37938` ON `user_roles`", undefined);
        await queryRunner.query("DROP INDEX `IDX_99b019339f52c63ae615358738` ON `user_roles`", undefined);
        await queryRunner.query("DROP TABLE `user_roles`", undefined);
        await queryRunner.query("DROP TABLE `roles`", undefined);
    }

}
