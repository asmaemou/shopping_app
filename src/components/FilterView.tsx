import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
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
      {/* Range Selector */}
      <View style={{ paddingHorizontal: 24 }}>
        <View style={{ marginBottom: 24 }}>
          <Text>Price Range</Text>
        </View>
        <View style={{ height: 1, width: '100%', backgroundColor: theme.colors.border }}>
          <View
            style={{
              position: "absolute",
              left: 0, // Numeric value for left
              width: widthValue, // Numeric value for width
              height: "100%",
              backgroundColor: theme.colors.primary,
            }}
          />

          <View
            style={{
              position: 'absolute',
              left: "10%", // Numeric value for left
              height: 24,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              borderColor: theme.colors.primary,
              borderWidth: 2,
              backgroundColor: theme.colors.background,
              transform: [
                {
                  translateX: -12,
                },
                {
                  translateY: -12,
                },
              ],
            }}
          >
            <View
              style={{
                width: 3,
                height: 3,
                borderRadius: 10,
                backgroundColor: theme.colors.primary,
              }}
            />
          </View>

          <View style={{
            position: "absolute",
            left: "10%",
          }}>
            {/* Placeholder for SliderHandle component */}
          </View>

          <View style={{
            position: "absolute",
            right: "14%",
          }}>
            {/* Placeholder for SliderHandle component */}
          </View>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 12,
        }}>
          <Text style={{ color: theme.colors.text, opacity: 0.5 }}>0$</Text>
          <Text style={{ color: theme.colors.text, opacity: 0.5 }}>{MAX_PRICE}$</Text>
        </View>
      </View>

      {/*  Sports Category Filter  */}
      <View style={{ paddingHorizontal: 24 }}>
        <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 12 }}>Sports</Text>
        <View style={{ flexDirection: 'row', flexWrap: "wrap", gap: 12 }}>
          {new Array(20).fill("").map((_, i) => (
            <View key={i} style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 100,
              backgroundColor: i === 0 ? theme.colors.primary : theme.colors.text,
            }}>
              <Text style={{
                fontSize: 14,
                fontWeight: "600",
                color: i === 0 ? theme.colors.background : theme.colors.text,
              }}>
                {i === 0 ? "Running [3]" : "Some Text"}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default FilterView;


const SliderHandle = () => {
    const theme=useTheme()
    return(
        <View
            style={{
            height: 24,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.background,
            transform: [
                {
                translateX: -12,
                },
                {
                translateY: -12,
                },
            ],
            }}
      >
        <View
          style={{
            width: 3,
            height: 3,
            borderRadius: 10,
            backgroundColor: theme.colors.primary,
          }}
        />
      </View>
    )
}