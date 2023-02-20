import EventBus from "../utils/EventBus";
import { v4 as makeUUID } from "uuid";

export type T = Record<string, any>

type Children = Record<string, Block<T>>;

export default abstract class Block<Props extends T> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element: HTMLElement;
  _meta: { tagName: string; props?: Props };
  _props: Props;
  _eventBus;
  _id;
  _children: Children;
  _setUpdate = false;

  constructor(tagName = "div", propsAndChilds = {} as Props) {
    const { children, props } = this.getChildren(propsAndChilds);

    this._eventBus = new EventBus();
    this._id = makeUUID();
    this._children = this._makePropsProxy(children as Props);
    this._props = this._makePropsProxy({ ...props, _id: this._id }) as Props;
    this._meta = { tagName, props };

    this.registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  private registerEvents() {
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

  private init() {
    this._element = this.createDocumentElement(this._meta?.tagName);
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  public _render() {
    const block = this.render();
    this.removeEvents();
    this._element.innerHTML = "";
    this._element.appendChild(block);
    this.addEvents();
    this.addAttribute();
  }

  public render() {
    return "" as unknown as Node;
  }

  public addEvents() {
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

  public removeEvents() {
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

  public addAttribute() {
    const { attr } = this._props;
    if (attr) {
      Object.entries(attr).forEach(([key, value]) =>
        this._element.setAttribute(key, value)
      );
    }
  }

  private getChildren(propsAndChilds: Props): {
    props: Props;
    children: Children;
  } {
    const props = {} as T;
    const children: Children = {};
    Object.keys(propsAndChilds).forEach((key) => {
      if (propsAndChilds[key] instanceof Block) {
        children[key] = propsAndChilds[key];
      } else {
        props[key] = propsAndChilds[key];
      }
    });
    return { children, props: props as Props };
  }

  public compile(
    template: { (page: Block<T>): string; (arg0: unknown): string },
    props: Props
  ) {
    if (typeof props == "undefined") {
      props = this._props;
    }
    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(
      ([key, child]) =>
        (propsAndStubs[key] = `<div data-id="${child._id}"></div>`)
    );

    const fragment = this.createDocumentElement(
      "template"
    ) as HTMLTemplateElement;
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this._children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child._element);
      }
    });

    return fragment.content;
  }

  private _componentDidMount() {
    this.componentDidMount();
    Object.values(this._children).forEach((child) =>
      child.dispatchComponentDidMount()
    );
  }

  public componentDidMount() {
    return true;
  }

  public dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
    if (Object.keys(this._children).length) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  public componentDidUpdate(oldProps: Props, newProps: Props) {
    console.log(oldProps, newProps);
    return true;
  }

  public setProps = (newProps: Props) => {
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

  private _makePropsProxy(props: Props) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof Props];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        if (target[prop as keyof Props] !== value) {
          target[prop as keyof Props] = value;
          this._setUpdate = true;
        }
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  public show() {
    this._element.style.display = "block";
  }

  public hide() {
    this._element.style.display = "none";
  }
}
