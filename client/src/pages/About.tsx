import { Activity, Brain, Calendar, Dumbbell, Heart, Smile, TrendingUp, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import UnifiedHeader from '@/components/UnifiedHeader';
import Footer from '@/components/Footer';

const features = [
    {
        icon: Brain,
        title: 'AI Wellness Chatbot',
        description: 'Ria talks like a supportive coach, providing practical and emotional advice tailored to your needs.',
        details: [
            'Natural conversation in multiple Indian languages',
            'Personalized wellness recommendations',
            'Emotional support and motivation',
            '24/7 availability for guidance'
        ],
        color: 'from-purple-500 to-pink-500'
    },
    {
        icon: Calendar,
        title: '30-Day Habit Challenges',
        description: 'Build good habits or quit bad ones with structured daily tasks and streak tracking.',
        details: [
            'Quit smoking, alcohol, or junk food',
            'Build exercise and meditation routines',
            'Daily task reminders and progress tracking',
            'Streak system to maintain motivation'
        ],
        color: 'from-blue-500 to-cyan-500'
    },
    {
        icon: Dumbbell,
        title: 'Natural Gym Guidance',
        description: 'Learn safe, steroid-free workout plans designed for beginners and enthusiasts.',
        details: [
            'Education about steroid dangers',
            'Clean, natural workout programs',
            'Progressive overload principles',
            'Form guidance and safety tips'
        ],
        color: 'from-orange-500 to-red-500'
    },
    {
        icon: Heart,
        title: 'Smart Nutrition Plans',
        description: 'Get customized Indian meal plans for fat loss, muscle gain, or balanced health.',
        details: [
            'Vegetarian and non-vegetarian options',
            'Regional Indian cuisine preferences',
            'Macro and calorie tracking',
            'Budget-friendly meal suggestions'
        ],
        color: 'from-green-500 to-emerald-500'
    },
    {
        icon: Smile,
        title: 'Mental Wellness Tools',
        description: 'Track your mood, practice breathing exercises, and receive daily affirmations.',
        details: [
            'AI-powered mood detection via camera',
            'Smile therapy for depression relief',
            'Guided breathing exercises',
            'Daily motivational affirmations'
        ],
        color: 'from-yellow-500 to-amber-500'
    },
    {
        icon: Activity,
        title: 'Posture & Exercise Form Check',
        description: 'Real-time AI analysis of your exercise form to prevent injuries and improve effectiveness.',
        details: [
            'Live camera or video upload analysis',
            'Support for push-ups, squats, planks, and more',
            'Instant feedback on form corrections',
            'Injury prevention through proper technique'
        ],
        color: 'from-indigo-500 to-purple-500'
    },
    {
        icon: TrendingUp,
        title: 'Progress Tracking',
        description: 'Monitor your wellness journey with comprehensive analytics and insights.',
        details: [
            'Habit streak tracking',
            'Mood trend analysis',
            'Workout consistency metrics',
            'Goal achievement milestones'
        ],
        color: 'from-pink-500 to-rose-500'
    }
];

const howItWorks = [
    {
        step: 1,
        title: 'Set Your Goals',
        description: 'Tell Ria what you want to achieve - better fitness, improved mood, or healthier habits.'
    },
    {
        step: 2,
        title: 'Get Personalized Plans',
        description: 'Receive customized workout routines, meal plans, and habit-building challenges.'
    },
    {
        step: 3,
        title: 'Track Daily Progress',
        description: 'Use AI-powered tools like posture check and mood detection to monitor your journey.'
    },
    {
        step: 4,
        title: 'Stay Motivated',
        description: 'Chat with Ria for support, compete on leaderboards, and celebrate milestones.'
    }
];

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/60 to-slate-100">
            <UnifiedHeader />

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        About Ria Wellness
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Your AI-powered companion for physical and mental wellness across India
                    </p>
                </div>

                {/* Mission Statement */}
                <Card className="p-8 md:p-12 mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            Ria is an AI-powered wellness and lifestyle assistant built to help people across India
                            improve their physical and mental health — naturally. Unlike typical fitness apps that
                            only count calories or show workouts, Ria understands the emotional side of discipline.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            It acts like a personal health companion that speaks in multiple Indian languages and
                            helps users quit harmful habits (like smoking, alcohol, junk food), avoid steroid misuse
                            in gyms, and build better habits — all within 30 days. Ria talks to users like a friend —
                            motivating them, tracking their progress, and providing customized nutrition, fitness,
                            and mental wellness guidance.
                        </p>
                    </div>
                </Card>

                {/* Features Grid */}
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Core Features</h2>
                    <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
                        Comprehensive tools to support every aspect of your wellness journey
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-600 mb-4">{feature.description}</p>
                                <ul className="space-y-2">
                                    {feature.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                            <span className="text-green-500 mt-1">✓</span>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* How It Works */}
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">How It Works</h2>
                    <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
                        Getting started with Ria is simple and straightforward
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {howItWorks.map((item, index) => (
                            <Card key={index} className="p-6 text-center relative">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                                {index < howItWorks.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                                        <div className="w-6 h-0.5 bg-gradient-to-r from-indigo-300 to-transparent"></div>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Technology Stack */}
                <Card className="p-8 md:p-12 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Powered by Advanced AI</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                                <Brain className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">MediaPipe Pose Detection</h3>
                            <p className="text-sm text-gray-600">
                                33-point pose tracking for accurate exercise form analysis
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                                <Smile className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Face-API Emotion Detection</h3>
                            <p className="text-sm text-gray-600">
                                Real-time facial expression analysis for mood tracking
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Natural Language AI</h3>
                            <p className="text-sm text-gray-600">
                                Conversational AI that understands context and emotions
                            </p>
                        </div>
                    </div>
                </Card>

                {/* CTA Section */}
                <div className="text-center">
                    <Card className="p-12 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Start Your Wellness Journey?
                        </h2>
                        <p className="text-xl mb-8 text-indigo-100">
                            Join thousands of Indians transforming their health with Ria
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/posture-check"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
                            >
                                <Activity className="w-5 h-5 mr-2" />
                                Try Posture Check
                            </a>
                            <a
                                href="/mood-detector"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-400 transition-colors border-2 border-white/20"
                            >
                                <Smile className="w-5 h-5 mr-2" />
                                Check Your Mood
                            </a>
                        </div>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}
