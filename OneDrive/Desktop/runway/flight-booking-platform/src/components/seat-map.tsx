"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, X, User } from "lucide-react"

// Mock Seat Data
// Rows 1-2: Business (2-2 configuration)
// Rows 3-10: Economy (3-3 configuration)
const generateSeats = () => {
    const seats = []

    // Business Class
    for (let row = 1; row <= 2; row++) {
        for (let col of ["A", "C", "D", "F"]) {
            seats.push({ id: `${row}${col}`, row, col, type: "business", price: 200, status: Math.random() > 0.7 ? "occupied" : "available" })
        }
    }

    // Economy Class
    for (let row = 3; row <= 10; row++) {
        for (let col of ["A", "B", "C", "D", "E", "F"]) {
            seats.push({ id: `${row}${col}`, row, col, type: "economy", price: 50, status: Math.random() > 0.6 ? "occupied" : "available" })
        }
    }
    return seats
}

const SEATS = generateSeats()

interface SeatMapProps {
    onSeatSelect: (seat: any) => void
    selectedSeat: string | null
}

export function SeatMap({ onSeatSelect, selectedSeat }: SeatMapProps) {
    return (
        <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden relative">
            {/* Fuselage Shape / Container */}
            <div className="mx-auto max-w-[340px] bg-zinc-50 dark:bg-zinc-950 rounded-[4rem] px-8 py-20 relative border-4 border-zinc-100 dark:border-zinc-800 shadow-inner">

                {/* Cockpit / Front Indicator */}
                <div className="absolute top-4 left-0 right-0 text-center text-zinc-300 dark:text-zinc-700 font-bold tracking-[0.3em] text-xs">COCKPIT</div>

                {/* Business Class Section */}
                <div className="mb-8 relative">
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-semibold text-zinc-400 tracking-widest">BUSINESS</div>
                    <div className="grid grid-cols-4 gap-x-6 gap-y-4 justify-items-center">
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-dashed border-r border-zinc-200 dark:border-zinc-800 -translate-x-1/2" />
                        {SEATS.filter(s => s.type === "business").map((seat) => (
                            <Seat
                                key={seat.id}
                                seat={seat}
                                isSelected={selectedSeat === seat.id}
                                onSelect={() => seat.status === "available" && onSeatSelect(seat)}
                            />
                        ))}
                    </div>
                </div>

                {/* Separator / Galley */}
                <div className="h-8 flex items-center justify-center my-4 opacity-30">
                    <div className="w-full h-[2px] bg-zinc-300 dark:bg-zinc-700 dashed" />
                </div>

                {/* Economy Class Section */}
                <div className="relative">
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-semibold text-zinc-400 tracking-widest">ECONOMY</div>
                    <div className="grid grid-cols-6 gap-x-2 gap-y-3 justify-items-center">
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-dashed border-r border-zinc-200 dark:border-zinc-800 -translate-x-1/2" />
                        {SEATS.filter(s => s.type === "economy").map((seat) => (
                            <Seat
                                key={seat.id}
                                seat={seat}
                                isSelected={selectedSeat === seat.id}
                                onSelect={() => seat.status === "available" && onSeatSelect(seat)}
                            />
                        ))}
                    </div>
                </div>

                {/* Rear / Tail Indicator */}
                <div className="absolute bottom-4 left-0 right-0 text-center text-zinc-300 dark:text-zinc-700 font-bold tracking-[0.3em] text-xs">TAIL</div>
            </div>

            {/* Legend */}
            <div className="mt-8 flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700" />
                    <span className="text-zinc-500">Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-zinc-200 dark:bg-zinc-800 opacity-50 cursor-not-allowed" />
                    <span className="text-zinc-500">Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-600 shadow-md" />
                    <span className="text-zinc-500">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-indigo-100 dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-800" />
                    <span className="text-zinc-500">Business</span>
                </div>
            </div>
        </div>
    )
}

function Seat({ seat, isSelected, onSelect }: { seat: any, isSelected: boolean, onSelect: () => void }) {
    const isBusiness = seat.type === "business"
    const isOccupied = seat.status === "occupied"

    return (
        <button
            onClick={onSelect}
            disabled={isOccupied}
            className={cn(
                "relative flex items-center justify-center transition-all duration-300 group",
                isBusiness ? "w-12 h-14 rounded-t-lg rounded-b-sm" : "w-8 h-10 rounded-t-md rounded-b-sm",
                isOccupied ? "bg-zinc-200 dark:bg-zinc-800 cursor-not-allowed opacity-50" : "bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 hover:border-blue-400 hover:shadow-md cursor-pointer",
                isSelected && "bg-blue-600 border-blue-600 text-white shadow-lg scale-110 z-10",
                isBusiness && !isOccupied && !isSelected && "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/50"
            )}
        >
            {/* Headrest */}
            <div className={cn(
                "absolute -top-1 left-1/2 -translate-x-1/2 w-[80%] h-[20%] rounded-full opacity-50",
                isSelected ? "bg-white/30" : "bg-zinc-300 dark:bg-zinc-600"
            )} />

            {/* Seat Number (only on hover or selected) */}
            {(isSelected || (!isOccupied && isBusiness)) && (
                <span className={cn(
                    "text-[10px] font-bold",
                    isSelected ? "text-white" : "text-zinc-400"
                )}>
                    {seat.id}
                </span>
            )}

            {isOccupied && <X className="h-3 w-3 text-zinc-400" />}
        </button>
    )
}
