import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';

const MAX_PRICE = 500;

const FilterView = () => {
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(250);
  const theme = useTheme();

  const leftValue = `${(100 * minPrice) / MAX_PRICE}%`;
  const widthValue = `${(100 * (maxPrice - minPrice)) / MAX_PRICE}%`;

  return (
    <View style={{ paddingHorizontal: 24, gap: 24 }}>
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 24 }}>
        <Text style={{ flex: 1, fontSize: 20, fontWeight: "700" }}>Filters</Text>
        <TouchableOpacity>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
      {/* Price Range Selector */}
      <View style={{ paddingHorizontal: 24 }}>
        <View style={{ marginBottom: 16 }}>
          <Text>Price Range</Text>
        </View>
        <View style={{ height: 1, width: '100%', backgroundColor: theme.colors.border }}>
          <View
            style={{
              position: "absolute",
              left: leftValue,
              width: widthValue,
              height: "100%",
              backgroundColor: theme.colors.primary,
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '10%',
              height: 24,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              borderColor: theme.colors.primary,
              borderWidth: 2,
              backgroundColor:theme.colors.background,
              transform: [
                {
                translateX: -12, 
                },
                {
                translateY: -12, 
                },
            ],
              
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <Text style={{ color: theme.colors.text, opacity: 0.5 }}>0$</Text>
          <Text style={{ color: theme.colors.text, opacity: 0.5 }}>{MAX_PRICE}$</Text>
        </View>
      </View>
    </View>
  );
};

export default FilterView;
