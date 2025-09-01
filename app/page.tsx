import { app } from "@/lib/firebase";

export default function Home() {
  console.log("Firebase App:", app);

  return (
    <main>
      <h1>Raystrat Systems</h1>
      <p>Firebase is wired and running.</p>
    </main>
  );
}
