import { Keyword } from './../../../preProcessing/nodeJs/models/keyword';
import { HttpClient } from './httpClient';

export class KeywordSercice {

  private httpClient = new HttpClient({baseURL: 'http://localhost:3000/'});

  async getEntries() {
    try {
    const response = await this.httpClient.get('keywords');

    const entries = (await response.json()) as Keyword[];


    return entries;
    } catch (error) {
      console.log(error);
    }
  }
}
