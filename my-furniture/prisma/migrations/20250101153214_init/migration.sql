-- CreateEnum
CREATE TYPE "Event" AS ENUM ('SALE', 'BESTPRICE', 'FORYOU', 'MOSTPOPULAR');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('BLACK');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,
    "itemDescription" TEXT NOT NULL,
    "itemColor" "Color"[] NOT NULL,
    "price" INTEGER NOT NULL,
    "event" "Event" NOT NULL,
    "itemPicture" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "userPurchasedId" INTEGER,
    "userWishListedId" INTEGER,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userPurchasedId_fkey" FOREIGN KEY ("userPurchasedId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userWishListedId_fkey" FOREIGN KEY ("userWishListedId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
