export type CharacterName = "me" | "black-cat" | "white-cat";

export type UserData = {
  name: string;
  avatarPath: string;
};

export type Message =
  | {
      type: "info";
      content: string;
    }
  | {
      type: "bubble";
      content: string;
      isMe: boolean;
      name: CharacterName;
    };
