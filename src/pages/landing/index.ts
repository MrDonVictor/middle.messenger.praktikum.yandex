import { Chat, Message } from "../../utils/types";
import tmpl from "./index.hbs";

export default (props: { chats: Chat[]; messages: Message[] }) => tmpl(props);
