import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import ShadowRoot from "react-shadow/emotion";
import theme from "./theme";

function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <ShadowRoot.div
      id="shadow-root"
      style={{
        width: "100%",
        margin: 0,
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ShadowRoot.div>
  );
}

export default Providers;
