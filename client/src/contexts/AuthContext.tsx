import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserProfile, createUserProfile } from '@/services/userService';

interface UserProfile {
    uid: string;
    email: string;
    name: string;
    age?: number;
    height?: number;
    weight?: number;
    goals?: string[];
    onboardingCompleted: boolean;
    createdAt: Date;
    streak: number;
    totalWorkouts: number;
    level: number;
    xp: number;
}

interface AuthContextType {
    currentUser: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    signup: (email: string, password: string) => Promise<User>;
    login: (email: string, password: string) => Promise<User>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    async function signup(email: string, password: string) {
        const result = await createUserWithEmailAndPassword(auth, email, password);

        // Create initial user profile
        await createUserProfile(result.user.uid, {
            email,
            name: '',
            onboardingCompleted: false,
            createdAt: new Date(),
            streak: 0,
            totalWorkouts: 0,
            level: 1,
            xp: 0
        });

        return result.user;
    }

    async function login(email: string, password: string) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    }

    async function logout() {
        await signOut(auth);
        setUserProfile(null);
    }

    async function refreshProfile() {
        if (currentUser) {
            const profile = await getUserProfile(currentUser.uid);
            setUserProfile(profile);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            if (user) {
                const profile = await getUserProfile(user.uid);
                setUserProfile(profile);
            } else {
                setUserProfile(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value: AuthContextType = {
        currentUser,
        userProfile,
        loading,
        signup,
        login,
        logout,
        refreshProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
