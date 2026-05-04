
# LUMINOUS

Private React + Vite project based on the original design:
https://www.figma.com/design/aHyQkqc7UhljjrjAnEvQnN/LUMINOUS

## Privacy

This repository is private and not intended for public distribution.

## Stack

- React 18.3.1
- Vite 6
- React Router 7
- Tailwind CSS 4
- Motion (`motion/react`)

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Notes

- If Vite fails with a parsing error in `subjectsData.tsx`, check for unescaped apostrophes inside single-quoted strings (for example `Ma'at`).
- Large bundle size warnings are currently non-blocking.
  
