import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: true,
  components: {
    Container: {
      baseStyle: (props: StyleFunctionProps) => ({
        background: props.colorMode === "light" ? "white" : "gray.800",
        color: props.colorMode === "light" ? "gray.700" : "gray.100",
        borderRadius: "lg",
      }),
    },
    Flex: {
      baseStyle: (props: StyleFunctionProps) => ({
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar": {
          backgroundColor: "transparent",
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor:
            props.colorMode === "light"
              ? "rgba(0, 0, 0, 0.1)"
              : "rgba(255, 255, 255, 0.1)",
        },
      }),
    },
  },
});

export default theme;
