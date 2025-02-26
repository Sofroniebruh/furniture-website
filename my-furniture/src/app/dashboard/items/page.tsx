import ItemComponent from "@/components/items-page-component";

export default async function Items({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const { page, ...queryParams } = await searchParams;
    const p = page ? parseInt(page) : 1

    return (
        <ItemComponent page={p}></ItemComponent>
    )
}