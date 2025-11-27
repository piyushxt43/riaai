// Pose analysis utilities for exercise form checking

export interface PoseLandmark {
    x: number;
    y: number;
    z: number;
    visibility?: number;
}

export interface PoseResults {
    poseLandmarks: PoseLandmark[];
}

export type ExerciseType = 'pushup' | 'situp' | 'squat' | 'plank' | 'general';

export interface FormFeedback {
    isCorrect: boolean;
    message: string;
    severity: 'good' | 'warning' | 'error';
    bodyPart?: string;
}

// Calculate angle between three points
function calculateAngle(a: PoseLandmark, b: PoseLandmark, c: PoseLandmark): number {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);

    if (angle > 180.0) {
        angle = 360 - angle;
    }

    return angle;
}

// Calculate distance between two points
function calculateDistance(a: PoseLandmark, b: PoseLandmark): number {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

// Push-up form analysis
function analyzePushup(landmarks: PoseLandmark[]): FormFeedback[] {
    const feedback: FormFeedback[] = [];

    // Key landmarks for push-ups
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftElbow = landmarks[13];
    const rightElbow = landmarks[14];
    const leftWrist = landmarks[15];
    const rightWrist = landmarks[16];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftKnee = landmarks[25];
    const rightKnee = landmarks[26];
    const leftAnkle = landmarks[27];
    const rightAnkle = landmarks[28];

    // Check elbow angle (should be around 90 degrees at bottom)
    const leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
    const rightElbowAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
    const avgElbowAngle = (leftElbowAngle + rightElbowAngle) / 2;

    if (avgElbowAngle < 70 || avgElbowAngle > 110) {
        feedback.push({
            isCorrect: false,
            message: `Elbow angle: ${avgElbowAngle.toFixed(0)}°. Aim for 90° at the bottom.`,
            severity: 'warning',
            bodyPart: 'elbows'
        });
    } else {
        feedback.push({
            isCorrect: true,
            message: 'Good elbow angle!',
            severity: 'good',
            bodyPart: 'elbows'
        });
    }

    // Check body alignment (shoulder-hip-ankle should be straight)
    const leftBodyAngle = calculateAngle(leftShoulder, leftHip, leftAnkle);
    const rightBodyAngle = calculateAngle(rightShoulder, rightHip, rightAnkle);
    const avgBodyAngle = (leftBodyAngle + rightBodyAngle) / 2;

    if (avgBodyAngle < 160 || avgBodyAngle > 200) {
        feedback.push({
            isCorrect: false,
            message: 'Keep your body straight! Avoid sagging hips or raising them too high.',
            severity: 'error',
            bodyPart: 'core'
        });
    } else {
        feedback.push({
            isCorrect: true,
            message: 'Excellent body alignment!',
            severity: 'good',
            bodyPart: 'core'
        });
    }

    return feedback;
}

// Squat form analysis
function analyzeSquat(landmarks: PoseLandmark[]): FormFeedback[] {
    const feedback: FormFeedback[] = [];

    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftKnee = landmarks[25];
    const rightKnee = landmarks[26];
    const leftAnkle = landmarks[27];
    const rightAnkle = landmarks[28];
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];

    // Check knee angle (should be around 90 degrees at bottom)
    const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
    const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);
    const avgKneeAngle = (leftKneeAngle + rightKneeAngle) / 2;

    if (avgKneeAngle > 120) {
        feedback.push({
            isCorrect: false,
            message: 'Go deeper! Aim for thighs parallel to ground.',
            severity: 'warning',
            bodyPart: 'knees'
        });
    } else if (avgKneeAngle < 70) {
        feedback.push({
            isCorrect: false,
            message: 'Don\'t go too deep - protect your knees!',
            severity: 'warning',
            bodyPart: 'knees'
        });
    } else {
        feedback.push({
            isCorrect: true,
            message: 'Perfect squat depth!',
            severity: 'good',
            bodyPart: 'knees'
        });
    }

    // Check if knees are tracking over toes (knee shouldn't go too far forward)
    const leftKneeToAnkle = leftKnee.x - leftAnkle.x;
    const rightKneeToAnkle = rightKnee.x - rightAnkle.x;

    if (Math.abs(leftKneeToAnkle) > 0.1 || Math.abs(rightKneeToAnkle) > 0.1) {
        feedback.push({
            isCorrect: false,
            message: 'Keep knees aligned with toes, don\'t let them cave inward!',
            severity: 'error',
            bodyPart: 'knees'
        });
    } else {
        feedback.push({
            isCorrect: true,
            message: 'Good knee tracking!',
            severity: 'good',
            bodyPart: 'knees'
        });
    }

    // Check back angle (should stay relatively upright)
    const avgHipY = (leftHip.y + rightHip.y) / 2;
    const avgShoulderY = (leftShoulder.y + rightShoulder.y) / 2;

    if (avgShoulderY > avgHipY + 0.2) {
        feedback.push({
            isCorrect: false,
            message: 'Keep your chest up and back straight!',
            severity: 'error',
            bodyPart: 'back'
        });
    } else {
        feedback.push({
            isCorrect: true,
            message: 'Great posture!',
            severity: 'good',
            bodyPart: 'back'
        });
    }

    return feedback;
}

