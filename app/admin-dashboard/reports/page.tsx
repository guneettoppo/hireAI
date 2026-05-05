'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
  File,
  MoreHorizontal,
  Eye,
  Trash2,
  Share2,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sidebar } from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

const reports = [
  {
    id: 'RPT-001',
    name: 'Monthly Screening Summary - May 2026',
    type: 'summary',
    format: 'PDF',
    generatedAt: '2 hours ago',
    size: '2.4 MB',
    status: 'ready',
  },
  {
    id: 'RPT-002',
    name: 'Integrity Flag Analysis Q2 2026',
    type: 'analysis',
    format: 'XLSX',
    generatedAt: '1 day ago',
    size: '1.8 MB',
    status: 'ready',
  },
  {
    id: 'RPT-003',
    name: 'District-wise Performance Report',
    type: 'performance',
    format: 'PDF',
    generatedAt: '2 days ago',
    size: '3.1 MB',
    status: 'ready',
  },
  {
    id: 'RPT-004',
    name: 'Skill Gap Assessment - Construction',
    type: 'assessment',
    format: 'PDF',
    generatedAt: '3 days ago',
    size: '1.2 MB',
    status: 'ready',
  },
  {
    id: 'RPT-005',
    name: 'Weekly Candidate Pipeline',
    type: 'pipeline',
    format: 'XLSX',
    generatedAt: 'Generating...',
    size: '-',
    status: 'generating',
  },
  {
    id: 'RPT-006',
    name: 'Audit Trail - April 2026',
    type: 'audit',
    format: 'PDF',
    generatedAt: '1 week ago',
    size: '5.6 MB',
    status: 'ready',
  },
];

const reportTemplates = [
  {
    name: 'Daily Summary',
    description: 'Overview of daily screening activity',
    icon: FileText,
  },
  {
    name: 'Integrity Report',
    description: 'Detailed fraud detection analysis',
    icon: FileText,
  },
  {
    name: 'Candidate Export',
    description: 'Export candidate data to spreadsheet',
    icon: FileSpreadsheet,
  },
  {
    name: 'Custom Report',
    description: 'Build a custom report with filters',
    icon: File,
  },
];

const typeColors: Record<string, string> = {
  summary: 'bg-primary/10 text-primary',
  analysis: 'bg-chart-1/10 text-chart-1',
  performance: 'bg-success/10 text-success',
  assessment: 'bg-warning/10 text-warning',
  pipeline: 'bg-muted text-muted-foreground',
  audit: 'bg-destructive/10 text-destructive',
};

export default function ReportsPage() {
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredReports = reports.filter(
    (report) => typeFilter === 'all' || report.type === typeFilter
  );

  return (
    <div className="flex h-screen bg-background">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reports</h1>
              <p className="mt-1 text-muted-foreground">
                Generate and download screening reports
              </p>
            </div>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate New Report
            </Button>
          </div>

          {/* Quick Generate */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Quick Generate</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {reportTemplates.map((template, index) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <template.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-4 font-medium text-foreground">{template.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{template.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Reports */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Recent Reports</CardTitle>
                <div className="flex gap-2">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="summary">Summary</SelectItem>
                      <SelectItem value="analysis">Analysis</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                      <SelectItem value="audit">Audit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 hover:bg-accent"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-lg',
                          report.format === 'PDF' ? 'bg-destructive/10' : 'bg-success/10'
                        )}
                      >
                        {report.format === 'PDF' ? (
                          <FileText
                            className={cn(
                              'h-5 w-5',
                              report.format === 'PDF' ? 'text-destructive' : 'text-success'
                            )}
                          />
                        ) : (
                          <FileSpreadsheet className="h-5 w-5 text-success" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{report.name}</p>
                        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {report.generatedAt}
                          </span>
                          {report.size !== '-' && (
                            <span className="text-xs">{report.size}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className={cn('capitalize', typeColors[report.type])}>
                        {report.type}
                      </Badge>
                      {report.status === 'ready' ? (
                        <Badge variant="outline" className="border-success/30 bg-success/10 text-success">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Ready
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-border bg-muted text-muted-foreground">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="mr-1 h-3 w-3 rounded-full border-2 border-muted-foreground border-t-transparent"
                          />
                          Generating
                        </Badge>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem disabled={report.status !== 'ready'}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
