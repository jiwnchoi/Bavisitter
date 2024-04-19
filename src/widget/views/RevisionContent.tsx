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

const REVISE_WITH_ACTUATOR = 0;
const REVISE_WITH_SOLUTION = 1;
const REVISE_WITH_ISSUE = 2;

interface IRevisionButtonProps {
  disabled: boolean;
  revisionType: number;
  setRevisionType: (revisionType: number) => void;
  reviseLastChartWithAction: () => void;
  reviseLastChartWithProblem: () => void;
  reviseLastChartWithPrompt: () => void;
}

function RevisionButton({
  disabled,
  revisionType,
  setRevisionType,
  reviseLastChartWithAction,
  reviseLastChartWithProblem,
  reviseLastChartWithPrompt,
}: IRevisionButtonProps) {
  const actionTypes = [
    {
      label: "with Actuator",
      Icon: <Icon as={FaTools} />,
      setRevisionType: () => setRevisionType(REVISE_WITH_ACTUATOR),
      colorSchenme: "green",
      revise: reviseLastChartWithAction,
    },
    {
      label: "with Action Prompt",
      Icon: <Icon as={FaBabyCarriage} />,
      setRevisionType: () => setRevisionType(REVISE_WITH_SOLUTION),
      colorSchenme: "orange",
      revise: reviseLastChartWithPrompt,
    },
    {
      label: "with LLM Desicion",
      Icon: <Icon as={FaBaby} />,
      setRevisionType: () => setRevisionType(REVISE_WITH_ISSUE),
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
        colorScheme={actionTypes[revisionType].colorSchenme}
        variant={"outline"}
        onClick={actionTypes[revisionType].revise}
      >
        {disabled ? "Select Solution to Apply" : "Revise Current Visualization"}
      </Button>

      <Menu>
        <MenuButton
          as={Button}
          size={"sm"}
          variant={"solid"}
          borderLeftRadius={0}
          leftIcon={actionTypes[revisionType].Icon}
          colorScheme={actionTypes[revisionType].colorSchenme}
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
              onClick={action.setRevisionType}
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
  revisionType,
  selected,
  setDetectResult,
}: {
  problem: string;
  solution: string;
  revisionType: number;
  selected: boolean;
  setDetectResult: (selected: boolean) => void;
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
      <Text
        fontWeight={700}
        fontSize={"sm"}
        opacity={selected ? 1 : 0.2}
        transitionDuration={"0.2s"}
      >
        {problem}
      </Text>

      <Flex
        flexDir={"row"}
        gap={2}
        onClick={() => setDetectResult(!selected)}
        _hover={{ cursor: "pointer" }}
        align={"start"}
      >
        <Checkbox
          size="sm"
          isChecked={selected}
          mt={0.5}
          onChange={(e) => {
            setDetectResult(!e.target.checked);
          }}
        />
        <Text
          fontSize="sm"
          opacity={selected ? 0.7 : 0.2}
          transitionDuration={"0.2s"}
        >
          {revisionType !== REVISE_WITH_ISSUE ? solution : "Revise this issue"}
        </Text>
      </Flex>
    </Flex>
  );
}

interface IRevisionContentProps {
  scrollToBottom: (behavior?: ScrollBehavior) => void;
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
    setDetectResult,
  } = useRevisionView();

  const [revisionType, setRevisionType] = useState(0);
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
                  revisionType={revisionType}
                  selected={selected}
                  setDetectResult={setDetectResult(index)}
                />
              </Fade>
            ))}
          </SimpleGrid>
          <RevisionButton
            revisionType={revisionType}
            setRevisionType={setRevisionType}
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
