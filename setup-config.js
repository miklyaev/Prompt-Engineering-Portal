const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, content, 'utf8');
	console.log('OK:', filePath);
};

// ─── vite.config.ts ────────────────────────────────────────────────────────────
write('vite.config.ts', `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
`);

// ─── tsconfig.json ─────────────────────────────────────────────────────────────
write('tsconfig.json', `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
`);

// ─── index.html ────────────────────────────────────────────────────────────────
write('index.html', `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PromptEdu — Образовательный портал</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);

// ─── src/main.tsx ──────────────────────────────────────────────────────────────
write('src/main.tsx', `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`);

// ─── src/index.css ─────────────────────────────────────────────────────────────
write('src/index.css', `@import "tailwindcss";

* {
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  scroll-behavior: smooth;
}
`);

// ─── package.json (update scripts) ────────────────────────────────────────────
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts = {
	dev: 'vite',
	build: 'tsc && vite build',
	preview: 'vite preview',
};
pkg.name = 'prompt-edu';
pkg.version = '1.0.0';
pkg.private = true;
pkg.type = 'module';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2), 'utf8');
console.log('OK: package.json');

console.log('\nAll config files written successfully!');
