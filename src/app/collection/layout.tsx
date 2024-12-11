import ChooseCollection from "../components/ChooseCollection";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <section className="mb-12">
            {children}
            <ChooseCollection />
        </section>
    );
  }