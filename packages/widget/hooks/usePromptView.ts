import { useMessages, useStreaming } from "@hooks";
import type { IPrompt } from "@shared/types";
import { type FormikErrors, type FormikHelpers } from "formik";

const usePromptView = () => {
  const streaming = useStreaming();
  const { appendMessages, clearUserMessages } = useMessages();

  const handleSubmit = (values: IPrompt, actions: FormikHelpers<IPrompt>) => {
    appendMessages([
      {
        role: "user",
        content: values.prompt,
        type: "message",
      },
    ]);
    actions.resetForm();
    actions.setSubmitting(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    prompt: string,
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<{ prompt: string }>>,
    submitForm: () => Promise<void>,
  ) => {
    if (prompt !== "" && e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (e.shiftKey) {
        setFieldValue("prompt", `${prompt}\n`);
      } else {
        submitForm();
      }
    }
  };

  const handleClear = (resetForm: () => void) => {
    resetForm();
    clearUserMessages();
  };

  return {
    streaming,
    handleSubmit,
    handleKeyDown,
    handleClear,
  };
};

export default usePromptView;
