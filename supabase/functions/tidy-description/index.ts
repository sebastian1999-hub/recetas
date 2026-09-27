// Supabase Edge Function: limpia y organiza la descripción de una receta con IA.
// Requiere el secreto OPENAI_API_KEY configurado en el proyecto de Supabase:
//   supabase secrets set OPENAI_API_KEY=sk-...
// Despliegue: supabase functions deploy tidy-description

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `Eres un asistente que ordena descripciones de recetas de cocina en español.
Reescribe el texto que te dan para que quede claro y bien organizado, sin inventar información nueva.
Si el texto contiene pasos de preparación, numéralos claramente (1., 2., 3. ...).
Si es solo una descripción breve sin pasos, simplemente corrige y mejora la redacción.
Responde únicamente con el texto final, sin comentarios ni explicaciones adicionales.`

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { descripcion } = await req.json()
    if (typeof descripcion !== 'string' || !descripcion.trim()) {
      return new Response(JSON.stringify({ descripcion: '' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const apiKey = Deno.env.get('OPENAI_API_KEY')
    if (!apiKey) throw new Error('Falta el secreto OPENAI_API_KEY en el proyecto de Supabase')

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.3,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: descripcion.trim() },
        ],
      }),
    })

    if (!response.ok) {
      const detail = await response.text()
      throw new Error(`OpenAI respondió con error: ${detail}`)
    }

    const data = await response.json()
    const texto = data.choices?.[0]?.message?.content?.trim() ?? descripcion.trim()

    return new Response(JSON.stringify({ descripcion: texto }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : 'Error desconocido' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
