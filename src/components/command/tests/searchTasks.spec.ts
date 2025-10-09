import { it, expect, describe } from "vitest";
import { useSearchTasks } from "../searchTasks";

describe("useSearchTasks", () => {
  it("should search tasks", async () => {
    const { searchTasks } = useSearchTasks();
    searchTasks("mock");
    expect(searchTasks).toBeCalled();
  });
});
