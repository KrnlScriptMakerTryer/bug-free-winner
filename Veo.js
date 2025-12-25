const API_KEY = 'c238c7967ba7ff0c1be000d68a072108'; // your Veo 3.1 API key
const API_URL = 'https://api.kie.ai/api/v1/veo/generate';

async function generateVeoVideo(prompt = 'A dog playing in a park', imageUrls = []) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt,
      model: 'veo3_fast',
      generationType: 'REFERENCE_TO_VIDEO',
      imageUrls,
      aspectRatio: '16:9',
      seeds: [12345],
      enableFallback: false,
      enableTranslation: true
    })
  });
  return res.json();
}
