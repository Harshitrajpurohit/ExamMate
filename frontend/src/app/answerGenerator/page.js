"use client"

import { TextareaWithButton } from "@/components/texrarea-chedcn";
import { useState } from "react";

export default function Page() {
    const [answers,setAnswers] = useState([
  {
    "step": 1,
    "explanation": "Music is an art form and cultural activity whose medium is sound. Common elements of music include pitch (which governs melody and harmony), rhythm (and its associated concepts tempo, meter, and articulation), dynamics (loudness and softness), and the sonic qualities of timbre and texture."
  },
  {
    "step": 2,
    "explanation": "Music can be categorized in many ways, including by genre (e.g., classical, pop, rock, jazz, electronic), by function (e.g., music for film, religious music, dance music), or by cultural origin (e.g., Western music, African music, Asian music)."
  },
  {
    "step": 3,
    "explanation": "The creation, performance, significance, and even the definition of music vary according to culture and social context. Music ranges from strictly organized compositions (and their recreation in performance), through improvisational music to aleatoric forms."
  },
  {
    "step": 4,
    "explanation": "Music is performed with a vast range of instruments and vocal techniques ranging from singing to rapping; there are solely instrumental pieces, solely vocal pieces (such as songs without instrumental accompaniment) and pieces that combine singing and instruments."
  },
  {
    "step": 5,
    "explanation": "Music serves many purposes in human society. It can be used for entertainment, ritual, education, therapy, and communication. It can express emotions, tell stories, and create a sense of community."
  },
  {
    "step": 6,
    "explanation": "The study of music includes music theory (the study of how music works), music history (the study of the evolution of music), ethnomusicology (the study of music in different cultures), and music psychology (the study of the psychological effects of music)."
  }
])

  return (
    <div className="flex flex-col items-center py-30  px-5 md:px-10">
      <h2 className="text-3xl mb-5 font-semibold text-gray-800 dark:text-white">This feature is coming soon. Stay tuned!</h2>

      <TextareaWithButton/>
    <div className="w-full md:w-2xl lg:w-3xl bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm mt-5 ">
        {answers.map((answer,index)=>(
            // <li key={index} className="text-black text-sm py-2">
            //     {answer.explanation}
            // </li>
            <li key={index} className="text-black dark:text-white py-2 font-medium">
              {answer.explanation}
            </li>
        ))}
    </div>
    </div>
  )
}
