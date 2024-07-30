import { Flex, Icon, IconButton, Spinner, Textarea } from "@chakra-ui/react";
import { useModelMessage } from "@hooks";
import { IPrompt } from "@shared/types";
import { useMessageStore } from "@stores";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import { FaArrowUp, FaTrash } from "react-icons/fa6";

const handleKeyDown = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  props: FormikProps<IPrompt>,
) => {
  if (props.values.prompt !== "" && e.key === "Enter") {
    e.preventDefault();
    e.stopPropagation();
    if (e.shiftKey) {
      props.setFieldValue("prompt", props.values.prompt + "\n");
    } else {
      props.submitForm();
    }
  }
};

export default function PromptView() {
  const streaming = useMessageStore((state) => state.streaming);
  const { appendMessages, clearUserMessages } = useModelMessage();

  return (
    <Flex
      flexDir={"row"}
      gap={2}
      p={2}
      borderWidth={1.5}
      borderRadius={"md"}
      _focusWithin={{ borderColor: "blue.500" }}
    >
      <Formik
        initialValues={{ prompt: "" }}
        onSubmit={(values, actions) => {
          appendMessages([
            {
              role: "user",
              content: values.prompt,
              type: "message",
            },
          ]);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form style={{ display: "flex", minWidth: "100%" }}>
            <Field name="prompt" as="textarea">
              {({ field }: FieldProps) => (
                <Textarea
                  {...field}
                  fontSize={"sm"}
                  variant={"none"}
                  placeholder="Message Bavisitter..."
                  width={"full"}
                  border={"none"}
                  resize={"none"}
                  background={"transparent"}
                  _focus={{ border: "none", borderWidth: 0 }}
                  _placeholder={{ color: "gray.400" }}
                  onKeyDown={(e) => handleKeyDown(e, props)}
                />
              )}
            </Field>
            <Flex direction="column" gap={2}>
              <IconButton
                type="submit"
                size={"sm"}
                icon={streaming ? <Spinner /> : <Icon as={FaArrowUp} />}
                isLoading={props.isSubmitting || streaming}
                isDisabled={props.isSubmitting || props.values.prompt === ""}
                aria-label="Sending Button"
              />
              <IconButton
                size={"sm"}
                icon={<Icon as={FaTrash} />}
                isDisabled={props.isSubmitting || streaming}
                aria-label="Clear Button"
                onClick={() => {
                  props.resetForm();
                  clearUserMessages();
                }}
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}
