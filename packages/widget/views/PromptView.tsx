import { Flex, Icon, IconButton, Spinner, Textarea } from "@chakra-ui/react";
import { usePromptView } from "@hooks";
import { Field, type FieldProps, Form, Formik } from "formik";
import { FaArrowUp, FaTrash } from "react-icons/fa6";

export default function PromptView() {
  const { streaming, handleSubmit, handleKeyDown, handleClear } = usePromptView();

  return (
    <Flex
      flexDir={"row"}
      gap={2}
      p={2}
      borderWidth={1.5}
      borderRadius={"md"}
      _focusWithin={{ borderColor: "blue.500" }}>
      <Formik initialValues={{ prompt: "" }} onSubmit={handleSubmit}>
        {({ values, isSubmitting, resetForm, setFieldValue, submitForm }) => (
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
                  onKeyDown={(e) => handleKeyDown(e, values.prompt, setFieldValue, submitForm)}
                />
              )}
            </Field>
            <Flex direction="column" gap={2}>
              <IconButton
                type="submit"
                size={"sm"}
                icon={streaming ? <Spinner /> : <Icon as={FaArrowUp} />}
                isLoading={isSubmitting || streaming}
                isDisabled={isSubmitting || values.prompt === ""}
                aria-label="Sending Button"
              />
              <IconButton
                size={"sm"}
                icon={<Icon as={FaTrash} />}
                isDisabled={isSubmitting || streaming}
                aria-label="Clear Button"
                onClick={() => handleClear(resetForm)}
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}
