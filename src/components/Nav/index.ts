import Block, { T } from "../Block";
import tmpl from "./index.hbs";

type Props = T & {
  items: { url: string; title: string }[];
};

export default class Nav extends Block<Props> {
  render() {
    return this.compile(tmpl, { ...this._props });
  }

  addEvents() {
    this._element.querySelectorAll("a").forEach((a) => {
      const { click } = this._props.events;
      a.addEventListener("click", click);
    });
    super.addEvents();
  }

  removeEvents() {
    this._element.querySelectorAll("a").forEach((a) => {
      const { click } = this._props.events;
      a.removeEventListener("click", click);
    });
    super.removeEvents();
  }
}
