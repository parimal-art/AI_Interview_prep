import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

// 📝 REGISTER
export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })
        return response.data

    } catch (err) {
        console.log("Register API Error:", err?.response?.data || err.message)
        throw err   // 🔥 VERY IMPORTANT
    }
}


// 🔐 LOGIN
export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email, password
        })
        return response.data

    } catch (err) {
        console.log("Login API Error:", err?.response?.data || err.message)
        throw err   // 🔥 VERY IMPORTANT
    }
}


// 🚪 LOGOUT
export async function logout() {
    try {
        const response = await api.get("/api/auth/logout")
        return response.data

    } catch (err) {
        console.log("Logout API Error:", err?.response?.data || err.message)
        throw err
    }
}


// 👤 GET ME
export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me")
        return response.data

    } catch (err) {
        // ✅ 401 = user not logged in (normal case)
        if (err?.response?.status === 401) {
            return null
        }

        console.log("getMe API Error:", err?.response?.data || err.message)
        throw err
    }
}