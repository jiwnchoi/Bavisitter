import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import ShadowRoot from "react-shadow/emotion";

function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <ShadowRoot.div id="shadow-root">
      <ChakraProvider>{children}</ChakraProvider>
    </ShadowRoot.div>
  );
}

export default Providers;
