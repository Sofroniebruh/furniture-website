/*
  Warnings:

  - The `itemColor` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `event` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "itemColor",
ADD COLUMN     "itemColor" TEXT[],
DROP COLUMN "event",
ADD COLUMN     "event" TEXT;

-- DropEnum
DROP TYPE "Color";
