import tmpl from "./index.hbs";
import Block from "../../components/block";

export default class Signin extends Block {
  render() {
    return this.compile(tmpl, { ...this._props });
  }
}
