'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

interface AudioVisualizerProps {
  isActive?: boolean;
  label?: string;
}

export function AudioVisualizer({ isActive = true, label = 'AI Agent Speaking' }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bars, setBars] = useState<number[]>(Array(32).fill(0.1));

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setBars(
        Array(32)
          .fill(0)
          .map(() => 0.1 + Math.random() * 0.9)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const barWidth = width / bars.length - 2;

    ctx.clearRect(0, 0, width, height);

    bars.forEach((value, index) => {
      const barHeight = value * height * 0.8;
      const x = index * (barWidth + 2) + 1;
      const y = (height - barHeight) / 2;

      // Create gradient
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, '#4f46e5');
      gradient.addColorStop(1, '#6366f1');

      ctx.fillStyle = isActive ? gradient : '#64748b';
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 2);
      ctx.fill();
    });
  }, [bars, isActive]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 rounded-xl bg-card border border-border p-4"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <Volume2 className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">
          {isActive ? 'Processing Kannada speech...' : 'Waiting for response...'}
        </p>
      </div>
      <canvas
        ref={canvasRef}
        width={128}
        height={40}
        className="h-10 w-32"
      />
    </motion.div>
  );
}
