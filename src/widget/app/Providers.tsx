import { ChakraProvider, DarkMode, LightMode } from "@chakra-ui/react";
import { useColorMode } from "@hooks";
import { TColorMode } from "@shared/types";
import { PropsWithChildren } from "react";
import ShadowRoot from "react-shadow/emotion";
import theme from "./theme";

function ColorMode({
  colorMode,
  children,
}: PropsWithChildren<{ colorMode: TColorMode }>) {
  return (
    <>
      {colorMode === "light" ? (
        <LightMode> {children} </LightMode>
      ) : (
        <DarkMode> {children} </DarkMode>
      )}
    </>
  );
}

function Providers({ children }: PropsWithChildren<{}>) {
  const { colorMode } = useColorMode();

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
        scrollBehavior: "smooth",
      }}
    >
      <ChakraProvider theme={theme}>
        <ColorMode colorMode={colorMode}>{children}</ColorMode>
      </ChakraProvider>
    </ShadowRoot.div>
  );
}

export default Providers;
