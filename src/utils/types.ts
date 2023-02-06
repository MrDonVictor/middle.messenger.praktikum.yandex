export type Chat = {
  name: string;
  avatar: string;
  lastMessage: {
    time: string;
    content: string;
    amount: number;
  };
};

export type Message = {
  messageText: string;
  isOpponent: boolean;
};
