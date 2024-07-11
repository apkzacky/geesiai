

const checkToken = () => {
    return false
}

const validateToken = (token) => {
    const validToken = checkToken()
    if (!token || !validToken) {
        return false
    }
    return true
}

export function authMiddleware(request) {
    const token = request.headers.get("authorization")?.split(" ")[1];

    return { isValid: validateToken(token) }
}