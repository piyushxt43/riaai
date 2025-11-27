import { Flame, Trophy, Star, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';

// Streak Counter Component
interface StreakCounterProps {
    days: number;
    size?: 'sm' | 'md' | 'lg';
}

export function StreakCounter({ days, size = 'md' }: StreakCounterProps) {
    const sizeClasses = {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-4xl'
    };

    const iconSizes = {
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Flame className={`${iconSizes[size]} animate-pulse`} />
            <span className={`${sizeClasses[size]} font-bold`}>{days}</span>
            <span className="text-sm">day streak</span>
        </motion.div>
    );
}

// Level Badge Component
interface LevelBadgeProps {
    level: number;
    xp: number;
    xpToNext: number;
}

export function LevelBadge({ level, xp, xpToNext }: LevelBadgeProps) {
    const progress = (xp / xpToNext) * 100;

    return (
        <div className="relative inline-flex items-center gap-3">
            <div className="relative">
                <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                    />
                    <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-xs text-gray-500">Level</p>
                        <p className="text-2xl font-bold text-purple-600">{level}</p>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-sm text-gray-600">{xp} / {xpToNext} XP</p>
                <p className="text-xs text-gray-500">{xpToNext - xp} to next level</p>
            </div>
        </div>
    );
}

// Achievement Popup Component
interface AchievementPopupProps {
    title: string;
    description: string;
    icon: string;
    onClose: () => void;
}

export function AchievementPopup({ title, description, icon, onClose }: AchievementPopupProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-2xl max-w-sm"
        >
            <div className="flex items-start gap-4">
                <div className="text-5xl">{icon}</div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">🎉 Achievement Unlocked!</h3>
                    <p className="font-semibold">{title}</p>
                    <p className="text-sm text-white/90">{description}</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white"
                >
                    ✕
                </button>
            </div>
        </motion.div>
    );
}

// Progress Celebration Component
interface ProgressCelebrationProps {
    show: boolean;
    onComplete: () => void;
}

export function ProgressCelebration({ show, onComplete }: ProgressCelebrationProps) {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(onComplete, 5000);
            return () => clearTimeout(timer);
        }
    }, [show, onComplete]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={500}
                gravity={0.3}
            />
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                    className="text-9xl mb-4"
                >
                    🎉
                </motion.div>
                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Amazing!
                </h2>
            </motion.div>
        </div>
    );
}

// Motivational Quote Component
const quotes = [
    "Every workout counts! 💪",
    "You're stronger than you think! 🌟",
    "Progress, not perfection! 🎯",
    "One day at a time! 🔥",
    "Your health is your wealth! 💎",
    "Keep going, you're doing great! ⭐",
    "Small steps, big changes! 🚀",
    "Believe in yourself! 🌈"
];

export function MotivationalQuote() {
    const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200"
        >
            <p className="text-center text-purple-900 font-semibold">{quote}</p>
        </motion.div>
    );
}

// XP Gain Animation
interface XPGainProps {
    amount: number;
    onComplete: () => void;
}

export function XPGain({ amount, onComplete }: XPGainProps) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 2000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: -100, opacity: 0, scale: 1.5 }}
            transition={{ duration: 2 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                +{amount} XP
            </div>
        </motion.div>
    );
}

// Quick Stats Component
interface QuickStatsProps {
    streak: number;
    workouts: number;
    level: number;
    xp: number;
}

export function QuickStats({ streak, workouts, level, xp }: QuickStatsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white text-center"
            >
                <Flame className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{streak}</p>
                <p className="text-xs">Day Streak</p>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-center"
            >
                <Target className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{workouts}</p>
                <p className="text-xs">Workouts</p>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white text-center"
            >
                <Star className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{level}</p>
                <p className="text-xs">Level</p>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 text-white text-center"
            >
                <Zap className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{xp}</p>
                <p className="text-xs">Total XP</p>
            </motion.div>
        </div>
    );
}
