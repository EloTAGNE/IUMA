"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, TrendingUp, TrendingDown, Sparkles, Crown, Medal } from "lucide-react"
import { XKORIENTA_URL, EXAM_ID, POLL_INTERVAL } from "../config"

interface LeaderboardEntry {
    rank: number
    studentName: string
    avatarInitial: string
    score: number
    maxScore: number
    badge: { label: string; emoji?: string } | null
    submittedAt: string | null
}

interface LeaderboardData {
    success: boolean
    examTitle: string
    totalParticipants: number
    entries: LeaderboardEntry[]
}

export function LeaderboardTab() {
    const [data, setData] = useState<LeaderboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    // Tracks rank from the *previous* poll so we can detect changes
    const prevRanksRef = useRef<Map<string, number>>(new Map())
    // Tracks which students changed rank on the *current* render
    const [changedStudents, setChangedStudents] = useState<Map<string, "up" | "down" | "new">>(new Map())
    const isFirstFetch = useRef(true)

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch(`${XKORIENTA_URL}/api/public/exams/${EXAM_ID}/leaderboard`)
            if (!res.ok) throw new Error("Erreur serveur")
            const json: LeaderboardData = await res.json()

            // Compute trends BEFORE updating prevRanksRef
            const changes = new Map<string, "up" | "down" | "new">()
            if (!isFirstFetch.current) {
                for (const entry of json.entries) {
                    const prev = prevRanksRef.current.get(entry.studentName)
                    if (prev === undefined) {
                        changes.set(entry.studentName, "new")
                    } else if (entry.rank < prev) {
                        changes.set(entry.studentName, "up")
                    } else if (entry.rank > prev) {
                        changes.set(entry.studentName, "down")
                    }
                }
            }
            isFirstFetch.current = false

            // Now update prevRanks for next poll
            const newMap = new Map<string, number>()
            json.entries.forEach((e) => newMap.set(e.studentName, e.rank))
            prevRanksRef.current = newMap

            setChangedStudents(changes)
            setData(json)
            setError(null)

            // Clear highlight after 3 seconds
            if (changes.size > 0) {
                setTimeout(() => setChangedStudents(new Map()), 3000)
            }
        } catch {
            setError("Impossible de charger le classement")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLeaderboard()
        const interval = setInterval(fetchLeaderboard, POLL_INTERVAL)
        return () => clearInterval(interval)
    }, [])

    const getTrend = (name: string): "up" | "down" | "new" | "stable" => {
        return changedStudents.get(name) || "stable"
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <svg className="animate-spin h-8 w-8 text-[var(--red-bright)] mb-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                    Chargement du classement...
                </p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12 px-4">
                <p className="text-[var(--red-bright)] font-semibold text-sm mb-4">{error}</p>
                <button
                    onClick={fetchLeaderboard}
                    className="text-xs font-semibold uppercase tracking-wider text-[#1d1d1f] bg-[#f5f5f7] hover:bg-slate-200 px-5 py-2.5 rounded-xl transition-all"
                >
                    R&eacute;essayer
                </button>
            </div>
        )
    }

    const entries = data?.entries || []

    return (
        <div className="space-y-6">
            {/* Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-4">
                <div>
                    <p className="text-xs font-semibold tracking-widest text-[var(--red-bright)] uppercase mb-1">
                        Classement Officiel
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
                        Hall of Fame.
                    </h2>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f5f5f7] border border-black/5 rounded-full self-start sm:self-auto">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-[#86868b]">
                        {data?.totalParticipants || 0} participant{(data?.totalParticipants || 0) > 1 ? "s" : ""} &middot; En direct
                    </span>
                </div>
            </div>

            {/* Leaderboard Entries List */}
            <div>
                {entries.length === 0 ? (
                    <div className="text-center py-12 bg-[#f5f5f7] rounded-2xl border border-black/5">
                        <Trophy className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-600 font-medium text-base">
                            Aucun participant pour le moment.
                        </p>
                        <p className="text-xs font-mono text-[#86868b] mt-1 uppercase tracking-wider">
                            Le classement apparaîtra dès la première soumission
                        </p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {entries.map((entry) => {
                            const trend = getTrend(entry.studentName)
                            const isTop3 = entry.rank <= 3

                            let itemBg = "bg-[#f5f5f7] hover:bg-white border-transparent hover:border-slate-200"
                            let rankColor = "text-[#86868b]"
                            let avatarBg = "bg-slate-200 text-[#1d1d1f]"

                            if (entry.rank === 1) {
                                itemBg = "bg-amber-500/10 border-amber-500/30"
                                rankColor = "text-amber-600 font-bold"
                                avatarBg = "bg-amber-500 text-white font-bold"
                            } else if (entry.rank === 2) {
                                itemBg = "bg-slate-200/60 border-slate-300/80"
                                rankColor = "text-slate-700 font-bold"
                                avatarBg = "bg-slate-400 text-white font-bold"
                            } else if (entry.rank === 3) {
                                itemBg = "bg-amber-800/10 border-amber-700/30"
                                rankColor = "text-amber-800 font-bold"
                                avatarBg = "bg-amber-700 text-white font-bold"
                            }

                            // Highlight ring when rank just changed
                            const highlightRing = trend === "up"
                                ? "ring-2 ring-emerald-400 ring-offset-2"
                                : trend === "down"
                                    ? "ring-2 ring-slate-300 ring-offset-2"
                                    : trend === "new"
                                        ? "ring-2 ring-[var(--red-bright)] ring-offset-2"
                                        : ""

                            return (
                                <motion.div
                                    key={entry.studentName}
                                    layout="position"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{
                                        opacity: 1,
                                        scale: trend === "up" ? [1, 1.03, 1] : 1,
                                    }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{
                                        layout: { type: "spring", stiffness: 200, damping: 25, duration: 0.6 },
                                        scale: { duration: 0.5 },
                                    }}
                                    className={`
                                        flex items-center gap-3.5 p-3.5 mb-2 rounded-2xl border transition-all duration-500 shadow-2xs
                                        ${itemBg} ${highlightRing}
                                    `}
                                >
                                    {/* Rank Icon or Number */}
                                    <div className="w-7 flex justify-center">
                                        {entry.rank === 1 ? (
                                            <Crown className="w-5 h-5 text-amber-500" />
                                        ) : entry.rank === 2 ? (
                                            <Medal className="w-5 h-5 text-slate-400" />
                                        ) : entry.rank === 3 ? (
                                            <Medal className="w-5 h-5 text-amber-700" />
                                        ) : (
                                            <span className={`font-mono text-sm font-semibold ${rankColor}`}>
                                                {String(entry.rank).padStart(2, "0")}
                                            </span>
                                        )}
                                    </div>

                                    {/* Avatar Circle */}
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm font-semibold ${avatarBg}`}>
                                        {entry.avatarInitial}
                                    </div>

                                    {/* Name & Badge */}
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm truncate ${isTop3 ? "text-[#1d1d1f] font-bold" : "text-slate-800 font-medium"}`}>
                                            {entry.studentName}
                                        </p>
                                        {entry.badge && (
                                            <p className="text-[10px] font-mono tracking-wider uppercase text-[var(--red-bright)] font-semibold flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" />
                                                <span>{entry.badge.label}</span>
                                            </p>
                                        )}
                                    </div>

                                    {/* Trend indicator */}
                                    {trend === "up" && (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full"
                                        >
                                            <TrendingUp className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-mono font-bold">UP</span>
                                        </motion.div>
                                    )}
                                    {trend === "down" && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="flex items-center gap-1 bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full"
                                        >
                                            <TrendingDown className="w-3.5 h-3.5" />
                                        </motion.div>
                                    )}
                                    {trend === "new" && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: [0, 1.2, 1] }}
                                            className="text-[10px] font-mono tracking-wider uppercase text-[var(--red-bright)] bg-red-500/10 px-2 py-0.5 rounded-full font-bold"
                                        >
                                            new
                                        </motion.span>
                                    )}

                                    {/* Score */}
                                    <span className={`font-mono text-sm tabular-nums ${isTop3 ? "text-[#1d1d1f] font-bold" : "text-slate-700 font-semibold"}`}>
                                        {entry.score} <span className="text-[10px] text-[#86868b] font-normal">pts</span>
                                    </span>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                )}
            </div>
        </div>
    )
}



