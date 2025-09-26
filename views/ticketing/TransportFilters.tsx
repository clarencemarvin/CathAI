import React, { useState, useRef } from "react";
import { TouchableOpacity, Text, ViewToken, FlatList } from "react-native";
import Animated from "react-native-reanimated";
import { normalize } from "@/helpers/useScaling";

type TransportFilter = {
  id: string;
  name: string;
};

type TransportFiltersProps = {
  filters: TransportFilter[];
  onFilterSelect: (filterId: string) => void;
};

export function TransportFilters({
  filters,
  onFilterSelect,
}: TransportFiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const flatListRef = useRef<FlatList>(null);

  const handleFilterPress = (filterId: string, index: number) => {
    setSelectedFilter(filterId);
    onFilterSelect(filterId);

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewOffset: 16,
      viewPosition: 0,
    });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: TransportFilter;
    index: number;
  }) => (
    <TouchableOpacity
      style={[
        {
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 40,
          marginRight: 16,
          flex: 1,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
          marginBottom: normalize(16),
        },
        index === 0 && { marginLeft: 16 },
        index === filters.length - 1 && { marginRight: 16 },
        selectedFilter === item.id && {
          backgroundColor: "#006564",
        },
      ]}
      onPress={() => handleFilterPress(item.id, index)}
    >
      <Text
        style={[
          {
            fontSize: normalize(14),
            color: "#000",
          },
          selectedFilter === item.id && { color: "#fff" },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Animated.FlatList
      ref={flatListRef}
      data={filters}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      initialScrollIndex={0}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onScrollToIndexFailed={(info) => {
        const wait = new Promise((resolve) => setTimeout(resolve, 500));
        wait.then(() => {
          flatListRef.current?.scrollToIndex({
            index: info.index,
            animated: true,
          });
        });
      }}
    />
  );
}
