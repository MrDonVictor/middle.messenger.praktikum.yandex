import tmpl from './index.hbs'
import {landing, signup, signin, settings, error } from './pages'
import { chats, person, messages } from './utils/mockData';

let routes = {};
let templates = {};

let app_div = document.getElementById('root');

function renderPage(page) {
  let res = ''
  switch (page) {
    case "landing":
      res = tmpl({
        page: landing({
          chats:chats,
          messages: messages
        }),
      })
      break;
    case "signup":
      res = tmpl({
        page: signup(),
      })
      break;
    case "signin":
      res = tmpl({
        page: signin(),
      })
      break;
    case "settings":
      res = tmpl({
        page: settings({...person}),
      })
      break;
    case "500":
      res = tmpl({
        page: error({error_code: '500', error_text: 'We already fixing it'}),
      })
      break;
    default:
      res = tmpl({
        page: error({error_code: '404', error_text: 'Ops there is no page you are looking for'}),
      })
      break;
  }
  app_div.innerHTML = res
  return
}

function route (path, template) {
  if (typeof template === 'function') {
      return routes[path] = template;
  }
  else if (typeof template === 'string') {
      return routes[path] = templates[template];
  } else {
      return;
  };
};

function template (name, templateFunction) {
  return templates[name] = templateFunction;
};

template('landing', () => renderPage('landing'))
template('signup', () => renderPage('signup'))
template('signin', () => renderPage('signin'))
template('settings', () => renderPage('settings'))
template('500', () => renderPage('500'))
template('404', () => renderPage('404'))

route('/', 'landing');
route('signup', 'signup');
route('signin', 'signin');
route('settings', 'settings');
route('500', '500');
route('404', '404');

function resolveRoute(route) {
  try {
      return routes[route];
  } catch (e) {
      throw new Error(`Route ${route} not found`);
  };
};

function router(evt) {
  let url = window.location.hash.slice(1) || '/';
  let route = resolveRoute(url);
  route();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
