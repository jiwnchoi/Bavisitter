import { useModelState } from '@anywidget/react';
import { Button } from '@chakra-ui/react';

function TempButton() {
  const [value, setValue] = useModelState<number>('value');

  return (
    <Button colorScheme="blue" onClick={() => setValue(value + 1)}>
      count 123is {value}
    </Button>
  );
}

export default TempButton;
