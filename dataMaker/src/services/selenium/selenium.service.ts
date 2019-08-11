import { WebElement, Builder, Browser, WebDriver, By, until, logging } from 'selenium-webdriver';
let chrome = require("selenium-webdriver/chrome");

import * as path from 'path';
import * as fs from 'fs';

let driver: WebDriver;
let appRoot: WebElement;

export async function getAbsoulteTrends() {
  let options = new chrome.Options();
  const extension = encode('./keywordExtension.crx');
  options.addExtensions(extension);

  driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

  await driver.get('chrome-extension://jjhhjhlihaopmdhcefijfdfddlmoilff/html/options.html');
  const apiKeyInput = await driver.findElement(By.id('apiKey'));
  apiKeyInput.sendKeys('0ec226277bbfe0aad1d6');
  const validateBtn = await driver.findElement(By.id('validate'));
  await validateBtn.click();
  await driver.get('https://google.de');
  appRoot = await driver.findElement(By.name('q'));
  await appRoot.sendKeys("Amazon");
  await appRoot.submit();

}

function encode(file: string) {
  var stream = require('fs').readFileSync(file);
  return new Buffer(stream).toString('base64');

}


