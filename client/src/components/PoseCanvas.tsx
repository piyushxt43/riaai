import { useEffect, useRef } from 'react';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS } from '@mediapipe/pose';
import type { Results } from '@mediapipe/pose';

interface PoseCanvasProps {
    results: Results | null;
    width: number;
    height: number;
}

export default function PoseCanvas({ results, width, height }: PoseCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current || !results) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw the pose landmarks and connections
        if (results.poseLandmarks) {
            // Draw connections (skeleton)
            drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, {
                color: '#00ff00',
                lineWidth: 4
            });

            // Draw landmarks (joints)
            drawLandmarks(ctx, results.poseLandmarks, {
                color: '#ff0000',
                fillColor: '#00ff00',
                lineWidth: 2,
                radius: 6
            });
        }
    }, [results, width, height]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 10 }}
        />
    );
}
