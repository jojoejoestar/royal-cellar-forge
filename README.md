# Cave Royale

Site institucional da Cave Royale — curadoria privada de vinhos finos na Serra Gaúcha.

Next.js 16, React 19, GSAP, Lenis e Tailwind CSS 4. Uma página longa, com seções independentes e animações de scroll no desktop.

## Rodar localmente

```bash
npm install
npm run dev
```

Build de produção: `npm run build` · lint: `npm run lint` · format: `npm run format`.

## Estrutura

```
app/                  rotas e metadata
src/content/          acervo, navegação, dados do site
src/components/site/  seções da home
src/components/ui/    primitivos (título animado, dialog)
src/hooks/            media query, scroll, GSAP
src/lib/              GSAP, partículas, utilitários
public/               logo e hero
src/assets/           fotos das seções
```

A home monta o hero na rota e carrega o restante em `HomeBelowFold`. Efeitos pesados (cursor, Lenis, atmosfera) entram depois da hidratação, via `DeferredEffects`.

## Observações

- Copy e catálogo são de apresentação.
- Respeita `prefers-reduced-motion`.
- No mobile, `content-visibility` reduz trabalho de layout nas seções abaixo da dobra.
