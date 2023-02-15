import tmpl from "./index.hbs";
import { Block, T } from "../../components";

export default class Signup extends Block<T> {
  constructor(props: T) {
    super("div", props);
  }

  render() {
    return this.compile(tmpl, { ...this._props });
  }
}
