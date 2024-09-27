import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Fade,
  Flex,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useRevisionContent } from "@hooks";
import { BabyBottleIcon } from "@shared/icons";
import { useEffect } from "react";
import { FaBabyCarriage } from "react-icons/fa6";
import type { IDetectorModel } from "videre/model";
import type IResolverModel from "videre/model/IActuatorModel";

interface IRevisionButtonProps {
  disabled: boolean;
  reviseLastChartWithPrompt: () => void;
}

function RevisionButton({ disabled, reviseLastChartWithPrompt }: IRevisionButtonProps) {
  return (
    <Flex w="full">
      <Button
        isDisabled={disabled}
        w={"full"}
        size={"sm"}
        ps={4}
        colorScheme="blue"
        variant={"solid"}
        onClick={reviseLastChartWithPrompt}
        leftIcon={<Icon as={FaBabyCarriage} />}>
        {disabled ? "Select Solution to Apply" : "Revise Current Visualization"}
      </Button>
    </Flex>
  );
}

function IssueItem({
  issue,
  resolvers,
  setResolverSelected,
}: {
  issue: Pick<IDetectorModel, "type" | "id" | "description">;
  resolvers: (Pick<IResolverModel, "id" | "description"> & {
    selected: boolean;
  })[];
  setResolverSelected: (issueId: string, resolverId: string, selected: boolean) => void;
}) {
  return (
    <Flex h="full" flexDir={"column"} borderWidth={2} gap={4} p={4} borderRadius={8}>
      <Flex direction={"column"} gap={1}>
        <Box>
          <Badge ml={-0.5} variant={"subtle"} colorScheme="gray">
            {issue.type}
          </Badge>
        </Box>
        <Text fontWeight={700} fontSize={"sm"} transitionDuration={"0.2s"}>
          {issue.description}
        </Text>
      </Flex>

      {resolvers.map((resolver, index) => (
        <Flex
          key={`resolver-${index}`}
          flexDir={"row"}
          gap={2}
          onClick={() => {
            setResolverSelected(issue.id, resolver.id, !resolver.selected);
          }}
          _hover={{ cursor: "pointer" }}
          align={"start"}>
          <Checkbox
            size="sm"
            isChecked={resolver.selected}
            mt={0.5}
            colorScheme="blue"
            onChange={(e) => {
              setResolverSelected(issue.id, resolver.id, e.target.checked);
            }}
          />
          <Text fontSize="sm" opacity={resolver.selected ? 0.7 : 0.2} transitionDuration={"0.2s"}>
            {resolver.description}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}

interface IRevisionContentProps {
  scrollToBottom: (behavior?: ScrollBehavior) => void;
}

export default function RevisionContent({ scrollToBottom }: IRevisionContentProps) {
  const { revisionViewDisplayed, detectResult, reviseLastChartWithPrompt, setResolverSelected } =
    useRevisionContent();

  useEffect(scrollToBottom, [detectResult, scrollToBottom]);

  if (!revisionViewDisplayed) return null;
  return (
    <Flex direction="row" maxW="full">
      <Flex minW={"32px"}>
        <Avatar
          size="sm"
          colorScheme="red"
          bgColor={"blue.500"}
          icon={<Icon as={BabyBottleIcon} boxSize={5} />}
        />
      </Flex>
      <Flex direction="column" width="full" align="flex-start" ml={2} gap={2}>
        <Text as={"p"} fontSize="sm" fontWeight="bold">
          {"Bavisitter"}
        </Text>

        <Flex direction={"column"} gap={4} w="full" overflow={"auto"}>
          <Text>{"Current Vega Lite visualization has following issues."}</Text>

          <SimpleGrid columns={3} gap={2} minChildWidth={"200px"}>
            {detectResult.map(({ issue, resolvers }, index) => (
              <Fade in={true} key={`revisionItem-${index}`} delay={(index + 1) * 0.2}>
                <IssueItem
                  key={`issueItem${index}`}
                  issue={issue}
                  resolvers={resolvers}
                  setResolverSelected={setResolverSelected}
                />
              </Fade>
            ))}
          </SimpleGrid>
          <RevisionButton
            disabled={detectResult.flatMap((d) => d.resolvers).every((r) => !r.selected)}
            reviseLastChartWithPrompt={() => {
              reviseLastChartWithPrompt(detectResult);
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
