interface IMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export default IMessage;
