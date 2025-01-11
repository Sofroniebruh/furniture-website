/*
  Warnings:

  - Changed the column `itemColor` on the `Product` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.
  - Added the required column `reviewId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Color" ADD VALUE 'WHITE';
ALTER TYPE "Color" ADD VALUE 'GRAY';
ALTER TYPE "Color" ADD VALUE 'BEIGE';

-- AlterEnum
ALTER TYPE "Event" ADD VALUE 'NONE';

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "itemColor" SET DATA TYPE "Color"[],
ALTER COLUMN "event" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reviewId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
