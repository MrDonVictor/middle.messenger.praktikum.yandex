import EventBus from "../utils/event-bus";

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };
  _element: HTMLElement = null;
  _meta: { tagName: string; props?: { [key: string]: unknown } } = null;
  props: unknown;
  eventBus;

  /** JSDoc * @param {string} tagName * @param {Object} props * * @returns {void} */

  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();
    this._meta = { tagName, props };
    this.props = this._makePropsProxy(props);
    this.eventBus = eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }
  _registerEvents(eventBus: { on: (arg0: string, arg1: unknown) => void }) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }
  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }
  init() {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }
  _componentDidMount() {
    this.componentDidMount({});
  }
  componentDidMount(oldProps: unknown) {
    console.log(oldProps);
    //replace with real logic
  }
  dispatchComponentDidMoun() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }
  _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }
  componentDidUpdate(oldProps: unknown, newProps: unknown) {
    oldProps === newProps; // replace with real logic
    return true;
  }
  setProps = (nextProps: unknown) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  _render() {
    const block = this.render();
    this._element.innerHTML = block;
  }
  render() {
    // add with handlebars
    return "";
  }
  _makePropsProxy(props: { [key: string]: unknown }) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof { [key: string]: unknown }];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, val) {
        const oldValue = { ...target };
        target[prop as keyof { [key: string]: unknown }] = val;
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, [oldValue, target]);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }
  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }
  show() {
    this._element.style.display = "block";
  }
  hide() {
    this._element.style.display = "none";
  }
}
