import tmpl from "./index.hbs";
import { Block, T } from "../../components";

type Props = T & {
  chats: {
    name: string;
    avatar: string;
    lastMessage: { time: string; content: string; amount: number };
  }[];
  messages: { messageText: string; isOpponent: boolean }[];
};

export default class Landing extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
  }

  render() {
    return this.compile(tmpl, { ...this._props });
  }
}
