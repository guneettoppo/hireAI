'use client';

import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MapPin,
  Briefcase,
  Volume2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Download
} from 'lucide-react';
import type { Candidate } from '@/lib/mock-data';
import { FitmentMatrix } from './FitmentMatrix';
import { cn } from '@/lib/utils';

interface CandidateReviewModalProps {
  candidate: Candidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CandidateReviewModal({
  candidate,
  open,
  onOpenChange,
}: CandidateReviewModalProps) {
  if (!candidate) return null;

  const getFitmentBadgeStyles = (status: Candidate['fitmentStatus']) => {
    switch (status) {
      case 'job-ready':
        return 'bg-success/10 text-success border-success/30';
      case 'near-ready':
        return 'bg-chart-1/10 text-chart-1 border-chart-1/30';
      case 'requires-training':
        return 'bg-warning/10 text-warning border-warning/30';
      case 'needs-assessment':
        return 'bg-muted text-muted-foreground border-border';
      case 'flagged':
        return 'bg-destructive/10 text-destructive border-destructive/30';
    }
  };

  const getIntegrityBadgeStyles = (status: Candidate['integrityStatus']) => {
    switch (status) {
      case 'verified':
        return 'bg-success/10 text-success border-success/30';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/30';
      case 'flagged':
        return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'pending':
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatFitmentStatus = (status: Candidate['fitmentStatus']) => {
    return status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{candidate.name}</DialogTitle>
              <p className="mt-1 font-mono text-sm text-muted-foreground">
                {candidate.id}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className={cn('border', getFitmentBadgeStyles(candidate.fitmentStatus))}
              >
                {formatFitmentStatus(candidate.fitmentStatus)}
              </Badge>
              <Badge
                variant="outline"
                className={cn('border capitalize', getIntegrityBadgeStyles(candidate.integrityStatus))}
              >
                {candidate.integrityStatus}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="p-6 pt-4 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">{candidate.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Skill:</span>
                <span className="font-medium">{candidate.skillCategory}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Audio SNR:</span>
                <span className="font-mono font-medium">{candidate.audioSNR}dB</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">District:</span>
                <span className="font-medium">{candidate.district}</span>
              </div>
            </div>

            <Separator />

            {/* Feature Vector Analysis */}
            <div>
              <FitmentMatrix scores={candidate.featureVector} />
            </div>

            <Separator />

            {/* Transcription Snippet */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium text-foreground">
                  Vosk/Whisper Transcription Snippet
                </h4>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-sm italic text-muted-foreground leading-relaxed">
                  &ldquo;{candidate.transcriptionSnippet}&rdquo;
                </p>
              </div>
            </div>

            <Separator />

            {/* Classification Reasons */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <h4 className="text-sm font-medium text-foreground">
                  Classification Reasons
                </h4>
              </div>
              <ul className="space-y-2">
                {candidate.classificationReasons.map((reason, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {reason}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Integrity Flags */}
            {candidate.integrityFlags.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <h4 className="text-sm font-medium text-foreground">
                      Integrity Flags
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {candidate.integrityFlags.map((flag, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg border border-destructive/30 bg-destructive/5 p-3"
                      >
                        <p className="text-sm text-destructive">{flag}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
              {candidate.fitmentStatus === 'job-ready' && (
                <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                  Approve Candidate
                </Button>
              )}
              {candidate.integrityStatus === 'flagged' && (
                <Button size="sm" variant="destructive">
                  Escalate for Review
                </Button>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
