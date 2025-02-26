import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.product.findMany({
      take: 6,
    });

    console.log("Items!!!: " + { items });

    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), { status: 500 });
    }
  }
}
