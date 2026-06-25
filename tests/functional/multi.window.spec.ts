import { test, expect } from "@playwright/test";

test.describe("Multiple Windows", { tag: "@demo" }, () => {
    test("Should handle multiple windows and assert header in new window", async ({ page, context }) => {
        // 1. Navigate to the site
        await page.goto("https://the-internet.herokuapp.com");
        await expect(page).toHaveTitle("The Internet");

        // 2. Wait for new window to open and click on "Multiple Windows" link
        const [newPage] = await Promise.all([
            context.waitForEvent("page"), // Wait for new page to be opened
            page.getByRole("link", { name: "Multiple Windows" }).click(),
        ]);

        // 3. Navigate to the newly opened window
        await newPage.waitForLoadState("networkidle");

        // 4. Assert the header in the new window
        await expect(newPage.locator("h1")).toContainText("Opens in a new window");

        await newPage.close();
    });
});
