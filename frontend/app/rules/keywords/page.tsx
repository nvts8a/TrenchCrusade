import Image from "next/image";

import { UnifrakturCook } from "next/font/google";
const unifraktur = UnifrakturCook({ subsets: ["latin"], weight: "700"});

import Keyword from "./_keyword";

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
        <p className={unifraktur.className}>+ Keywords +</p>
      </div>
      <Keyword keyword="+DICE" definition="Modifier for ACTION rolls. For each +DICE,
add one dice to the dice pool of the 2D6 roll you are
about to make. +1 DICE thus makes the roll a total of
3D6. Then roll all the dice and pick the two highest.
If two +DICE are added, roll 4D6 and pick the two
highest, and so on."/>
    </main>
  );
}
