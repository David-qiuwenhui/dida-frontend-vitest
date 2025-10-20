import { it, expect, describe, beforeEach, vi } from "vitest";
import axiosMockAdapter from "axios-mock-adapter";
import { http } from "../http";
import { cleanToken, setToken } from "@/utils";
import { messageInfo, messageRedirectToSignIn } from "@/composable/message";
import { goToLoginHandler } from "@/composable";

vi.mock("@/composable/message");

describe("http module", () => {
  let axiosMock: axiosMockAdapter;

  beforeEach(() => {
    // 初始化axiosMock
    axiosMock = new axiosMockAdapter(http);
    // 重置状态
    cleanToken();
    vi.clearAllMocks();
  });

  it("should set Authorization header when token exists", async () => {
    axiosMock.onGet("/tasks").reply(200, {
      code: 0,
      data: null,
      message: null,
    });

    const TOKEN = "test-token";
    setToken(TOKEN);
    await http.get("/tasks");

    expect(axiosMock.history[0].headers?.Authorization).toBe(`Bearer ${TOKEN}`);
  });

  it("should return response data when request code is 0", async () => {
    const RESPONSE_DATA = ["data1", "data2", "data3"];

    axiosMock.onGet("/tasks").reply(200, {
      code: 0,
      data: RESPONSE_DATA,
      message: null,
    });
    const result = await http.get("/tasks");

    expect(result).toEqual(RESPONSE_DATA);
  });

  it("should throw an error and show error message when code is not 0", async () => {
    const ERROR_MESSAGE = "an error message";
    axiosMock.onGet("/tasks").reply(200, {
      code: -1,
      data: null,
      message: ERROR_MESSAGE,
    });

    await expect(() => http.get("/tasks")).rejects.toThrowError(ERROR_MESSAGE);
    expect(messageInfo).toHaveBeenCalledWith(ERROR_MESSAGE);
  });

  it("should throw an error and show error message when code is not 0", async () => {
    const ERROR_MESSAGE = "an error message";
    axiosMock.onGet("/tasks").reply(200, {
      code: -1,
      data: null,
      message: ERROR_MESSAGE,
    });

    await expect(() => http.get("/tasks")).rejects.toThrowError(ERROR_MESSAGE);
    expect(messageInfo).toHaveBeenCalledWith(ERROR_MESSAGE);
  });

  it("should redirect to login page when code is not 0", async () => {
    axiosMock.onGet("/tasks").reply(401);

    await expect(() => http.get("/tasks")).rejects.toThrowError();
    expect(messageRedirectToSignIn).toHaveBeenCalled();
    expect(messageRedirectToSignIn).toHaveBeenCalledWith(goToLoginHandler);
  });
});
