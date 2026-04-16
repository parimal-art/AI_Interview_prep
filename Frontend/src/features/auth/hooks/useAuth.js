import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    // 🔐 LOGIN
    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });

            if (!data || !data.user) {
                throw new Error("Invalid login response");
            }

            setUser(data.user);
            return { success: true };

        } catch (err) {
            console.log("Login Error:", err?.response?.data || err.message);
            return { success: false, message: "Login failed" };
        } finally {
            setLoading(false);
        }
    };

    // 📝 REGISTER
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });

            if (!data || !data.user) {
                throw new Error("Invalid register response");
            }

            setUser(data.user);
            return { success: true };

        } catch (err) {
            console.log("Register Error:", err?.response?.data || err.message);
            return { success: false, message: "Registration failed" };
        } finally {
            setLoading(false);
        }
    };

    // 🚪 LOGOUT
    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
            return { success: true };

        } catch (err) {
            console.log("Logout Error:", err?.response?.data || err.message);
            return { success: false, message: "Logout failed" };
        } finally {
            setLoading(false);
        }
    };

    // 👤 GET CURRENT USER (FIXED 🔥)
    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();

                if (data?.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }

            } catch (err) {
                // ✅ Ignore 401 (normal case)
                if (err?.response?.status === 401) {
                    setUser(null);
                } else {
                    console.log("getMe Error:", err?.response?.data || err.message);
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };

        getAndSetUser();
    }, []);

    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout
    };
};