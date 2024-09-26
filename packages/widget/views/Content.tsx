import { Avatar, Flex, Icon, Text } from "@chakra-ui/react";
import { useContent } from "@hooks";
import type { PropsWithChildren } from "react";
import CodeContent from "./CodeContent";
import MessageContent from "./MessageContent";

type IContentProps = {
  index: number;
};
const RoboticIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}>
    <title>Robotic Icon</title>
    <path
      d="M19 16V14C19 11.1716 19 9.75736 18.1213 8.87868C17.2426 8 15.8284 8 13 8H11C8.17157 8 6.75736 8 5.87868 8.87868C5 9.75736 5 11.1716 5 14V16C5 18.8284 5 20.2426 5.87868 21.1213C6.75736 22 8.17157 22 11 22H13C15.8284 22 17.2426 22 18.1213 21.1213C19 20.2426 19 18.8284 19 16Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M19 18C20.4142 18 21.1213 18 21.5607 17.5607C22 17.1213 22 16.4142 22 15C22 13.5858 22 12.8787 21.5607 12.4393C21.1213 12 20.4142 12 19 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M5 18C3.58579 18 2.87868 18 2.43934 17.5607C2 17.1213 2 16.4142 2 15C2 13.5858 2 12.8787 2.43934 12.4393C2.87868 12 3.58579 12 5 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 3.5C13.5 4.32843 12.8284 5 12 5C11.1716 5 10.5 4.32843 10.5 3.5C10.5 2.67157 11.1716 2 12 2C12.8284 2 13.5 2.67157 13.5 3.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M12 5V8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 13V14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 13V14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 17.5C10 17.5 10.6667 18 12 18C13.3333 18 14 17.5 14 17.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const UserQuestion01Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}>
    <title>User Question Icon</title>
    <path
      d="M17 15.8462C17 14.8266 17.8954 14 19 14C20.1046 14 21 14.8266 21 15.8462C21 16.2137 20.8837 16.5561 20.6831 16.8438C20.0854 17.7012 19 18.5189 19 19.5385V20M18.9902 22H18.9992"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C8.12805 13.9629 11.2057 13.6118 14 14.4281"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
const BabyBottleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}>
    <title>Baby Bottle Icon</title>
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

export default function Content({ index }: PropsWithChildren<IContentProps>) {
  const {
    userName,
    contentWithoutCodeblock,
    streamingMessage,
    format,
    type,
    ref,
    contentIsVegaLite,
  } = useContent(index);

  return (
    <Flex direction="row" maxW="full" key={`content${index}`}>
      <Flex minW={"32px"}>
        {userName && (
          <Avatar
            size="sm"
            bgColor={
              userName === "You"
                ? "green.500"
                : userName === "Bavisitter"
                  ? "blue.500"
                  : "orange.500"
            }
            icon={
              <Icon
                as={
                  userName === "You"
                    ? UserQuestion01Icon
                    : userName === "Bavisitter"
                      ? BabyBottleIcon
                      : RoboticIcon
                }
                boxSize={5}
              />
            }
          />
        )}
      </Flex>
      <Flex direction="column" width="full" align="flex-start" ml={2} gap={2}>
        {userName && (
          <Text as={"p"} fontSize="sm" fontWeight="bold">
            {userName}
          </Text>
        )}
        <Flex w="full" overflow={"auto"} ref={ref}>
          {type === "message" ? (
            <MessageContent content={contentWithoutCodeblock} key={`message${index}`} />
          ) : (
            <CodeContent
              index={index}
              content={contentWithoutCodeblock}
              contentIsVegaLite={contentIsVegaLite}
              format={format}
              key={`message${index}`}
              streamingMessage={streamingMessage}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
