import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Animated, Dimensions, Easing } from "react-native"
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

type SwapOutProps = {
  components: React.ReactNode[];
  ref: any;
  startIndex?: number;
}

type SwapOutMethods = {
  animateOut: (goBack: boolean) => void;
}

/**
 * @description
 * This component is used to swap out components with an animation.
 * 
 * @example
 * const components = [
 *  <Te i="Test"/>,
 *  <Te i="Test1"/>
 * ]
 * 
 * const ref = useRef<any>(null);
 * 
 * const handleClick = () => {
 *  ref.current && ref.current.animateOut();
 * }
 * 
 * <SwapOut
 *  components={components}
 *  ref={ref}
 * />
 * 
 */

const SwapOut = forwardRef<SwapOutMethods, SwapOutProps>((props, ref) => {

  const [index, setIndex] = useState(props.startIndex || 0);

  const windowWidth = Dimensions.get('window').width;
  const animated = useRef(new Animated.Value(0)).current;

  const animateOut = (goBack: boolean) => {
    ReactNativeHapticFeedback.trigger('impactLight');
    Animated.timing(animated, {
      toValue: windowWidth,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      setIndex(Math.abs((index + (goBack ? -1 : 1)) % props.components.length));
      animated.setValue(-windowWidth);
      Animated.timing(animated, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      }).start();
    });
  };

  useImperativeHandle(ref, () => ({
    animateOut
  }));

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: animated }] }}>
      {props.components[index]}
    </Animated.View>
  )

})

export default SwapOut;

