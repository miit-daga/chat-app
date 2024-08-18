import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  styles: {
    global: {
      body: {
        margin: 0,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', sans-serif",
      },
      code: {
        fontFamily:
          "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
      },
    },
  },
  colors: {
    light: {
      background: "gray.100",
      text: "black",
    },
    dark: {
      background: "gray.700",
      text: "white",
    },
  },
});

export default theme;
