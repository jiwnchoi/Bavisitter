import { useModelState } from "@anywidget/react";
import {
  ChakraProvider,
  DarkMode,
  LightMode,
  useColorMode,
} from "@chakra-ui/react";
import { TColorMode } from "@shared/types";
import { PropsWithChildren, useEffect } from "react";
import ShadowRoot from "react-shadow/emotion";
import theme from "./theme";

function ColorMode({ children }: PropsWithChildren<{}>) {
  const { colorMode } = useColorMode();
  const [modelColorMode] = useModelState<TColorMode>("color_mode");
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode(modelColorMode);
  }, []);

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
        <ColorMode>{children}</ColorMode>
      </ChakraProvider>
    </ShadowRoot.div>
  );
}

export default Providers;
