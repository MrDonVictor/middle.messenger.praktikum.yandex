import tmpl from "./index.hbs";
import { Block, T } from "../../components";

export default class Error extends Block<T> {
  render() {
    return this.compile(tmpl, { ...this._props });
  }
}
