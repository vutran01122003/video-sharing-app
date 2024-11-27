import React from "react";
import Svg, { Circle } from "react-native-svg";

const CircularProgressBar = ({ progress }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    return (
        <Svg width={120} height={120}>
            <Circle
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke="#EF5350"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                transform="rotate(-90 60 60)"
            />
        </Svg>
    );
};

export default CircularProgressBar;
