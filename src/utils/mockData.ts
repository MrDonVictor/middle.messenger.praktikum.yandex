export const chats = [
  {
    name: "Victor",
    avatar: "https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png",
    lastMessage: {
      time: "14:00",
      content: "Sorry, i would not come",
      amount: 1,
    },
  },
  {
    name: "Victor",
    avatar: "https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png",
    lastMessage: {
      time: "14:00",
      content: "Sorry, i would not come",
      amount: 1,
    },
  },
  {
    name: "Victor",
    avatar: "https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png",
    lastMessage: {
      time: "14:00",
      content: "Sorry, i would not come",
      amount: 1,
    },
  },
  {
    name: "Victor",
    avatar: "https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png",
    lastMessage: {
      time: "14:00",
      content: "Sorry, i would not come",
      amount: 1,
    },
  },
  {
    name: "Victor",
    avatar: "https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png",
    lastMessage: {
      time: "14:00",
      content: "Sorry, i would not come",
      amount: 1,
    },
  },
  {
    name: "Victor",
    avatar: "https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png",
    lastMessage: {
      time: "14:00",
      content: "Sorry, i would not come",
      amount: 1,
    },
  },
  {
    name: "Victor",
    avatar: "https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png",
    lastMessage: {
      time: "14:00",
      content: "Sorry, i would not come",
      amount: 1,
    },
  },
  {
    name: "Victor",
    avatar: "https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png",
    lastMessage: {
      time: "14:00",
      content: "Sorry, i would not come",
      amount: 1,
    },
  },
  {
    name: "Victor",
    avatar: "https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png",
    lastMessage: {
      time: "14:00",
      content: "Sorry, i would not come",
      amount: 1,
    },
  },
  {
    name: "Victor",
    avatar: "https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png",
    lastMessage: {
      time: "14:00",
      content: "Sorry, i would not come",
      amount: 1,
    },
  },
  {
    name: "Victor",
    avatar: "https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png",
    lastMessage: {
      time: "14:00",
      content: "Sorry, i would not come",
      amount: 1,
    },
  },
  {
    name: "Victor",
    avatar: "https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png",
    lastMessage: {
      time: "14:00",
      content: "Sorry, i would not come",
      amount: 1,
    },
  },
  {
    name: "Victor",
    avatar: "https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png",
    lastMessage: {
      time: "14:00",
      content: "Sorry, i would not come",
      amount: 1,
    },
  },
];

export const person = {
  first_name: "Victor",
  second_name: "Zabrovskiy",
  display_name: "VictorZ",
  login: "victor11555",
  email: "vzabrovskiu@gmail.com",
  phone: "79121334111",
  avatar: "https://aui.atlassian.com/aui/7.9/docs/images/avatar-96.png",
};

export const messages = [
  {
    messageText: "Hi Victor",
    isOpponent: true,
  },
  {
    messageText: "Hi Max",
    isOpponent: false,
  },
  {
    messageText: "How are you?",
    isOpponent: false,
  },
  {
    messageText: "All good, how are you?",
    isOpponent: true,
  },
  {
    messageText: "Fine",
    isOpponent: false,
  },
];

export const navigation = [
  { url: "#", title: "Landing" },
  { url: "#signup", title: "Signup Page" },
  { url: "#signin", title: "Signin Page" },
  { url: "#settings", title: "Settings" },
  { url: "#404", title: "404" },
  { url: "#500", title: "500" },
];

export const signupInputs = [
  {
    type: "text",
    id: 'first_name',
    name: 'first_name',
    required: true,
    label: 'First name',
    pattern: "^[A-Z]{1}[a-z-]+$"
  },
  {
    type: "text",
    id: 'second_name',
    name: 'second_name',
    required: true,
    label: 'Second name',
    pattern: "^[A-Z]{1}[a-z-]+$"
  },
  {
    type: "text",
    id: 'login',
    name: 'login',
    required: true,
    label: 'Login',
    pattern: "^(?=[a-zA-Z0-9_-]{3,20}$)(?!.*[_-]{2})[^_-].*[^_-]$"
  },
  {
    type: "email",
    id: 'email',
    name: 'email',
    required: true,
    label: 'Email',
    pattern: ".{1,}",
  },
  {
    type: "password",
    id: 'password',
    name: 'password',
    required: true,
    label: 'Password',
    pattern: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,40}$",
  },
  {
    type: "text",
    id: 'phone',
    name: 'phone',
    required: true,
    label: 'Phone',
    pattern: "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$",
  },
]

export const loginInputs = [
  {
    type: "text",
    id: 'login',
    name: 'login',
    required: true,
    label: 'Login',
    pattern: "^(?=[a-zA-Z0-9_-]{3,20}$)(?!.*[_-]{2})[^_-].*[^_-]$",
  },
  {
    type: "password",
    id: 'password',
    name: 'password',
    required: true,
    label: 'Password',
    pattern: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,40}$",
  },
]

export const settingsInputs = [
  {
    type: "text",
    id: 'first_name',
    name: 'first_name',
    required: false,
    label: 'First name',
    pattern: "^[A-Z]{1}[a-z-]+$",
  },
  {
    type: "text",
    id: 'second_name',
    name: 'second_name',
    required: false,
    label: 'Second name',
    pattern: "^[A-Z]{1}[a-z-]+$",
  },
  {
    type: "text",
    id: 'display_name',
    name: 'display_name',
    required: false,
    label: 'Display name',
    pattern: ""
  },
  {
    type: "text",
    id: 'login',
    name: 'login',
    required: false,
    label: 'Login',
    pattern: "^(?=[a-zA-Z0-9_-]{3,20}$)(?!.*[_-]{2})[^_-].*[^_-]$",
  },
  {
    type: "email",
    id: 'email',
    name: 'email',
    required: false,
    label: 'Email',
    pattern: ".{1,}"
  },
  {
    type: "text",
    id: 'phone',
    name: 'phone',
    required: false,
    label: 'Phone',
    pattern: "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$",
  },
  {
    type: "password",
    id: 'old_password',
    name: 'old_password',
    required: false,
    label: 'Old password',
    pattern: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,40}$",
  },
  {
    type: "password",
    id: 'new_password',
    name: 'new_password',
    required: false,
    label: 'New password',
    pattern: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,40}$",
  },
]
