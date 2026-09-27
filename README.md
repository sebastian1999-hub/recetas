# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Limpieza de descripciones con IA

Al guardar una receta, la descripción se reescribe automáticamente (ordenada, con pasos numerados) usando una Supabase Edge Function que llama a OpenAI. Para activarlo:

1. Instala la [Supabase CLI](https://supabase.com/docs/guides/cli) y haz login: `supabase login`
2. Enlaza el proyecto: `supabase link --project-ref <tu-project-ref>`
3. Configura el secreto con tu API key de OpenAI: `supabase secrets set OPENAI_API_KEY=sk-...`
4. Despliega la función: `supabase functions deploy tidy-description`

Si la función no está desplegada o falla, la app guarda la descripción tal cual la escribiste (no bloquea el guardado).

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
