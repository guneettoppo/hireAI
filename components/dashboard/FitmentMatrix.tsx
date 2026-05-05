'use client';

import { motion } from 'framer-motion';
import type { FeatureVectorScore } from '@/lib/mock-data';

interface FitmentMatrixProps {
  scores: FeatureVectorScore;
}

export function FitmentMatrix({ scores }: FitmentMatrixProps) {
  const dimensions = [
    { key: 'relevance', label: 'Relevance', value: scores.relevance },
    { key: 'clarity', label: 'Clarity', value: scores.clarity },
    { key: 'confidence', label: 'Confidence', value: scores.confidence },
    { key: 'technicalAccuracy', label: 'Technical Accuracy', value: scores.technicalAccuracy },
    { key: 'communicationSkill', label: 'Communication', value: scores.communicationSkill },
    { key: 'problemSolving', label: 'Problem Solving', value: scores.problemSolving },
    { key: 'safetyAwareness', label: 'Safety Awareness', value: scores.safetyAwareness },
    { key: 'toolKnowledge', label: 'Tool Knowledge', value: scores.toolKnowledge },
  ];

  const getScoreColor = (value: number) => {
    if (value >= 0.75) return 'bg-success';
    if (value >= 0.5) return 'bg-warning';
    return 'bg-destructive';
  };

  const getScoreTextColor = (value: number) => {
    if (value >= 0.75) return 'text-success';
    if (value >= 0.5) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground">128-Dimension Feature Vector Analysis</h4>
      <div className="grid gap-3">
        {dimensions.map((dim, index) => (
          <motion.div
            key={dim.key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="space-y-1"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{dim.label}</span>
              <span className={`font-mono font-medium ${getScoreTextColor(dim.value)}`}>
                {dim.value.toFixed(2)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${dim.value * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`h-full rounded-full ${getScoreColor(dim.value)}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Aggregate Score */}
      <div className="mt-6 rounded-lg bg-secondary/50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Aggregate Fitment Score</span>
          <span className={`text-2xl font-bold ${getScoreTextColor(
            Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length
          )}`}>
            {(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length).toFixed(2)}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Weighted average across all 128 feature dimensions
        </p>
      </div>
    </div>
  );
}
