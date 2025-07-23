import axios from 'axios';

const API_URL = 'https://libretranslate.com/translate';

export async function translateText(text, targetLang) {
  try {
    const res = await axios.post(API_URL, {
      q: text,
      source: 'en',
      target: targetLang,
      format: 'text'
    });
    return res.data?.translatedText || text;
  } catch (err) {
    console.error('Translation failed:', err);
    return text;
  }
}
