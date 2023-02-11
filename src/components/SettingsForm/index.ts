import tmpl from "./index.hbs";
import Block, { T } from "../Block";

export default class SettingsForm extends Block<T> {
  render() {
    return this.compile(tmpl, { ...this._props });
  }

  addEvents() {
    this._element.querySelectorAll("form").forEach((form) => {
      const { onSubmit } = this._props.events;
      form.addEventListener("onsubmit", onSubmit);
    });
    super.addEvents();
  }

  removeEvents() {
    this._element.querySelectorAll("form").forEach((form) => {
      const { onSubmit } = this._props.events;
      form.removeEventListener("onsubmit", onSubmit);
    });
    super.removeEvents();
  }
}
