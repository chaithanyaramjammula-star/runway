"use client"

import * as React from "react"

// Performance decisions:
// - Pure CSS + SVG: zero extra dependencies, no Three.js
// - CSS rotateY is GPU-composited (runs on the compositor thread)
// - will-change:transform hints the browser to create a separate layer
// - Visibility API pauses animation when tab is hidden → zero CPU cost
// - SVG is vector, no texture files → tiny bundle size
// - dangerouslySetInnerHTML for <style> avoids Turbopack template-literal issues

const FLIGHT_ARCS = [
    "M 150,80 Q 200,40 250,70",
    "M 100,120 Q 160,70 220,110",
    "M 200,130 Q 230,90 270,100",
    "M 80,140 Q 140,180 200,155",
    "M 210,160 Q 250,130 290,145",
    "M 130,90 Q 170,50 210,85",
    "M 170,170 Q 210,140 250,160",
]

const CITY_DOTS = [
    { cx: 150, cy: 80 }, { cx: 250, cy: 70 }, { cx: 100, cy: 120 },
    { cx: 220, cy: 110 }, { cx: 200, cy: 130 }, { cx: 270, cy: 100 },
    { cx: 80, cy: 140 }, { cx: 200, cy: 155 }, { cx: 290, cy: 145 },
    { cx: 130, cy: 90 }, { cx: 210, cy: 85 }, { cx: 170, cy: 170 },
    { cx: 250, cy: 160 },
]

const CONTINENT_PATHS = [
    "M 130,90 C 145,75 165,70 180,85 C 195,100 185,115 170,120 C 155,125 135,110 130,90 Z",
    "M 200,80 C 215,68 235,72 245,88 C 252,100 240,112 225,108 C 210,104 197,95 200,80 Z",
    "M 85,135 C 100,120 125,125 135,145 C 145,160 130,175 110,165 C 90,155 80,148 85,135 Z",
    "M 215,140 C 230,125 258,130 268,150 C 274,165 258,178 240,170 C 222,162 212,155 215,140 Z",
    "M 160,155 C 170,140 190,145 195,160 C 200,175 185,185 170,178 C 158,172 155,165 160,155 Z",
]

const GLOBE_CSS = `
@keyframes globe-rotate {
  from { transform: rotateY(0deg); }
  to   { transform: rotateY(360deg); }
}
.globe-radial-overlay {
  background: radial-gradient(circle at center, transparent 20%, rgba(9,9,11,0.2) 60%, rgba(9,9,11,0.65) 100%);
}
`

export const BackgroundGlobe = React.memo(function BackgroundGlobe() {
    const globeRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const handleVisibility = () => {
            if (!globeRef.current) return
            globeRef.current.style.animationPlayState =
                document.hidden ? "paused" : "running"
        }
        document.addEventListener("visibilitychange", handleVisibility)
        return () => document.removeEventListener("visibilitychange", handleVisibility)
    }, [])

    return (
        <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0"
        >
            {/* Inject keyframe CSS */}
            <style dangerouslySetInnerHTML={{ __html: GLOBE_CSS }} />

            {/* Ambient glow halo */}
            <div className="absolute w-[540px] h-[540px] rounded-full bg-blue-500/10 blur-3xl" />

            {/* GPU-composited rotating globe */}
            <div
                ref={globeRef}
                className="relative w-[460px] h-[460px] flex-shrink-0"
                style={{
                    animation: "globe-rotate 55s linear infinite",
                    willChange: "transform",
                    transformStyle: "preserve-3d",
                }}
            >
                <svg
                    viewBox="0 0 380 380"
                    className="w-full h-full opacity-[0.18]"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <radialGradient id="globeGrad" cx="38%" cy="38%" r="62%">
                            <stop offset="0%" stopColor="#a8c8ff" stopOpacity="0.6" />
                            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#1a2e6b" stopOpacity="0.8" />
                        </radialGradient>
                        <radialGradient id="continentGrad" cx="40%" cy="35%" r="65%">
                            <stop offset="0%" stopColor="#c9d8f0" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#7098d0" stopOpacity="0.5" />
                        </radialGradient>
                        <clipPath id="globeClip">
                            <circle cx="190" cy="190" r="175" />
                        </clipPath>
                        <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="1.5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Base sphere */}
                    <circle cx="190" cy="190" r="175" fill="url(#globeGrad)" />

                    {/* Grid lines */}
                    <g clipPath="url(#globeClip)" stroke="#60a5fa" strokeWidth="0.4" fill="none" opacity="0.3">
                        {[50, 80, 110, 140, 170, 200, 230, 260, 290, 320].map((cy) => (
                            <ellipse key={cy} cx="190" cy={cy} rx="175" ry={Math.abs(cy - 190) * 0.5 + 10} />
                        ))}
                        {[0, 30, 60, 90, 120, 150].map((angle) => (
                            <ellipse
                                key={angle}
                                cx="190" cy="190"
                                rx={20 + angle * 0.8} ry="175"
                                transform={"rotate(" + angle + ", 190, 190)"}
                            />
                        ))}
                    </g>

                    {/* Continent blobs */}
                    <g clipPath="url(#globeClip)" fill="url(#continentGrad)" opacity="0.55">
                        {CONTINENT_PATHS.map((d, i) => (
                            <path key={i} d={d} transform="translate(50 50) scale(1.65)" />
                        ))}
                    </g>

                    {/* Flight arcs */}
                    <g
                        clipPath="url(#globeClip)"
                        fill="none"
                        stroke="#93c5fd"
                        strokeWidth="0.8"
                        strokeDasharray="4 3"
                        opacity="0.65"
                        filter="url(#arcGlow)"
                    >
                        {FLIGHT_ARCS.map((d, i) => (
                            <path key={i} d={d} transform="translate(0 70) scale(1.3 1.1)" />
                        ))}
                    </g>

                    {/* City dots */}
                    <g clipPath="url(#globeClip)" fill="#e0f2fe" opacity="0.75">
                        {CITY_DOTS.map((dot, i) => (
                            <circle key={i} cx={dot.cx} cy={dot.cy + 70} r="1.8" />
                        ))}
                    </g>

                    {/* Specular highlight */}
                    <circle cx="130" cy="120" r="65" fill="white" opacity="0.05" />
                    {/* Edge depth shadow */}
                    <circle cx="190" cy="190" r="175" fill="none" stroke="#000011" strokeWidth="28" opacity="0.25" />
                </svg>
            </div>

            {/* Radial overlay to keep foreground text readable */}
            <div className="globe-radial-overlay absolute inset-0" />
        </div>
    )
})
