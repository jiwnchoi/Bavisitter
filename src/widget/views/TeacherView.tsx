import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  Icon,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import { FaTools } from "react-icons/fa";
import { FaBaby, FaBabyCarriage } from "react-icons/fa6";
const dummy = [
  {
    problem: "Data on y-axis is skewed positive",
    solution:
      "Remove nullish and non-positive values and apply log scale to y-axis",
  },
  {
    problem: "Data on x-axis is skewed positive",
    solution:
      "Remove nullish and non-positive values and apply log scale to x-axis.",
  },
  {
    problem: "Mark is overplotted",
    solution: "Reduce opacity.",
  },
];

export default function TeacherView() {
  return (
    <SimpleGrid flexDir={"row"} gap={4} minChildWidth={"280px"} w="full">
      {dummy.map((prompt, index) => (
        <Flex
          flexDir={"column"}
          align={"center"}
          h="80px"
          borderRadius={8}
          borderWidth={1}
          p={2}
          gap={2}
        >
          <Center fontSize={"sm"} h="full">
            {`${prompt.problem}`}
          </Center>
          <ButtonGroup w="full">
            <Button
              colorScheme="green"
              variant={"outline"}
              w="full"
              leftIcon={<Icon as={FaTools} />}
              size="xs"
              key={`solution${index}`}
            >
              {"Rule"}
            </Button>
            <Button
              colorScheme="yellow"
              variant={"outline"}
              w="full"
              leftIcon={<Icon as={FaBabyCarriage} />}
              size="xs"
              key={`solution${index}`}
            >
              {"Prompt"}
            </Button>
            <Button
              colorScheme="red"
              variant={"outline"}
              w="full"
              leftIcon={<Icon as={FaBaby} />}
              size="xs"
              key={`solution${index}`}
            >
              {"Free"}
            </Button>
          </ButtonGroup>
        </Flex>
      ))}
      <Spacer w="full" />
      <Spacer w="full" />
      <Spacer w="full" />
    </SimpleGrid>
  );
}
