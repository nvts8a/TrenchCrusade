import Image from "next/image";

import { UnifrakturCook } from "next/font/google";
import PageLayout from "../_components/pageLayout";
const unifraktur = UnifrakturCook({ subsets: ["latin"], weight: "700"});

export default function Page() {
  return (
    <PageLayout title="Warband Roster Sheet" description="">
      <div></div>
    
    </PageLayout>
  );
}
