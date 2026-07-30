"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Timer, Sparkles, ArrowRight, X } from "lucide-react"

interface IntroSplashScreenProps {
    onComplete: () => void
}

export function IntroSplashScreen({ onComplete }: IntroSplashScreenProps) {

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(12px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0b0f19] text-white p-6 sm:p-10 select-none overflow-hidden"
        >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/15 rounded-full blur-[180px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-900/15 rounded-full blur-[180px] pointer-events-none" />

            {/* TOP BAR — Skip Button & Brand Tag */}
            <div className="relative z-10 flex justify-between items-center w-full max-w-5xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/15">
                    <span className="w-2 h-2 rounded-full bg-[var(--red-bright)] animate-pulse" />
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-gray-300">
                        PRE-L1 2026
                    </span>
                </div>

                <button
                    onClick={onComplete}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all cursor-pointer"
                >
                    <span>Passer</span>
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* MAIN CONTENT — Apple Keynote Intro */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto my-auto py-8">
                {/* Ceramic Logo Seal */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8 relative"
                >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white p-3 shadow-[0_0_50px_rgba(255,255,255,0.15)] border border-white/40 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                        <Image
                            src="/logo.jpg"
                            alt="IUMA Logo"
                            width={100}
                            height={100}
                            className="w-full h-full object-contain"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Subtitle / Eyebrow */}
                <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="flex items-center gap-1.5 mb-3"
                >
                    <Sparkles className="w-4 h-4 text-[var(--red-bright)]" />
                    <p className="font-mono text-xs tracking-[0.25em] font-bold text-gray-300 uppercase">
                        INSTITUT UNIVERSITAIRE MARIE-ALBERT &middot; XKORIENTA
                    </p>
                </motion.div>

                {/* Main Keynote Title */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight text-white leading-[1.08] mb-5"
                >
                    Campus of{" "}
                    <em className="not-italic bg-gradient-to-r from-[var(--red-bright)] via-red-500 to-amber-500 bg-clip-text text-transparent font-serif italic">
                        Legends
                    </em>
                    .
                </motion.h1>

                {/* Slogan */}
                <motion.p
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    className="text-base sm:text-xl text-gray-300 font-light max-w-xl mb-10 leading-relaxed"
                >
                    D&eacute;couvre ton campus. Trouve ton &eacute;quipe. Entre dans la l&eacute;gende.
                </motion.p>

                {/* Event Highlights Trio */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.55 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mb-10"
                >
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl flex flex-col items-center gap-1">
                        <Calendar className="w-4 h-4 text-[var(--red-bright)]" />
                        <span className="text-[10px] font-mono uppercase text-gray-400">Date</span>
                        <span className="text-xs font-semibold text-white">1er ao&ucirc;t 2026</span>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl flex flex-col items-center gap-1">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span className="text-[10px] font-mono uppercase text-gray-400">Lieu</span>
                        <span className="text-xs font-semibold text-white">Campus IUMA</span>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl flex flex-col items-center gap-1">
                        <Timer className="w-4 h-4 text-amber-400" />
                        <span className="text-[10px] font-mono uppercase text-gray-400">Format</span>
                        <span className="text-xs font-semibold text-white">30 min chrono</span>
                    </div>
                </motion.div>

                {/* Primary CTA */}
                <motion.button
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                    onClick={onComplete}
                    className="px-8 py-4 bg-gradient-to-r from-[var(--red-bright)] to-[var(--red)] hover:opacity-95 text-white font-semibold text-sm tracking-wider uppercase rounded-2xl shadow-[0_10px_30px_rgba(198,35,57,0.35)] active:scale-95 transition-all cursor-pointer inline-flex items-center gap-3 group"
                >
                    <span>Entrer dans la l&eacute;gende</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </div>

            {/* BOTTOM BAR — Progress Bar & Copyright */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-3">

                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                    <span>Propuls&eacute; par Xkorienta</span>
                    <span>&copy; 2026 IUMA &middot; Tous droits r&eacute;serv&eacute;s</span>
                </div>
            </div>
        </motion.div>
    )
}
