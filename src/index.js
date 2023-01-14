import tmpl from './index.hbs'
import {landing, signup, signin, settings, error } from './pages'

const chats = [
  {
    name: 'Victor',
    avatar: 'https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png',
    lastMessage: {
      time: '14:00',
      content: 'Sorry, i would not come',
      amount: 1
    }
  },
  {
    name: 'Victor',
    avatar: 'https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png',
    lastMessage: {
      time: '14:00',
      content: 'Sorry, i would not come',
      amount: 1
    }
  },
  {
    name: 'Victor',
    avatar: 'https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png',
    lastMessage: {
      time: '14:00',
      content: 'Sorry, i would not come',
      amount: 1
    }
  },
  {
    name: 'Victor',
    avatar: 'https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png',
    lastMessage: {
      time: '14:00',
      content: 'Sorry, i would not come',
      amount: 1
    }
  }
]

const person = {
  first_name: 'Victor',
  second_name: 'Zabrovskiy',
  display_name: 'VictorZ',
  login: 'victor11555',
  email: 'vzabrovskiu@gmail.com',
  phone: '79121334111',
  avatar: 'https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png',
}

// $('#back-button').click(function(){
//   window.location.href.replace(/\/[a-zA-Z]+$/, '')
// });

function backFunc() {
  window.location.href.replace(/\/[a-zA-Z]+$/, '')
}

function renderPage() {
  let res = ''
  switch (window.location.href.split('3000')[1]) {
    case "/":
      res = tmpl({
        page: landing({chats:chats}),
      })
      break;
    case "/signup":
      res = tmpl({
        page: signup(),
      })
      break;
    case "/signin":
      res = tmpl({
        page: signin(),
      })
      break;
    case "/settings":
      res = tmpl({
        backFunc: backFunc.toString().replace(/\"/g,"'") + ")()",
        page: settings({...person}),
      })
      break;
    case "/500":
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
  return res
}

document.getElementById('root').innerHTML = renderPage();

// document.getElementById('back-button').click(function(){
//   window.location.href.replace(/\/[a-zA-Z]+$/, '')
// });