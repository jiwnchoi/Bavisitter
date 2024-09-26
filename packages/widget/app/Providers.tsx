import { useModelState } from "@anywidget/react";
import { ChakraProvider, DarkMode, LightMode, useColorMode } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import type { TColorMode } from "@shared/types";
import { type PropsWithChildren, useEffect } from "react";
import ShadowRoot from "react-shadow/emotion";
import theme from "./theme";

function ColorMode({ children }: PropsWithChildren) {
  const { colorMode } = useColorMode();
  const [modelColorMode] = useModelState<TColorMode>("color_mode");
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode(modelColorMode);
  }, [modelColorMode, setColorMode]);

  const globalStyles = css`
    *::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    *::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: ${colorMode === "light"
        ? "rgba(0, 0, 0, 0.1)"
        : "rgba(255, 255, 255, 0.1)"};
    }

    *::-webkit-scrollbar-track {
      background-color: transparent;
    }
  `;
  return (
    <>
      <Global styles={globalStyles} />
      {colorMode === "light" ? (
        <LightMode> {children} </LightMode>
      ) : (
        <DarkMode> {children} </DarkMode>
      )}
    </>
  );
}

function Providers({ children }: PropsWithChildren) {
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
      }}>
      <ChakraProvider theme={theme}>
        <ColorMode>{children}</ColorMode>
      </ChakraProvider>
    </ShadowRoot.div>
  );
}

export default Providers;
