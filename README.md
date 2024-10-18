# Personal Component Library

This is my personal library of reusable React components built with Next.js, TypeScript, and Tailwind CSS. It serves as a playground for component development and a repository for components I frequently use in my projects.

## Tech Stack

- Next.js 14.2.5
- React 18
- TypeScript
- Tailwind CSS
- Storybook
- Jest for unit testing
- Styled Components (for components that require more complex styling)
- shadcn/ui

## Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the component library in the browser.

## Storybook

This library uses Storybook for component development and documentation. To run Storybook:

```bash
npm run storybook
```

Storybook will be available at [http://localhost:6006](http://localhost:6006).

## Testing

Run unit tests:

```bash
npm test
```

## Adding New Components

1. Create a new component in the appropriate category folder under `src/components/`
2. Create a story file for the component (e.g., `ComponentName.stories.tsx`)
3. Add unit tests in the `src/tests/` directory
4. Document the component's props and usage in the story file

## Useful Scripts

- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier
- `npm run build`: Build the project
- `npm run build-storybook`: Build a static version of Storybook

## Notes

This is a personal project and is continually evolving. Components may be added, modified, or removed based on my current needs and learnings.
