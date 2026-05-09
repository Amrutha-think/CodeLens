'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TextEffect } from '@/components/ui/text-effect';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { HeroHeader } from './header';
import LightRays from './LightRays';
import { motion, AnimatePresence } from 'motion/react';

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
};

export default function HeroSection() {
    const [isLaunching, setIsLaunching] = useState(false);
    const router = useRouter();

    const handleLaunch = () => {
        setIsLaunching(true);
        // Wait for the animation to complete before navigating
        setTimeout(() => {
            router.push('/chatbot');
        }, 2200);
    };

    return (
        <div className="relative min-h-screen">
            <AnimatePresence mode="wait">
                {!isLaunching ? (
                    <motion.div
                        key="hero-content"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.8 } }}
                        className="relative"
                    >
                        <HeroHeader />
                        <main className="relative overflow-hidden">
                            <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[600px] w-full">
                                <LightRays
                                    raysOrigin="top-center"
                                    raysColor="#a855f7"
                                    raysSpeed={1}
                                    lightSpread={0.5}
                                    rayLength={3}
                                    followMouse={true}
                                    mouseInfluence={0.1}
                                    noiseAmount={0}
                                    distortion={0}
                                    className="custom-rays"
                                    pulsating={false}
                                    fadeDistance={1}
                                    saturation={1}
                                />
                            </div>
                            <div
                                aria-hidden
                                className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block">
                                <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,var(--color-primary)_0,transparent_50%,transparent_80%)] opacity-10 animate-float" />
                                <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-accent)_0,transparent_80%,transparent_100%)] [translate:5%_-50%] opacity-10" />
                                <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-primary)_0,transparent_80%,transparent_100%)] opacity-10 animate-float" style={{ animationDelay: '2s' }} />
                            </div>
                            <section>
                                <div className="relative pt-24 md:pt-36">
                                    <AnimatedGroup
                                        variants={{
                                            container: {
                                                visible: {
                                                    transition: {
                                                        delayChildren: 1,
                                                    },
                                                },
                                            },
                                            item: {
                                                hidden: {
                                                    opacity: 0,
                                                    y: 20,
                                                },
                                                visible: {
                                                    opacity: 1,
                                                    y: 0,
                                                    transition: {
                                                        type: 'spring' as const,
                                                        bounce: 0.3,
                                                        duration: 2,
                                                    },
                                                },
                                            },
                                        }}
                                        className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32">
                                        <Image
                                            src="https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120"
                                            alt="background"
                                            className="hidden size-full dark:block"
                                            width="3276"
                                            height="4095"
                                        />
                                    </AnimatedGroup>

                                    <div
                                        aria-hidden
                                        className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
                                    />

                                    <div className="mx-auto max-w-7xl px-6">
                                        <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                            <TextEffect
                                                preset="fade-in-blur"
                                                speedSegment={0.3}
                                                as="h1"
                                                className="mx-auto mt-8 max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                                                Smarter Code Reviews for Modern Developers
                                            </TextEffect>
                                            <TextEffect
                                                per="line"
                                                preset="fade-in-blur"
                                                speedSegment={0.3}
                                                delay={0.5}
                                                as="p"
                                                className="mx-auto mt-8 max-w-2xl text-balance text-lg">
                                                AI that reviews your code like a senior engineer.
                                            </TextEffect>

                                            <AnimatedGroup
                                                variants={{
                                                    container: {
                                                        visible: {
                                                            transition: {
                                                                staggerChildren: 0.05,
                                                                delayChildren: 0.75,
                                                            },
                                                        },
                                                    },
                                                    ...transitionVariants,
                                                }}
                                                className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                                <Button
                                                    size="lg"
                                                    onClick={handleLaunch}
                                                    className="group relative rounded-xl px-6 text-base shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_var(--color-primary),0_0_60px_var(--color-accent)] active:scale-100 bg-primary text-primary-foreground animate-pulse-glow"
                                                >
                                                    <span className="inline-flex items-center gap-2">
                                                        <span className="text-nowrap">Launch CodeLens</span>
                                                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                    </span>
                                                </Button>
                                            </AnimatedGroup>
                                        </div>
                                    </div>

                                    <AnimatedGroup
                                        variants={{
                                            container: {
                                                visible: {
                                                    transition: {
                                                        staggerChildren: 0.05,
                                                        delayChildren: 0.75,
                                                    },
                                                },
                                            },
                                            ...transitionVariants,
                                        }}>
                                        <div className="mask-b-from-55% relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20 animate-float" style={{ animationDuration: '8s' }}>
                                            <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-border p-4 shadow-[0_0_50px_-12px_rgba(155,153,254,0.2)] ring-1">
                                                <Image
                                                    className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block object-cover"
                                                    src="/Screenshot_2026-02-18_223351.jpg"
                                                    alt="app screen"
                                                    width="2700"
                                                    height="1440"
                                                />
                                                <Image
                                                    className="z-2 aspect-15/8 relative rounded-2xl border border-border object-cover dark:hidden"
                                                    src="/Screenshot_2026-02-18_223351.jpg"
                                                    alt="app screen"
                                                    width="2700"
                                                    height="1440"
                                                />
                                            </div>
                                        </div>
                                    </AnimatedGroup>
                                </div>
                            </section>
                        </main>
                    </motion.div>
                ) : (
                    <motion.div
                        key="transition-layer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background"
                    >
                        {/* Purple glow background pulse */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: [0, 0.6, 0], scale: [0.5, 2, 3] }}
                            transition={{ duration: 1.2, ease: 'easeOut' as const }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="w-[400px] h-[400px] rounded-full bg-primary/30 blur-[100px]" />
                        </motion.div>

                        {/* Sun - glowing center */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1, 1.2, 0.9, 1], opacity: [0, 1, 1, 1, 1] }}
                            transition={{ duration: 0.6, ease: 'easeOut' as const }}
                            className="absolute z-20 pointer-events-none"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 shadow-[0_0_60px_20px_rgba(251,191,36,0.4),0_0_120px_40px_rgba(251,146,60,0.2)]" />
                        </motion.div>

                        {/* Orbital rings */}
                        {[120, 200, 290].map((size, i) => (
                            <motion.div
                                key={`ring-${i}`}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: [0, 0.3, 0.3, 0], scale: [0.5, 1, 1, 0.2] }}
                                transition={{ duration: 2.0, delay: 0.1 * i, times: [0, 0.2, 0.7, 1] }}
                                className="absolute rounded-full border border-primary/20 pointer-events-none"
                                style={{ width: size, height: size }}
                            />
                        ))}

                        {/* Orbiting planets */}
                        {[
                            { size: 12, color: 'from-purple-400 to-violet-600', radius: 60, duration: 1.8, delay: 0.1 },
                            { size: 18, color: 'from-blue-400 to-cyan-500', radius: 100, duration: 2.0, delay: 0.0 },
                            { size: 10, color: 'from-pink-400 to-rose-500', radius: 145, duration: 1.6, delay: 0.2 },
                            { size: 22, color: 'from-amber-300 to-orange-500', radius: 80, duration: 1.9, delay: 0.15 },
                            { size: 8, color: 'from-emerald-400 to-teal-500', radius: 130, duration: 1.7, delay: 0.25 },
                            { size: 14, color: 'from-indigo-400 to-purple-600', radius: 110, duration: 2.1, delay: 0.05 },
                        ].map((planet, i) => (
                            <motion.div
                                key={`planet-${i}`}
                                className="absolute pointer-events-none z-10"
                                initial={{
                                    x: Math.cos((i * Math.PI) / 3) * planet.radius,
                                    y: Math.sin((i * Math.PI) / 3) * planet.radius,
                                    opacity: 0,
                                    scale: 0,
                                }}
                                animate={{
                                    x: [
                                        Math.cos((i * Math.PI) / 3) * planet.radius,
                                        Math.cos((i * Math.PI) / 3 + 2) * planet.radius * 0.8,
                                        Math.cos((i * Math.PI) / 3 + 4) * planet.radius * 0.4,
                                        0,
                                    ],
                                    y: [
                                        Math.sin((i * Math.PI) / 3) * planet.radius,
                                        Math.sin((i * Math.PI) / 3 + 2) * planet.radius * 0.8,
                                        Math.sin((i * Math.PI) / 3 + 4) * planet.radius * 0.4,
                                        0,
                                    ],
                                    opacity: [0, 1, 1, 0],
                                    scale: [0, 1.2, 1, 0],
                                }}
                                transition={{
                                    duration: planet.duration,
                                    delay: planet.delay,
                                    ease: 'easeInOut',
                                    times: [0, 0.3, 0.7, 1],
                                }}
                            >
                                <div
                                    className={`rounded-full bg-gradient-to-br ${planet.color}`}
                                    style={{
                                        width: planet.size,
                                        height: planet.size,
                                        boxShadow: `0 0 ${planet.size}px ${planet.size / 3}px rgba(168,85,247,0.3)`,
                                    }}
                                />
                            </motion.div>
                        ))}

                        {/* Star particles in background */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={`star-${i}`}
                                className="absolute w-1 h-1 rounded-full bg-white/70 pointer-events-none"
                                style={{
                                    left: `${5 + Math.random() * 90}%`,
                                    top: `${5 + Math.random() * 90}%`,
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
                                transition={{
                                    duration: 1.0,
                                    delay: 0.1 + Math.random() * 1.2,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}

                        {/* Final bright flash and fade */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0, 0.8, 1] }}
                            transition={{ duration: 2.1, times: [0, 0.75, 0.9, 1] }}
                            className="absolute inset-0 bg-background pointer-events-none z-30"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

