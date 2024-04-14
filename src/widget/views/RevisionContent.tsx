import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useRevisionView } from "@hooks";
import { useEffect, useState } from "react";
import { FaTools } from "react-icons/fa";
import { FaAngleDown, FaBaby, FaBabyCarriage } from "react-icons/fa6";

interface IRevisionButtonProps {
  reviseLastChartWithAction: () => void;
  reviseLastChartWithProblem: () => void;
  reviseLastChartWithPrompt: () => void;
}

function RevisionButton({
  reviseLastChartWithAction,
  reviseLastChartWithProblem,
  reviseLastChartWithPrompt,
}: IRevisionButtonProps) {
  const [actionType, setActionType] = useState<number>(0);
  const actionTypes = [
    {
      label: "with Actuator",
      Icon: <Icon as={FaTools} />,
      setActionType: () => setActionType(0),
      colorSchenme: "green",
      revise: reviseLastChartWithAction,
    },
    {
      label: "with Action Prompt",
      Icon: <Icon as={FaBabyCarriage} />,
      setActionType: () => setActionType(1),
      colorSchenme: "orange",
      revise: reviseLastChartWithPrompt,
    },
    {
      label: "with LLM Desicion",
      Icon: <Icon as={FaBaby} />,
      setActionType: () => setActionType(2),
      colorSchenme: "red",
      revise: reviseLastChartWithProblem,
    },
  ];

  return (
    <Flex w="full">
      <Button
        w={"full"}
        size={"sm"}
        ps={4}
        borderRightRadius={0}
        colorScheme={actionTypes[actionType].colorSchenme}
        variant={"outline"}
        onClick={actionTypes[actionType].revise}
      >
        Revise Current Visualization
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
              onClick={action.setActionType}
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
  selected,
  onClick,
}: {
  problem: string;
  selected: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <Flex
      flexDir={"row"}
      gap={2}
      onClick={onClick}
      _hover={{ cursor: "pointer" }}
    >
      <Checkbox size="md" isChecked={selected} />
      <Text
        fontSize="md"
        fontWeight={500}
        opacity={selected ? 1.0 : 0.3}
        transitionDuration={"100ms"}
      >
        {problem}
      </Text>
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
    detecting,
    detectResult,
    reviseLastChartWithAction,
    reviseLastChartWithProblem,
    reviseLastChartWithPrompt,
    toggleDetectResult,
  } = useRevisionView();

  useEffect(scrollToBottom, [detectResult]);
  if (!revisionViewDisplayed || detecting || !detectResult) return null;

  return (
    <Flex direction="row" maxW="full">
      <Box minW={"32px"}>{<Avatar size="sm" name={"Bavisitter"} />}</Box>
      <Flex direction="column" width="full" align="flex-start" ml={2} gap={2}>
        <Text as={"p"} fontSize="sm" fontWeight="bold">
          {"Bavisitter"}
        </Text>

        <Flex direction={"column"} gap={4} w="full" overflow={"auto"}>
          <Text>{`Current Vega Lite visualization has following issues:`}</Text>
          <Divider />
          <Flex flexDir={"column"} gap={2}>
            {detectResult.map(({ problem, selected }, index) => (
              <IssueItem
                key={`issueItem${index}`}
                problem={problem}
                selected={selected}
                onClick={() => {
                  toggleDetectResult(index);
                }}
              />
            ))}
          </Flex>
          <Divider />
          <RevisionButton
            reviseLastChartWithAction={reviseLastChartWithAction}
            reviseLastChartWithProblem={reviseLastChartWithProblem}
            reviseLastChartWithPrompt={reviseLastChartWithPrompt}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
