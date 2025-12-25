export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://api.kie.ai/api/v1/veo/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VEO_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: body.prompt || 'A dog playing in a park',
        model: 'veo3_fast',
        generationType: 'REFERENCE_TO_VIDEO',

        imageUrls: body.imageUrls || [],
        aspectRatio: body.aspectRatio || '16:9',
        watermark: body.watermark || '',
        callBackUrl: body.callBackUrl || '',

        seeds: body.seeds ? [body.seeds] : undefined,
        enableFallback: false,
        enableTranslation: true
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
        }
