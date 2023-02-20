import tmpl from "./index.hbs";
import Block, { T } from "../Block";

export default class SigninForm extends Block<T> {
  constructor(props: T) {
    super("form", props);
  }

  render() {
    return this.compile(tmpl, { ...this._props });
  }
}
