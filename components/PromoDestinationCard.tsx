import { FC } from "react";
import { ThemedView } from "@/components/ThemedView";
import { Fragment } from "react";
import { ScrollView, TouchableOpacity, View, Image, Text } from "react-native";
import { normalize } from "@/helpers/useScaling";
import { FontFamilies } from "@/helpers/FontFamiles";

export interface CardItemProps {
  id?: any;
  destination?: string;
  class?: string;
  price?: string;
  imageUrl?: string;
  color?: string;
  onPress?: (index: any) => void;
}

interface PromoDestinationCardProps {
  data: CardItemProps[];
  color?: string;
}

const PromoDestinationCard: FC<PromoDestinationCardProps> = ({
  data,
  color,
}) => {
  return (
    <Fragment>
      {data?.length > 0 && (
        <Fragment>
          <ThemedView>
            <ScrollView
              horizontal
              style={{
                backgroundColor: "#F0F4F1",
                height: normalize(316),
              }}
              showsHorizontalScrollIndicator={false}
            >
              <ThemedView
                style={{
                  paddingLeft: normalize(20),
                  gap: 24,
                  flexDirection: "row",
                  backgroundColor: color,
                }}
              >
                {data.map((item: any, index: number) => {
                  const isLastProduct = index === data.length - 1;
                  return (
                    <View
                      key={`${item.id}-${index}`}
                      style={{
                        borderRadius: 16,
                        shadowColor: "#020617",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.06,
                        shadowRadius: 4,
                        elevation: 3,
                        marginRight: isLastProduct ? normalize(20) : 0,
                        alignSelf: "center"
                      }}
                    >
                      <TouchableOpacity
                        style={[
                          {
                            width: normalize(220),
                            height: normalize(300),
                          },
                        ]}
                        onPress={() => item.onPress(index)}
                      >
                        <View
                          style={{
                            backgroundColor: "#FFFFFF",
                            flexDirection: "column",
                            height: "100%",
                            borderRadius: 16,
                            overflow: "hidden",
                          }}
                        >
                          <View
                            style={{
                              height: normalize(148),
                              width: normalize(220),
                            }}
                          >
                            <Image
                              source={item.imageUrl}
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                                aspectRatio:
                                  normalize(220) / normalize(148),
                              }}
                            />
                          </View>
                          <View 
                            style={{ 
                              height: normalize(152),
                              flexDirection: "column",
                              justifyContent: "space-between",
                              padding: normalize(20) 
                            }}
                          >
                            <View 
                              style={{
                                gap: normalize(12)
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: FontFamilies.GTWalsheimRegular,
                                  fontSize: normalize(20),
                                }}
                              >
                                {item.destination}
                              </Text>
                              <View
                                style={{
                                  gap: normalize(6)
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: normalize(14),
                                    fontWeight: "400",
                                  }}
                                >
                                  {item.class}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: FontFamilies.GTWalsheimRegular,
                                    fontSize: normalize(20),
                                  }}
                                >
                                  from HKD {item.price}
                                </Text>
                              </View>
                            </View>
                            <Text
                              style={{
                                fontSize: normalize(14),
                                fontWeight: "400",
                                color: "#6E9F87"
                              }}
                            >
                              Book now
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ThemedView>
            </ScrollView>
          </ThemedView>
        </Fragment>
      )}
    </Fragment>
  );
};

export default PromoDestinationCard;
