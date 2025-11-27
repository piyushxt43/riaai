import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles, User, Target, Heart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserProfile } from '@/services/userService';
import { ProgressCelebration } from '@/components/GamificationElements';
import { useLocation } from 'wouter';

const goals = [
    { id: 'fitness', label: 'Build Fitness Habits', icon: '💪', color: 'from-blue-500 to-cyan-500' },
    { id: 'posture', label: 'Improve Posture & Form', icon: '🧘', color: 'from-purple-500 to-pink-500' },
    { id: 'mood', label: 'Track Mental Wellness', icon: '😊', color: 'from-yellow-500 to-orange-500' },
    { id: 'quit', label: 'Quit Unhealthy Habits', icon: '🚭', color: 'from-red-500 to-rose-500' },
    { id: 'nutrition', label: 'Healthy Eating', icon: '🥗', color: 'from-green-500 to-emerald-500' },
    { id: 'sleep', label: 'Better Sleep', icon: '😴', color: 'from-indigo-500 to-purple-500' },
];

const dietTypes = [
    { id: 'veg', label: 'Vegetarian', icon: '🥬' },
    { id: 'nonveg', label: 'Non-Vegetarian', icon: '🍗' },
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'any', label: 'No Preference', icon: '🍽️' },
];

const fitnessLevels = [
    { id: 'beginner', label: 'Beginner', desc: 'Just starting out' },
    { id: 'intermediate', label: 'Intermediate', desc: 'Some experience' },
    { id: 'advanced', label: 'Advanced', desc: 'Regular exerciser' },
];

