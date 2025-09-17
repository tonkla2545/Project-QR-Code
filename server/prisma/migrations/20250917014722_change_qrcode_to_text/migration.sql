/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Url` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Url_url_key` ON `Url`;

-- AlterTable
ALTER TABLE `Url` DROP COLUMN `expiresAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `qrcode` TEXT NOT NULL;
