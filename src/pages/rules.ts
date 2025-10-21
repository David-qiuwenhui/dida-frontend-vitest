import {
  validatorPasswordLength,
  validatorPasswordSame,
  validatorUsernameLength,
} from "./validator";

export const createUsernameRule = () => {
  return [
    {
      required: true,
      message: "请输入用户名",
      trigger: ["blur"],
    },
    {
      validator(rule: any, value: string) {
        return validatorUsernameLength(value);
      },
      message: "用户名长度必须在 4 到 16 个字符之间",
      trigger: ["blur"],
    },
  ];
};

export const createPasswordLengthRule = () => {
  return [
    {
      required: true,
      message: "请输入密码",
      trigger: ["blur"],
    },
    {
      validator(rule: any, value: string) {
        return validatorPasswordLength(value);
      },
      message: "密码长度必须在 6 到 30 个字符之间",
      trigger: ["blur"],
    },
  ];
};

export const createPasswordNotSameRule = () => {
  return [
    {
      required: true,
      message: "请再次输入密码",
      trigger: ["blur"],
    },
    {
      validator(rule: any, value: string) {
        return !validatorPasswordSame(rule.value, value);
      },
      message: "两次输入的密码不一致",
      trigger: ["blur"],
    },
  ];
};
