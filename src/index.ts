import Block from "./components/block";
import Nav from "./components/Nav";
import tmpl from "./index.hbs";
import { Landing, Signup, Signin, Settings, Error } from "./pages";
import { chats, person, messages } from "./utils/mockData";

interface Infer {
  string: string | (() => void);
}

class Index extends Block {
  render() {
    return this.compile(tmpl, { ...this._props });
  }
}

const nav = new Nav("ul", {
  items: [
    { url: "#", title: "Landing" },
    { url: "#signup", title: "Signup Page" },
    { url: "#signin", title: "Signin Page" },
    { url: "#settings", title: "Settings" },
    { url: "#404", title: "404" },
    { url: "#500", title: "500" },
  ],
  events: {
    click: (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Link clicked");
    },
  },
});

const landing = new Landing("div", {
  chats: chats,
  messages: messages,
  attr: {
    class: "landing flex flex-row",
  },
});

const signup = new Signup("div", {
  attr: {
    class: "flex flex-col centered form",
  },
});

const signin = new Signin("div", {
  attr: {
    class: "flex flex-col centered form",
  },
});

const settings = new Settings("div", {
  ...person,
  attr: {
    class: "flex flex-col centered",
  },
});

const error500 = new Error("div", {
  error_code: "500",
  error_text: "We already fixing it",
  attr: {
    class: "flex flex-col centered",
  },
});

const error404 = new Error("div", {
  error_code: "404",
  error_text: "Ops there is no page you are looking for",
  attr: {
    class: "flex flex-col centered",
  },
});

const index = new Index("div", {
  nav: nav,
});

const routes: Infer = {} as Infer;
const templates: Infer = {} as Infer;

const app_div = document.getElementById("root");

function renderPage(page: string) {
  switch (page) {
    case "landing":
      index.setProps({ page: landing });
      break;
    case "signup":
      index.setProps({ page: signup });
      break;
    case "signin":
      index.setProps({ page: signin });
      break;
    case "settings":
      index.setProps({ page: settings });
      break;
    case "500":
      index.setProps({ page: error500 });
      break;
    default:
      index.setProps({ page: error404 });
      break;
  }
  index._render();
  app_div.innerHTML = index._element.innerHTML;
  return;
}

function route(path: string, template: string | (() => void)) {
  if (typeof template === "string") {
    return (routes[path as keyof Infer] = templates[template as keyof Infer]);
  } else {
    return;
  }
}

function template(name: string, templateFunction: () => void) {
  return (templates[name as keyof Infer] = templateFunction);
}

template("landing", () => renderPage("landing"));
template("signup", () => renderPage("signup"));
template("signin", () => renderPage("signin"));
template("settings", () => renderPage("settings"));
template("500", () => renderPage("500"));
template("404", () => renderPage("404"));

route("/", "landing");
route("signup", "signup");
route("signin", "signin");
route("settings", "settings");
route("500", "500");
route("404", "404");

function resolveRoute(route: string) {
  try {
    return routes[route as keyof Infer];
  } catch (e) {
    throw new Error(`Route ${route} not found`);
  }
}

function router() {
  const url = window.location.hash.slice(1) || "/";
  const route = resolveRoute(url);
  if (typeof route == "function") {
    route();
  }
}

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
