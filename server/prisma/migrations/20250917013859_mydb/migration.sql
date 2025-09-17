/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Url` DROP COLUMN `updatedAt`,
    ADD COLUMN `expiresAt` DATETIME(3) NULL,
    MODIFY `qrcode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Url_url_key` ON `Url`(`url`);
