"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Plane, Clock, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock Data
const MOCK_FLIGHTS = [
    {
        id: "1",
        airline: "Oceanic Airlines",
        flightNumber: "OA815",
        departure: { code: "JFK", time: "10:30 AM", airport: "John F. Kennedy Intl" },
        arrival: { code: "LHR", time: "10:30 PM", airport: "Heathrow" },
        duration: "7h 00m",
        price: 450,
        stops: "Non-stop",
    },
    {
        id: "2",
        airline: "Global Air",
        flightNumber: "GA220",
        departure: { code: "JFK", time: "01:00 PM", airport: "John F. Kennedy Intl" },
        arrival: { code: "LHR", time: "01:15 AM", airport: "Heathrow" },
        duration: "7h 15m",
        price: 395,
        stops: "1 Stop (CDG)",
    },
    {
        id: "3",
        airline: "British Airways",
        flightNumber: "BA178",
        departure: { code: "JFK", time: "06:00 PM", airport: "John F. Kennedy Intl" },
        arrival: { code: "LHR", time: "06:00 AM", airport: "Heathrow" },
        duration: "7h 00m",
        price: 520,
        stops: "Non-stop",
    },
]

function SearchContent() {
    const searchParams = useSearchParams()
    const origin = searchParams.get("origin") || "JFK"
    const destination = searchParams.get("destination") || "LHR"
    const date = searchParams.get("date") || "Tomorrow"

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Search Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div>
                        <div className="flex items-center gap-2 text-zinc-500 text-sm mb-1">
                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold uppercase">Round Trip</span>
                            <span>•</span>
                            <span>{date}</span>
                            <span>•</span>
                            <span>1 Passenger</span>
                        </div>
                        <h1 className="text-2xl font-bold flex items-center gap-3">
                            {origin} <ArrowRight className="h-5 w-5 text-zinc-400" /> {destination}
                        </h1>
                    </div>
                    <Button variant="outline" className="gap-2">
                        <SlidersHorizontal className="h-4 w-4" />
                        Modify Search
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <div className="hidden lg:block space-y-6">
                        <Card className="border-0 shadow-none bg-transparent">
                            <CardContent className="p-0 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg">Filters</h3>
                                    <Button variant="ghost" size="sm" className="h-auto p-0 text-blue-600">Reset</Button>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase text-zinc-500 font-semibold tracking-wider">Price Range</Label>
                                        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                            <span className="text-sm font-medium">$0 - $2000</span>
                                            <input type="range" className="w-full mt-2 accent-blue-600" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase text-zinc-500 font-semibold tracking-wider">Stops</Label>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm">
                                                <input type="checkbox" className="rounded border-zinc-300 text-blue-600 focus:ring-blue-600" defaultChecked />
                                                Non-stop
                                            </label>
                                            <label className="flex items-center gap-2 text-sm">
                                                <input type="checkbox" className="rounded border-zinc-300 text-blue-600 focus:ring-blue-600" defaultChecked />
                                                1 Stop
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase text-zinc-500 font-semibold tracking-wider">Airlines</Label>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm">
                                                <input type="checkbox" className="rounded border-zinc-300 text-blue-600 focus:ring-blue-600" defaultChecked />
                                                Oceanic Airlines
                                            </label>
                                            <label className="flex items-center gap-2 text-sm">
                                                <input type="checkbox" className="rounded border-zinc-300 text-blue-600 focus:ring-blue-600" defaultChecked />
                                                British Airways
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Results List */}
                    <div className="col-span-1 lg:col-span-3 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-zinc-500">{MOCK_FLIGHTS.length} flights found</p>
                            <Button variant="ghost" size="sm" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Sort by: Best Match
                            </Button>
                        </div>

                        {MOCK_FLIGHTS.map((flight) => (
                            <Card key={flight.id} className="group hover:shadow-lg transition-all border-zinc-200 dark:border-zinc-800 overflow-hidden cursor-pointer">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Flight Info */}
                                        <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                            <div className="col-span-3 flex items-center gap-4">
                                                <div className="h-10 w-10 bg-zinc-100 rounded-full flex items-center justify-center">
                                                    <Plane className="h-5 w-5 text-zinc-500" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold">{flight.airline}</div>
                                                    <div className="text-xs text-zinc-500">{flight.flightNumber}</div>
                                                </div>
                                            </div>

                                            <div className="col-span-6 flex items-center justify-center gap-8 text-center">
                                                <div>
                                                    <div className="text-xl font-bold">{flight.departure.time}</div>
                                                    <div className="text-xs text-zinc-500">{flight.departure.code}</div>
                                                </div>
                                                <div className="flex flex-col items-center gap-1 min-w-[100px]">
                                                    <div className="text-xs text-zinc-400">{flight.duration}</div>
                                                    <div className="relative w-full h-[2px] bg-zinc-200 dark:bg-zinc-700">
                                                        <div className="absolute top-[-3px] right-0 h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                                                        <div className="absolute top-[-3px] left-0 h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                                                    </div>
                                                    <div className="text-xs text-green-600 font-medium">{flight.stops}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xl font-bold">{flight.arrival.time}</div>
                                                    <div className="text-xs text-zinc-500">{flight.arrival.code}</div>
                                                </div>
                                            </div>

                                            <div className="col-span-3 text-right">
                                                {/* More visual indicator of flight path/tracker could go here */}
                                            </div>
                                        </div>

                                        {/* Price & Action */}
                                        <div className="w-full md:w-48 bg-zinc-50 dark:bg-zinc-900/50 p-6 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-zinc-200 dark:border-zinc-800 gap-3 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/10 transition-colors">
                                            <div className="text-center">
                                                <span className="text-sm text-zinc-500">from</span>
                                                <div className="text-3xl font-bold text-blue-600">${flight.price}</div>
                                            </div>
                                            <Button className="w-full font-semibold shadow-sm">
                                                Select
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading flights...</div>}>
            <SearchContent />
        </Suspense>
    )
}
