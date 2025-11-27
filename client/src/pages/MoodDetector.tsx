import { useState, useRef, useEffect } from 'react';
import { Camera, Smile, TrendingUp, Heart, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useFaceDetection } from '@/hooks/useFaceDetection';
import UnifiedHeader from '@/components/UnifiedHeader';

interface MoodEntry {
    timestamp: number;
    emotion: string;
    confidence: number;
}

export default function MoodDetector() {
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const detectionIntervalRef = useRef<number | null>(null);

    const { isLoading, error, result, detectEmotion, isSmiling } = useFaceDetection();

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    // Run detection periodically when camera is active
    useEffect(() => {
        if (isCameraActive && videoRef.current) {
            detectionIntervalRef.current = window.setInterval(async () => {
                if (videoRef.current) {
                    await detectEmotion(videoRef.current);
                }
            }, 500); // Detect every 500ms
        }

        return () => {
            if (detectionIntervalRef.current) {
                clearInterval(detectionIntervalRef.current);
            }
        };
    }, [isCameraActive, detectEmotion]);

    // Save mood to history when detected
    useEffect(() => {
        if (result && result.confidence > 0.5) {
            setMoodHistory(prev => {
                const newEntry: MoodEntry = {
                    timestamp: Date.now(),
                    emotion: result.dominantEmotion,
                    confidence: result.confidence
                };

                // Keep only last 10 entries
                const updated = [...prev, newEntry].slice(-10);

                // Save to localStorage
                localStorage.setItem('moodHistory', JSON.stringify(updated));

                return updated;
            });
        }
    }, [result]);

    // Load mood history from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('moodHistory');
        if (saved) {
            try {
                setMoodHistory(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load mood history', e);
            }
        }
    }, []);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720 }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                setStream(mediaStream);
                setIsCameraActive(true);
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setIsCameraActive(false);
    };

    const getEmotionEmoji = (emotion: string) => {
        const emojiMap: Record<string, string> = {
            happy: '😊',
            sad: '😢',
            angry: '😠',
            fearful: '😨',
            disgusted: '🤢',
            surprised: '😲',
            neutral: '😐'
        };
        return emojiMap[emotion] || '😐';
    };

    const getEmotionColor = (emotion: string) => {
        const colorMap: Record<string, string> = {
            happy: '#10b981',
            sad: '#3b82f6',
            angry: '#ef4444',
            fearful: '#8b5cf6',
            disgusted: '#f59e0b',
            surprised: '#ec4899',
            neutral: '#6b7280'
        };
        return colorMap[emotion] || '#6b7280';
    };

    const getEncouragementMessage = () => {
        if (!result) return null;

        const messages: Record<string, string> = {
            happy: "Great! You're in a positive mood. Keep that smile going! 😊",
            sad: "Feeling down? Remember, even a forced smile can boost your mood. Try it!",
            angry: "Take a deep breath. Smiling, even when you don't feel like it, can help calm you.",
            fearful: "You're safe here. Try smiling - it triggers positive chemicals in your brain.",
            disgusted: "Not feeling great? A smile can actually change your brain chemistry!",
            surprised: "Interesting! Try turning that surprise into a smile for better mood.",
            neutral: "Try smiling! Even a forced smile releases endorphins and serotonin."
        };

        return messages[result.dominantEmotion] || messages.neutral;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/60 to-slate-100">
            <UnifiedHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
                        <Brain className="w-4 h-4" />
                        AI-Powered Mood Analysis
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Mood Detector & Smile Therapy
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Track your emotional well-being and discover the power of smiling for mental health
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Camera Area */}
                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            <div className="relative bg-black rounded-lg overflow-hidden aspect-video mb-4">
                                <video
                                    ref={videoRef}
                                    className="w-full h-full object-cover mirror"
                                    autoPlay
                                    playsInline
                                    muted
                                />
                                <canvas
                                    ref={canvasRef}
                                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                                />
                                {!isCameraActive && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                                        <div className="text-center text-white">
                                            <Smile className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                            <p className="text-lg">Camera not started</p>
                                        </div>
                                    </div>
                                )}

                                {result && isCameraActive && (
                                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur px-4 py-3 rounded-lg text-white">
                                        <div className="flex items-center gap-3">
                                            <span className="text-4xl">{getEmotionEmoji(result.dominantEmotion)}</span>
                                            <div>
                                                <p className="font-semibold capitalize">{result.dominantEmotion}</p>
                                                <p className="text-sm text-white/80">
                                                    {(result.confidence * 100).toFixed(0)}% confident
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {isSmiling && isCameraActive && (
                                    <div className="absolute top-4 right-4 bg-green-500 backdrop-blur px-4 py-2 rounded-full text-white font-semibold animate-pulse">
                                        <Smile className="w-5 h-5 inline mr-2" />
                                        You're Smiling!
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4">
                                {!isCameraActive ? (
                                    <Button
                                        onClick={startCamera}
                                        disabled={isLoading}
                                        className="flex-1"
                                        size="lg"
                                    >
                                        <Camera className="w-4 h-4 mr-2" />
                                        {isLoading ? 'Loading AI Models...' : 'Start Mood Check'}
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={stopCamera}
                                        variant="destructive"
                                        className="flex-1"
                                        size="lg"
                                    >
                                        Stop Camera
                                    </Button>
                                )}
                            </div>

                            {error && (
                                <Alert variant="destructive" className="mt-4">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {result && (
                                <Alert className="mt-4" style={{ borderColor: getEmotionColor(result.dominantEmotion) }}>
                                    <Heart className="h-4 w-4" />
                                    <AlertDescription>{getEncouragementMessage()}</AlertDescription>
                                </Alert>
                            )}
                        </Card>

                        {/* Science Section */}
                        <Card className="p-6 mt-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Brain className="w-5 h-5" />
                                The Science of Smiling
                            </h3>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    <strong>Did you know?</strong> Even forcing yourself to smile can improve your mood!
                                    This is because the physical act of smiling triggers the release of neuropeptides
                                    that work toward fighting off stress.
                                </p>
                                <p>
                                    When you smile, your brain releases:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong>Dopamine:</strong> The "feel-good" neurotransmitter</li>
                                    <li><strong>Endorphins:</strong> Natural pain relievers</li>
                                    <li><strong>Serotonin:</strong> Mood stabilizer and happiness booster</li>
                                </ul>
                                <p className="text-sm text-gray-600 italic">
                                    This is why we encourage you to smile during mood checks - it's not just about
                                    detection, it's about actively improving your mental state!
                                </p>
                            </div>
                        </Card>
                    </div>

                    {/* Emotion Breakdown & History */}
                    <div className="lg:col-span-1 space-y-6">
                        {result && (
                            <Card className="p-6">
                                <h3 className="text-xl font-semibold mb-4">Emotion Breakdown</h3>
                                <div className="space-y-3">
                                    {Object.entries(result.emotions).map(([emotion, score]) => (
                                        <div key={emotion}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="capitalize flex items-center gap-2">
                                                    <span>{getEmotionEmoji(emotion)}</span>
                                                    {emotion}
                                                </span>
                                                <span className="font-semibold">{(score * 100).toFixed(0)}%</span>
                                            </div>
                                            <Progress
                                                value={score * 100}
                                                className="h-2"
                                                style={{
                                                    // @ts-ignore
                                                    '--progress-background': getEmotionColor(emotion)
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        <Card className="p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                Recent Mood History
                            </h3>
                            {moodHistory.length === 0 ? (
                                <p className="text-gray-500 text-sm text-center py-4">
                                    No mood data yet. Start a mood check to track your emotions!
                                </p>
                            ) : (
                                <div className="space-y-2">
                                    {[...moodHistory].reverse().map((entry, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{getEmotionEmoji(entry.emotion)}</span>
                                                <div>
                                                    <p className="font-medium capitalize text-sm">{entry.emotion}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(entry.timestamp).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {(entry.confidence * 100).toFixed(0)}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                            <h4 className="font-semibold mb-3 text-purple-900">💡 Pro Tip</h4>
                            <p className="text-sm text-purple-800">
                                Try smiling for 30 seconds, even if you don't feel like it.
                                Notice how your mood shifts! This simple exercise can help combat
                                stress and depression naturally.
                            </p>
                        </Card>
                    </div>
                </div>
            </div>

            <style>{`
        .mirror {
          transform: scaleX(-1);
        }
      `}</style>
        </div>
    );
}
