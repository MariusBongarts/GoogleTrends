import { KeywordSercice } from './../services/keywordService';
import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import { Keyword } from '../models/keyword';

const componentCSS = require('./app.component.scss');

/**
 * This web component is a showing google Trends analysis
 */
@customElement('bronco-trends')
export class BroncoCalendar extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  keywordService = new KeywordSercice();

  @property() loaded = false;

  @property()
  keywords: Keyword[] = [];

  async firstUpdated() {
    await this.getKeywords();
    this.loaded = true;
  }

  async getKeywords() {
    try {
      this.keywords = await this.keywordService.getEntries() as Keyword[];
      console.log(this.keywords);
    } catch (error) {
      // No entries fetched
      console.log('Servor error');
      this.keywords = [];
    }
  }


  render() {
    return html`
  ${this.loaded ?
        html`
        <ul>
        ${this.keywords.map(word => html`<li>${word.keyword}</li>`)}
        </ul> ` :
        ''}
    `
  }
}
