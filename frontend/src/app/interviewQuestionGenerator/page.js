"use client"
import Alert from "@/components/Alert";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";


const levelOptions = [
  "Select options",
  "Beginner (Basic syntax, fundamentals)",
  "Easy (Entry-level problem solving)",
  "Medium (Logical reasoning & core concepts)",
  "Hard (Complex DSA, optimization problems)",
  "Expert (FAANG-level system design & scalability)"
]

const typeOptions = ["Conceptual", "Coding", "MCQ"];

export default function Page() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Select options");
  const [type, setType] = useState("Conceptual");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState("");
  const [showanswer, setShowanswer] = useState(false);
  const [prevQuestions, setPrevQuestions] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const { data: session } = useSession()

  if (!session?.user) {
    redirect("/signin")
  }

  const generate = async () => {
    if (topic === "") {
      setAlertMessage("Enter Topic Name")
      setAlert(true);
      setTimeout(() => setAlert(false), 2000);
      return;
    }
    if (level === "Select options") {
      setAlertMessage("Select Levels")
      setAlert(true);
      setTimeout(() => setAlert(false), 2000);
      return;
    }
    setLoading(true);
    const userEmail = session?.user?.email;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/generate/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userEmail, topic, level, type, prevQuestions })
    });

    const data = await res.json();
    const parsedData = JSON.parse(data);
    if (!res.ok) {
      alert(data.error);
      return;
    }

    setQuestions(parsedData);
    setPrevQuestions((prev) => [...prev, ...parsedData])
    setLoading(false)
  }


  return (
    <main className="pt-20 p-5 h-full max-w-2xl mx-auto mb-5">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Generate Questions Instantly</h1>

      {alert && <Alert message={alertMessage} />}
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic (e.g., JavaScript)"
        className="w-full border border-gray-500 px-4 py-2 rounded mb-3 "
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border px-4 py-2 rounded border-gray-500 mb-3"
      >
        {
          typeOptions.map((type, index) => (
            <option key={index} className="bg-white dark:bg-gray-900" value={type}>{type}</option>
          ))
        }
      </select>
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="w-full border border-gray-500 px-4 py-2 rounded mb-3 "
      >
        {
          levelOptions.map((level, index) => (
            <option key={index} className="bg-white dark:bg-gray-900" value={level}>{level}</option>
          ))
        }
      </select>
      <button
        onClick={generate}
        className="bg-gray-600 dark:bg-blue-600 text-white dark:text-white px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-blue-700 transition-all duration-200 cursor-pointer"
      >
        {loading ? 'Generating...' : 'Generate'}
      </button> {questions.length > 0 && <CopyToClipboardButton textToCopy={questions} />}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm mt-5">
          <ul className="list-decimal pl-4 space-y-3">
            {questions.map((question, index) => (
              <li key={index} className="text-black dark:text-white">
                <p className="font-medium">{question.question}</p>
                {question?.options && (
                  <ul className="pl-4 text-gray-800 dark:text-gray-300 mt-2 space-y-1">
                    {question.options.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                  </ul>
                )}
                {/* <button onClick={() => setShowanswer(!showanswer)} className="text-blue-400">{!showanswer ?  "Show Answer" : "Hide Answer"}</button>
                <p className={`font-sm ${showanswer ? 'block' : 'hidden'}`}>Answers: <br /> {question.answer}</p> */}
              </li>
            ))}
          </ul>
        </div>
    </main>
  );
}
