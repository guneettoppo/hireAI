'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield,
  Languages,
  ScanFace,
  BarChart3,
  ArrowRight,
  Smartphone,
  Cpu,
  CheckCircle2,
  Users,
  Building2,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';

export default function LandingPage() {
  const features = [
    {
      icon: Languages,
      title: 'Multilingual Speech Pipelines',
      description: 'Native Kannada speech recognition with Vosk and Whisper integration. Seamless code-switching support for regional dialect variations.',
      stats: '12+ Languages Supported',
    },
    {
      icon: ScanFace,
      title: 'Deepfake and Liveness Detection',
      description: 'Advanced anti-spoofing with eye-blink analysis, lip-sync verification, and replay attack detection using audio phase drift analysis.',
      stats: '99.2% Detection Accuracy',
    },
    {
      icon: BarChart3,
      title: 'Automated Fitment Output',
      description: '128-dimension feature vector classification with 5-tier fitment scoring. Real-time assessment with explainable AI outputs.',
      stats: '< 3s Processing Time',
    },
  ];

  const techStack = [
    { label: 'Mobile Frontend', icon: Smartphone, description: 'Progressive Web App' },
    { label: 'Assessment Engine', icon: Cpu, description: 'ML-Powered Analysis' },
    { label: 'Classification', icon: BarChart3, description: 'Real-time Scoring' },
  ];

  const metrics = [
    { value: '2.8M+', label: 'Candidates Screened' },
    { value: '156', label: 'Districts Covered' },
    { value: '99.2%', label: 'Fraud Detection Rate' },
    { value: '< 48h', label: 'Assessment Turnaround' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Government-Grade Security
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Scalable Video Screening.{' '}
              <span className="text-primary">Fraud Resistant.</span>{' '}
              Kannada Native.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty">
              HireAlpha AI transforms blue-collar government screening with Kannada-first video assessments, 
              real-time integrity verification, and automated fitment classification at scale.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="gap-2">
                <Link href="/candidate-flow">
                  Start Candidate Interview
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/admin-dashboard">Access District Admin</Link>
              </Button>
            </div>
          </motion.div>

          {/* Metrics Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {metrics.map((metric, index) => (
              <div key={metric.label} className="text-center sm:text-left">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-3xl font-bold text-foreground"
                >
                  {metric.value}
                </motion.p>
                <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Grid - Bento Style */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Core Technology Pillars
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Built for scale, designed for integrity. Our three-pillar approach ensures 
              comprehensive assessment with fraud-resistant verification.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-border bg-card transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                      <span className="text-xs font-medium text-success">
                        {feature.stats}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Architecture Flow */}
      <section className="border-b border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              System Architecture
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              End-to-end assessment pipeline from mobile capture to classification output
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {techStack.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <Card className="border-border bg-card">
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                      <item.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.label}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
                {index < techStack.length - 1 && (
                  <div className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                    <ArrowRight className="h-6 w-6 text-muted-foreground/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Deployed Statewide</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Active across 156 districts with 2,400+ assessment centers processing 
                  50,000+ daily screenings.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Government Certified</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Compliant with STQC guidelines, GIGW standards, and state 
                  e-governance frameworks.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Data Sovereignty</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  All data processed and stored within Indian sovereign cloud 
                  infrastructure with end-to-end encryption.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-primary-foreground">
                Ready to transform your screening process?
              </h2>
              <p className="mt-2 text-primary-foreground/80">
                Deploy HireAlpha AI across your district in under 48 hours.
              </p>
            </div>
            <div className="flex gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/candidate-flow">Try Demo Interview</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">HireAlpha AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Kannada-First Video Integrity and Fitment Engine for Government Screening
            </p>
            <p className="text-sm text-muted-foreground">
              Built for Karnataka State Government
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
