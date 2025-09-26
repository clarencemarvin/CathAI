import { TicketCard } from "@/views/ticketing/TicketCard";
import { TransportFilters } from "@/views/ticketing/TransportFilters";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { useState } from "react";
import { TicketSorting } from "@/views/ticketing/TicketSorting";
import { TicketHeader } from "@/views/ticketing/TicketHeader";
import { normalize } from "@/helpers/useScaling";
import { router } from "expo-router";

type RouteData = {
  departure: string;
  arrival: string;
  date: string;
  tickets: Array<any>;
  filters: Array<{ id: string; name: string }>;
};

export default function TicketScreen() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isPriceSorted, setIsPriceSorted] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("CGK-HKG");

  const routes: Record<string, RouteData> = {
    "CGK-HKG": {
      departure: "Jakarta",
      arrival: "Hong Kong",
      date: "Mon 11 Nov 2024",
      tickets: [
        {
          transportType: "plane",
          identifier: "CX 5624",
          duration: "4h 50m",
          departureTime: "10:10",
          departureLocation: "CGK",
          arrivalTime: "15:00",
          arrivalLocation: "HKG",
          carbonEmissions: 382,
          class: "Economy",
          currency: "IDR",
          price: 4860000.0,
          onSelect: () => setCurrentRoute("HKG-SZX"),
          onViewDetails: () => console.log("Flight details viewed"),
        },
        {
          transportType: "plane",
          identifier: "CX 7862",
          duration: "4h 45m",
          departureTime: "12:15",
          departureLocation: "CGK",
          arrivalTime: "17:00",
          arrivalLocation: "HKG",
          carbonEmissions: 375,
          class: "Economy",
          currency: "IDR",
          price: 5190000.0,
          onSelect: () => setCurrentRoute("HKG-SZX"),
          onViewDetails: () => console.log("Flight details viewed"),
        },
        {
          transportType: "plane",
          identifier: "CX 5241",
          duration: "7h 30m",
          departureTime: "14:30",
          departureLocation: "CGK",
          arrivalTime: "22:00",
          arrivalLocation: "HKG",
          carbonEmissions: 410,
          class: "Economy",
          currency: "IDR",
          price: 4290000.0,
          onSelect: () => setCurrentRoute("HKG-SZX"),
          onViewDetails: () => console.log("Flight details viewed"),
        },
      ],
      filters: [
        { id: "all", name: "All" },
        { id: "flight", name: "Flight" },
      ],
    },
    "HKG-SZX": {
      departure: "Hong Kong",
      arrival: "Shenzhen",
      date: "Mon 11 Nov 2024",
      tickets: [
        // Ferry options
        {
          transportType: "ferry",
          identifier: "TurboJET 516",
          duration: "1h",
          departureTime: "16:00",
          departureLocation: "HKG",
          arrivalTime: "17:00",
          arrivalLocation: "SZX",
          carbonEmissions: 12,
          class: "Economy",
          currency: "IDR",
          price: 418000.0,
          onSelect: () => router.push("/(ticket)/journey"),
          onViewDetails: () => console.log("Ferry details viewed"),
        },
        {
          transportType: "ferry",
          identifier: "TurboJET 518",
          duration: "1h",
          departureTime: "17:30",
          departureLocation: "HKG",
          arrivalTime: "18:30",
          arrivalLocation: "SZX",
          carbonEmissions: 12,
          class: "Economy",
          currency: "IDR",
          price: 380000.0,
          onSelect: () => router.push("/(ticket)/journey"),
          onViewDetails: () => console.log("Ferry details viewed"),
        },
        {
          transportType: "ferry",
          identifier: "TurboJET 520",
          duration: "1h",
          departureTime: "19:00",
          departureLocation: "HKG",
          arrivalTime: "20:00",
          arrivalLocation: "SZX",
          carbonEmissions: 12,
          class: "Economy",
          currency: "IDR",
          price: 342000.0,
          onSelect: () => router.push("/(ticket)/journey"),
          onViewDetails: () => console.log("Ferry details viewed"),
        },
        // Train options
        {
          transportType: "train",
          identifier: "MTR + HSR 101",
          duration: "1h 30m",
          departureTime: "16:30",
          departureLocation: "HKG",
          arrivalTime: "18:00",
          arrivalLocation: "SZX",
          carbonEmissions: 5,
          class: "Standard",
          currency: "IDR",
          price: 342000.0,
          onSelect: () => router.push("/(ticket)/journey"),
          onViewDetails: () => console.log("Train details viewed"),
        },
        {
          transportType: "train",
          identifier: "MTR + HSR 103",
          duration: "1h 30m",
          departureTime: "17:30",
          departureLocation: "HKG",
          arrivalTime: "19:00",
          arrivalLocation: "SZX",
          carbonEmissions: 5,
          class: "Standard",
          currency: "IDR",
          price: 342000.0,
          onSelect: () => router.push("/(ticket)/journey"),
          onViewDetails: () => console.log("Train details viewed"),
        },
        {
          transportType: "train",
          identifier: "MTR + HSR 105",
          duration: "1h 30m",
          departureTime: "18:30",
          departureLocation: "HKG",
          arrivalTime: "20:00",
          arrivalLocation: "SZX",
          carbonEmissions: 5,
          class: "Standard",
          currency: "IDR",
          price: 304000.0,
          onSelect: () => router.push("/(ticket)/journey"),
          onViewDetails: () => console.log("Train details viewed"),
        },
        // Bus options
        {
          transportType: "bus",
          identifier: "B2P Express",
          duration: "1h 45m",
          departureTime: "16:00",
          departureLocation: "HKG",
          arrivalTime: "17:45",
          arrivalLocation: "SZX",
          carbonEmissions: 8,
          class: "Standard",
          currency: "IDR",
          price: 228000.0,
          onSelect: () => router.push("/(ticket)/journey"),
          onViewDetails: () => console.log("Bus details viewed"),
        },
        {
          transportType: "bus",
          identifier: "B2P Express",
          duration: "1h 45m",
          departureTime: "17:30",
          departureLocation: "HKG",
          arrivalTime: "19:15",
          arrivalLocation: "SZX",
          carbonEmissions: 8,
          class: "Standard",
          currency: "IDR",
          price: 209000.0,
          onSelect: () => router.push("/(ticket)/journey"),
          onViewDetails: () => console.log("Bus details viewed"),
        },
        {
          transportType: "bus",
          identifier: "B2P Express",
          duration: "1h 45m",
          departureTime: "19:00",
          departureLocation: "HKG",
          arrivalTime: "20:45",
          arrivalLocation: "SZX",
          carbonEmissions: 8,
          class: "Standard",
          currency: "IDR",
          price: 190000.0,
          onSelect: () => router.push("/(ticket)/journey"),
          onViewDetails: () => console.log("Bus details viewed"),
        },
      ],
      filters: [
        { id: "all", name: "All" },
        { id: "ferry", name: "Ferry" },
        { id: "rail", name: "High Speed Rail" },
        { id: "bus", name: "Bus + MTR" },
      ],
    },
  };

  const routeData = routes[currentRoute];
  const allTickets = routeData.tickets;
  const transportFilters = routeData.filters;

  const filterToTransportType: Record<string, string> = {
    ferry: "ferry",
    rail: "train",
    bus: "bus",
    flight: "plane",
  };

  const handlePriceSort = () => {
    setIsPriceSorted(!isPriceSorted);
  };

  const filteredTickets = allTickets
    .filter((ticket) => {
      if (selectedFilter === "all") {
        return true;
      }
      return ticket.transportType === filterToTransportType[selectedFilter];
    })
    .sort((a, b) => {
      if (isPriceSorted) {
        return a.price - b.price;
      }
      return 0;
    });

  const ticketCounts = allTickets.reduce((acc, ticket) => {
    acc[ticket.transportType] = (acc[ticket.transportType] || 0) + 1;
    acc.total = (acc.total || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getDisplayCount = (filterId: string) => {
    if (filterId === "all") {
      return ticketCounts.total || 0;
    }
    const transportType = filterToTransportType[filterId];
    return ticketCounts[transportType] || 0;
  };

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F8F7F7", flex: 1 }}>
      <ScrollView style={{ paddingTop: 16 }}>
        <TicketHeader
          type="departing"
          departure={routeData.departure}
          arrival={routeData.arrival}
          date={routeData.date}
        />
        <TicketSorting
          isPriceSorted={isPriceSorted}
          onPriceSort={handlePriceSort}
        />
        <Text
          style={{
            marginBottom: normalize(20),
            paddingHorizontal: 20,
            fontWeight: "300",
            fontSize: normalize(14),
          }}
        >
          Price displayed is the fare per adult including taxes/fees/charges.
        </Text>
        <View>
          <TransportFilters
            filters={transportFilters}
            selectedFilter={selectedFilter}
            onFilterSelect={handleFilterSelect}
          />
          <View style={{ paddingVertical: normalize(16) }}>
            <Text
              style={{
                marginBottom: 12,
                fontWeight: "300",
                paddingHorizontal: 20,
                fontSize: normalize(14),
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: normalize(14),
                }}
              >
                {getDisplayCount(selectedFilter)}
              </Text>
              {` ${
                selectedFilter === "all"
                  ? getDisplayCount(selectedFilter) === 1
                    ? "ticket"
                    : "tickets"
                  : selectedFilter === "rail"
                  ? getDisplayCount(selectedFilter) === 1
                    ? "high speed rail"
                    : "high speed rails"
                  : selectedFilter === "bus"
                  ? getDisplayCount(selectedFilter) === 1
                    ? "bus"
                    : "buses"
                  : selectedFilter === "ferry"
                  ? getDisplayCount(selectedFilter) === 1
                    ? "ferry"
                    : "ferries"
                  : getDisplayCount(selectedFilter) === 1
                  ? selectedFilter
                  : `${selectedFilter}s`
              } found`}
            </Text>

            {filteredTickets.map((ticket, index) => (
              <TicketCard
                key={index}
                {...ticket}
                variant="ticket"
                style={{ marginHorizontal: 20, marginBottom: 16 }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
