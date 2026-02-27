# Cloudflare React Starter

A production-ready full-stack React application template powered by Cloudflare Workers. Features a modern React SPA with server-side rendering support via Workers, Tailwind CSS, shadcn/ui components, and TypeScript. Perfect for rapid development of performant, globally distributed web apps.

[cloudflarebutton]

## ✨ Features

- **Modern React Stack**: React 18, React Router, TanStack Query, Zustand
- **Styling**: Tailwind CSS with shadcn/ui components, dark mode support
- **Backend**: Hono-based Cloudflare Workers API routes
- **Build Tools**: Vite for blazing-fast development and builds
- **Developer Experience**: Hot reload, auto-formatting, ESLint, TypeScript
- **Performance**: Optimized for edge deployment, code splitting, source maps
- **Error Handling**: Built-in error boundaries, client/server error reporting
- **Responsive**: Mobile-first design with responsive utilities
- **Icons**: Lucide React for 2000+ consistent icons
- **Charts**: Recharts integration for data visualization
- **Forms**: React Hook Form + Zod validation

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| **State** | Zustand, TanStack Query, React Hook Form |
| **UI** | Radix UI, Headless UI, Framer Motion, Sonner |
| **Backend** | Cloudflare Workers, Hono, Pino logging |
| **Charts** | Recharts |
| **Deployment** | Cloudflare Pages/Workers, Bun |

## 🚀 Quick Start

```bash
# Clone the project (or use the deploy button above)
git clone <your-repo>
cd aeco-ai-strategy-can-vmpfhb-csa9qonyns6maz

# Install dependencies using Bun
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📚 Development

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dev server on port 3000 |
| `bun run build` | Build for production |
| `bun run lint` | Run ESLint |
| `bun run preview` | Preview production build |
| `bun run cf-typegen` | Generate Cloudflare Workers types |

### Project Structure

```
src/
├── components/     # Reusable UI components (shadcn/ui)
├── hooks/         # Custom React hooks
├── lib/           # Shared utilities
├── pages/         # Route components
└── main.tsx       # App entry point
worker/            # Cloudflare Workers API routes
```

### Adding API Routes

Add custom routes in `worker/userRoutes.ts`:

```ts
import { userRoutes } from './userRoutes';

app.get('/api/users', (c) => c.json({ users: [...] }));
```

### Styling

- Use `className` prop with Tailwind utilities
- shadcn/ui components in `src/components/ui/*`
- Custom animations in `tailwind.config.js`

```tsx
import { Button } from '@/components/ui/button'

<Button className="btn-gradient">Custom Button</Button>
```

## ☁️ Deployment

Deploy to Cloudflare with one command:

```bash
bun run deploy
```

This builds the app and deploys to your Cloudflare Workers/Pages project.

[cloudflarebutton]

**Configuration**: Edit `wrangler.jsonc` for custom settings.

### CI/CD

Add to your GitHub Actions:

```yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## 📖 Usage

### Routing

Uses `createBrowserRouter` for data loading and error handling:

```tsx
// src/main.tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
]);
```

### Error Handling

Built-in error boundaries with automatic reporting:

```tsx
<ErrorBoundary>
  <RouterProvider router={router} />
</ErrorBoundary>
```

### Theme

```tsx
import { useTheme } from '@/hooks/use-theme'

const { isDark, toggleTheme } = useTheme()
```

### API Calls

```tsx
// Client-side with TanStack Query
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(res => res.json()),
});
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`bun run dev`)
3. Commit changes (`bun run lint`)
4. Push and open PR

## 📄 License

MIT - See [LICENSE](LICENSE) for details.