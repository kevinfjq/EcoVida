/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },

  black: {
    full: '#000',
  },
  white: {
    full: '#fff'
  },
  green: {
    default: '#7BF087',
    100: '#185317',
    200: '#102D0F',
  },
  purple: {
    default: '#D3A9F4',
    100: '#7D30E3',
    200: '#451B7D',
  },
  gray: {
    default: "rgb(246,245,241)",
    100: "#D9D9D9",
    200: "#696767",
    300: "#534F4F",
  }
};
