'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronLeft, Clock, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { WebcamCapture } from '@/components/interview/WebcamCapture';
import { AudioVisualizer } from '@/components/interview/AudioVisualizer';
import { InstructionsOverlay } from '@/components/interview/InstructionsOverlay';
import { interviewQuestions } from '@/lib/mock-data';
import Link from 'next/link';

export default function CandidateFlowPage() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const question = interviewQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / interviewQuestions.length) * 100;

  // Timer effect
  useEffect(() => {
    if (showInstructions || assessmentComplete) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return question?.duration || 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showInstructions, currentQuestion, assessmentComplete, question?.duration]);

  // Simulate agent speaking pattern
  useEffect(() => {
    if (showInstructions || assessmentComplete) return;

    setIsAgentSpeaking(true);
    const speakingTimer = setTimeout(() => {
      setIsAgentSpeaking(false);
      setIsRecording(true);
    }, 4000);

    return () => clearTimeout(speakingTimer);
  }, [currentQuestion, showInstructions, assessmentComplete]);

  const handleNextQuestion = () => {
    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeRemaining(interviewQuestions[currentQuestion + 1].duration);
      setIsRecording(false);
    } else {
      setAssessmentComplete(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Mobile-First Container */}
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-4 py-3 backdrop-blur-sm">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm">Exit</span>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-400" />
            <span className="text-sm font-medium text-white">HireAlpha</span>
          </div>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </header>

        {/* Instructions Overlay */}
        <AnimatePresence>
          {showInstructions && (
            <InstructionsOverlay onStart={() => setShowInstructions(false)} />
          )}
        </AnimatePresence>

        {/* Assessment Complete Screen */}
        <AnimatePresence>
          {assessmentComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-1 flex-col items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/20"
              >
                <Shield className="h-10 w-10 text-success" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white">Assessment Complete</h2>
              <p className="mt-2 text-center text-slate-400">
                Your responses have been recorded and are being processed.
              </p>
              <Card className="mt-6 w-full border-slate-800 bg-slate-900">
                <CardContent className="p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Questions Answered</span>
                      <span className="font-medium text-white">{interviewQuestions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Integrity Checks</span>
                      <span className="font-medium text-success">Passed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estimated Result</span>
                      <span className="font-medium text-white">24-48 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Button asChild className="mt-6 w-full" size="lg">
                <Link href="/">Return to Home</Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Assessment Interface */}
        {!showInstructions && !assessmentComplete && (
          <div className="flex flex-1 flex-col">
            {/* Progress Section */}
            <div className="border-b border-slate-800 bg-slate-900/50 px-4 py-3">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  Question {currentQuestion + 1} of {interviewQuestions.length}
                </span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span className={`font-mono ${timeRemaining <= 10 ? 'text-destructive' : ''}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-1" />
            </div>

            {/* Question Display */}
            <div className="border-b border-slate-800 bg-slate-900/30 px-4 py-4">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <p className="text-lg font-medium text-white leading-relaxed">
                  {question?.questionKannada}
                </p>
                <p className="text-sm text-slate-500 italic">
                  {question?.questionEnglish}
                </p>
              </motion.div>
            </div>

            {/* Video Capture Area */}
            <div className="flex-1 p-4">
              <WebcamCapture />
            </div>

            {/* Audio Visualizer and Controls */}
            <div className="border-t border-slate-800 bg-slate-900/50 p-4 space-y-4">
              <AudioVisualizer
                isActive={isAgentSpeaking}
                label={isAgentSpeaking ? 'AI Agent Speaking' : 'Your Turn - Speak Now'}
              />

              {/* Recording Indicator */}
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 rounded-lg bg-destructive/10 py-2"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-destructive"></span>
                  </span>
                  <span className="text-sm font-medium text-destructive">Recording Response</span>
                </motion.div>
              )}

              {/* Next Question Button */}
              <Button
                onClick={handleNextQuestion}
                className="w-full"
                size="lg"
                disabled={isAgentSpeaking}
              >
                {currentQuestion < interviewQuestions.length - 1
                  ? 'Submit & Next Question'
                  : 'Complete Assessment'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
