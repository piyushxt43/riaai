import { Trophy, TrendingUp, Flame, Target, Award, Medal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import UnifiedHeader from '@/components/UnifiedHeader';

const leaderboardData = [
    { rank: 1, name: 'Priya Sharma', streak: 45, workouts: 38, moodScore: 92, avatar: 'PS' },
    { rank: 2, name: 'Rahul Verma', streak: 42, workouts: 35, moodScore: 88, avatar: 'RV' },
    { rank: 3, name: 'Ananya Patel', streak: 38, workouts: 32, moodScore: 90, avatar: 'AP' },
    { rank: 4, name: 'Arjun Singh', streak: 35, workouts: 30, moodScore: 85, avatar: 'AS' },
    { rank: 5, name: 'Sneha Reddy', streak: 33, workouts: 28, moodScore: 87, avatar: 'SR' },
    { rank: 6, name: 'Vikram Kumar', streak: 30, workouts: 26, moodScore: 83, avatar: 'VK' },
    { rank: 7, name: 'Kavya Iyer', streak: 28, workouts: 24, moodScore: 86, avatar: 'KI' },
    { rank: 8, name: 'Aditya Joshi', streak: 25, workouts: 22, moodScore: 81, avatar: 'AJ' },
    { rank: 9, name: 'Meera Nair', streak: 23, workouts: 20, moodScore: 84, avatar: 'MN' },
    { rank: 10, name: 'Rohan Gupta', streak: 20, workouts: 18, moodScore: 80, avatar: 'RG' },
];

const achievements = [
    { icon: Flame, title: '7-Day Streak', description: 'Maintain a 7-day habit streak', color: 'from-orange-500 to-red-500' },
    { icon: Target, title: '30-Day Challenge', description: 'Complete a 30-day challenge', color: 'from-blue-500 to-cyan-500' },
    { icon: Trophy, title: 'Top 10', description: 'Reach top 10 on leaderboard', color: 'from-yellow-500 to-amber-500' },
    { icon: Award, title: 'Mood Master', description: 'Maintain 90+ mood score for a week', color: 'from-purple-500 to-pink-500' },
];

export default function Leaderboard() {
    const currentUser = {
        rank: 15,
        name: 'You',
        streak: 12,
        workouts: 10,
        moodScore: 75,
        avatar: 'YU'
    };

    const getRankColor = (rank: number) => {
        if (rank === 1) return 'from-yellow-400 to-yellow-600';
        if (rank === 2) return 'from-gray-300 to-gray-500';
        if (rank === 3) return 'from-orange-400 to-orange-600';
        return 'from-indigo-400 to-indigo-600';
    };

    const getRankIcon = (rank: number) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return rank;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50/60 to-slate-100">
            <UnifiedHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold mb-4">
                        <Trophy className="w-4 h-4" />
                        Community Rankings
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Leaderboard
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Compete with the Ria community and celebrate wellness achievements together
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Leaderboard */}
                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold">Top Performers</h2>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-medium text-sm">
                                        This Week
                                    </button>
                                    <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium text-sm">
                                        All Time
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {leaderboardData.map((user) => (
                                    <div
                                        key={user.rank}
                                        className={`flex items-center gap-4 p-4 rounded-lg ${user.rank <= 3 ? 'bg-gradient-to-r ' + getRankColor(user.rank) + ' text-white' : 'bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${user.rank <= 3 ? 'bg-white/20' : 'bg-indigo-100 text-indigo-600'
                                            }`}>
                                            {getRankIcon(user.rank)}
                                        </div>

                                        <Avatar className="w-12 h-12">
                                            <AvatarFallback className={user.rank <= 3 ? 'bg-white/20 text-white' : ''}>
                                                {user.avatar}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1">
                                            <p className={`font-semibold ${user.rank <= 3 ? 'text-white' : 'text-gray-900'}`}>
                                                {user.name}
                                            </p>
                                            <div className="flex gap-4 mt-1">
                                                <span className={`text-sm flex items-center gap-1 ${user.rank <= 3 ? 'text-white/90' : 'text-gray-600'}`}>
                                                    <Flame className="w-3 h-3" />
                                                    {user.streak} days
                                                </span>
                                                <span className={`text-sm flex items-center gap-1 ${user.rank <= 3 ? 'text-white/90' : 'text-gray-600'}`}>
                                                    <Target className="w-3 h-3" />
                                                    {user.workouts} workouts
                                                </span>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className={`text-2xl font-bold ${user.rank <= 3 ? 'text-white' : 'text-indigo-600'}`}>
                                                {user.moodScore}
                                            </p>
                                            <p className={`text-xs ${user.rank <= 3 ? 'text-white/80' : 'text-gray-500'}`}>
                                                Mood Score
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Current User Position */}
                            <div className="mt-6 pt-6 border-t">
                                <p className="text-sm text-gray-600 mb-3">Your Position</p>
                                <div className="flex items-center gap-4 p-4 rounded-lg bg-indigo-50 border-2 border-indigo-200">
                                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                                        {currentUser.rank}
                                    </div>

                                    <Avatar className="w-12 h-12">
                                        <AvatarFallback className="bg-indigo-200 text-indigo-700">
                                            {currentUser.avatar}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{currentUser.name}</p>
                                        <div className="flex gap-4 mt-1">
                                            <span className="text-sm flex items-center gap-1 text-gray-600">
                                                <Flame className="w-3 h-3" />
                                                {currentUser.streak} days
                                            </span>
                                            <span className="text-sm flex items-center gap-1 text-gray-600">
                                                <Target className="w-3 h-3" />
                                                {currentUser.workouts} workouts
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-indigo-600">{currentUser.moodScore}</p>
                                        <p className="text-xs text-gray-500">Mood Score</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Achievements & Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5" />
                                Achievements
                            </h3>
                            <div className="space-y-3">
                                {achievements.map((achievement, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center flex-shrink-0`}>
                                                <achievement.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm">{achievement.title}</p>
                                                <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                Your Progress
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">Habit Streak</span>
                                        <span className="font-semibold">{currentUser.streak}/30 days</span>
                                    </div>
                                    <Progress value={(currentUser.streak / 30) * 100} className="h-2" />
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">Workouts</span>
                                        <span className="font-semibold">{currentUser.workouts}/20</span>
                                    </div>
                                    <Progress value={(currentUser.workouts / 20) * 100} className="h-2" />
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">Mood Score</span>
                                        <span className="font-semibold">{currentUser.moodScore}/100</span>
                                    </div>
                                    <Progress value={currentUser.moodScore} className="h-2" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                            <h4 className="font-semibold mb-2 text-indigo-900">🎯 Next Milestone</h4>
                            <p className="text-sm text-indigo-800 mb-3">
                                Reach a 15-day streak to unlock the "Consistency Champion" badge!
                            </p>
                            <Progress value={(currentUser.streak / 15) * 100} className="h-2" />
                            <p className="text-xs text-indigo-600 mt-2">
                                {15 - currentUser.streak} more days to go!
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