// Plank form analysis
function analyzePlank(landmarks: PoseLandmark[]): FormFeedback[] {
    const feedback: FormFeedback[] = [];

    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftAnkle = landmarks[27];
    const rightAnkle = landmarks[28];

    // Check body alignment (should be straight line)
    const leftBodyAngle = calculateAngle(leftShoulder, leftHip, leftAnkle);
    const rightBodyAngle = calculateAngle(rightShoulder, rightHip, rightAnkle);
    const avgBodyAngle = (leftBodyAngle + rightBodyAngle) / 2;

    if (avgBodyAngle < 160 || avgBodyAngle > 200) {
        if (avgBodyAngle < 160) {
            feedback.push({
                isCorrect: false,
                message: 'Hips are sagging! Engage your core.',
                severity: 'error',
                bodyPart: 'core'
            });
        } else {
            feedback.push({
                isCorrect: false,
                message: 'Hips are too high! Lower them to align with shoulders.',
                severity: 'error',
                bodyPart: 'core'
            });
        }
    } else {
        feedback.push({
            isCorrect: true,
            message: 'Perfect plank form!',
            severity: 'good',
            bodyPart: 'core'
        });
    }

    // Check shoulder position (should be directly above elbows)
    const avgShoulderX = (leftShoulder.x + rightShoulder.x) / 2;
    const leftElbow = landmarks[13];
    const rightElbow = landmarks[14];
    const avgElbowX = (leftElbow.x + rightElbow.x) / 2;

    if (Math.abs(avgShoulderX - avgElbowX) > 0.05) {
        feedback.push({
            isCorrect: false,
            message: 'Position shoulders directly above elbows.',
            severity: 'warning',
            bodyPart: 'shoulders'
        });
    } else {
        feedback.push({
            isCorrect: true,
            message: 'Good shoulder alignment!',
            severity: 'good',
            bodyPart: 'shoulders'
        });
    }

    return feedback;
}

// General posture analysis
function analyzeGeneralPosture(landmarks: PoseLandmark[]): FormFeedback[] {
    const feedback: FormFeedback[] = [];

    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];

    // Check shoulder alignment
    const shoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y);
    if (shoulderDiff > 0.05) {
        feedback.push({
            isCorrect: false,
            message: 'Shoulders are uneven. Try to level them.',
            severity: 'warning',
            bodyPart: 'shoulders'
        });
    } else {
        feedback.push({
            isCorrect: true,
            message: 'Shoulders are level!',
            severity: 'good',
            bodyPart: 'shoulders'
        });
    }

    // Check hip alignment
    const hipDiff = Math.abs(leftHip.y - rightHip.y);
    if (hipDiff > 0.05) {
        feedback.push({
            isCorrect: false,
            message: 'Hips are uneven. Check your stance.',
            severity: 'warning',
            bodyPart: 'hips'
        });
    } else {
        feedback.push({
            isCorrect: true,
            message: 'Hips are level!',
            severity: 'good',
            bodyPart: 'hips'
        });
    }

    return feedback;
}

// Main analysis function
export function analyzePose(
    poseResults: PoseResults | null,
    exerciseType: ExerciseType
): FormFeedback[] {
    if (!poseResults || !poseResults.poseLandmarks || poseResults.poseLandmarks.length === 0) {
        return [{
            isCorrect: false,
            message: 'No pose detected. Make sure you\'re fully visible in the camera.',
            severity: 'error'
        }];
    }

    const landmarks = poseResults.poseLandmarks;

    switch (exerciseType) {
        case 'pushup':
            return analyzePushup(landmarks);
        case 'squat':
            return analyzeSquat(landmarks);
        case 'plank':
            return analyzePlank(landmarks);
        case 'general':
            return analyzeGeneralPosture(landmarks);
        default:
            return analyzeGeneralPosture(landmarks);
    }
}

// Get color for feedback severity
export function getFeedbackColor(severity: FormFeedback['severity']): string {
    switch (severity) {
        case 'good':
            return '#10b981'; // green
        case 'warning':
            return '#f59e0b'; // orange
        case 'error':
            return '#ef4444'; // red
        default:
            return '#6b7280'; // gray
    }
}
