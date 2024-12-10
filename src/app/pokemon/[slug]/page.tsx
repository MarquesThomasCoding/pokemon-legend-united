export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>{slug}</h1>
        </main>
    );
}