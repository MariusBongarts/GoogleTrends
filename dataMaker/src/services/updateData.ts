import { companieNames } from '../data/constants';

async function updateKeywords() {
    companieNames.forEach(async (word: any) => {
      console.log(word);
});
}
