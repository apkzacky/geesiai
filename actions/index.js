'use server'
import { signIn, signOut } from "../../auth"
import { UserAuth } from "../context/AuthContext"
export async function doSocialLogin(formData) {
    const action = formData.get('action')
    await signIn(action, { redirectTo: "/auth/finish" })

}


export async function doLogout() {


    await signOut({ redirectTo: '/' })
}