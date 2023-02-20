import Block, { T } from "../Block";
import tmpl from "./index.hbs";

type Props = T & {
  items: { url: string; title: string }[];
};

export default class Nav extends Block<Props> {
  constructor(props: Props) {
    super("nav", props);
  }

  render() {
    return this.compile(tmpl, { ...this._props });
  }
}
