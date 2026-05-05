'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Lightbulb, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InstructionsOverlayProps {
  onStart: () => void;
}

export function InstructionsOverlay({ onStart }: InstructionsOverlayProps) {
  const instructions = [
    {
      icon: Volume2,
      title: 'Speak Clearly in Kannada',
      description: 'Answer questions naturally in your preferred language. Our AI understands Kannada fluently.',
    },
    {
      icon: CheckCircle2,
      title: 'Keep Your Face Visible',
      description: 'Ensure your face is clearly visible within the camera frame throughout the assessment.',
    },
    {
      icon: Lightbulb,
      title: 'Good Lighting Required',
      description: 'Position yourself in a well-lit area. Avoid backlighting from windows.',
    },
    {
      icon: AlertCircle,
      title: 'Stable Connection',
      description: 'Use a stable internet connection. The system will pause if connection drops.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg rounded-2xl bg-card border border-border p-6 shadow-xl"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Before You Begin
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please review these guidelines for a successful assessment
          </p>
        </div>

        <div className="space-y-4">
          {instructions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 rounded-lg bg-secondary/50 p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Button onClick={onStart} className="w-full" size="lg">
            I Understand, Begin Assessment
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            By proceeding, you consent to video and audio recording for assessment purposes.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
