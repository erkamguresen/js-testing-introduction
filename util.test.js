const { generateText } = require("./util");

test("should output name and age", () => {
  const text = generateText("erkam", 36);
  expect(text).toBe("erkam (36 years old)");
  const text2 = generateText("Max", 38);
  expect(text2).toBe("Max (38 years old)");
});

test("should output data-less text", () => {
  const text = generateText("", null);
  expect(text).toBe(" (null years old)");
});

test("should output undefined text", () => {
  const text = generateText();
  expect(text).toBe("undefined (undefined years old)");
});
