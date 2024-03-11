interface IMessage {
  type: "system" | "user" | "machine";
  content: string;
}

export default IMessage;
