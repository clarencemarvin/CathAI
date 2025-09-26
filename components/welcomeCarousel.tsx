import { forwardRef, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  interpolate,
  ReduceMotion,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
  TAnimationStyle,
} from "react-native-reanimated-carousel";
import Image from "@/components/image";
import { FontFamilies } from "@/helpers/FontFamilies";

interface WelcomeData {
  image_url: any;
  title: string;
  description: string;
}

interface ItemProps {
  index: number;
  animationValue: SharedValue<number>;
  data: WelcomeData[];
}

const SlideItem: React.FC<ItemProps> = ({ index, animationValue, data }) => {
  const { width, height } = useWindowDimensions();

  const imageStyle = useAnimatedStyle(() => {
    const zIndex = interpolate(animationValue.value, [-1, 0, 1], [10, 20, 30]);
    const translateX = interpolate(
      animationValue.value,
      [-2, 0, 1],
      [-width, 0, width]
    );

    return {
      transform: [{ translateX }],
      zIndex,
    };
  }, []);

  const descStyle = useAnimatedStyle(() => {
    const zIndex = interpolate(animationValue.value, [-1, 0, 1], [10, 20, 30]);
    const opacity = interpolate(animationValue.value, [-0.5, 0, 1], [0, 1, 0]);

    return {
      zIndex,
      opacity,
    };
  }, []);

  useEffect(() => {
    animationValue.value = withTiming(animationValue.value, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      reduceMotion: ReduceMotion.System,
    });
  }, []);

  return (
    <View key={index} style={styles.container}>
      <Animated.View pointerEvents="none" style={[imageStyle]}>
        <Image
          source={data[index].image_url}
          style={{
            width: "100%",
            height: height * 0.45,
            resizeMode: "cover",
          }}
        />
      </Animated.View>
      <View
        pointerEvents="none"
        style={{
          marginTop: 32,
          paddingHorizontal: 32,
          gap: 32,
        }}
      >
        <View>
          <Image
            source={require("@/assets/images/PCW_logo.jpg")}
            style={styles.logo_image}
          />
        </View>
        <Animated.View pointerEvents="none" style={descStyle}>
          <Text style={styles.title}>{data[index].title}</Text>
          <Text style={styles.description}>{data[index].description}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

interface WelcomeCarouselProps {
  inputProgress?: SharedValue<number>;
  initialPage?: number;
  data: WelcomeData[];
}

export const WelcomeCarousel = forwardRef<
  ICarouselInstance,
  WelcomeCarouselProps
>(({ inputProgress, initialPage = 0, data }, ref) => {
  const progress = inputProgress || useSharedValue<number>(0);
  const { width, height } = useWindowDimensions();

  const animationStyle: TAnimationStyle = useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0], [10, 20]);
    const opacity = interpolate(value, [1, 0], [0, 1]);

    return {
      zIndex,
      opacity,
    };
  }, []);

  return (
    <View style={{ height: Math.ceil((width * 3) / 4) + 300 }}>
      <Carousel
        ref={ref}
        loop={false}
        autoPlay={false}
        defaultIndex={initialPage}
        width={width}
        height={height * 0.4 + 280}
        data={data}
        onProgressChange={progress}
        scrollAnimationDuration={300}
        renderItem={({ index, animationValue }) => (
          <SlideItem
            key={index}
            index={index}
            animationValue={animationValue}
            data={data}
          />
        )}
        customAnimation={animationStyle}
      />
      <Pagination.Basic
        data={data}
        progress={progress}
        containerStyle={{ gap: 8, marginTop: 10 }}
        dotStyle={{
          borderRadius: 100,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
        activeDotStyle={{
          borderRadius: 100,
          overflow: "hidden",
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    resizeMode: "cover",
  },
  logo_image: {
    width: 184.8,
    height: 24,
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    fontFamily: FontFamilies.GTWalsheimRegular,
    color: "#444A54",
    lineHeight: 25,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: "SF UI Text",
    fontWeight: "400",
    color: "#444A54",
    lineHeight: 20,
  },
});
