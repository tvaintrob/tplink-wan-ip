const puppeteer = require("puppeteer");

/**
 * fetch public ip from the router
 *
 * @param host      {String}   the name for the router
 * @param username  {String}   administrator username
 * @param password  {String}   administrator password
 */
async function fetchPublicIp(host, username, password) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(host, { waitUntil: "networkidle0" });
  await page.type("#userName", username);
  await page.type("#pcPassword", password);
  await Promise.all([
    page.click("#loginBtn"),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);

  const frames = page.frames();
  const mainFrame = frames.filter((f) => f.name() === "mainFrame")[0];
  const text = await mainFrame.$eval("#wanip", (el) => el.textContent);
  const publicIP = text.replace(/\(.*\)/, "");

  await page.close();
  await browser.close();

  return publicIP;
}

module.exports = { fetchPublicIp };
