'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sidebar } from '@/components/layout/Sidebar';
import { CandidateReviewModal } from '@/components/dashboard/CandidateReviewModal';
import { candidates, skillCategories, type Candidate } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function CandidatesPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [skillFilter, setSkillFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    return status.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSkill = skillFilter === 'All Categories' || candidate.skillCategory === skillFilter;
    const matchesStatus = statusFilter === 'all' || candidate.fitmentStatus === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSkill && matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

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
              <h1 className="text-2xl font-bold text-foreground">All Candidates</h1>
              <p className="mt-1 text-muted-foreground">
                Manage and review all candidate profiles and assessments
              </p>
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, ID, or location..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={skillFilter} onValueChange={setSkillFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Skill Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Fitment Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="job-ready">Job Ready</SelectItem>
                      <SelectItem value="near-ready">Near Ready</SelectItem>
                      <SelectItem value="requires-training">Requires Training</SelectItem>
                      <SelectItem value="needs-assessment">Needs Assessment</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>
                  Candidates{' '}
                  <span className="text-sm font-normal text-muted-foreground">
                    ({filteredCandidates.length} total)
                  </span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Skill Category</TableHead>
                      <TableHead>Audio SNR</TableHead>
                      <TableHead>Fitment Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Integrity</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCandidates.map((candidate, index) => (
                      <motion.tr
                        key={candidate.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className="cursor-pointer transition-colors hover:bg-accent"
                        onClick={() => handleRowClick(candidate)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                              {candidate.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{candidate.name}</p>
                              <p className="font-mono text-xs text-muted-foreground">
                                {candidate.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span>{candidate.location}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{candidate.district}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{candidate.skillCategory}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-mono text-sm">
                            {candidate.audioSNR.toFixed(1)}dB
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                              <div
                                className={cn(
                                  'h-full rounded-full',
                                  candidate.fitmentScore >= 0.75
                                    ? 'bg-success'
                                    : candidate.fitmentScore >= 0.5
                                    ? 'bg-warning'
                                    : 'bg-destructive'
                                )}
                                style={{ width: `${candidate.fitmentScore * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {(candidate.fitmentScore * 100).toFixed(0)}%
                            </span>
                          </div>
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
                            className={cn(
                              'border capitalize',
                              getIntegrityBadgeStyles(candidate.integrityStatus)
                            )}
                          >
                            {candidate.integrityStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleRowClick(candidate)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="mr-2 h-4 w-4" />
                                Call Candidate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                Schedule Follow-up
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between border-t px-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, filteredCandidates.length)} of{' '}
                  {filteredCandidates.length} candidates
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <CandidateReviewModal
        candidate={selectedCandidate}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
