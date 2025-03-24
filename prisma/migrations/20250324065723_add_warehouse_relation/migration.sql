/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Warehouse` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Warehouse_name_key";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Warehouse" DROP COLUMN "createdAt";
