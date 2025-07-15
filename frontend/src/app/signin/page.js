import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"
import { FcGoogle } from "react-icons/fc";
export default async function page() {

    const session = await auth();

    if(session?.user){
        redirect("/")
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <form action={async () => {
                "use server"
                await signIn("google", {redirectTo:"/"})
            }}>
                <button type="submit" className='flex items-center border rounded px-3 py-2 border-black hover:bg-black text-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white hover:-skew-y-2 cursor-pointer dark:hover:text-black  transition-all duration-150 uppercase'>
                    signin with <FcGoogle className="text-2xl ml-2"/>
                    </button>
            </form>
        </div>
    )
}
