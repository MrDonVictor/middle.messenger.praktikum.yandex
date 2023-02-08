import tmpl from "./index.hbs";
import {Block} from "../../components";

export default class Settings extends Block {
  render() {
    return this.compile(tmpl, { ...this._props });
  }
}
