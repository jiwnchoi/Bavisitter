import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "system",
  useSystemColorMode: true,
  // body margin padding 0 w max
  styles: {
    global: {
      body: {
        margin: 0,
        padding: 0,
        width: "100%",
        maxWidth: "100%",
      },
    },
  },
});

export default theme;
