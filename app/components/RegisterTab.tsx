"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Compass, Medal, Trophy, Crown, AlertCircle, ArrowRight, Eye, EyeOff } from "lucide-react"
import { XKORIENTA_URL, INVITATION_TOKEN, LOBBY_PATH, SCORING_TIERS } from "../config"

type IdentifierMode = "phone" | "email"

const getTierIcon = (iconType?: string) => {
    switch (iconType) {
        case "compass": return <Compass className="w-6 h-6 text-amber-700" />
        case "medal": return <Medal className="w-6 h-6 text-slate-500" />
        case "trophy": return <Trophy className="w-6 h-6 text-amber-500" />
        case "crown": return <Crown className="w-6 h-6 text-amber-600" />
        default: return <Trophy className="w-6 h-6 text-[var(--red-bright)]" />
    }
}

export function RegisterTab() {
    const [name, setName] = useState("")
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [mode, setMode] = useState<IdentifierMode>("phone")
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSubmitting(true)

        try {
            const payload: Record<string, string> = { name, password }
            if (mode === "phone") {
                payload.phone = identifier
            } else {
                payload.email = identifier
            }

            const res = await fetch(`${XKORIENTA_URL}/api/invitations/${INVITATION_TOKEN}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            const data = await res.json()

            if (!res.ok || !data.success) {
                setError(data.message || "Une erreur est survenue")
                setSubmitting(false)
                return
            }

            // Redirect to Xkorienta auto-login with magic token
            const loginToken = data.data?.loginToken
            if (loginToken) {
                const returnTo = encodeURIComponent(LOBBY_PATH)
                window.location.href = `${XKORIENTA_URL}/auto-login?token=${loginToken}&returnTo=${returnTo}`
            } else {
                // Fallback: redirect to login page
                const returnTo = encodeURIComponent(LOBBY_PATH)
                window.location.href = `${XKORIENTA_URL}/login?returnTo=${returnTo}`
            }
        } catch {
            setError("Erreur de connexion. Vérifiez votre connexion internet.")
            setSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Ranks Bento Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SCORING_TIERS.map((tier) => (
                    <div
                        key={tier.label}
                        className="apple-bento p-3.5 rounded-2xl flex flex-col items-center text-center gap-1.5"
                    >
                        {getTierIcon((tier as { iconType?: string }).iconType)}
                        <span className="text-xs font-semibold text-[#1d1d1f] leading-tight">
                            {tier.label}
                        </span>
                        <span className="text-[10px] font-mono text-[#86868b] font-medium">
                            {tier.min}&ndash;{tier.max} pts
                        </span>
                    </div>
                ))}
            </div>

            {/* Registration Form */}
            <div className="space-y-5">
                <div className="text-left mb-6">
                    <p className="text-xs font-semibold tracking-widest text-[var(--red-bright)] uppercase mb-1">
                        Formulaire Officiel
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
                        Entre dans la l&eacute;gende.
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-[var(--red-bright)] text-xs font-medium flex items-center gap-2"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0 text-[var(--red-bright)]" />
                                <span>{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Full Name Input */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1d1d1f] mb-1.5">
                            Nom complet
                        </label>
                        <input
                            type="text"
                            required
                            minLength={2}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: Jean Dupont"
                            className="w-full px-4 py-3.5 bg-[#f5f5f7] border border-transparent focus:border-[var(--red-bright)] focus:bg-white focus:ring-4 focus:ring-red-500/10 rounded-2xl text-[#1d1d1f] placeholder-[#86868b] text-base transition-all font-sans shadow-2xs"
                        />
                    </div>

                    {/* Phone / Email Toggle & Input */}
                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">
                                Identifiant
                            </label>
                            <div className="bg-[#e8e8ed] p-1 rounded-xl inline-flex border border-black/5">
                                <button
                                    type="button"
                                    onClick={() => { setMode("phone"); setIdentifier("") }}
                                    className={`px-3 py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase transition-all ${
                                        mode === "phone"
                                            ? "bg-white text-[#1d1d1f] shadow-xs"
                                            : "text-[#86868b] hover:text-[#1d1d1f]"
                                    }`}
                                >
                                    T&eacute;l&eacute;phone
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setMode("email"); setIdentifier("") }}
                                    className={`px-3 py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase transition-all ${
                                        mode === "email"
                                            ? "bg-white text-[#1d1d1f] shadow-xs"
                                            : "text-[#86868b] hover:text-[#1d1d1f]"
                                    }`}
                                >
                                    Email
                                </button>
                            </div>
                        </div>
                        <input
                            type={mode === "phone" ? "tel" : "email"}
                            required
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            placeholder={mode === "phone" ? "6XXXXXXXX" : "votre@email.com"}
                            className="w-full px-4 py-3.5 bg-[#f5f5f7] border border-transparent focus:border-[var(--red-bright)] focus:bg-white focus:ring-4 focus:ring-red-500/10 rounded-2xl text-[#1d1d1f] placeholder-[#86868b] text-base transition-all font-sans shadow-2xs"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1d1d1f] mb-1.5">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                minLength={8}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="8 caract&egrave;res minimum"
                                className="w-full px-4 py-3.5 pr-20 bg-[#f5f5f7] border border-transparent focus:border-[var(--red-bright)] focus:bg-white focus:ring-4 focus:ring-red-500/10 rounded-2xl text-[#1d1d1f] placeholder-[#86868b] text-base transition-all font-sans shadow-2xs"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-semibold text-[#86868b] hover:text-[#1d1d1f] bg-slate-200/50 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
                            >
                                {showPassword ? (
                                    <>
                                        <EyeOff className="w-3.5 h-3.5" />
                                        <span>Masquer</span>
                                    </>
                                ) : (
                                    <>
                                        <Eye className="w-3.5 h-3.5" />
                                        <span>Voir</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit CTA */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-gradient-to-r from-[var(--red-bright)] to-[var(--red)] hover:opacity-95 text-white font-semibold text-sm tracking-wider uppercase rounded-2xl shadow-lg shadow-red-500/20 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
                    >
                        {submitting ? (
                            <span className="inline-flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Inscription en cours...
                            </span>
                        ) : (
                            <>
                                <span>Rejoindre le campus</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {/* Login Redirect */}
                <p className="text-center pt-2 text-sm text-[#86868b]">
                    D&eacute;j&agrave; un compte ?{" "}
                    <a
                        href={`${XKORIENTA_URL}/login?returnTo=${encodeURIComponent(LOBBY_PATH)}`}
                        className="text-[var(--red-bright)] hover:underline font-semibold"
                    >
                        Se connecter
                    </a>
                </p>
            </div>
        </div>
    )
}



