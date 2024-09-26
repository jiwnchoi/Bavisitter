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
import { useEffect } from "react";
import { FaTools } from "react-icons/fa";
import { FaBaby, FaBabyCarriage } from "react-icons/fa6";
import type { IDetectorModel } from "videre/model";
import type IResolverModel from "videre/model/IActuatorModel";

type TRevisionType = "advisor" | "prompt" | "none";
const REVISE_WITH_ACTUATOR = "advisor";
const REVISE_WITH_SOLUTION = "prompt";
const REVISE_WITH_ISSUE = "none";
const BabyBottleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}>
    <title>Babybottle Icon</title>
    <path
      d="M17 10.5C17 10.5 18 13 18 16.25C18 17.4212 17.8701 18.4949 17.704 19.3894C17.4952 20.5137 17.3908 21.0758 16.835 21.5379C16.2792 22 15.6168 22 14.2919 22H9.70813C8.38323 22 7.72079 22 7.16499 21.5379C6.60919 21.0758 6.50478 20.5137 6.29598 19.3894C6.12986 18.4949 6 17.4212 6 16.25C6 13 7 10.5 7 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.00011 10.511H17.0001C17.148 9.69521 16.9213 8.12225 14.9607 7.50006C14.4954 7.35244 13.95 7.07638 13.7045 6.61185C13.4872 6.20054 13.3855 5.64364 13.7112 5.02551C14.3134 3.88271 13.7323 2.48063 12.4822 2.0873C12.326 2.03813 12.1632 2.00186 12.0001 2.00024C11.826 1.99852 11.6517 2.0348 11.4849 2.0873C10.2348 2.48063 9.65373 3.88271 10.2559 5.02551C10.5816 5.64364 10.4799 6.20054 10.2626 6.61185C10.0247 7.06204 9.50673 7.46181 9.02371 7.61504C7.67057 8.04436 6.73858 9.06792 7.00011 10.511Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 14H17.5M15 18H17.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
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
