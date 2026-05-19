import Navbar from './components/Navbar';
import TeamSlider from './components/TeamSlider';

export default async function Home() {
  return (
    <main className="relative flex items-center justify-start gap-24 px-24 h-[calc(100vh-8rem)] overflow-hidden">
      <section>
        <TeamSlider />
      </section>
      <section>
        <Navbar />
      </section>
    </main>
  );
}
