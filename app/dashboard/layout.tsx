export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <h2>Dashboard Layout</h2>
            <hr />
            {children}
        </div>
    );
}
