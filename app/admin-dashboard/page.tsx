'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  CheckCircle2,
  GraduationCap,
  AlertTriangle,
  Search,
  Filter,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sidebar } from '@/components/layout/Sidebar';
import { IntegrityAlertFeed } from '@/components/dashboard/IntegrityAlertFeed';
import { CandidateReviewModal } from '@/components/dashboard/CandidateReviewModal';
import {
  candidates,
  integrityAlerts,
  dashboardStats,
  skillCategories,
  type Candidate,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [skillFilter, setSkillFilter] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    {
      title: 'Total Screened',
      value: dashboardStats.totalScreened.toLocaleString(),
      icon: Users,
      change: '+12.3%',
      changeType: 'positive' as const,
    },
    {
      title: 'Job Ready',
      value: dashboardStats.jobReady.toLocaleString(),
      subtitle: 'Score > 0.75',
      icon: CheckCircle2,
      change: '+8.1%',
      changeType: 'positive' as const,
    },
    {
      title: 'Requires Training',
      value: dashboardStats.requiresTraining.toLocaleString(),
      icon: GraduationCap,
      change: '-2.4%',
      changeType: 'neutral' as const,
    },
    {
      title: 'Integrity Flags',
      value: dashboardStats.integrityFlags.toLocaleString(),
      icon: AlertTriangle,
      change: '-5.6%',
      changeType: 'positive' as const,
    },
  ];

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

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSkill = skillFilter === 'All Categories' || candidate.skillCategory === skillFilter;
    const matchesSearch =
      searchQuery === '' ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSkill && matchesSearch;
  });

  const handleRowClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">District Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Dharwad Division - Real-time candidate screening overview
            </p>
          </div>

          {/* Stats Row */}
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
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge
                        variant="secondary"
                        className={cn(
                          'text-xs',
                          stat.changeType === 'positive' && 'bg-success/10 text-success',
                          stat.changeType === 'neutral' && 'bg-muted text-muted-foreground'
                        )}
                      >
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">
                        {stat.title}
                        {stat.subtitle && (
                          <span className="ml-1 text-xs opacity-60">({stat.subtitle})</span>
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Content - Split View */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Candidates Table - Left Panel */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="border-b">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle>Recent Candidates</CardTitle>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search candidates..."
                          className="pl-9 w-full sm:w-[200px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select value={skillFilter} onValueChange={setSkillFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <Filter className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Filter by skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {skillCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Candidate ID</TableHead>
                          <TableHead className="hidden sm:table-cell">Location</TableHead>
                          <TableHead className="hidden md:table-cell">
                            <div className="flex items-center gap-1">
                              Audio SNR
                              <ChevronDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead>Fitment Status</TableHead>
                          <TableHead>Integrity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCandidates.map((candidate, index) => (
                          <motion.tr
                            key={candidate.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="cursor-pointer transition-colors hover:bg-accent"
                            onClick={() => handleRowClick(candidate)}
                          >
                            <TableCell>
                              <div>
                                <p className="font-medium text-foreground">{candidate.name}</p>
                                <p className="font-mono text-xs text-muted-foreground">
                                  {candidate.id}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <div>
                                <p className="text-foreground">{candidate.location}</p>
                                <p className="text-xs text-muted-foreground">{candidate.district}</p>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <span className="font-mono text-sm">
                                {candidate.audioSNR.toFixed(1)}dB
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={cn('border', getFitmentBadgeStyles(candidate.fitmentStatus))}
                              >
                                {formatFitmentStatus(candidate.fitmentStatus)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={cn('border capitalize', getIntegrityBadgeStyles(candidate.integrityStatus))}
                              >
                                {candidate.integrityStatus}
                              </Badge>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {filteredCandidates.length === 0 && (
                    <div className="py-12 text-center">
                      <p className="text-muted-foreground">No candidates match your filters</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Integrity Alert Feed - Right Panel */}
            <div className="lg:col-span-1">
              <Card className="h-[600px]">
                <CardContent className="h-full p-4">
                  <IntegrityAlertFeed alerts={integrityAlerts} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Candidate Review Modal */}
      <CandidateReviewModal
        candidate={selectedCandidate}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
