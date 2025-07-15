"use client"
import { useState } from "react"
import Textarea from "./ui/textarea"
import CopyToClipboardButton from "./CopyToClipboardButton";
import { useSession } from "next-auth/react";

export function TextareaWithButton({setAnswers}) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const {data:session} = useSession()

  const generate = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const userEmail = session?.user?.email;
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/answer`,{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({question, userEmail})
      })
      const data = await res.json();
      if(res.ok){
        setAnswers(data);
      }else{
        alert(data.err);
      }

    } catch (error) {
      console.log(error);
        alert("failed to fetch answer.")
    }
    setLoading(false);
  }

  return (
    <div className="grid gap-2 w-full md:w-2xl lg:w-3xl">
      <form action="" onSubmit={generate}>
        <Textarea value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."/>
          <div className="flex mt-2 w-full">
          <button
            type="submit"
            className=" px-2 py-2 bg-gray-600 dark:bg-blue-600 text-white dark:text-white  rounded hover:bg-gray-700 dark:hover:bg-blue-700 transition-all duration-200 cursor-pointer"
          >
            {loading ? 'Generating...' : 'Generate Answer'}
          </button>
          {/* <CopyToClipboardButton /> */}
        </div>
      </form>


      {/* <Button>Send message</Button> */}
    </div>
  )
}