export default function Onboarding() {
    const [step, setStep] = useState(1);
    const [, setLocation] = useLocation();
    const { currentUser, refreshProfile } = useAuth();
    const [showCelebration, setShowCelebration] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        height: '',
        weight: '',
        selectedGoals: [] as string[],
        dietType: '',
        fitnessLevel: '',
    });

    const totalSteps = 5;
    const progress = (step / totalSteps) * 100;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleComplete = async () => {
        if (!currentUser) return;

        try {
            await updateUserProfile(currentUser.uid, {
                name: formData.name,
                age: parseInt(formData.age),
                height: parseInt(formData.height),
                weight: parseInt(formData.weight),
                goals: formData.selectedGoals,
                dietType: formData.dietType,
                fitnessLevel: formData.fitnessLevel,
                onboardingCompleted: true,
            });

            await refreshProfile();
            setShowCelebration(true);

            setTimeout(() => {
                setLocation('/dashboard');
            }, 3000);
        } catch (error) {
            console.error('Error completing onboarding:', error);
        }
    };

    const toggleGoal = (goalId: string) => {
        setFormData(prev => ({
            ...prev,
            selectedGoals: prev.selectedGoals.includes(goalId)
                ? prev.selectedGoals.filter(g => g !== goalId)
                : [...prev.selectedGoals, goalId]
        }));
    };

    const canProceed = () => {
        switch (step) {
            case 1: return true; // Welcome screen
            case 2: return formData.name && formData.age && formData.height && formData.weight;
            case 3: return formData.selectedGoals.length > 0;
            case 4: return formData.dietType && formData.fitnessLevel;
            case 5: return true; // Completion screen
            default: return false;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Illustration */}
            <div className="absolute inset-0 opacity-20">
                <img
                    src="/onboarding_welcome_1764179057981.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            <ProgressCelebration show={showCelebration} onComplete={() => { }} />

            <div className="relative z-10 w-full max-w-2xl">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Step {step} of {totalSteps}</span>
                        <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                </div>

                <Card className="p-8 md:p-12 shadow-2xl">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Welcome */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="text-center"
                            >
                                <div className="mb-6">
                                    <img
                                        src="/logoria.gif"
                                        alt="Ria"
                                        className="w-24 h-24 mx-auto mb-4"
                                    />
                                    <Sparkles className="w-16 h-16 mx-auto text-purple-600 mb-4" />
                                </div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                    Welcome to Ria! 🎉
                                </h1>
                                <p className="text-xl text-gray-600 mb-8">
                                    Your AI-powered wellness companion is ready to help you achieve your health goals.
                                    Let's get to know you better!
                                </p>
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">💪</div>
                                        <p className="text-sm text-gray-600">Fitness</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🥗</div>
                                        <p className="text-sm text-gray-600">Nutrition</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🧘</div>
                                        <p className="text-sm text-gray-600">Wellness</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Personal Info */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <User className="w-8 h-8 text-indigo-600" />
                                    <h2 className="text-3xl font-bold text-gray-900">Tell us about yourself</h2>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Full Name *</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Your name"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="age">Age *</Label>
                                            <Input
                                                id="age"
                                                type="number"
                                                value={formData.age}
                                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                placeholder="25"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="height">Height (cm) *</Label>
                                            <Input
                                                id="height"
                                                type="number"
                                                value={formData.height}
                                                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                                placeholder="170"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="weight">Weight (kg) *</Label>
                                            <Input
                                                id="weight"
                                                type="number"
                                                value={formData.weight}
                                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                                placeholder="70"
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Goals Selection */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <Target className="w-8 h-8 text-purple-600" />
                                    <h2 className="text-3xl font-bold text-gray-900">What are your goals?</h2>
                                </div>
                                <p className="text-gray-600 mb-6">Select all that apply</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {goals.map((goal) => (
                                        <motion.button
                                            key={goal.id}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => toggleGoal(goal.id)}
                                            className={`p-4 rounded-xl border-2 transition-all ${formData.selectedGoals.includes(goal.id)
                                                    ? `bg-gradient-to-br ${goal.color} text-white border-transparent`
                                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="text-4xl mb-2">{goal.icon}</div>
                                            <p className={`font-semibold text-sm ${formData.selectedGoals.includes(goal.id) ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                {goal.label}
                                            </p>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Preferences */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <Heart className="w-8 h-8 text-rose-600" />
                                    <h2 className="text-3xl font-bold text-gray-900">Your preferences</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <Label className="text-lg mb-3 block">Diet Type</Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {dietTypes.map((diet) => (
                                                <button
                                                    key={diet.id}
                                                    onClick={() => setFormData({ ...formData, dietType: diet.id })}
                                                    className={`p-4 rounded-lg border-2 transition-all ${formData.dietType === diet.id
                                                            ? 'bg-green-500 text-white border-green-500'
                                                            : 'bg-white border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="text-3xl mb-1">{diet.icon}</div>
                                                    <p className="font-semibold text-sm">{diet.label}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-lg mb-3 block">Fitness Level</Label>
                                        <div className="space-y-2">
                                            {fitnessLevels.map((level) => (
                                                <button
                                                    key={level.id}
                                                    onClick={() => setFormData({ ...formData, fitnessLevel: level.id })}
                                                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${formData.fitnessLevel === level.id
                                                            ? 'bg-indigo-500 text-white border-indigo-500'
                                                            : 'bg-white border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <p className="font-semibold">{level.label}</p>
                                                    <p className={`text-sm ${formData.fitnessLevel === level.id ? 'text-indigo-100' : 'text-gray-500'
                                                        }`}>
                                                        {level.desc}
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 5: Completion */}
                        {step === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="text-center"
                            >
                                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                    You're all set, {formData.name}! 🎉
                                </h2>
                                <p className="text-xl text-gray-600 mb-8">
                                    Ria is ready to guide you on your wellness journey. Let's achieve your goals together!
                                </p>
                                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl mb-6">
                                    <h3 className="font-semibold text-lg mb-3">Your Goals:</h3>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {formData.selectedGoals.map(goalId => {
                                            const goal = goals.find(g => g.id === goalId);
                                            return (
                                                <span key={goalId} className="px-3 py-1 bg-white rounded-full text-sm font-medium">
                                                    {goal?.icon} {goal?.label}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <Button
                            onClick={handleBack}
                            variant="outline"
                            disabled={step === 1}
                            className="gap-2"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                        >
                            {step === totalSteps ? 'Complete' : 'Next'}
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
