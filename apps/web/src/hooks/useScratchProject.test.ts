import { describe, expect, it } from "vite-plus/test";
import { EnvironmentId } from "@t3tools/contracts";

import { orderScratchEnvironmentIds } from "./useScratchProject";

const local = EnvironmentId.make("environment-local");
const macMini = EnvironmentId.make("environment-mac-mini");
const linux = EnvironmentId.make("environment-linux");

describe("orderScratchEnvironmentIds", () => {
  it("puts the current environment first and keeps the others in order", () => {
    expect(orderScratchEnvironmentIds([local, macMini, linux], macMini)).toEqual([
      macMini,
      local,
      linux,
    ]);
  });

  it("keeps the environment order when the current one offers no scratch folder", () => {
    expect(orderScratchEnvironmentIds([local, linux], macMini)).toEqual([local, linux]);
    expect(orderScratchEnvironmentIds([local, linux], null)).toEqual([local, linux]);
  });
});
