const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

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

test("should output a valid text output", () => {
  const text = checkAndGenerate("Max", 29);
  expect(text).toBe("Max (29 years old)");
});

test("should create text and correct class", async () => {
  const browser = puppeteer.launch({
    headless: false,
    //headless: true,
    slowMo: 40,
    args: ["--window-size=800,600"],
  });

  const page = await (await browser).newPage();
  await page.goto(
    "file:///C:/Users/erkam/Documents/GitHub/js-testing-introduction/index.html"
  );
  await page.click("input#name");
  await page.type("input#name", "Anna");
  await page.click("input#age");
  await page.type("input#age", "40");
  await page.click("#btnAddUser");
  const finalText = await page.$eval(".user-item", (el) => el.textContent);
  expect(finalText).toBe("Anna (40 years old)");
  page.close();
  (await browser).close();
}, 10000);
