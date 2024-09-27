import { Center, Fade, Flex, Heading, SimpleGrid, Text, useColorMode } from "@chakra-ui/react";
import { useMessages } from "@hooks";
import { EXAMPLE } from "@shared/constants";

function Placeholder() {
  const { appendMessages } = useMessages();
  const { colorMode } = useColorMode();
  return (
    <Flex w={"full"} h={"full"} flexDir="column" p={4}>
      <Center flexDir={"column"} h="full">
        <Heading as={"h1"} fontSize={64} fontWeight={700}>
          Bavisitter
        </Heading>
        <Text fontSize={18} opacity={0.6}>
          LLMs for Advanced Visual Analytics
        </Text>
      </Center>

      <SimpleGrid columns={3} gap={4} w={"full"}>
        {EXAMPLE.map(({ title, prompt }, index) => (
          <Fade in={true} key={`example-${index}`} delay={(index + 1) * 0.2}>
            <Flex
              h="full"
              key={`example-${index}`}
              flexDir={"column"}
              borderWidth={1}
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
              _hover={{
                cursor: "pointer",
                backgroundColor: colorMode === "light" ? "blackAlpha.50" : "whiteAlpha.50",
                transition: "background-color 0.2s",
              }}>
              <Text fontWeight={700}>{title}</Text>
              <Text opacity={0.6}>{prompt}</Text>
            </Flex>
          </Fade>
        ))}
      </SimpleGrid>
    </Flex>
  );
}

export default Placeholder;
