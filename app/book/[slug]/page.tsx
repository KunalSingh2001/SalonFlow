export default async function BookingPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return <h1>{slug}</h1>;
}
