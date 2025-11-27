import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export interface EmotionScores {
    neutral: number;
    happy: number;
    sad: number;
    angry: number;
    fearful: number;
    disgusted: number;
    surprised: number;
}

export interface FaceDetectionResult {
    emotions: EmotionScores;
    dominantEmotion: string;
    confidence: number;
}

export interface UseFaceDetectionResult {
    isLoading: boolean;
    error: string | null;
    result: FaceDetectionResult | null;
    detectEmotion: (videoElement: HTMLVideoElement) => Promise<void>;
    isSmiling: boolean;
}

export function useFaceDetection(): UseFaceDetectionResult {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<FaceDetectionResult | null>(null);
    const [isSmiling, setIsSmiling] = useState(false);

    const modelsLoadedRef = useRef(false);

    useEffect(() => {
        const loadModels = async () => {
            try {
                setIsLoading(true);

                // Load models from CDN
                const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';

                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
                ]);

                modelsLoadedRef.current = true;
                setIsLoading(false);
            } catch (err) {
                console.error('Error loading face detection models:', err);
                setError('Failed to load face detection models. Please refresh the page.');
                setIsLoading(false);
            }
        };

        if (!modelsLoadedRef.current) {
            loadModels();
        }
    }, []);

    const detectEmotion = async (videoElement: HTMLVideoElement) => {
        if (!modelsLoadedRef.current) {
            setError('Models not loaded yet');
            return;
        }

        try {
            const detections = await faceapi
                .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
                .withFaceExpressions();

            if (detections && detections.expressions) {
                const emotions = detections.expressions as unknown as EmotionScores;

                // Find dominant emotion
                let maxEmotion = 'neutral';
                let maxScore = 0;

                Object.entries(emotions).forEach(([emotion, score]) => {
                    if (score > maxScore) {
                        maxScore = score;
                        maxEmotion = emotion;
                    }
                });

                setResult({
                    emotions,
                    dominantEmotion: maxEmotion,
                    confidence: maxScore
                });

                // Check if smiling (happy emotion > 0.6)
                setIsSmiling(emotions.happy > 0.6);
                setError(null);
            } else {
                setResult(null);
                setIsSmiling(false);
            }
        } catch (err) {
            console.error('Error detecting emotion:', err);
            setError('Error analyzing face. Make sure your face is clearly visible.');
        }
    };

    return {
        isLoading,
        error,
        result,
        detectEmotion,
        isSmiling
    };
}
