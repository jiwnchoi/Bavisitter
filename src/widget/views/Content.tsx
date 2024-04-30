import { Avatar, Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useContent } from "@hooks";
import CodeContent from "./CodeContent";
import MessageContent from "./MessageContent";
import { PropsWithChildren } from "react";

type IContentProps = {
  index: number;
};
const RoboticIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
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
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
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
            bgColor={userName === "You" ? "green.500" : "orange.500"}
            icon={
              <Icon
                as={userName === "You" ? UserQuestion01Icon : RoboticIcon}
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
            <MessageContent
              content={contentWithoutCodeblock}
              key={`message${index}`}
            />
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
