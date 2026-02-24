"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, Calendar as CalendarIcon, MapPin, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function SearchForm() {
    const [flightType, setFlightType] = React.useState<"one-way" | "round-trip">("round-trip")
    const [origin, setOrigin] = React.useState("")
    const [destination, setDestination] = React.useState("")
    const [date, setDate] = React.useState("")
    const router = useRouter()

    const handleSearch = () => {
        if (!origin || !destination) return // Basic validation
        const params = new URLSearchParams({
            origin,
            destination,
            date,
            type: flightType,
        })
        router.push(`/search?${params.toString()}`)
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4 z-10 relative">
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md dark:bg-zinc-900/90 rounded-2xl overflow-hidden">
                <CardContent className="p-6 space-y-6">
                    {/* Flight Type Tabs */}
                    <div className="flex gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                        <button
                            onClick={() => setFlightType("round-trip")}
                            className={cn(
                                "pb-2 text-sm font-medium transition-colors hover:text-blue-600 relative",
                                flightType === "round-trip"
                                    ? "text-blue-600 font-semibold"
                                    : "text-zinc-500"
                            )}
                        >
                            Round Trip
                            {flightType === "round-trip" && (
                                <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-blue-600 rounded-t-full" />
                            )}
                        </button>
                        <button
                            onClick={() => setFlightType("one-way")}
                            className={cn(
                                "pb-2 text-sm font-medium transition-colors hover:text-blue-600 relative",
                                flightType === "one-way"
                                    ? "text-blue-600 font-semibold"
                                    : "text-zinc-500"
                            )}
                        >
                            One Way
                            {flightType === "one-way" && (
                                <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-blue-600 rounded-t-full" />
                            )}
                        </button>
                    </div>

                    {/* Search Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Origin */}
                        <div className="col-span-1 md:col-span-3 relative group">
                            <Label htmlFor="origin" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1 mb-1.5 block">
                                From
                            </Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                                <Input
                                    id="origin"
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    placeholder="NYC, New York"
                                    className="pl-9 h-12 bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500/20 text-base font-medium"
                                />
                            </div>
                        </div>

                        {/* Destination */}
                        <div className="col-span-1 md:col-span-3 relative group">
                            <Label htmlFor="destination" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1 mb-1.5 block">
                                To
                            </Label>
                            <div className="relative">
                                <Plane className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                                <Input
                                    id="destination"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="LHR, London"
                                    className="pl-9 h-12 bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500/20 text-base font-medium"
                                />
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="col-span-1 md:col-span-4 relative group">
                            <Label htmlFor="date" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1 mb-1.5 block">
                                Date
                            </Label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                                <Input
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    placeholder="Add Dates"
                                    className="pl-9 h-12 bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500/20 text-base font-medium"
                                />
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="col-span-1 md:col-span-2 flex items-end">
                            <Button
                                onClick={handleSearch}
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]"
                            >
                                <Search className="mr-2 h-5 w-5" />
                                Search
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
