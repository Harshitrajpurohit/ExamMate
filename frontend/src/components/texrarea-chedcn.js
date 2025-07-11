// import { Button } from "@/components/ui/button"
import Textarea from "./ui/textarea"

export function TextareaWithButton() {
  return (
    <div className="grid gap-2 w-full md:w-2xl lg:w-3xl">
      <Textarea placeholder="Type your question here." />
      <button
        // onClick={generate}
        className="bg-gray-600 dark:bg-blue-600 text-white dark:text-white px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-blue-700 transition-all duration-200 cursor-pointer"
      >
        {/* {loading ? 'Generating...' : 'Generate'} */}
        Answer
      </button>

      {/* <Button>Send message</Button> */}
    </div>
  )
}
