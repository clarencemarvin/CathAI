from fastapi import APIRouter, HTTPException
from typing import List, Dict
from datetime import datetime, timedelta
import random
from .transport_data import train_routes, cathay_flights, bus_routes, ferry_routes

router = APIRouter()

@router.get("/ferry/routes")
async def get_ferry_routes():
    return {"routes": ferry_routes}

@router.get("/ferry/schedules/{identifier}")
async def get_ferry_schedules(identifier: str):
    route = next((r for r in ferry_routes if r["identifier"] == identifier), None)
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")
    
    return {
        "transportType": "ferry",
        "identifier": route["identifier"],
        "duration": route["duration"],
        "departureTime": route["departureTime"],
        "departureLocation": route["departureLocation"],
        "arrivalTime": route["arrivalTime"],
        "arrivalLocation": route["arrivalLocation"],
        "carbonEmissions": route["carbonEmissions"],
        "class": route["class"],
        "currency": route["currency"],
        "price": route["price"]
    }

@router.get("/bus/routes")
async def get_bus_routes():
    return {"routes": bus_routes}

@router.get("/bus/schedules/{identifier}")
async def get_bus_schedules(identifier: str):
    route = next((r for r in bus_routes if r["identifier"] == identifier), None)
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")
    
    return {
        "transportType": "bus",
        "identifier": route["identifier"],
        "duration": route["duration"],
        "departureTime": route["departureTime"],
        "departureLocation": route["departureLocation"],
        "arrivalTime": route["arrivalTime"],
        "arrivalLocation": route["arrivalLocation"],
        "carbonEmissions": route["carbonEmissions"],
        "class": route["class"],
        "currency": route["currency"],
        "price": route["price"]
    }

@router.get("/train/routes")
async def get_train_routes():
    return {"routes": train_routes}

@router.get("/train/schedules/{identifier}")
async def get_train_schedules(identifier: str):
    route = next((r for r in train_routes if r["identifier"] == identifier), None)
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")
    
    return {
        "transportType": "train",
        "identifier": route["identifier"],
        "duration": route["duration"],
        "departureTime": route["departureTime"],
        "departureLocation": route["departureLocation"],
        "arrivalTime": route["arrivalTime"],
        "arrivalLocation": route["arrivalLocation"],
        "carbonEmissions": route["carbonEmissions"],
        "class": route["class"],
        "currency": route["currency"],
        "price": route["price"]
    }

@router.get("/flights/{origin}/{destination}")
async def get_flights(origin: str, destination: str):
    filtered_flights = [
        f for f in cathay_flights 
        if f["departureLocation"] == origin.upper() 
        and f["arrivalLocation"] == destination.upper()
    ]
    
    if not filtered_flights:
        raise HTTPException(status_code=404, detail="No flights found for this route")
    
    return filtered_flights


# from typing import List, Optional
# from pydantic import BaseModel

# class RouteOption(BaseModel):
#     transportType: str
#     identifier: str
#     duration: str
#     departureTime: str
#     departureLocation: str
#     arrivalTime: str
#     arrivalLocation: str
#     carbonEmissions: int
#     class_type: str
#     currency: str
#     original_price: float
#     converted_price: Optional[float] = None
#     number_of_transfers: int
#     transfer_locations: List[str] = []

# Currency conversion rates
CURRENCY_RATES = {
    "IDR": {
        "HKD": 2037.71,
        "CNY": 2208.17,
    },
    "SGD": {
        "HKD": 0.17,
        "CNY": 0.19,
    }
}
from datetime import datetime, timedelta

def parse_time(time_str: str) -> datetime:
    """Convert time string (HH:MM) to datetime object"""
    current_date = datetime.now().date()
    return datetime.strptime(f"{current_date} {time_str}", "%Y-%m-%d %H:%M")

def calculate_time_difference(departure: str, arrival: str) -> int:
    """Calculate minutes between departure and arrival, handling day crossover"""
    dep_time = parse_time(departure)
    arr_time = parse_time(arrival)
    if arr_time < dep_time:  # Handles flights crossing midnight
        arr_time += timedelta(days=1)
    return int((arr_time - dep_time).total_seconds() / 60)

