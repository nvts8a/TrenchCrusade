import Image from "next/image";

import { UnifrakturCook } from "next/font/google";
import Counter from "../_components/counter";
const unifraktur = UnifrakturCook({ subsets: ["latin"], weight: "700"});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#383838]"
          src="/trench+crusade+site+logo.png"
          alt="Trench Crusade Site Logo"
          width={240}
          height={60}
          priority
        />
      </div>
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <p className={unifraktur.className}>+ Trench Crusade Rules +</p>
      </div>
      <Counter/>
    </main>
  );
}
