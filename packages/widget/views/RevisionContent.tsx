import { useModelState } from "@anywidget/react";
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
import { useRevisionView } from "@hooks";
import { BabyBottleIcon } from "@shared/icons";
import { useEffect } from "react";
import { FaTools } from "react-icons/fa";
import { FaBaby, FaBabyCarriage } from "react-icons/fa6";
import type { IDetectorModel } from "videre/model";
import type IResolverModel from "videre/model/IActuatorModel";

type TRevisionType = "advisor" | "prompt" | "none";
const REVISE_WITH_ACTUATOR = "advisor";
const REVISE_WITH_SOLUTION = "prompt";
const REVISE_WITH_ISSUE = "none";

interface IRevisionButtonProps {
  disabled: boolean;
  revisionType: TRevisionType;
  setRevisionType: (revisionType: TRevisionType) => void;
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
  const actionTypes = {
    advisor: {
      label: "with Actuator",
      Icon: <Icon as={FaTools} />,
      setRevisionType: () => setRevisionType(REVISE_WITH_ACTUATOR),
      colorSchenme: "green",
      revise: reviseLastChartWithAction,
    },
    prompt: {
      label: "with Action Prompt",
      Icon: <Icon as={FaBabyCarriage} />,
      setRevisionType: () => setRevisionType(REVISE_WITH_SOLUTION),
      colorSchenme: "orange",
      revise: reviseLastChartWithPrompt,
    },
    none: {
      label: "with LLM Desicion",
      Icon: <Icon as={FaBaby} />,
      setRevisionType: () => setRevisionType(REVISE_WITH_ISSUE),
      colorSchenme: "red",
      revise: reviseLastChartWithProblem,
    },
  };
  return (
    <Flex w="full">
      <Button
        isDisabled={disabled}
        w={"full"}
        size={"sm"}
        ps={4}
        // borderRightRadius={0}
        // colorScheme={actionTypes[revisionType].colorSchenme}
        colorScheme="blue"
        // variant={"outline"}
        variant={"solid"}
        onClick={actionTypes[revisionType].revise}>
        {disabled ? "Select Solution to Apply" : "Revise Current Visualization"}
      </Button>

      {/* <Menu>
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
          {Object.values(actionTypes).map((action, index) => {
            return (
              <MenuItem
                as={Button}
                size={"xs"}
                variant={"ghost"}
                colorScheme={action["colorSchenme"]}
                icon={action["Icon"]}
                key={index}
                onClick={action["setRevisionType"]}
              >
                {action["label"]}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu> */}
    </Flex>
  );
}

function IssueItem({
  issue,
  resolvers,
  revisionType,
  setResolver,
}: {
  issue: Pick<IDetectorModel, "type" | "id" | "description">;
  resolvers: (Pick<IResolverModel, "id" | "description"> & {
    selected: boolean;
  })[];
  revisionType: TRevisionType;
  setResolver: (id: string) => (selected: boolean) => void;
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

      {revisionType !== "none" &&
        resolvers.map((resolver, index) => (
          <Flex
            key={`resolver-${index}`}
            flexDir={"row"}
            gap={2}
            onClick={() => setResolver(resolver.id)(!resolver.selected)}
            _hover={{ cursor: "pointer" }}
            align={"start"}>
            <Checkbox
              size="sm"
              isChecked={resolver.selected}
              mt={0.5}
              colorScheme="blue"
              onChange={(e) => {
                setResolver(resolver.id)(!e.target.checked);
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
  const {
    revisionViewDisplayed,
    detectResult,
    reviseLastChartWithAction,
    reviseLastChartWithProblem,
    reviseLastChartWithPrompt,
    setResolver,
  } = useRevisionView();

  const [revisionType, setRevisionType] = useModelState<TRevisionType>("advisor");
  const [autoFix] = useModelState<boolean>("auto_fix");
  useEffect(scrollToBottom, [detectResult]);

  useEffect(() => {
    if (!autoFix) return;
    if (!revisionViewDisplayed) return;
    if (revisionType === REVISE_WITH_ISSUE) {
      reviseLastChartWithProblem(detectResult);
    } else if (revisionType === REVISE_WITH_SOLUTION) {
      reviseLastChartWithPrompt(detectResult);
    } else if (revisionType === REVISE_WITH_ACTUATOR) {
      reviseLastChartWithAction(detectResult);
    }
  }, [detectResult]);

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
                  revisionType={revisionType}
                  setResolver={setResolver}
                />
              </Fade>
            ))}
          </SimpleGrid>
          <RevisionButton
            revisionType={revisionType}
            setRevisionType={setRevisionType}
            disabled={
              revisionType !== "none" &&
              detectResult.flatMap((d) => d.resolvers).every((r) => !r.selected)
            }
            reviseLastChartWithAction={() => {
              reviseLastChartWithAction(detectResult);
            }}
            reviseLastChartWithProblem={() => {
              reviseLastChartWithProblem(detectResult);
            }}
            reviseLastChartWithPrompt={() => {
              reviseLastChartWithPrompt(detectResult);
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
