
import emojiData from 'unicode-emoji-json/data-by-emoji.json';


const emojiMap: any = {};

for (const [emoji, data]  of Object.entries(emojiData)) {

  if (data.slug) {
      emojiMap[`:${data.slug}:`] = emoji;
  }
}


export default emojiMap;