import {
  Center,
  Fade,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useModelMessage } from "@hooks";

const EXAMPLE = [
  {
    title: "Request by Chart Type",
    prompt: "Draw scatterplot with two columns in data",
  },
  {
    title: "Specify Some Analytic Task",
    prompt: "Show me the distribution of a column in data",
  },
  {
    title: "Analyze Data with Machine Learning",
    prompt: "Do linear regression on two columns in data and visualize it",
  },
];

function PlaceholderView() {
  const { appendMessages } = useModelMessage();
  return (
    <Flex w={"full"} h={"full"} flexDir="column" p={4}>
      <Center flexDir={"column"} h="full">
        <Heading as={"h1"} fontSize={64} fontWeight={700}>
          Bavisitter
        </Heading>
        <Text fontSize={18} opacity={0.6}>
          Your LLM Agent for Perfect Visualization
        </Text>
      </Center>

      <SimpleGrid columns={3} gap={4} w={"full"}>
        {EXAMPLE.map(({ title, prompt }, index) => (
          <Fade in={true} key={`example-${index}`} delay={index * 0.2}>
            <Flex
              h="full"
              key={`example-${index}`}
              flexDir={"column"}
              borderWidth={2}
              gap={2}
              p={4}
              borderRadius={8}
              onClick={() => {
                appendMessages([
                  {
                    role: "user",
                    content: prompt,
                    type: "message",
                  },
                ]);
              }}
            >
              <Text fontWeight={700}>{title}</Text>
              <Text opacity={0.6}>{prompt}</Text>
            </Flex>
          </Fade>
        ))}
      </SimpleGrid>
    </Flex>
  );
}

export default PlaceholderView;
