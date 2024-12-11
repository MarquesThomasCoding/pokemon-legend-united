import Navbar from './components/Navbar';
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-24 py-24">
      <section>
        <Navbar />
      </section>
    </main>
  );
}
