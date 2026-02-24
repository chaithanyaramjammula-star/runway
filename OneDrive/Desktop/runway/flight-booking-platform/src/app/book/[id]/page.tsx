"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, CreditCard, User, Luggage, Armchair } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SeatMap } from "@/components/seat-map"

export default function BookingPage() {
    const params = useParams()
    const flightId = params.id
    const [selectedSeat, setSelectedSeat] = React.useState<any>(null)

    // Mock Flight Data (In real app, fetch by ID)
    const flight = {
        id: flightId,
        airline: "Oceanic Airlines",
        flightNumber: "OA815",
        origin: "NYC",
        destination: "LHR",
        date: "Oct 24, 2024",
        time: "10:30 AM - 10:30 PM",
        price: 450,
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 md:p-8">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Column: Passenger Details */}
                <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center gap-4 mb-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="text-2xl font-bold">Secure Booking</h1>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Armchair className="h-5 w-5 text-blue-600" />
                                Select Seat
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SeatMap
                                selectedSeat={selectedSeat?.id || null}
                                onSeatSelect={setSelectedSeat}
                            />
                            {selectedSeat && (
                                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-between border border-blue-100 dark:border-blue-800">
                                    <div className="text-sm">
                                        <span className="font-semibold text-blue-700 dark:text-blue-300">Seat {selectedSeat.id}</span>
                                        <span className="mx-2 text-zinc-300">|</span>
                                        <span className="capitalize text-zinc-600 dark:text-zinc-400">{selectedSeat.type} Class</span>
                                    </div>
                                    <div className="font-bold text-blue-700 dark:text-blue-300">${selectedSeat.price}</div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <User className="h-5 w-5 text-blue-600" />
                                Passenger Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="john.doe@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="passport">Passport Number</Label>
                                <Input id="passport" placeholder="A12345678" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Luggage className="h-5 w-5 text-blue-600" />
                                Add-ons
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                                        <Luggage className="h-5 w-5 text-zinc-500" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Checked Baggage</div>
                                        <div className="text-sm text-zinc-500">+23kg allowance</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">$50</span>
                                    <Button variant="outline" size="sm">Add</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <CreditCard className="h-5 w-5 text-blue-600" />
                                Payment Method
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg text-center text-zinc-500 text-sm">
                                Payment Gateway Integration (Stripe/PayPal) Placeholder
                            </div>
                        </CardContent>
                    </Card>

                    <Button className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg">
                        Confirm & Pay ${flight.price}
                    </Button>
                </div>

                {/* Right Column: Order Summary */}
                <div className="md:col-span-1">
                    <Card className="sticky top-6">
                        <CardHeader>
                            <CardTitle>Trip Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Flight</div>
                                <div className="font-medium text-lg">{flight.origin} → {flight.destination}</div>
                                <div className="text-sm text-zinc-500">{flight.date}</div>
                                <div className="text-sm text-zinc-500">{flight.time}</div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Base Fare</span>
                                    <span>${flight.price}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Taxes & Fees</span>
                                    <span>$45</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Baggage</span>
                                    <span>$0</span>
                                </div>
                                {selectedSeat && (
                                    <div className="flex justify-between text-sm text-blue-600">
                                        <span>Seat Selection ({selectedSeat.id})</span>
                                        <span>${selectedSeat.price}</span>
                                    </div>
                                )}
                            </div>

                            <Separator />

                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-2xl text-blue-600">${flight.price + 45 + (selectedSeat?.price || 0)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}
