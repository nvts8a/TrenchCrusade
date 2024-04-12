import Image from "next/image";

import { UnifrakturCook } from "next/font/google";
import Counter from "./_components/counter";
import Link from "next/link";
const unifraktur = UnifrakturCook({ subsets: ["latin"], weight: "700"});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#383838]"
          src="/trench+crusade+site+logo.png"
          alt="Trench Crusade Site Logo"
          width={800}
          height={60}
          priority
        />
      </div>
      <div>
        <Link href="/builder">Builder</Link>
        <Link href="/rules">Rules</Link>
      </div>
      <Counter/>
    </main>
  );
}
