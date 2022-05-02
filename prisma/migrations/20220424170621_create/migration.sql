/*
  Warnings:

  - You are about to drop the `convenient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `accommodation_convenience` DROP FOREIGN KEY `accommodation_convenience_convenience_id_fkey`;

-- DropTable
DROP TABLE `convenient`;

-- CreateTable
CREATE TABLE `convenience` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `convenience_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accommodation_convenience` ADD CONSTRAINT `accommodation_convenience_convenience_id_fkey` FOREIGN KEY (`convenience_id`) REFERENCES `convenience`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
