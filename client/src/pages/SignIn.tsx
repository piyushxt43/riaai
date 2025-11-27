import { useState } from 'react';
import { Mail, Lock, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { login, signup } = useAuth();
    const [, setLocation] = useLocation();
    const [error, setError] = useState('');

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            setLocation('/dashboard');
        } catch (err) {
            setError('Failed to sign in. Please check your credentials.');
            console.error(err);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await signup(email, password);
            setLocation('/onboarding');
        } catch (err) {
            setError('Failed to create account. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <a href="/" className="inline-flex items-center gap-2 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-rose-500 text-white font-semibold flex items-center justify-center shadow-md">
                            R
                        </div>
                        <span className="text-2xl font-bold text-gray-900">Ria Wellness</span>
                    </a>
                    <p className="text-gray-600">Your AI companion for better health</p>
                </div>

                <Card className="p-8">
                    <Tabs defaultValue="signin" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
                                {error}
                            </div>
                        )}

                        <TabsContent value="signin">
                            <form onSubmit={handleSignIn} className="space-y-4">
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative mt-1">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative mt-1">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" size="lg">
                                    Sign In
                                </Button>

                                <p className="text-center text-sm text-gray-600">
                                    <a href="#" className="text-indigo-600 hover:underline">
                                        Forgot password?
                                    </a>
                                </p>
                            </form>
                        </TabsContent>

                        <TabsContent value="signup">
                            <form onSubmit={handleSignUp} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <div className="relative mt-1">
                                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your Name"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="signup-email">Email</Label>
                                    <div className="relative mt-1">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="signup-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="signup-password">Password</Label>
                                    <div className="relative mt-1">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="signup-password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" size="lg">
                                    Create Account
                                </Button>

                                <p className="text-center text-xs text-gray-600">
                                    By signing up, you agree to our{' '}
                                    <a href="#" className="text-indigo-600 hover:underline">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="text-indigo-600 hover:underline">
                                        Privacy Policy
                                    </a>
                                </p>
                            </form>
                        </TabsContent>
                    </Tabs>
                </Card>

                <p className="text-center mt-6 text-sm text-gray-600">
                    <a href="/" className="text-indigo-600 hover:underline">
                        ← Back to Home
                    </a>
                </p>
            </div>
        </div>
    );
}
