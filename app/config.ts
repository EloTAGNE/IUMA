/** IUMA Campus of Legends — Configuration */

// Xkorienta platform URL
export const XKORIENTA_URL = (process.env.NEXT_PUBLIC_XKORIENTA_URL || "http://localhost:3001").replace(/\/+$/, "")

// Invitation token for Pre-L1 class
export const INVITATION_TOKEN = process.env.NEXT_PUBLIC_INVITATION_TOKEN
    || "f60ede7003a95b1a1262038f16c7d2e3d596df9faedeff135149c38feaab5d1c"

// Exam ID for leaderboard
export const EXAM_ID = process.env.NEXT_PUBLIC_EXAM_ID || "6a6b210dfcdf0699c22c815d"

// Auto-login redirect target (exam lobby)
export const LOBBY_PATH = `/student/exam/${EXAM_ID}/lobby`

// Leaderboard polling interval (ms)
export const POLL_INTERVAL = 5000

// Scoring tiers
export const SCORING_TIERS = [
    { min: 0, max: 40, label: "Explorateur du Campus", iconType: "compass" },
    { min: 45, max: 70, label: "Ambassadeur IUMA", iconType: "medal" },
    { min: 75, max: 90, label: "Légende du Campus", iconType: "trophy" },
    { min: 95, max: 100, label: "Grand Maître des Legends", iconType: "crown" },
]

