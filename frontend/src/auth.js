import NextAuth from "next-auth"
import Google from "next-auth/providers/google"


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async signIn({ user }) {
            const resStatus = await addtoDB(user);
            console.log("resStatus: ", resStatus);

            // if (resStatus !== 200) {
            //     return false;
            // }
            return true;
        }
    }

})

const addtoDB = async (user) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/googleSignIn`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        })
        return res.status;
    } catch (err) {
        console.log(err);
        return res.status;
    }
}