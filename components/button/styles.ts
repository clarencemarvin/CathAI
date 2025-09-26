import { normalize } from "../../helpers/useScaling";

const { StyleSheet } = require("react-native");

const BaseStyle = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: normalize(16),
    flexDirection: "row",
    gap: 8,
  },
  title: {
    fontSize: normalize(16),
    fontWeight: "bold",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 16,
  },
});

const standard = StyleSheet.create({
  wrapper: {
    ...BaseStyle.wrapper,
    backgroundColor: "#006564",
  },
  title: {
    ...BaseStyle.title,
    color: "#FFFFFF",
  },
  dot: {
    ...BaseStyle.dot,
    backgroundColor: "#FFFFFF",
  },
  disabledWrapper: {
    ...BaseStyle.wrapper,
    backgroundColor: "#E2E2E2",
  },
});

const secondary = StyleSheet.create({
  wrapper: {
    ...BaseStyle.wrapper,
    backgroundColor: "#ECE8FF",
  },
  title: {
    ...BaseStyle.title,
    color: "#7E49FF",
  },
  dot: {
    ...BaseStyle.dot,
    backgroundColor: "#7E49FF",
  },
});

const light = StyleSheet.create({
  wrapper: {
    ...BaseStyle.wrapper,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  title: {
    ...BaseStyle.title,
    color: "#020617",
  },
  dot: {
    ...BaseStyle.dot,
    backgroundColor: "#020617",
  },
});

const semiLight = StyleSheet.create({
  wrapper: {
    ...BaseStyle.wrapper,
    borderWidth: 0,
    backgroundColor: "#E4E6E8",
  },
  title: {
    ...BaseStyle.title,
    color: "#565151",
  },
  dot: {
    ...BaseStyle.dot,
    backgroundColor: "#020617",
  },
});

const offlight = StyleSheet.create({
  wrapper: {
    ...BaseStyle.wrapper,
  },
  title: {
    ...BaseStyle.title,
    color: "#7E49FF",
    fontSize: normalize(14),
    textDecorationLine: "underline",
  },
  dot: {
    ...BaseStyle.dot,
    backgroundColor: "#7E49FF",
  },
});

const dark = StyleSheet.create({
  wrapper: {
    ...BaseStyle.wrapper,
    backgroundColor: "#303436",
  },
  title: {
    ...BaseStyle.title,
    color: "#FFFFFF",
  },
  dot: {
    ...BaseStyle.dot,
    backgroundColor: "#FFFFFF",
  },
});

const styles: any = {
  standard,
  secondary,
  light,
  semiLight,
  offlight,
  dark,
};
const sizes: any = {
  standard: normalize(16),
  secondary: normalize(12),
  light: normalize(8),
  offlight: normalize(4),
};

const radiusList: any = {
  small: normalize(8),
  standard: normalize(12),
  full: normalize(9999),
  none: 0,
};
export { styles, sizes, radiusList };
