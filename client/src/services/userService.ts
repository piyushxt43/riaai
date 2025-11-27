import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    getDocs,
    Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface UserProfile {
    uid: string;
    email: string;
    name: string;
    age?: number;
    height?: number;
    weight?: number;
    goals?: string[];
    dietType?: string;
    fitnessLevel?: string;
    language?: string;
    onboardingCompleted: boolean;
    createdAt: Date;
    lastActive: Date;
    streak: number;
    totalWorkouts: number;
    level: number;
    xp: number;
}

export interface MoodEntry {
    emotion: string;
    confidence: number;
    timestamp: Date;
}

export interface WorkoutEntry {
    exerciseType: string;
    duration: number;
    formScore: number;
    timestamp: Date;
}

export interface Achievement {
    type: string;
    unlockedAt: Date;
    icon: string;
    title: string;
}

// User Profile Operations
export async function createUserProfile(uid: string, data: Partial<UserProfile>) {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
        ...data,
        uid,
        createdAt: Timestamp.now(),
        lastActive: Timestamp.now()
    });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const data = userSnap.data();
        return {
            ...data,
            createdAt: data.createdAt?.toDate(),
            lastActive: data.lastActive?.toDate()
        } as UserProfile;
    }

    return null;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        ...data,
        lastActive: Timestamp.now()
    });
}

// Mood History Operations
export async function addMoodEntry(uid: string, mood: Omit<MoodEntry, 'timestamp'>) {
    const moodRef = collection(db, 'users', uid, 'moodHistory');
    await addDoc(moodRef, {
        ...mood,
        timestamp: Timestamp.now()
    });
}

export async function getMoodHistory(uid: string, limitCount: number = 10): Promise<MoodEntry[]> {
    const moodRef = collection(db, 'users', uid, 'moodHistory');
    const q = query(moodRef, orderBy('timestamp', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()
    })) as MoodEntry[];
}

// Workout Operations
export async function addWorkout(uid: string, workout: Omit<WorkoutEntry, 'timestamp'>) {
    const workoutRef = collection(db, 'users', uid, 'workouts');
    await addDoc(workoutRef, {
        ...workout,
        timestamp: Timestamp.now()
    });

    // Update total workouts count
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        const currentTotal = userSnap.data().totalWorkouts || 0;
        await updateDoc(userRef, {
            totalWorkouts: currentTotal + 1,
            xp: (userSnap.data().xp || 0) + 10 // Award 10 XP per workout
        });
    }
}

export async function getRecentWorkouts(uid: string, limitCount: number = 10): Promise<WorkoutEntry[]> {
    const workoutRef = collection(db, 'users', uid, 'workouts');
    const q = query(workoutRef, orderBy('timestamp', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()
    })) as WorkoutEntry[];
}

// Achievement Operations
export async function unlockAchievement(uid: string, achievement: Omit<Achievement, 'unlockedAt'>) {
    const achievementRef = collection(db, 'users', uid, 'achievements');
    await addDoc(achievementRef, {
        ...achievement,
        unlockedAt: Timestamp.now()
    });

    // Award XP for achievement
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        await updateDoc(userRef, {
            xp: (userSnap.data().xp || 0) + 50 // Award 50 XP per achievement
        });
    }
}

export async function getAchievements(uid: string): Promise<Achievement[]> {
    const achievementRef = collection(db, 'users', uid, 'achievements');
    const q = query(achievementRef, orderBy('unlockedAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        ...doc.data(),
        unlockedAt: doc.data().unlockedAt?.toDate()
    })) as Achievement[];
}

// Streak Management
export async function updateStreak(uid: string) {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const lastActive = userSnap.data().lastActive?.toDate();
        const now = new Date();
        const currentStreak = userSnap.data().streak || 0;

        if (lastActive) {
            const daysDiff = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

            if (daysDiff === 1) {
                // Consecutive day - increment streak
                await updateDoc(userRef, {
                    streak: currentStreak + 1,
                    lastActive: Timestamp.now()
                });
            } else if (daysDiff > 1) {
                // Streak broken - reset to 1
                await updateDoc(userRef, {
                    streak: 1,
                    lastActive: Timestamp.now()
                });
            }
        } else {
            // First time
            await updateDoc(userRef, {
                streak: 1,
                lastActive: Timestamp.now()
            });
        }
    }
}
