import React, { useState, useEffect } from "react";
import { useDrag } from "@use-gesture/react";

const CircularInput = ({
  value,
  onChange,
  label,
  maxValue,
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
  maxValue: number;
}) => {
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const angle = (value / maxValue) * 2 * Math.PI - Math.PI / 2;
    const x = normalizedRadius * Math.cos(angle) + radius;
    const y = normalizedRadius * Math.sin(angle) + radius;
    setPosition({ x, y });
  }, [value, normalizedRadius, radius, maxValue]);

  const bind = useDrag(({ offset: [ox, oy] }) => {
    const angle = Math.atan2(oy - radius, ox - radius) + Math.PI / 2;
    const newValue =
      (((angle + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2)) * maxValue;
    onChange(Math.round(newValue));  // Redondea el valor a un número entero
  });

  const strokeDashoffset = circumference - (value / maxValue) * circumference;

  return (
    <div className="p-4 flex flex-col justify-center items-center ">
      <svg width={radius * 2} height={radius * 2} className="z-50">
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="transparent"
          stroke="white"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="transparent"
          stroke="red"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
        <circle
          {...bind()}
          cx={position.x}
          cy={position.y}
          r={strokeWidth}
          fill="red"
          className="cursor-pointer"
        />
      </svg>
      <div className="text-white -my-24 z-0 flex flex-col items-center justify-center">
        <h2>{label}</h2>
        <p>{Math.round(value)}</p>
      </div>
    </div>
  );
};

export default CircularInput;
