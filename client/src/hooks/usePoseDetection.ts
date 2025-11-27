import { useEffect, useRef, useState } from 'react';
import { Pose, Results } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

export interface UsePoseDetectionResult {
    isLoading: boolean;
    error: string | null;
    results: Results | null;
    startCamera: (videoElement: HTMLVideoElement) => Promise<void>;
    stopCamera: () => void;
    processFrame: (videoElement: HTMLVideoElement) => Promise<void>;
}

export function usePoseDetection(): UsePoseDetectionResult {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<Results | null>(null);

    const poseRef = useRef<Pose | null>(null);
    const cameraRef = useRef<Camera | null>(null);

    useEffect(() => {
        const initializePose = async () => {
            try {
                setIsLoading(true);

                const pose = new Pose({
                    locateFile: (file) => {
                        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
                    }
                });

                pose.setOptions({
                    modelComplexity: 1,
                    smoothLandmarks: true,
                    enableSegmentation: false,
                    smoothSegmentation: false,
                    minDetectionConfidence: 0.5,
                    minTrackingConfidence: 0.5
                });

                pose.onResults((results: Results) => {
                    setResults(results);
                });

                await pose.initialize();
                poseRef.current = pose;
                setIsLoading(false);
            } catch (err) {
                console.error('Error initializing pose detection:', err);
                setError('Failed to initialize pose detection. Please refresh the page.');
                setIsLoading(false);
            }
        };

        initializePose();

        return () => {
            if (poseRef.current) {
                poseRef.current.close();
            }
            if (cameraRef.current) {
                cameraRef.current.stop();
            }
        };
    }, []);

    const startCamera = async (videoElement: HTMLVideoElement) => {
        if (!poseRef.current) {
            setError('Pose detection not initialized');
            return;
        }

        try {
            const camera = new Camera(videoElement, {
                onFrame: async () => {
                    if (poseRef.current && videoElement) {
                        await poseRef.current.send({ image: videoElement });
                    }
                },
                width: 1280,
                height: 720
            });

            await camera.start();
            cameraRef.current = camera;
            setError(null);
        } catch (err) {
            console.error('Error starting camera:', err);
            setError('Failed to access camera. Please check permissions.');
        }
    };

    const stopCamera = () => {
        if (cameraRef.current) {
            cameraRef.current.stop();
            cameraRef.current = null;
        }
    };

    const processFrame = async (videoElement: HTMLVideoElement) => {
        if (!poseRef.current) {
            setError('Pose detection not initialized');
            return;
        }

        try {
            await poseRef.current.send({ image: videoElement });
        } catch (err) {
            console.error('Error processing frame:', err);
            setError('Error processing video frame');
        }
    };

    return {
        isLoading,
        error,
        results,
        startCamera,
        stopCamera,
        processFrame
    };
}
