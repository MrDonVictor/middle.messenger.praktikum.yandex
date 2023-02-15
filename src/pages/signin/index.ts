import tmpl from "./index.hbs";
import { Block, T } from "../../components";

export default class Signin extends Block<T> {
  constructor(props: T) {
    super("div", props);
  }

  render() {
    return this.compile(tmpl, { ...this._props });
  }
}
