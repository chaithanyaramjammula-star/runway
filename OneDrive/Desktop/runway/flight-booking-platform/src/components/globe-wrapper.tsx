"use client"

import dynamic from "next/dynamic"

// ssr:false prevents the globe from running on the server,
// keeping the initial page load fast and free of SSR cost.
const BackgroundGlobe = dynamic(
    () => import("./background-globe").then((m) => ({ default: m.BackgroundGlobe })),
    { ssr: false }
)

export function GlobeWrapper() {
    return <BackgroundGlobe />
}
