import React, { FC } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { styles, sizes, radiusList } from "./styles"

interface ButtonProps {
  title?: string;
  disabled?: boolean;
  vibrateOnPress?: boolean;
  theme?: string;
  size?: string;
  radius?: string;
  icon?: React.ComponentType<any>;
  rightIcon?: React.ComponentType<any>;
  containerStyles?: object;
  children?: React.ReactNode;
  onPress?: () => void;
  [x: string]: any;
}

const Button: FC<ButtonProps> = ({
  children,
  title = "",
  disabled = false,
  vibrateOnPress = false,
  theme = "standard",
  size = "standard",
  radius = "standard",
  icon: Icon,
  rightIcon: RightIcon,
  containerStyles,
  onPress = () => {},
  ...props
}) => {
  const style = styles[theme] || styles.standard;
  const padding = sizes[size] || sizes.standard;
  const borderRadius = radiusList[radius] || radiusList.standard;
  const colorList: any = {
    standard: "#FFFFFF",
    secondary: "#7E49FF",
    light: "#000000",
    semiLight: "#565151",
    offlight: "#7E49FF",
    dark: "#FFFFFF",
  };

  const iconColor = colorList[theme];

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      disabled={disabled}
      style={{
        ...(disabled ? style.disabledWrapper : style.wrapper),
        padding,
        borderRadius,
        ...containerStyles,
      }}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          {Icon && <Icon color={iconColor} />}
          <Text style={style.title}>{title}</Text>
          {RightIcon && <RightIcon color={iconColor} />}
          {disabled && <ActivityIndicator color={iconColor} />}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
