import React, { useEffect, useRef } from "react"
import { Animated, Easing } from "react-native";

interface INProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  animationDuration?: number;
  updateOnReRender?: boolean;
}

const DropFadeIn: React.FC<INProps> = ({ children, delay, yOffset, animationDuration, updateOnReRender }) => {

  const animated = updateOnReRender ? new Animated.Value(0) : useRef(new Animated.Value(0)).current;
  const yTranslate = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [yOffset || -100, 0]
  });

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay || 0),
      Animated.timing(animated, {
        toValue: 1,
        duration: animationDuration || 1000,
        useNativeDriver: true,
        easing: Easing.linear
      })
    ]).start()
    return () => {
      animated.setValue(0)
    }
  }, [animated])

  return (
    <Animated.View style={{opacity: animated, transform: [{translateY: yTranslate}]}}>
      {children}
    </Animated.View>
  );
}

export default DropFadeIn;
