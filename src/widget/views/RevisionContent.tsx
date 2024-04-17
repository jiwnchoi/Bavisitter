import {
  Avatar,
  Button,
  Checkbox,
  Fade,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useRevisionView } from "@hooks";
import { useEffect, useState } from "react";
import { FaTools } from "react-icons/fa";
import { FaAngleDown, FaBaby, FaBabyCarriage } from "react-icons/fa6";

interface IRevisionButtonProps {
  disabled: boolean;
  reviseLastChartWithAction: () => void;
  reviseLastChartWithProblem: () => void;
  reviseLastChartWithPrompt: () => void;
}

function RevisionButton({
  disabled,
  reviseLastChartWithAction,
  reviseLastChartWithProblem,
  reviseLastChartWithPrompt,
}: IRevisionButtonProps) {
  const [actionType, seTActuatorType] = useState<number>(0);
  const actionTypes = [
    {
      label: "with Actuator",
      Icon: <Icon as={FaTools} />,
      seTActuatorType: () => seTActuatorType(0),
      colorSchenme: "green",
      revise: reviseLastChartWithAction,
    },
    {
      label: "with Action Prompt",
      Icon: <Icon as={FaBabyCarriage} />,
      seTActuatorType: () => seTActuatorType(1),
      colorSchenme: "orange",
      revise: reviseLastChartWithPrompt,
    },
    {
      label: "with LLM Desicion",
      Icon: <Icon as={FaBaby} />,
      seTActuatorType: () => seTActuatorType(2),
      colorSchenme: "red",
      revise: reviseLastChartWithProblem,
    },
  ];

  return (
    <Flex w="full">
      <Button
        isDisabled={disabled}
        w={"full"}
        size={"sm"}
        ps={4}
        borderRightRadius={0}
        colorScheme={actionTypes[actionType].colorSchenme}
        variant={"outline"}
        onClick={actionTypes[actionType].revise}
      >
        {disabled ? "Select Solution to Apply" : "Revise Current Visualization"}
      </Button>

      <Menu>
        <MenuButton
          as={Button}
          size={"sm"}
          variant={"solid"}
          borderLeftRadius={0}
          leftIcon={actionTypes[actionType].Icon}
          colorScheme={actionTypes[actionType].colorSchenme}
          rightIcon={<Icon as={FaAngleDown} />}
          aria-label="expand solution"
          onClick={() => {}}
        />
        <MenuList>
          {actionTypes.map((action, index) => (
            <MenuItem
              as={Button}
              size={"xs"}
              variant={"ghost"}
              colorScheme={action.colorSchenme}
              icon={action.Icon}
              key={index}
              onClick={action.seTActuatorType}
            >
              {action.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
}

function IssueItem({
  problem,
  solution,
  selected,
  onClick,
}: {
  problem: string;
  solution: string;
  selected: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <Flex
      h="full"
      flexDir={"column"}
      borderWidth={2}
      gap={4}
      p={4}
      borderRadius={8}
    >
      <Text fontWeight={700} fontSize={"sm"}>
        {problem}
      </Text>

      <Flex
        flexDir={"row"}
        gap={2}
        onClick={onClick}
        _hover={{ cursor: "pointer" }}
        align={"start"}
      >
        <Checkbox size="sm" isChecked={selected} mt={0.5} />
        <Text
          fontSize="sm"
          opacity={selected ? 0.7 : 0.2}
          transitionDuration={"0.2s"}
        >
          {solution}
        </Text>
      </Flex>
    </Flex>
  );
}

interface IRevisionContentProps {
  scrollToBottom: () => void;
}

export default function RevisionContent({
  scrollToBottom,
}: IRevisionContentProps) {
  const {
    revisionViewDisplayed,
    detectResult,
    reviseLastChartWithAction,
    reviseLastChartWithProblem,
    reviseLastChartWithPrompt,
    toggleDetectResult,
  } = useRevisionView();

  useEffect(scrollToBottom, [detectResult]);
  if (!revisionViewDisplayed) return null;

  return (
    <Flex direction="row" maxW="full">
      <Flex minW={"32px"}>{<Avatar size="sm" name={"Bavisitter"} />}</Flex>
      <Flex direction="column" width="full" align="flex-start" ml={2} gap={2}>
        <Text as={"p"} fontSize="sm" fontWeight="bold">
          {"Bavisitter"}
        </Text>

        <Flex direction={"column"} gap={4} w="full" overflow={"auto"}>
          <Text>{`Current Vega Lite visualization has following issues.`}</Text>

          <SimpleGrid columns={3} gap={2} minChildWidth={"200px"}>
            {detectResult.map(({ problem, solution, selected }, index) => (
              <Fade
                in={true}
                key={`revisionItem-${index}`}
                delay={(index + 1) * 0.2}
              >
                <IssueItem
                  key={`issueItem${index}`}
                  problem={problem}
                  solution={solution}
                  selected={selected}
                  onClick={() => {
                    toggleDetectResult(index);
                  }}
                />
              </Fade>
            ))}
          </SimpleGrid>
          <RevisionButton
            disabled={detectResult.every((result) => !result.selected)}
            reviseLastChartWithAction={reviseLastChartWithAction}
            reviseLastChartWithProblem={reviseLastChartWithProblem}
            reviseLastChartWithPrompt={reviseLastChartWithPrompt}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
