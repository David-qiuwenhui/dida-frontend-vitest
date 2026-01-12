import { describe, it, expect } from "vitest";
import {
  validatorPasswordSame,
  validatorUsernameLength,
  validatorPasswordLength,
} from "./validator";

describe("validator tests", () => {
  describe("validatorPasswordSame", () => {
    it("should return true when passwords match", () => {
      expect(validatorPasswordSame("password123", "password123")).toBe(true);
    });

    it("should return false when passwords do not match", () => {
      expect(validatorPasswordSame("password123", "password124")).toBe(false);
    });
  });

  describe("validatorUsernameLength", () => {
    it("should return false when username is less than 4 characters", () => {
      expect(validatorUsernameLength("abc")).toBe(false);
    });

    it("should return true when username is between 4 and 20 characters", () => {
      expect(validatorUsernameLength("abcd")).toBe(true);
      expect(validatorUsernameLength("abcdefghijklmnopqrst")).toBe(true); // 20 characters
    });

    it("should return false when username is more than 20 characters", () => {
      expect(validatorUsernameLength("abcdefghijklmnopqrstu")).toBe(false); // 21 characters
    });
  });

  describe("validatorPasswordLength", () => {
    it("should return false when password is less than 6 characters", () => {
      expect(validatorPasswordLength("pass5")).toBe(false);
    });

    it("should return true when password is between 6 and 30 characters", () => {
      expect(validatorPasswordLength("password6")).toBe(true);
      expect(validatorPasswordLength("password12345678901234567890")).toBe(
        true
      ); // 30 characters
    });

    it("should return false when password is more than 30 characters", () => {
      expect(validatorPasswordLength("password123456789012345678901123")).toBe(
        false
      ); // 31 characters
    });
  });
});
