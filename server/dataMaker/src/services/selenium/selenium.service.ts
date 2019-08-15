import { Keyword } from '../../models/keyword';
import { MongoGenericDAO } from '../../models/mongo-generic.dao';
import { Express } from 'express';
import { WebElement, Builder, Browser, WebDriver, By, until, logging } from 'selenium-webdriver';
let chrome = require("selenium-webdriver/chrome");

import uuid = require('uuid');
import { SearchVolume } from '../../models/searchVolume';

export class SeleniumSearchVolume {
  driver!: WebDriver;
  appRoot!: WebElement;
  db!: MongoGenericDAO<Keyword>;
  dbVolume!: MongoGenericDAO<SearchVolume>;

  async setup(app: Express) {
    this.db = app.locals.keywordDAO;
    this.dbVolume = app.locals.searchVolumeDAO;

    const test = await this.dbVolume.findAll();
    const filtering = test.filter(e => e.keyword.toLowerCase() === "inditex jobs");

    let options = new chrome.Options();
    const extension = this.encode('./keywordExtension.crx');
    options.addExtensions(extension);
    this.driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    await this.driver.get('chrome-extension://jjhhjhlihaopmdhcefijfdfddlmoilff/html/options.html');
    const apiKeyInput = await this.driver.findElement(By.id('apiKey'));
    apiKeyInput.sendKeys('0ec226277bbfe0aad1d6');
    const validateBtn = await this.driver.findElement(By.id('validate'));
    await validateBtn.click();
    await this.driver.sleep(500);
    await this.driver.get('https://google.de');
    await this.driver.sleep(500);
  }

  async saveAbsoulteTrends(words: Keyword[]) {
    this.appRoot = await this.driver.findElement(By.name('q'));
    for (let i = 0; i <= words.length; i++) {
      await this.doSearch(words[i]);
    }

  }

  async doSearch(wordKey: Keyword) {
    try {
      await this.driver.sleep(1000);
      await this.appRoot.clear();
      await this.appRoot.sendKeys(wordKey.keyword);
      await this.driver.sleep(1000);
      await this.driver.wait(until.elementLocated(By.className('xt-suggestions-search')));
      const keywords = await this.driver.findElements(By.className('sbl1'));


      for (let i = 0; i <= keywords.length; i++) {
        const trend = await keywords[i].findElements(By.className('xt-suggestions-search'));
        const data = await trend[0].getText();
        const wordElement = await keywords[i].findElements(By.tagName('span'));
        const word = await wordElement[0].getText();
        const onlyKeyword = word.substring(0, word.length - data.length);
        // Create sibling keywords, if not exisiting
        let sibling = await this.db.findOne({ keyword: onlyKeyword });

        if (!sibling) {
          const newKeyword: Partial<Keyword> = {
            keyword: onlyKeyword,
            parentKeywordId: wordKey.id
          };

          await this.db.create(newKeyword);
          sibling = await this.db.findOne({ keyword: onlyKeyword });
          console.log("Created sibling");

        }



        const volume = Number(data.split('/')[0].split('.').join(""));
        const cpc = data.split(' ')[2];
        const competition = Number(data.split(' ')[4]);

        const searchVolume: Partial<SearchVolume> = {
          keyword: onlyKeyword,
          keywordId: sibling.id,
          searchVolume: volume,
          cpc: cpc,
          competition: competition
        };
        console.log(searchVolume);

        // Only updated when value changed or entry is new
        const existingEntry = await this.dbVolume.findOne({keywordId: searchVolume.keywordId}) as SearchVolume;
        let hasChanged = true;
        existingEntry && existingEntry.searchVolume === searchVolume.searchVolume ? hasChanged = false : hasChanged = true;
        hasChanged && volume && cpc && competition ? await this.dbVolume.create(searchVolume) : '';
      }
    } catch (error) {
      await this.appRoot.clear();
    }

  }



  encode(file: string) {
    var stream = require('fs').readFileSync(file);
    return new Buffer(stream).toString('base64');

  }


}




