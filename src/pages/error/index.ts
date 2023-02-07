import tmpl from "./index.hbs";
import Block from "../../components/block";

export default class Error extends Block {
  render() {
    return this.compile(tmpl, { ...this._props });
  }
}