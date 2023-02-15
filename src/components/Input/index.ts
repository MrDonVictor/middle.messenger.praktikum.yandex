import Block, { T } from "../Block";
import tmpl from "./index.hbs";

export default class Input extends Block<T> {
  constructor(props: T) {
    super("div", props);
  }

  render() {
    return this.compile(tmpl, { ...this._props });
  }
}
