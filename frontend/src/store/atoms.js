import { atom, selector } from "recoil";

const loginState = atom({
  key: "loginState",
  default: false,
});

export { loginState };
