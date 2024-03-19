import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  components: {
    Container: {
      baseStyle: (props: StyleFunctionProps) => ({
        background: props.colorMode === "light" ? "gray.50" : "gray.800",
        color: props.colorMode === "light" ? "gray.800" : "gray.50",
        borderRadius: "lg",
      }),
    },
  },
});

export default theme;
