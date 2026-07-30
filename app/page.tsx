"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Timer, Trophy } from "lucide-react"
import { RegisterTab } from "./components/RegisterTab"
import { LeaderboardTab } from "./components/LeaderboardTab"
import { IntroSplashScreen } from "./components/IntroSplashScreen"

const TABS = ["S'inscrire", "Hall of Fame"] as const
type Tab = (typeof TABS)[number]

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("S'inscrire")
  const [showSplash, setShowSplash] = useState<boolean | null>(null)

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("iuma_intro_seen")
    if (hasSeenIntro) {
      setShowSplash(false)
    } else {
      setShowSplash(true)
    }
  }, [])

  const handleSplashComplete = () => {
    sessionStorage.setItem("iuma_intro_seen", "true")
    setShowSplash(false)
  }

  if (showSplash === null) {
    return <div className="min-h-screen bg-[#0b0f19]" />
  }

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <IntroSplashScreen onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#0b0f19] flex flex-col lg:flex-row antialiased selection:bg-[var(--red-bright)] selection:text-white relative overflow-hidden">

      {/* Background ambient glows */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none -z-10" />

        {/* LEFT PANEL — EPIC CAMPUS BACKGROUND WITH DARK GRADIENT OVERLAY & GLASS BENTO */}
        <div className="lg:w-[42%] w-full bg-epic-campus relative overflow-hidden flex flex-col justify-between p-7 lg:p-9 text-white min-h-[520px] lg:min-h-screen">
          
          {/* Dark Overlay Gradient for high contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/92 via-[#0f172a]/70 to-[#0f172a]/95 z-0 pointer-events-none" />

          {/* Top Section */}
          <div className="relative z-10">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2.5 mb-6 border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xs">
              <div className="w-6 h-6 rounded-full bg-white p-0.5 shadow-md flex items-center justify-center overflow-hidden shrink-0">
                <Image src="/logo.jpg" alt="IUMA" width={24} height={24} className="object-contain" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-gray-200">
                Institut Universitaire Marie-Albert
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold leading-tight mb-4 drop-shadow-md">
              Campus of <br />
              <em className="italic text-[var(--red-bright)] font-semibold not-italic">Legends.</em>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed max-w-sm">
              D&eacute;couvre ton campus. Trouve ton &eacute;quipe. Entre dans la l&eacute;gende.
            </p>
          </div>

          {/* Bottom Section — Event Info Glass Bento */}
          <div className="relative z-10 w-full mt-8">
            <h3 className="text-[10px] font-mono font-semibold tracking-widest text-gray-400 uppercase mb-3">
              Informations sur l&apos;&eacute;v&eacute;nement
            </h3>

            {/* Glassmorphism Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3.5 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-1.5 mb-1 text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-[var(--red-bright)]" />
                  <span className="text-[10px] uppercase tracking-wide">Date</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold">1er ao&ucirc;t 2026</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3.5 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-1.5 mb-1 text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] uppercase tracking-wide">Lieu</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold">Campus IUMA</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3.5 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-1.5 mb-1 text-gray-400">
                  <Timer className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] uppercase tracking-wide">Format</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold">30 min chrono</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3.5 hover:bg-white/15 transition-all relative overflow-hidden">
                <div className="absolute -right-3 -top-3 w-10 h-10 bg-[var(--red-bright)]/20 rounded-full blur-lg" />
                <div className="flex items-center gap-1.5 mb-1 text-gray-400">
                  <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-[10px] uppercase tracking-wide">&Eacute;v&eacute;nement</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold">Pr&eacute;-L1 Official</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/15 flex justify-between items-center">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-medium">
                Propuls&eacute; par Xkorienta
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — APPLE PRO HUB & TABS */}
        <div className="lg:w-[58%] w-full lg:min-h-screen flex flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10 relative overflow-y-auto custom-scrollbar bg-white">
          
          {/* Apple Segmented Control Tabs */}
          <div className="flex justify-center w-full mb-8">
            <div className="bg-slate-100 p-1.5 rounded-full border border-slate-200/80 inline-flex shadow-2xs">
              {TABS.map((tab) => {
                const isActive = activeTab === tab
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      relative px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer
                      ${isActive
                        ? "text-[var(--navy)] font-extrabold"
                        : "text-slate-500 hover:text-slate-900"
                      }
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="apple-tab-active-pill"
                        className="absolute inset-0 bg-white rounded-full shadow-xs -z-10"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    {tab}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Interactive Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col justify-center"
            >
              {activeTab === "S'inscrire" ? <RegisterTab /> : <LeaderboardTab />}
            </motion.div>
          </AnimatePresence>

          {/* Right Panel Footer */}
          <div className="w-full mt-auto pt-6 text-center">
            <p className="text-[10px] text-slate-400 font-medium font-mono">
              &copy; 2026 Institut Universitaire Marie-Albert &middot; Tous droits r&eacute;serv&eacute;s.
            </p>
          </div>
        </div>

    </div>
    </>
  )
}


