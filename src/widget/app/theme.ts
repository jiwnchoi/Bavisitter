import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  components: {
    Container: {
      baseStyle: (props: StyleFunctionProps) => ({
        background: props.colorMode === "light" ? "white" : "gray.800",
        color: props.colorMode === "light" ? "gray.700" : "gray.100",
        borderRadius: "lg",
      }),
    },
  },
});

export default theme;
