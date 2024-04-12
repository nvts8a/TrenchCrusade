import Image from "next/image";

import { UnifrakturCook } from "next/font/google";
const unifraktur = UnifrakturCook({ subsets: ["latin"], weight: "700"});

import Keyword, {KeywordProps} from "./_keyword";

async function getKeywords() {
    const response = await fetch('http://localhost:8080/keyword/all')
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export default async function Page() {
    const keywords = await getKeywords()

    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <Image className="relative dark:drop-shadow-[0_0_0.3rem_#383838]"
            src="/trench+crusade+site+logo.png" alt="Trench Crusade Site Logo"
            width={240} height={60} priority/>
        </div>
        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
            <p className={unifraktur.className}>+ Keywords +</p>
        </div>
        {keywords.map((keyword: KeywordProps) => (
            <Keyword keyword={keyword}/>
        ))}
    </main>
  );
}
