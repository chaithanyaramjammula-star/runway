# Flight Booking Platform - Current Features

This document outlines the features currently implemented in the Flight Booking Platform MVP.

## 1. Core User Experience

### Landing Page & Intuitive Search
- **Modern Hero Section**: A visually striking landing page with ambient background effects.
- **Unified Search Form**: 
  - Toggle between **Round-trip** and **One-way** flights.
  - inputs for **Origin**, **Destination**, and **Travel Dates**.
  - Interactive icons and clean Shadcn/UI components.

### Flight Search Results
- **Flight Listings**: Displays a list of available flights with key details:
  - Airline and Flight Number.
  - Departure and Arrival times/airports.
  - Duration and Number of Stops.
  - Price per person.
- **Sidebar Filters**: 
  - **Price Range**: Slider to filter by budget.
  - **Stops**: Checkboxes for Non-stop vs. Layover flights.
  - **Airlines**: Filter by specific carriers.
- **Responsive Layout**: optimized for both desktop (sidebar + list) and mobile (stacked) views.

### Secure Booking Flow
- **Passenger Details Form**: Captures First Name, Last Name, Email, and Passport Number.
- **Order Summary**: specialized sidebar showing trip details and price breakdown (Base Fare, Taxes).
- **Add-ons**: Toggle for optional extras like Checked Baggage.

## 2. Specialized Features

### Interactive Seat Map 
- **Visual Cabin Layout**: High-fidelity 2D representation of an aircraft interior.
- **Cabin Classes**: Distinct sections for **Business Class** (2-2 layout) and **Economy** (3-3 layout).
- **Seat Selection Logic**:
  - **Available Seats**: Clickable and selectable.
  - **Occupied Seats**: Visually dimmed and disabled.
  - **Real-time Pricing**: Selecting a seat automatically updates the total trip cost in the summary.
  - **Class Differentiation**: Business class seats have a premium look and higher price point.

## 3. Technical Implementation

- **Framework**: Built with **Next.js 14+** (App Router) for performance and SEO.
- **Styling**: **Tailwind CSS** for responsive, utility-first design.
- **UI Components**: **Shadcn/UI** for accessible, consistent elements.
- **State Management**: React State for handling form inputs and seat selection.
- **Routing**: query-parameter bases search navigation (`/search?origin=...`).
