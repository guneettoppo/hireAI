'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Shield, RefreshCw, Eye, Volume2, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { IntegrityAlert } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface IntegrityAlertFeedProps {
  alerts: IntegrityAlert[];
}

export function IntegrityAlertFeed({ alerts }: IntegrityAlertFeedProps) {
  const getAlertIcon = (type: IntegrityAlert['alertType']) => {
    switch (type) {
      case 'replay-attack':
        return RefreshCw;
      case 'duplicate-face':
        return Users;
      case 'audio-anomaly':
        return Volume2;
      case 'face-occlusion':
        return Eye;
      case 'blink-anomaly':
        return Eye;
      case 'lip-sync-mismatch':
        return Volume2;
      default:
        return AlertTriangle;
    }
  };

  const getSeverityStyles = (severity: IntegrityAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/10 border-destructive/30 text-destructive';
      case 'high':
        return 'bg-warning/10 border-warning/30 text-warning';
      case 'medium':
        return 'bg-muted border-border text-muted-foreground';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Integrity Alert Feed</h3>
        </div>
        <Badge variant="secondary" className="text-xs">
          {alerts.length} Active
        </Badge>
      </div>

      <ScrollArea className="flex-1 pt-3">
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const AlertIcon = getAlertIcon(alert.alertType);
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'rounded-lg border p-3 transition-colors hover:bg-accent/50',
                  getSeverityStyles(alert.severity)
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AlertIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{alert.description}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          'ml-2 text-[10px] uppercase',
                          alert.severity === 'critical' && 'border-destructive/50 text-destructive',
                          alert.severity === 'high' && 'border-warning/50 text-warning',
                          alert.severity === 'medium' && 'border-border text-muted-foreground'
                        )}
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="font-mono text-[10px] opacity-80">
                      {alert.technicalDetails}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] opacity-60">
                        {alert.candidateId}
                      </span>
                      <span className="text-[10px] opacity-60">
                        {formatTime(alert.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
