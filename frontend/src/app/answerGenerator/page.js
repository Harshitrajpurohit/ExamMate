"use client"
import { TextareaWithButton } from "@/components/texrarea-chedcn";
import { useState } from "react";

export default function Page() {
  const [answers, setAnswers] = useState([]);
  return (
    <div className="flex flex-col items-center py-20  px-5 md:px-10">
      <h2 className="text-3xl mb-5 font-semibold text-gray-800 dark:text-white">
        Got a Doubt? Just Ask.
      </h2>


      <TextareaWithButton setAnswers={setAnswers} />
      <div className="w-full md:w-2xl lg:w-3xl bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm mt-5 ">
        {answers?.map((answer, index) => (
          answer?.code || answer?.options ? (
          answer?.code ? (
            <li key={index} className="text-black dark:text-white py-2 font-normal flex flex-col gap-3">
              <b>Question: </b>{answer?.problem_statement}
              <b>Approach:</b><p>{answer?.approach}</p>
              <b>Code:</b><pre className="bg-gray-700 text-white dark:bg-gray-900 p-5 overflow-auto">
                <code className="">{answer?.code}</code>
              </pre>
              <b>Explanation:</b> <p> {answer?.explanation}</p>
            </li>
          ) : (
            <li key={index} className="text-black dark:text-white py-2 font-normal flex flex-col gap-3">
              <b>Question: </b><p>{answer?.question}</p>
              <b>Options: </b>{answer?.options.map((op, idx) => (
                <div className="text-gray-900 dark:text-gray-200 list-none" key={idx}>{op}</div>
              ))}
              <b>Answer:  </b><p>Option: {answer?.correct_answer}</p>
              <b>Explanation:</b> <p> {answer?.explanation}</p>
            </li>
          )) : (
            <li key={index} className="text-black dark:text-white py-2 font-normal list-decimal ">
              {answer?.explanation}
            </li>
          )
          ))}
      </div>
    </div>
  )
}
