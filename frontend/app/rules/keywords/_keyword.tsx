'use client'

import { Sono } from "next/font/google";
const sono = Sono({ subsets: ["latin"], weight: "400"});

interface KeywordProps {
    keyword:  string,
    definition: string
}

export default function Keyword({keyword, definition}: KeywordProps) { 
  return (
    <div>
      <p className={sono.className}>{keyword}:</p>
      <p>{definition}</p>
    </div>
  )
}