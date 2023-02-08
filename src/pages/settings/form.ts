import tmpl from "./form.hbs";
import Block from "../../components/block";

export default class SettingsForm extends Block {
  render() {
    return this.compile(tmpl, { ...this._props });
  }

  addEvents() {
    this._element.querySelectorAll("form").forEach((form) => {
      form.addEventListener("onsubmit", this._props.events.onSubmit);
    });
    super.addEvents();
  }
}
