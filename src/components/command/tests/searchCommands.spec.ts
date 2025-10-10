import { useCommand } from "@/composable/command";
import { it, expect, describe, beforeEach, beforeAll } from "vitest";
import { useSearchCommands } from "../searchCommands";

const TEST_COMMAND_HOME = "go to home";
const TEST_COMMAND_SETTING = "go to setting";

describe("search commands", () => {
  beforeEach(() => {
    // 重置状态
    const { resetSearchCommands } = useSearchCommands();
    resetSearchCommands();
  });

  beforeAll(() => {
    const { addCommand } = useCommand();
    addCommand({ name: TEST_COMMAND_HOME, execute: () => {} });
    addCommand({ name: TEST_COMMAND_SETTING, execute: () => {} });
  });

  it("should be add a command", () => {
    const { commands } = useCommand();

    expect(commands.length).toBe(2);
    expect(commands[0].name).toBe(TEST_COMMAND_HOME);
    expect(commands.find((i) => i.name === TEST_COMMAND_HOME)).toBeDefined();
  });

  it("should be search a command", () => {
    const { filteredCommands, searchCommands } = useSearchCommands();
    searchCommands(TEST_COMMAND_HOME);

    expect(filteredCommands.value.length).toBe(2);
    expect(filteredCommands.value[0].name).toBe(TEST_COMMAND_HOME);
  });

  it("should be search all commands", () => {
    const { filteredCommands, searchCommands } = useSearchCommands();
    searchCommands("");

    console.log(filteredCommands.value);

    expect(filteredCommands.value.length).toBe(2);
    expect(filteredCommands.value[0].name).toBe(TEST_COMMAND_HOME);
    expect(filteredCommands.value[1].name).toBe(TEST_COMMAND_SETTING);
  });
});
