import { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface FlexProps {
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  height?: number | string;
  width?: number | string;
  padding?: number;
  paddingY?: number;
  paddingX?: number;
  backgroundColor?: string;
  flex?: number;
  style?: ViewStyle;
}

export function Flex({
  children,
  direction = 'column',
  align,
  justify,
  wrap,
  paddingX,
  paddingY,
  style,
  ...otherProps
}: PropsWithChildren<FlexProps>) {
  const flexStyle:StyleProp<ViewStyle>={ 
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        paddingHorizontal: paddingX,
        paddingVertical: paddingY,
        ...style,
        ...otherProps as ViewStyle,
      } 
  return (

    <View
      style={flexStyle}
    >
      {children}
    </View>
  );
}