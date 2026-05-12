import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/auth/me')
            .then(
                res => {
                    setUser(res.data.user);
                    setAuthenticated(true);
                }
            )
            .catch(
                () => {
                    setUser(null)
                    setAuthenticated(false);
                }
            )
            .finally(() => {
                setLoading(false)
            })
    }, []);

    const login = (userData) => {
        setUser(userData);
        setAuthenticated(true);
    };

    const logout = async () => {
        await axios.post('/api/auth/logout');
        setUser(null);
        setAuthenticated(false);
        toast.success('Log out successful!');
    }

    return (
        <AuthContext.Provider value={{ user, authenticated, loading, login, logout }} >
            {children}
        </AuthContext.Provider>
    );
}