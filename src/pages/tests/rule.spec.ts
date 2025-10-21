import { it, expect, describe } from "vitest";
import {
  createPasswordLengthRule,
  createPasswordNotSameRule,
  createUsernameRule,
} from "../rules";

describe("validator rules", () => {
  it("should be return username rule", () => {
    expect(createUsernameRule()).matchSnapshot();
  });

  it("should be return password length rule", () => {
    expect(createPasswordLengthRule()).matchSnapshot();
  });

  it("should be return password length rule", () => {
    expect(createPasswordNotSameRule()).toMatchInlineSnapshot(`
      [
        {
          "message": "请再次输入密码",
          "required": true,
          "trigger": [
            "blur",
          ],
        },
        {
          "message": "两次输入的密码不一致",
          "trigger": [
            "blur",
          ],
          "validator": [Function],
        },
      ]
    `);
  });
});
