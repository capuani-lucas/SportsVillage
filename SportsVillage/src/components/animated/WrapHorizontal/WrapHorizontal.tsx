import React, { useEffect } from "react"
import { Dimensions, Animated, Easing, StyleProp, ViewStyle } from "react-native";

interface INProps {
  children: React.ReactNode;
  startingValue?: number;
  customStyle?: StyleProp<ViewStyle>;
  animationDuration?: number;
}

const WrapHorizontal: React.FC<INProps> = ({ children, startingValue, customStyle, animationDuration }) => {

  const windowWidth = Dimensions.get('window').width;
  const animated = React.useRef(new Animated.Value(startingValue || -windowWidth)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.timing(animated, {
        toValue: windowWidth,
        duration: animationDuration || 14000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start()
  }, [animated])

  return (
    <Animated.View style={[customStyle, {width: "100%", transform: [{translateX: animated}]}]}>
      {children}
    </Animated.View>
  )
}

export default WrapHorizontal;