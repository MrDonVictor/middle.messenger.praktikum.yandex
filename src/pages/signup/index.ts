import tmpl from "./index.hbs";
import Block from "../../components/block";

export default class Signup extends Block {
  render() {
    return this.compile(tmpl, { ...this._props });
  }
}
