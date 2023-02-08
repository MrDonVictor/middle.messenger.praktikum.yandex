import tmpl from "./index.hbs";
import {Block} from "../../components";

export default class Signin extends Block {
  render() {
    return this.compile(tmpl, { ...this._props });
  }
}
