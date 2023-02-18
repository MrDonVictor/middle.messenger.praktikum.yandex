import {
  Nav,
  Block,
  Input,
  SettingsForm,
  SigninForm,
  SignupForm,
  T,
} from "./components";
import tmpl from "./index.hbs";
import { Landing, Signup, Signin, Settings, Error } from "./pages";
import {
  chats,
  person,
  messages,
  navigation,
  signupInputs,
  loginInputs,
  settingsInputs,
} from "./utils/mockData";
import { inputValidation } from "./utils/validation";

interface Infer {
  string: string | (() => void);
}

class Index extends Block<T> {
  render() {
    return this.compile(tmpl, { ...this._props });
  }
}

const onSubmit = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  const form = e.target as HTMLFormElement;
  for (let i = 0; i < form.elements.length; i++) {
    const input = form.elements[i] as HTMLInputElement;
    if (input.name) {
      inputValidation(input);
      console.log(input.name + " = " + input.value);
    }
  }
};

const onBlur = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  const input = e.target as HTMLInputElement;
  if (input.name) {
    inputValidation(input);
  }
};

const nav = new Nav({
  items: navigation,
  events: {
    click: (e: Event) => {
      const nav = e.target as Element;
      console.log(nav.innerHTML + " clicked");
    },
  },
});

const landing = new Landing({
  chats: chats,
  messages: messages,
  attr: {
    class: "landing flex flex-row",
  },
});

const signupInputsComponents: { string: Block<T> } = {} as { string: Block<T> };

signupInputs.map(
  (input) =>
    (signupInputsComponents[input.name as keyof { string: Block<T> }] =
      new Input({
        attr: {
          class: "input-container",
        },
        type: input.type,
        id: input.id,
        name: input.name,
        required: input.required,
        label: input.label,
        events: {
          onBlur: onBlur,
          focus: onBlur,
        },
      }))
);

const loginInputsComponents: { string: Block<T> } = {} as { string: Block<T> };

loginInputs.map(
  (input) =>
    (loginInputsComponents[input.name as keyof { string: Block<T> }] =
      new Input({
        attr: {
          class: "input-container",
        },
        type: input.type,
        id: input.id,
        name: input.name,
        required: input.required,
        label: input.label,
        events: {
          blur: onBlur,
          focus: onBlur,
        },
      }))
);

const settingsComponents: { string: Block<T> } = {} as { string: Block<T> };

settingsInputs.map(
  (input) =>
    (settingsComponents[(input.name + "_comp") as keyof { string: Block<T> }] =
      new Input({
        attr: {
          class: "input-container",
        },
        type: input.type,
        id: input.id,
        name: input.name,
        required: input.required,
        label: input.label,
        events: {
          blur: onBlur,
          focus: onBlur,
        },
      }))
);

const signupForm = new SignupForm({
  attr: {
    class: "flex flex-col centered",
  },
  ...signupInputsComponents,
  events: {
    submit: onSubmit,
  },
});

const signup = new Signup({
  attr: {
    class: "flex flex-col centered form",
  },
  form: signupForm,
});

const signinForm = new SigninForm({
  attr: {
    class: "flex flex-col centered",
  },
  ...loginInputsComponents,
  events: {
    submit: onSubmit,
  },
});

const signin = new Signin({
  attr: {
    class: "flex flex-col centered form",
  },
  form: signinForm,
});

const settingsForm = new SettingsForm({
  attr: {
    class: "flex flex-col centered",
  },
  ...settingsComponents,
  events: {
    submit: onSubmit,
  },
});

const settings = new Settings({
  ...person,
  attr: {
    class: "flex flex-col centered",
  },
  form: settingsForm,
});

const error500 = new Error({
  error_code: "500",
  error_text: "We already fixing it",
  attr: {
    class: "flex flex-col centered",
  },
});

const error404 = new Error({
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
  if (app_div) {
    app_div.innerHTML = "";
    app_div.appendChild(index._element);
  }
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

function router(e: Event) {
  e.preventDefault();
  e.stopPropagation();
  const url = window.location.hash.slice(1) || "/";
  const route = resolveRoute(url);
  if (typeof route == "function") {
    route();
  }
}

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
