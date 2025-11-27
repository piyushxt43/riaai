import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import UnifiedHeader from '@/components/UnifiedHeader';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const exampleConversations = [
    "How can I improve my posture while working?",
    "Create a 30-day plan to quit smoking",
    "What's a good workout routine for beginners?",
    "I'm feeling stressed, can you help?"
];

const sampleResponses: Record<string, string> = {
    default: "Hi! I'm Ria, your AI wellness companion. I can help you with fitness guidance, nutrition plans, habit building, and mental wellness support. How can I assist you today?",
    posture: "Great question about posture! Here are some tips:\n\n1. Keep your screen at eye level\n2. Sit with your back straight and shoulders relaxed\n3. Take breaks every 30 minutes to stretch\n4. Use our Posture Check feature to analyze your form in real-time!\n\nWould you like me to create a personalized posture improvement plan for you?",
    smoking: "I'm proud of you for wanting to quit smoking! Here's a 30-day plan:\n\n**Week 1-2:** Reduce gradually\n- Track when you smoke\n- Replace with healthy alternatives\n- Practice deep breathing\n\n**Week 3-4:** Complete cessation\n- Join support groups\n- Stay active\n- Reward yourself for milestones\n\nI'll check in with you daily. Ready to start?",
    workout: "Perfect! Here's a beginner-friendly workout routine:\n\n**Monday/Wednesday/Friday:**\n- 10 push-ups (or knee push-ups)\n- 15 squats\n- 30-second plank\n- 10 lunges per leg\n\n**Tuesday/Thursday:**\n- 20-minute walk or jog\n- Light stretching\n\nRemember to use our Posture Check feature to ensure proper form! Start slow and gradually increase intensity.",
    stress: "I understand you're feeling stressed. Let's work through this together:\n\n1. **Immediate relief:** Try the 4-7-8 breathing technique\n   - Breathe in for 4 seconds\n   - Hold for 7 seconds\n   - Exhale for 8 seconds\n\n2. **Use our Mood Detector** to track your emotions\n\n3. **Try smiling** - even forced smiles release endorphins!\n\nWould you like me to guide you through a quick meditation exercise?"
};

export default function Agent() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: sampleResponses.default,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('posture') || lowerMessage.includes('sitting') || lowerMessage.includes('working')) {
            return sampleResponses.posture;
        }
        if (lowerMessage.includes('smoking') || lowerMessage.includes('quit') || lowerMessage.includes('cigarette')) {
            return sampleResponses.smoking;
        }
        if (lowerMessage.includes('workout') || lowerMessage.includes('exercise') || lowerMessage.includes('fitness') || lowerMessage.includes('beginner')) {
            return sampleResponses.workout;
        }
        if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('help')) {
            return sampleResponses.stress;
        }

        return "I'm here to help with fitness, nutrition, habit building, and mental wellness. Could you tell me more about what you'd like assistance with?";
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: getResponse(input),
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const handleExampleClick = (example: string) => {
        setInput(example);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-green-50/60 to-slate-100">
            <UnifiedHeader />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Wellness Coach
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Chat with Ria
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Your personal AI companion for fitness, nutrition, and mental wellness guidance
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Chat Area */}
                    <div className="lg:col-span-3">
                        <Card className="flex flex-col h-[600px]">
                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        <Avatar className="w-10 h-10 flex-shrink-0">
                                            <AvatarFallback className={message.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-green-100 text-green-600'}>
                                                {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-gray-100 text-gray-900'
                                                }`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                            <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex gap-3">
                                        <Avatar className="w-10 h-10">
                                            <AvatarFallback className="bg-green-100 text-green-600">
                                                <Bot className="w-5 h-5" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="bg-gray-100 rounded-2xl px-4 py-3">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="border-t p-4">
                                <div className="flex gap-2">
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask Ria anything about wellness..."
                                        className="flex-1"
                                    />
                                    <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-4">
                        <Card className="p-4">
                            <h3 className="font-semibold mb-3 text-sm">Try asking:</h3>
                            <div className="space-y-2">
                                {exampleConversations.map((example, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleExampleClick(example)}
                                        className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm text-gray-700"
                                    >
                                        {example}
                                    </button>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                            <h4 className="font-semibold mb-2 text-green-900 text-sm">💡 What Ria Can Do</h4>
                            <ul className="text-xs text-green-800 space-y-1">
                                <li>• Create personalized fitness plans</li>
                                <li>• Design nutrition strategies</li>
                                <li>• Help build healthy habits</li>
                                <li>• Provide mental wellness support</li>
                                <li>• Track your progress</li>
                                <li>• Offer motivation & guidance</li>
                            </ul>
                        </Card>

                        <Card className="p-4">
                            <h4 className="font-semibold mb-2 text-sm">Quick Actions</h4>
                            <div className="space-y-2">
                                <a
                                    href="/posture-check"
                                    className="block w-full text-center px-3 py-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors text-sm font-medium"
                                >
                                    Check Posture
                                </a>
                                <a
                                    href="/mood-detector"
                                    className="block w-full text-center px-3 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors text-sm font-medium"
                                >
                                    Analyze Mood
                                </a>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
