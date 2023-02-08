import tmpl from "./index.hbs";
import {Block} from "../../components";

export default class Signup extends Block {
  render() {
    return this.compile(tmpl, { ...this._props });
  }
}
