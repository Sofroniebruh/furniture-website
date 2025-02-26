import { ITEMS_PER_PAGE } from "@/lib/data";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const [items, count] = await prisma.$transaction([
      prisma.product.findMany({
        skip: (page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
      }),
      prisma.product.count(),
    ]);

    return new Response(JSON.stringify({ items, count }), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);

      return new Response(JSON.stringify(error.message), { status: 500 });
    }
  }
}