@router.get("/routes/search/{origin}/{destination}")
async def search_all_routes(origin: str, destination: str):
    """
    Search for all possible routes between origin and destination,
    including direct routes and routes with transfers.
    Considers timing constraints and ensures feasible connections.
    """
    all_options = []
    origin = origin.upper()
    destination = destination.upper()
    
    # Determine source currency based on origin
    source_currency = None
    if origin == "SIN":
        source_currency = "SGD"
    elif origin == "CGK":
        source_currency = "IDR"
    else:
        raise HTTPException(
            status_code=400,
            detail="Only routes from Singapore (SIN) and Jakarta (CGK) are supported"
        )

    def convert_to_source_currency(price: float, current_currency: str) -> float:
        if current_currency == source_currency:
            return price
        if source_currency == "SGD":
            if current_currency in CURRENCY_RATES["SGD"]:
                return price * CURRENCY_RATES["SGD"][current_currency]
        elif source_currency == "IDR":
            if current_currency in CURRENCY_RATES["IDR"]:
                return price * CURRENCY_RATES["IDR"][current_currency]
        return price

    # Process direct flights
    direct_flights = [
        f for f in cathay_flights 
        if f["departureLocation"] == origin 
        and f["arrivalLocation"] == destination
    ]
    
    for flight in direct_flights:
        option = {
            **flight,
            "number_of_transfers": 0,
            "transfer_locations": [],
            "original_currency": flight["currency"],
            "source_currency": source_currency,
            "original_price": flight["price"],
            "converted_price": convert_to_source_currency(flight["price"], flight["currency"]),
            "total_duration_minutes": calculate_time_difference(
                flight["departureTime"], 
                flight["arrivalTime"]
            )
        }
        all_options.append(option)

    # Process transfers through Hong Kong
    transfer_flights = [
        f for f in cathay_flights 
        if f["departureLocation"] == origin 
        and f["arrivalLocation"] == "HKG"
    ]

    for first_leg in transfer_flights:
        first_leg_arrival = parse_time(first_leg["arrivalTime"])
        
        # Add 45 minutes minimum transfer time
        min_transfer_time = first_leg_arrival + timedelta(minutes=45)

        # Find connecting transport options from HKG
        connecting_options = []
        
        # Add train options with timing check
        connecting_trains = [
            t for t in train_routes 
            if t["departureLocation"] == "HKG" 
            and t["arrivalLocation"] == destination
            and parse_time(t["departureTime"]) >= min_transfer_time
            and parse_time(t["departureTime"]) <= first_leg_arrival + timedelta(hours=6)  # Max 6 hours waiting
        ]
        connecting_options.extend(connecting_trains)
        
        # Add ferry options with timing check
        connecting_ferries = [
            f for f in ferry_routes 
            if f["departureLocation"] == "HKG" 
            and f["arrivalLocation"] == destination
            and parse_time(f["departureTime"]) >= min_transfer_time
            and parse_time(f["departureTime"]) <= first_leg_arrival + timedelta(hours=6)
        ]
        connecting_options.extend(connecting_ferries)
        
        # Add bus options with timing check
        connecting_buses = [
            b for b in bus_routes 
            if b["departureLocation"] == "HKG" 
            and b["arrivalLocation"] == destination
            and parse_time(b["departureTime"]) >= min_transfer_time
            and parse_time(b["departureTime"]) <= first_leg_arrival + timedelta(hours=6)
        ]
        connecting_options.extend(connecting_buses)

        # Create combined routes
        for second_leg in connecting_options:
            # Calculate total duration
            total_duration = (
                calculate_time_difference(first_leg["departureTime"], first_leg["arrivalTime"]) +  # First leg duration
                calculate_time_difference(first_leg["arrivalTime"], second_leg["departureTime"]) +  # Transfer time
                calculate_time_difference(second_leg["departureTime"], second_leg["arrivalTime"])   # Second leg duration
            )

            # Calculate prices
            first_leg_price = convert_to_source_currency(
                first_leg["price"], 
                first_leg["currency"]
            )
            second_leg_price = convert_to_source_currency(
                second_leg["price"], 
                second_leg["currency"]
            )
            total_price = first_leg_price + second_leg_price

            transfer_option = {
                "transportType": f"{first_leg['transportType']}+{second_leg['transportType']}",
                "identifier": f"{first_leg['identifier']}+{second_leg['identifier']}",
                "duration": f"{total_duration}m",
                "departureTime": first_leg["departureTime"],
                "departureLocation": origin,
                "transferLocation": "HKG",
                "transferArrivalTime": first_leg["arrivalTime"],
                "transferDepartureTime": second_leg["departureTime"],
                "transferWaitTime": calculate_time_difference(
                    first_leg["arrivalTime"], 
                    second_leg["departureTime"]
                ),
                "arrivalTime": second_leg["arrivalTime"],
                "arrivalLocation": destination,
                "carbonEmissions": first_leg["carbonEmissions"] + second_leg["carbonEmissions"],
                "class": f"{first_leg['class']}/{second_leg['class']}",
                "source_currency": source_currency,
                "original_price": first_leg["price"] + second_leg["price"],
                "converted_price": total_price,
                "number_of_transfers": 1,
                "transfer_locations": ["HKG"],
                "total_duration_minutes": total_duration,
                "first_leg": {
                    "transport_type": first_leg["transportType"],
                    "identifier": first_leg["identifier"],
                    "departure": first_leg["departureTime"],
                    "arrival": first_leg["arrivalTime"],
                    "price": first_leg_price
                },
                "second_leg": {
                    "transport_type": second_leg["transportType"],
                    "identifier": second_leg["identifier"],
                    "departure": second_leg["departureTime"],
                    "arrival": second_leg["arrivalTime"],
                    "price": second_leg_price
                }
            }
            all_options.append(transfer_option)

    # Sort options by total duration and price
    all_options.sort(key=lambda x: (x["total_duration_minutes"], x["converted_price"]))

    if not all_options:
        raise HTTPException(
            status_code=404,
            detail=f"No routes found from {origin} to {destination}"
        )

    return {
        "origin": origin,
        "destination": destination,
        "source_currency": source_currency,
        "number_of_options": len(all_options),
        "routes": all_options
    }