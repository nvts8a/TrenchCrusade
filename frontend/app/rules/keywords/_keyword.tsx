'use client'

import { Sono } from "next/font/google";
const sono = Sono({ subsets: ["latin"], weight: "400"});

export interface KeywordProps {
    id: string
    keyword: string,
    definition: string
}

export default function Keyword(props:{keyword: KeywordProps}) { 
  return (
    <div id={`keyword-${props.keyword.id}`}>
      <p className={sono.className}>{props.keyword.keyword}:</p>
      <p>{props.keyword.definition}</p>
    </div>
  )
}