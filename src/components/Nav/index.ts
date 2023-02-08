import Block from "../Block";
import tmpl from "./index.hbs";

export default class Nav extends Block {
  render() {
    return this.compile(tmpl, { ...this._props });
  }

  addEvents() {
    this._element.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", this._props.events.click);
    });
    super.addEvents();
  }
}
