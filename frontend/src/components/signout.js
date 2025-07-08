
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
 
export function SignOut() {
    const {data:session} = useSession()
  return (
    <button onClick={() => signOut()}>Logout</button>
  )
}