import EventBus from "../utils/EventBus";
import { v4 as makeUUID } from "uuid";

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element: HTMLElement;
  _meta: { tagName: string; props?: { [key: string]: unknown } };
  _props;
  _eventBus;
  _id;
  _children: Block | { [key: string]: unknown };
  _setUpdate = false;

  constructor(tagName = "div", propsAndChilds = {}) {
    const { children, props } = this.getChildren(propsAndChilds);

    this._eventBus = new EventBus();
    this._id = makeUUID();
    this._children = this._makePropsProxy(children);
    this._props = this._makePropsProxy({ ...props, _id: this._id });
    this._meta = { tagName, props };

    this.registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this)
    );
    this._eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this)
    );
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._element = this.createDocumentElement(this._meta?.tagName);
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    if (this._props.settings?.withInternalId) {
      element.setAttribute("data-id", this._id);
    }
    return element;
  }

  _render() {
    const block = this.render();
    this.removeEvents();
    this._element.innerHTML = "";
    this._element.appendChild(block);
    this.addEvents();
    this.addAttribute();
  }

  render() {
    return "" as unknown as Node;
  }

  addEvents() {
    const { events } = this._props;
    if (events) {
      Object.keys(events).forEach((eventName) =>
        this._element.addEventListener(
          eventName,
          events[eventName as keyof typeof events]
        )
      );
    }
  }

  removeEvents() {
    const { events } = this._props;
    if (events) {
      Object.keys(events).forEach((eventName) =>
        this._element.removeEventListener(
          eventName,
          events[eventName as keyof typeof events]
        )
      );
    }
  }

  addAttribute() {
    const { attr } = this._props;
    if (attr) {
      Object.entries(attr).forEach(([key, value]) =>
        this._element.setAttribute(key, value)
      );
    }
  }

  getChildren(propsAndChilds: { [key: string]: unknown }) {
    const props = {} as { [key: string]: unknown };
    const children = {} as { [key: string]: unknown };
    Object.keys(propsAndChilds).forEach((key) => {
      if (propsAndChilds[key] instanceof Block) {
        children[key] = propsAndChilds[key];
      } else {
        props[key] = propsAndChilds[key];
      }
    });
    return { children, props };
  }

  compile(
    template: { (page: Block): string; (arg0: unknown): string },
    props: { [key: string]: unknown }
  ) {
    if (typeof props == "undefined") {
      props = this._props;
    }
    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(
      ([key, child]) =>
        (propsAndStubs[key] = `<div data-id="${child._id}"></div>`)
    );

    const fragment = this.createDocumentElement("template");
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this._children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child._element);
      }
    });

    return fragment.content;
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this._children).forEach((child) =>
      child.dispatchComponentDidMount()
    );
  }

  componentDidMount() {
    return true;
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
    if (Object.keys(this._children).length) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  _componentDidUpdate(
    oldProps: { [key: string]: unknown },
    newProps: { [key: string]: unknown }
  ) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(
    oldProps: { [key: string]: unknown },
    newProps: { [key: string]: unknown }
  ) {
    console.log(oldProps, newProps);
    return true;
  }

  setProps = (newProps: { [key: string]: unknown }) => {
    if (!newProps) {
      return;
    }
    this._setUpdate = false;
    const oldValue = { ...this._props };
    const { children, props } = this.getChildren(newProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }

    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, this._props);
      this._setUpdate = false;
    }
  };

  _makePropsProxy(props: { [key: string]: unknown }) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof { [key: string]: unknown }];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        if (target[prop as keyof { [key: string]: unknown }] !== value) {
          target[prop as keyof { [key: string]: unknown }] = value;
          this._setUpdate = true;
        }
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  show() {
    this._element.style.display = "block";
  }

  hide() {
    this._element.style.display = "none";
  }
}
