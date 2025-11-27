import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Activity, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePoseDetection } from '@/hooks/usePoseDetection';
import { analyzePose, type ExerciseType, type FormFeedback, getFeedbackColor } from '@/lib/poseAnalysis';
import PoseCanvas from '@/components/PoseCanvas';
import UnifiedHeader from '@/components/UnifiedHeader';

export default function PostureCheck() {
    const [activeTab, setActiveTab] = useState('camera');
    const [exerciseType, setExerciseType] = useState<ExerciseType>('general');
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [feedback, setFeedback] = useState<FormFeedback[]>([]);

    const videoRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { isLoading, error, results, startCamera, stopCamera, processFrame } = usePoseDetection();

    // Analyze pose when results update
    useEffect(() => {
        if (results) {
            const analysis = analyzePose(results, exerciseType);
            setFeedback(analysis);
        }
    }, [results, exerciseType]);

    const handleStartCamera = async () => {
        if (videoRef.current && !isCameraActive) {
            await startCamera(videoRef.current);
            setIsCameraActive(true);
        }
    };

    const handleStopCamera = () => {
        stopCamera();
        setIsCameraActive(false);
        setFeedback([]);
    };

    const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !videoRef.current) return;

        const videoUrl = URL.createObjectURL(file);
        videoRef.current.src = videoUrl;
        videoRef.current.loop = true;

        await videoRef.current.play();

        // Process frames periodically
        const interval = setInterval(async () => {
            if (videoRef.current) {
                await processFrame(videoRef.current);
            }
        }, 100);

        videoRef.current.onended = () => {
            clearInterval(interval);
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/60 to-slate-100">
            <UnifiedHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
                        <Activity className="w-4 h-4" />
                        AI-Powered Form Analysis
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Posture & Exercise Form Check
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Get real-time feedback on your exercise form to prevent injuries and maximize effectiveness
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Video Area */}
                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-2 mb-6">
                                    <TabsTrigger value="camera">
                                        <Camera className="w-4 h-4 mr-2" />
                                        Live Camera
                                    </TabsTrigger>
                                    <TabsTrigger value="upload">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Video
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="camera" className="space-y-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Exercise Type
                                        </label>
                                        <Select value={exerciseType} onValueChange={(value) => setExerciseType(value as ExerciseType)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select exercise" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="general">General Posture</SelectItem>
                                                <SelectItem value="pushup">Push-ups</SelectItem>
                                                <SelectItem value="squat">Squats</SelectItem>
                                                <SelectItem value="plank">Plank</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                                        <video
                                            ref={videoRef}
                                            className="w-full h-full object-cover"
                                            autoPlay
                                            playsInline
                                            muted
                                        />
                                        {results && (
                                            <PoseCanvas
                                                results={results}
                                                width={videoRef.current?.videoWidth || 1280}
                                                height={videoRef.current?.videoHeight || 720}
                                            />
                                        )}
                                        {!isCameraActive && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                                                <div className="text-center text-white">
                                                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                                    <p className="text-lg">Camera not started</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-4">
                                        {!isCameraActive ? (
                                            <Button
                                                onClick={handleStartCamera}
                                                disabled={isLoading}
                                                className="flex-1"
                                                size="lg"
                                            >
                                                <Camera className="w-4 h-4 mr-2" />
                                                {isLoading ? 'Loading...' : 'Start Camera'}
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={handleStopCamera}
                                                variant="destructive"
                                                className="flex-1"
                                                size="lg"
                                            >
                                                Stop Camera
                                            </Button>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="upload" className="space-y-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Exercise Type
                                        </label>
                                        <Select value={exerciseType} onValueChange={(value) => setExerciseType(value as ExerciseType)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select exercise" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="general">General Posture</SelectItem>
                                                <SelectItem value="pushup">Push-ups</SelectItem>
                                                <SelectItem value="squat">Squats</SelectItem>
                                                <SelectItem value="plank">Plank</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                                        <video
                                            ref={videoRef}
                                            className="w-full h-full object-cover"
                                            controls
                                            playsInline
                                        />
                                        {results && (
                                            <PoseCanvas
                                                results={results}
                                                width={videoRef.current?.videoWidth || 1280}
                                                height={videoRef.current?.videoHeight || 720}
                                            />
                                        )}
                                    </div>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="video/*"
                                        onChange={handleVideoUpload}
                                        className="hidden"
                                    />
                                    <Button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full"
                                        size="lg"
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Video
                                    </Button>
                                </TabsContent>
                            </Tabs>

                            {error && (
                                <Alert variant="destructive" className="mt-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                        </Card>
                    </div>

                    {/* Feedback Panel */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-24">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5" />
                                Form Feedback
                            </h3>

                            {feedback.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <Info className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                    <p>Start exercising to get real-time feedback</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {feedback.map((item, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-lg border-2"
                                            style={{
                                                borderColor: getFeedbackColor(item.severity),
                                                backgroundColor: `${getFeedbackColor(item.severity)}10`
                                            }}
                                        >
                                            <div className="flex items-start gap-2">
                                                {item.isCorrect ? (
                                                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: getFeedbackColor(item.severity) }} />
                                                ) : (
                                                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: getFeedbackColor(item.severity) }} />
                                                )}
                                                <div className="flex-1">
                                                    {item.bodyPart && (
                                                        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: getFeedbackColor(item.severity) }}>
                                                            {item.bodyPart}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-gray-700">{item.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-6 pt-6 border-t">
                                <h4 className="font-semibold mb-2">Tips:</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Position yourself fully in frame</li>
                                    <li>• Ensure good lighting</li>
                                    <li>• Perform exercises slowly</li>
                                    <li>• Focus on form over speed</li>
                                </ul>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                            <Camera className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Real-Time Analysis</h3>
                        <p className="text-gray-600 text-sm">
                            Get instant feedback on your form using advanced AI pose detection technology
                        </p>
                    </Card>

                    <Card className="p-6">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Prevent Injuries</h3>
                        <p className="text-gray-600 text-sm">
                            Correct form reduces injury risk and helps you get better results from your workouts
                        </p>
                    </Card>

                    <Card className="p-6">
                        <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                            <Activity className="w-6 h-6 text-rose-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
                        <p className="text-gray-600 text-sm">
                            Monitor your form improvements over time and build better exercise habits
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
