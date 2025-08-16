import * as React from "react";

interface ProgressCircleProps extends React.SVGProps<SVGSVGElement> {
    progress: number; // A value between 0 and 1
    size?: number;
}

export function ProgressCircle({
    progress,
    size = 24,
    ...props
}: ProgressCircleProps) {
    const strokeWidth = 3;
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - progress * circumference;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} {...props}>
            <circle
                className="text-muted"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx={center}
                cy={center}
            />
            <circle
                className="text-primary"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                r={radius}
                cx={center}
                cy={center}
                style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                    transition: "stroke-dashoffset 0.3s ease-in-out",
                }}
            />
        </svg>
    );
}