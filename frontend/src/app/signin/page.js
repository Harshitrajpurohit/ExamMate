import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"

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
                <button type="submit" className='border rounded px-3 py-2 border-white hover:bg-white hover:-skew-y-2 cursor-pointer hover:text-black  transition-all duration-150 uppercase'>signin with google</button>
            </form>
        </div>
    )
}
