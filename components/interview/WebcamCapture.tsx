'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Video, VideoOff, Mic, MicOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadge {
  label: string;
  status: 'good' | 'warning' | 'error';
}

export function WebcamCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [statusBadges, setStatusBadges] = useState<StatusBadge[]>([
    { label: 'Face Present', status: 'good' },
    { label: 'Network Stable', status: 'good' },
    { label: 'Lighting Good', status: 'good' },
  ]);

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusBadges((prev) => {
        const newBadges = [...prev];
        const randomIndex = Math.floor(Math.random() * newBadges.length);
        const statuses: ('good' | 'warning' | 'error')[] = ['good', 'good', 'good', 'warning'];
        newBadges[randomIndex] = {
          ...newBadges[randomIndex],
          status: statuses[Math.floor(Math.random() * statuses.length)],
        };
        return newBadges;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Draw animated webcam simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let frame = 0;

    const animate = () => {
      frame++;
      
      // Background
      ctx.fillStyle = isVideoOn ? '#1a1a2e' : '#0f0f1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (isVideoOn) {
        // Simulated face outline
        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.ellipse(
          canvas.width / 2,
          canvas.height / 2 - 20,
          80 + Math.sin(frame / 30) * 2,
          100 + Math.sin(frame / 30) * 2,
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
        ctx.setLineDash([]);

        // Scanning line effect
        const scanY = (frame * 2) % canvas.height;
        const gradient = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, 'rgba(79, 70, 229, 0.3)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, scanY - 20, canvas.width, 40);

        // Corner markers
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        const corners = [
          { x: 60, y: 40 },
          { x: canvas.width - 60, y: 40 },
          { x: 60, y: canvas.height - 40 },
          { x: canvas.width - 60, y: canvas.height - 40 },
        ];

        corners.forEach((corner, i) => {
          ctx.beginPath();
          if (i === 0) {
            ctx.moveTo(corner.x, corner.y + 20);
            ctx.lineTo(corner.x, corner.y);
            ctx.lineTo(corner.x + 20, corner.y);
          } else if (i === 1) {
            ctx.moveTo(corner.x - 20, corner.y);
            ctx.lineTo(corner.x, corner.y);
            ctx.lineTo(corner.x, corner.y + 20);
          } else if (i === 2) {
            ctx.moveTo(corner.x, corner.y - 20);
            ctx.lineTo(corner.x, corner.y);
            ctx.lineTo(corner.x + 20, corner.y);
          } else {
            ctx.moveTo(corner.x - 20, corner.y);
            ctx.lineTo(corner.x, corner.y);
            ctx.lineTo(corner.x, corner.y - 20);
          }
          ctx.stroke();
        });

        // Recording indicator
        ctx.fillStyle = frame % 60 < 30 ? '#ef4444' : 'transparent';
        ctx.beginPath();
        ctx.arc(canvas.width - 30, 30, 8, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Video off state
        ctx.fillStyle = '#4f46e5';
        ctx.font = '14px Geist, system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Camera Paused', canvas.width / 2, canvas.height / 2);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isVideoOn]);

  const getStatusColor = (status: StatusBadge['status']) => {
    switch (status) {
      case 'good':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'error':
        return 'bg-destructive/10 text-destructive border-destructive/20';
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">
      {/* Video Feed */}
      <div className="relative aspect-[3/4] w-full">
        <canvas
          ref={canvasRef}
          width={400}
          height={533}
          className="h-full w-full object-cover"
        />
        <video
          ref={videoRef}
          className="hidden"
          autoPlay
          playsInline
          muted
        />

        {/* WebRTC Connection Status */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
          </span>
          <span className="text-xs font-medium text-white">WebRTC Connected</span>
        </motion.div>

        {/* Status Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
          {statusBadges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Badge
                variant="outline"
                className={cn(
                  'border bg-black/30 backdrop-blur-sm transition-colors',
                  getStatusColor(badge.status)
                )}
              >
                {badge.label}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 border-t border-slate-800 bg-slate-900/95 p-4">
        <Button
          variant={isVideoOn ? 'secondary' : 'destructive'}
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={() => setIsVideoOn(!isVideoOn)}
        >
          {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        <Button
          variant={isAudioOn ? 'secondary' : 'destructive'}
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={() => setIsAudioOn(!isAudioOn)}
        >
          {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-12 w-12 rounded-full"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
