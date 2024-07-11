'use server'
import { signIn, signOut } from "../../auth"

export async function doSocialLogin(formData) {
    const action = formData.get('action')
    await signIn(action, { redirectTo: "http://localhost:3000/auth/finish" })

}


export async function doLogout() {
    await signOut({ redirectTo: '/' })
}