/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Url` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Url` DROP COLUMN `updatedAt`,
    ADD COLUMN `expiresAt` DATETIME(3) NULL;
