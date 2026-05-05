'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
} from 'lucide-react';
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
import { cn } from '@/lib/utils';

const monthlyData = [
  { month: 'Jan', screened: 1234, jobReady: 876, flagged: 45 },
  { month: 'Feb', screened: 1456, jobReady: 1023, flagged: 38 },
  { month: 'Mar', screened: 1678, jobReady: 1189, flagged: 52 },
  { month: 'Apr', screened: 1890, jobReady: 1345, flagged: 41 },
  { month: 'May', screened: 2102, jobReady: 1498, flagged: 35 },
  { month: 'Jun', screened: 2314, jobReady: 1652, flagged: 48 },
];

const skillDistribution = [
  { skill: 'Construction', count: 3245, percentage: 28 },
  { skill: 'Manufacturing', count: 2890, percentage: 25 },
  { skill: 'Healthcare', count: 2156, percentage: 19 },
  { skill: 'Hospitality', count: 1823, percentage: 16 },
  { skill: 'Agriculture', count: 1456, percentage: 12 },
];

const districtPerformance = [
  { district: 'Dharwad', screened: 2456, successRate: 78.5 },
  { district: 'Belgaum', screened: 2134, successRate: 82.3 },
  { district: 'Hubli', screened: 1987, successRate: 75.8 },
  { district: 'Gadag', screened: 1654, successRate: 80.1 },
  { district: 'Haveri', screened: 1432, successRate: 77.9 },
];

export default function AnalyticsPage() {
  const stats = [
    {
      title: 'Total Screenings',
      value: '12,847',
      change: '+23.5%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Job Ready Rate',
      value: '71.2%',
      change: '+4.8%',
      trend: 'up',
      icon: CheckCircle2,
    },
    {
      title: 'Avg Processing Time',
      value: '4.2 min',
      change: '-12.3%',
      trend: 'down',
      icon: Clock,
    },
    {
      title: 'Integrity Flag Rate',
      value: '2.8%',
      change: '-0.5%',
      trend: 'down',
      icon: AlertTriangle,
    },
  ];

  const maxScreened = Math.max(...monthlyData.map((d) => d.screened));

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
              <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="mt-1 text-muted-foreground">
                Performance metrics and screening insights
              </p>
            </div>
            <Select defaultValue="30d">
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Grid */}
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
                          stat.trend === 'up' ? 'bg-success/10 text-success' : 'bg-success/10 text-success'
                        )}
                      >
                        {stat.trend === 'up' ? (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                          <TrendingDown className="mr-1 h-3 w-3" />
                        )}
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="mb-8 grid gap-6 lg:grid-cols-3">
            {/* Monthly Trend */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monthly Screening Trend
                  </CardTitle>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded bg-primary" />
                      <span className="text-muted-foreground">Screened</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded bg-success" />
                      <span className="text-muted-foreground">Job Ready</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-end gap-4">
                  {monthlyData.map((data, index) => (
                    <motion.div
                      key={data.month}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div
                          className="w-full rounded-t bg-primary transition-all"
                          style={{ height: `${(data.screened / maxScreened) * 200}px` }}
                        />
                        <div
                          className="w-full rounded-b bg-success transition-all"
                          style={{ height: `${(data.jobReady / maxScreened) * 200}px` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{data.month}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Skill Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillDistribution.map((skill, index) => (
                    <motion.div
                      key={skill.skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{skill.skill}</span>
                        <span className="text-muted-foreground">{skill.count.toLocaleString()}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.percentage}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* District Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                District Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {districtPerformance.map((district, index) => (
                  <motion.div
                    key={district.district}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-lg border p-4 text-center"
                  >
                    <p className="font-medium text-foreground">{district.district}</p>
                    <p className="mt-2 text-2xl font-bold text-primary">
                      {district.successRate.toFixed(1)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <div className="mt-3 border-t pt-3">
                      <p className="text-lg font-semibold text-foreground">
                        {district.screened.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Total Screened</p>
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
