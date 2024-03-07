import { ChakraProvider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import root from 'react-shadow/emotion';

function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <root.div id="shadow-root">
      <ChakraProvider>{children}</ChakraProvider>
    </root.div>
  );
}

export default Providers;
