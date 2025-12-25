// Veo.js
const API_KEY = 'c238c7967ba7ff0c1be000d68a072108'; // your Veo 3.1 API key
const API_URL = 'https://api.kie.ai/api/v1/veo/generate';

/**
 * Generate a Veo 3.1 video
 * @param {string} prompt - The prompt text
 * @param {string[]} imageUrls - Array of image URLs
 * @param {string} aspectRatio - '16:9' or '9:16'
 * @param {number[]} seeds - Array of numbers
 */
async function generateVeoVideo(prompt = 'A dog playing in a park', imageUrls = [], aspectRatio = '16:9', seeds = [12345]) {
  // Ensure types are correct
  if (!Array.isArray(imageUrls)) imageUrls = [];
  if (!Array.isArray(seeds)) seeds = [12345];
  if (typeof aspectRatio !== 'string') aspectRatio = '16:9';
  if (typeof prompt !== 'string') prompt = 'A dog playing in a park';

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
      aspectRatio,
      seeds,
      enableFallback: false,
      enableTranslation: true
    })
  });

  return res.json();
}
