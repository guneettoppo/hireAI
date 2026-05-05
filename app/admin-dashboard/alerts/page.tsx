'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Shield,
  Eye,
  Clock,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Camera,
  Mic,
  User,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sidebar } from '@/components/layout/Sidebar';
import { integrityAlerts, type IntegrityAlert } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const alertTypeIcons: Record<string, typeof AlertTriangle> = {
  'replay-attack': RotateCcw,
  'face-occlusion': User,
  'lip-sync-mismatch': Mic,
  'multi-face': User,
  'audio-injection': Mic,
  'deepfake-detected': Camera,
};

const severityColors = {
  critical: 'bg-destructive text-destructive-foreground',
  high: 'bg-warning text-warning-foreground',
  medium: 'bg-chart-1 text-white',
  low: 'bg-muted text-muted-foreground',
};

const statusColors = {
  new: 'bg-destructive/10 text-destructive border-destructive/30',
  reviewing: 'bg-warning/10 text-warning border-warning/30',
  resolved: 'bg-success/10 text-success border-success/30',
  dismissed: 'bg-muted text-muted-foreground border-border',
};

export default function IntegrityAlertsPage() {
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState<IntegrityAlert | null>(null);

  // Add status to alerts for demo
  const alertsWithStatus = integrityAlerts.map((alert, i) => ({
    ...alert,
    status: i % 4 === 0 ? 'new' : i % 4 === 1 ? 'reviewing' : i % 4 === 2 ? 'resolved' : 'dismissed',
  })) as (IntegrityAlert & { status: 'new' | 'reviewing' | 'resolved' | 'dismissed' })[];

  const filteredAlerts = alertsWithStatus.filter((alert) => {
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSeverity && matchesStatus;
  });

  const stats = [
    {
      title: 'Critical Alerts',
      value: alertsWithStatus.filter((a) => a.severity === 'critical').length,
      icon: AlertCircle,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
    },
    {
      title: 'High Priority',
      value: alertsWithStatus.filter((a) => a.severity === 'high').length,
      icon: AlertTriangle,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      title: 'Pending Review',
      value: alertsWithStatus.filter((a) => a.status === 'new' || a.status === 'reviewing').length,
      icon: Eye,
      color: 'text-chart-1',
      bg: 'bg-chart-1/10',
    },
    {
      title: 'Resolved Today',
      value: alertsWithStatus.filter((a) => a.status === 'resolved').length,
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-success/10',
    },
  ];

  const formatAlertType = (type: string) => {
    return type.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Integrity Alerts</h1>
            <p className="mt-1 text-muted-foreground">
              Monitor and respond to fraud detection alerts in real-time
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', stat.bg)}>
                        <stat.icon className={cn('h-6 w-6', stat.color)} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-4">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Alerts Grid */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Alerts List */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Active Alerts
                    <Badge variant="secondary" className="ml-auto">
                      {filteredAlerts.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-[600px] space-y-3 overflow-y-auto p-4">
                  {filteredAlerts.map((alert, index) => {
                    const Icon = alertTypeIcons[alert.type] || AlertTriangle;
                    return (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          'cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md',
                          selectedAlert?.id === alert.id && 'border-primary ring-2 ring-primary/20'
                        )}
                        onClick={() => setSelectedAlert(alert)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={cn(
                                'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                                alert.severity === 'critical'
                                  ? 'bg-destructive/10'
                                  : alert.severity === 'high'
                                  ? 'bg-warning/10'
                                  : 'bg-muted'
                              )}
                            >
                              <Icon
                                className={cn(
                                  'h-5 w-5',
                                  alert.severity === 'critical'
                                    ? 'text-destructive'
                                    : alert.severity === 'high'
                                    ? 'text-warning'
                                    : 'text-muted-foreground'
                                )}
                              />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {formatAlertType(alert.type)}
                              </p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {alert.description}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <span className="font-mono text-xs text-muted-foreground">
                                  {alert.candidateId}
                                </span>
                                <span className="text-muted-foreground">-</span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {alert.timestamp}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={cn('text-xs', severityColors[alert.severity])}>
                              {alert.severity}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={cn('text-xs capitalize', statusColors[alert.status])}
                            >
                              {alert.status}
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Alert Details */}
            <div>
              <Card className="sticky top-6 h-[700px]">
                <CardHeader className="border-b">
                  <CardTitle>Alert Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {selectedAlert ? (
                    <motion.div
                      key={selectedAlert.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <Badge className={cn('text-sm', severityColors[selectedAlert.severity])}>
                          {selectedAlert.severity.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {selectedAlert.timestamp}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {formatAlertType(selectedAlert.type)}
                        </h3>
                        <p className="mt-2 text-muted-foreground">{selectedAlert.description}</p>
                      </div>

                      <div className="rounded-lg bg-muted/50 p-4">
                        <h4 className="text-sm font-medium text-foreground">Candidate Info</h4>
                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Candidate ID</span>
                            <span className="font-mono">{selectedAlert.candidateId}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Confidence Score</span>
                            <span className="font-medium">
                              {(selectedAlert.confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Frame Index</span>
                            <span className="font-mono">{selectedAlert.frameIndex}</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-dashed border-border p-8 text-center">
                        <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Video frame capture placeholder
                        </p>
                        <p className="text-xs text-muted-foreground">Frame #{selectedAlert.frameIndex}</p>
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Mark Resolved
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <XCircle className="mr-2 h-4 w-4" />
                          Dismiss
                        </Button>
                      </div>

                      <Button variant="secondary" className="w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        View Full Assessment
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <Shield className="h-16 w-16 text-muted-foreground/30" />
                      <p className="mt-4 text-muted-foreground">
                        Select an alert to view details
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
