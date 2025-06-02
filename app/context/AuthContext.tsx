'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
    token: string | null;
    setToken: (token: string) => void;
};

const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
