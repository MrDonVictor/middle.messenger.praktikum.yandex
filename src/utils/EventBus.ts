import { Arg } from "./types";

export default class EventBus {
  listeners;
  constructor() {
    this.listeners = {} as Arg;
  }

  public on(event: string, callback: () => void) {
    if (!this.listeners[event as keyof Arg]) {
      this.listeners[event as keyof Arg] = [];
    }

    this.listeners[event as keyof Arg].push(callback);
  }

  public off(event: string, callback: () => void) {
    if (!this.listeners[event as keyof Arg]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event as keyof Arg] = this.listeners[
      event as keyof Arg
    ].filter((listener) => listener !== callback);
  }

  public emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event as keyof Arg]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event as keyof Arg].forEach(function (listener) {
      listener.apply([...args]);
    });
  }
}
