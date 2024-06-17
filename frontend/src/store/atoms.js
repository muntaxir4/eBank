import { atom } from "recoil";

const loginState = atom({
  key: "loginState",
  default: localStorage.getItem("token") ? true : false,
});

export { loginState };
