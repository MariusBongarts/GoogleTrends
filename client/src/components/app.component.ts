import { SearchVolume } from './../models/searchVolume';
import { SearchVolumeService } from './../services/searchVolumeService';
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
  searchVolumeService = new SearchVolumeService();

  @property() loaded = false;

  @property()
  keywords: Keyword[] = [];

  @property()
  filteredKeywords: Keyword[] = [];

  @property()
  searchVolumes: SearchVolume[] = [];

  async firstUpdated() {
    await this.getKeywords();
    this.loaded = true;
  }

  async getKeywords() {
    try {
      this.keywords = await this.keywordService.getEntries() as Keyword[];
      this.searchVolumes = await this.searchVolumeService.getEntries() as SearchVolume[];
      this.keywords.sort((a: any, b: any) => a.keyword.toLowerCase() > b.keyword.toLowerCase() ? 1 : -1);
      this.filteredKeywords = this.keywords;
      console.log(this.searchVolumes);
    } catch (error) {
      // No entries fetched
      console.log('Servor error');
      this.keywords = [];
      this.searchVolumes = [];
    }
  }

  render() {
    return html`
  ${this.loaded ?
        html`
        <input placeholder="Find keyword"
        @keydown=${(e: any) => this.filteredKeywords = this.keywords.filter(word => word.keyword.includes(e.target.value.toLowerCase()))}>
        <ul>
        ${this.filteredKeywords.map(word => html`
        <li>${word.keyword}${this.searchVolumes.filter(e => e.keyword.toLowerCase() === word.keyword.toLowerCase()).map(volume =>
          html`<span style="margin-left: 10px;">${volume.searchVolume}</span>`)}
        </li>`)}
        </ul> ` :
        ''}
    `
  }
}
