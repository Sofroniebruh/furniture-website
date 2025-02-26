import prisma from "@/lib/prisma";
import { DeleteFromBucket } from "../delete-from-bucket/route";
import { ITEMS_PER_PAGE, domain } from "@/lib/data";

export async function POST(request: Request) {
  const { name, description, colors, price, event, imageUrls, stock } = await request.json();

  try {
    const newProduct = await prisma.product.create({
      data: {
        itemName: name,
        itemDescription: description,
        itemColor: colors,
        price,
        event,
        itemPicture: imageUrls,
        stock,
      },
    });

    return new Response(JSON.stringify(newProduct), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);

      return new Response(JSON.stringify(error.message), { status: 500 });
    } else {
      console.error("An unknown error occurred");

      return new Response("An unknown error occurred", { status: 500 });
    }
  }
}

export async function DELETE(request: Request) {
  const { itemId, fileNames } = await request.json();

  try {
    await prisma.product.delete({
      where: {
        id: itemId,
      },
    });

    try {
      for (const fileName of fileNames) {
        const response = await DeleteFromBucket(fileName);

        if (!response) {
          return new Response(JSON.stringify("Failed to delete the item from s3"), { status: 500 });
        }
      }

      return new Response(JSON.stringify("Item was deleted successfully"), { status: 200 });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);

        return new Response(JSON.stringify("Failed to delete the item from s3"), { status: 500 });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);

      return new Response(JSON.stringify("Failed to delete the item"), { status: 500 });
    }
  }
}

export async function PUT(request: Request) {
  try {
    const { name, description, colors, price, event, imageUrls, stock, id, deletedImages } =
      await request.json();

    for (const fileName of deletedImages) {
      const response = await DeleteFromBucket(fileName);

      if (!response) {
        return new Response(JSON.stringify("Failed to delete the item from s3"), { status: 500 });
      }
    }

    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        itemName: name,
        itemColor: colors,
        itemDescription: description,
        event: event,
        price: price,
        itemPicture: imageUrls,
        stock: stock,
      },
    });

    return new Response(JSON.stringify("Item was updated successfully"), { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return new Response(JSON.stringify("Error updating your item: " + error.message), {
        status: 500,
      });
  }
}
