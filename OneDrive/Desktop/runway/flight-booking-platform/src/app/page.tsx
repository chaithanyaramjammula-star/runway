import { SearchForm } from "@/components/search-form"
import { GlobeWrapper } from "@/components/globe-wrapper"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black relative overflow-hidden flex flex-col justify-center">
      {/* Background Ambience + Globe */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-black pointer-events-none" />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />
        {/* Globe: lazy-loaded, GPU-accelerated, pauses on tab hide */}
        <GlobeWrapper />
      </div>

      <div className="container mx-auto px-4 relative z-10 space-y-8 md:space-y-12 py-20">
        {/* Header Content */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium mb-2 border border-blue-200/50 dark:border-blue-800/50">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Elevating your travel experience
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Explore the world with <span className="text-blue-600">ease</span>.
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Book flights, manage itineraries, and discover new destinations with our AI-powered platform.
          </p>
        </div>

        {/* Search Interface */}
        <SearchForm />

        {/* Features Grid Mockup (Optional - just 3 items) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 opacity-80">
          <div className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Real-time Tracking</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Live updates on gates, delays, and flight paths.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Smart Prediction</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">AI-driven advice on when to book for the best price.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Seamless Booking</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Interactive seat maps and unified itinerary management.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
