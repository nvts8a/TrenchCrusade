import { UnifrakturCook } from "next/font/google";
const unifraktur = UnifrakturCook({ subsets: ["latin"], weight: "700"});

import Keyword, {KeywordProps} from "./_keyword";
import PageLayout from "@/app/_components/pageLayout";

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
    <PageLayout title="Keywords" description="Keywords define the core abilities, rules, troop types and damage categories in the game. Each of them is shared by several models/weapons/equipment and are therefore called out with a Keyword that makes it easy for you to differentiate between descriptive terms and game rules. A model or a weapon may have multiple Keywords. Rules governing all Keywords in the game are listed here.">
        {keywords.map((keyword: KeywordProps) => (
            <Keyword keyword={keyword}/>
        ))}
    </PageLayout>
  );
}
