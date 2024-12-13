import ChooseCollection from "../components/ChooseCollection";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="mb-12 pl-4">
            {children}
            <ChooseCollection />
        </main>
    );
  }