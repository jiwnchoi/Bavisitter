import { Button, Center, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { FaFlask, FaGithub } from "react-icons/fa6";

export default function Header() {
  return (
    <Flex w="full" flexDir="row" justify={"space-between"} mb={4}>
      <Text fontSize={"md"} fontWeight={700}>
        Bavisitter
      </Text>
      <Center gap={4}>
        <Link href="https://idclab.skku.edu" isExternal>
          <Button variant={"link"} size={"xs"} leftIcon={<Icon as={FaFlask} />} p={0}>
            <Text fontFamily="Rajdhani" fontWeight={600} fontSize={"sm"}>
              IDC
            </Text>
            <Text fontFamily="Rajdhani" fontWeight={500} fontSize={"sm"}>
              Lab
            </Text>
          </Button>
        </Link>
        <Link href="https://github.com/jiwnchoi" isExternal>
          <Button leftIcon={<Icon as={FaGithub} />} size={"xs"} variant={"link"} p={0}>
            Github
          </Button>
        </Link>
      </Center>
    </Flex>
  );
}
