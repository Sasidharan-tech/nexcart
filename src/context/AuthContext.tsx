import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Get stored users
        const storedUsers = localStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        // Find user
        const foundUser = users.find((u: any) => u.email === email && u.password === password);

        if (foundUser) {
            const userData: User = {
                id: foundUser.id,
                email: foundUser.email,
                name: foundUser.name,
                avatar: foundUser.avatar
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        }

        return false;
    };

    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Get stored users
        const storedUsers = localStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        // Check if user already exists
        if (users.some((u: any) => u.email === email)) {
            return false;
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // In production, this should be hashed
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto-login after registration
        const userData: User = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            avatar: newUser.avatar
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value: AuthContextType = {
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
