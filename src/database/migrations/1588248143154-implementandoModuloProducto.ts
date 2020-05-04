import {MigrationInterface, QueryRunner} from "typeorm";

export class implementandoModuloProducto1588248143154 implements MigrationInterface {
    name = 'implementandoModuloProducto1588248143154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `products` (`id` int NOT NULL AUTO_INCREMENT, `sku` varchar(25) NOT NULL, `productName` varchar(50) NOT NULL, `productDescription` varchar(100) NOT NULL, `price` int NOT NULL, `cost` int NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_c44ac33a05b144dd0d9ddcf932` (`sku`), UNIQUE INDEX `IDX_270b1a4eb00eebe56b528e909f` (`productName`), UNIQUE INDEX `IDX_75895eeb1903f8a17816dafe0a` (`price`), UNIQUE INDEX `IDX_4c4061a568fe2b12acb23a3a0a` (`cost`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(50) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(50) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("DROP INDEX `IDX_4c4061a568fe2b12acb23a3a0a` ON `products`", undefined);
        await queryRunner.query("DROP INDEX `IDX_75895eeb1903f8a17816dafe0a` ON `products`", undefined);
        await queryRunner.query("DROP INDEX `IDX_270b1a4eb00eebe56b528e909f` ON `products`", undefined);
        await queryRunner.query("DROP INDEX `IDX_c44ac33a05b144dd0d9ddcf932` ON `products`", undefined);
        await queryRunner.query("DROP TABLE `products`", undefined);
    }

}
