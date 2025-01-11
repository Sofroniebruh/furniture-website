import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { name, description, colors, price, event, imageUrl } = await request.json();

  console.log(name, description, colors, price, event, imageUrl);
  console.log(typeof price);
  try {
    const newProduct = await prisma.product.create({
      data: {
        itemName: name,
        itemDescription: description,
        itemColor: colors,
        price,
        event,
        itemPicture: imageUrl,
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
