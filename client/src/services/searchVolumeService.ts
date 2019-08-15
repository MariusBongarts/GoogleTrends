import { SearchVolume } from './../models/searchVolume';
import { HttpClient } from './httpClient';

export class SearchVolumeService {

  private httpClient = new HttpClient({baseURL: 'http://localhost:3000/'});

  async getEntries() {
    try {
    const response = await this.httpClient.get('searchVolumes');

    const searchVolumes = (await response.json()) as SearchVolume[];


    return searchVolumes;
    } catch (error) {
      console.log(error);
    }
  }
}
