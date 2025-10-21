import { it, expect, describe } from "vitest";
import {
  validatorPasswordLength,
  validatorPasswordSame,
  validatorUsernameLength,
} from "../validator";

describe("validator", () => {
  describe("validator password", () => {
    it("should be true when name is same", () => {
      const password = "123456";
      const value = "123456";
      const result = validatorPasswordSame(password, value);
      expect(result).toBe(true);
    });

    it("should be false when password is not same", () => {
      const password = "123456";
      const value = "1234567";
      const result = validatorPasswordSame(password, value);
      expect(result).toBe(false);
    });
  });

  describe("validator username length", () => {
    it("should be false when username length is over 20", () => {
      const username = "012345678901234567890123";
      const result = validatorUsernameLength(username);

      expect(result).toBe(false);
    });

    it("should be false when username length is under 4", () => {
      const username = "012";
      const result = validatorUsernameLength(username);

      expect(result).toBe(false);
    });

    it("should be true when username length is under 20 and over 4", () => {
      const username = "01234567890123456";
      const result = validatorUsernameLength(username);

      expect(result).toBe(true);
    });
  });

  describe("validator password length", () => {
    it("should be false when password length is over 30", () => {
      const password = "0123456789012345678901234567890123";
      const result = validatorPasswordLength(password);

      expect(result).toBe(false);
    });

    it("should be false when password length is under 6", () => {
      const password = "01234";
      const result = validatorPasswordLength(password);

      expect(result).toBe(false);
    });

    it("should be true when password length is under 30 and over 6", () => {
      const password = "0123456789";
      const result = validatorPasswordLength(password);

      expect(result).toBe(true);
    });

    it.each([
      ["012345678901234567890123456789", true],
      ["01234567890123456789012345678901", false],
      ["0123456", true],
      ["01234", false],
    ])("when password is %s should be %s", (password, expected) => {
      const result = validatorPasswordLength(password);

      expect(result).toBe(expected);
    });
  });
});
