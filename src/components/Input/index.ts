import Block from "../block";
import tmpl from "./index.hbs";

export default class Input extends Block {
  render() {
    return this.compile(tmpl, { ...this._props });
  }
}
