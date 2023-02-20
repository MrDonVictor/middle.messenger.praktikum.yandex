import Block, { T } from "../Block";
import tmpl from "./index.hbs";

export default class Input extends Block<T> {
  constructor(props: T) {
    super("div", props);
  }

  render() {
    return this.compile(tmpl, { ...this._props });
  }

  public addEvents(): void {
    const { events } = this._props;
    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element
          .querySelector("input")
          ?.addEventListener(
            eventName,
            events[eventName as keyof typeof events]
          );
      });
    }
  }

  public removeEvents(): void {
    const { events } = this._props;
    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element
          .querySelector("input")
          ?.removeEventListener(
            eventName,
            events[eventName as keyof typeof events]
          );
      });
    }
  }
}
