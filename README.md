Overview
This is a Rick and Morty character browser built with Next.js 14+ (App Router), featuring character search, detailed character views, and favorites management. The application follows a client-side heavy approach with API integration to the Rick and Morty API.

Tech Stack
Frontend: Next.js 19, React, TypeScript, Tailwind CSS, React Query
State Management: URL-driven state + React Query for caching & server state
Backend/Service: REST API (Rick and Morty API)
Routing: Next.js App Router (useNavigation)
UI Components: Reusable components with Skeletons for loading states

Overall Architecture
Component-driven structure: Each feature (Search, Pagination, CharacterCard, EpisodeItem) has its own folder/component.
Data fetching: React Query handles caching, loading, and error states.
URL-driven state: Search and page are reflected in the URL to allow deep linking and browser navigation

Trade-offs & Decisions

Search Implementation
Current: Debounced search with 500ms delay

✅ Reduces API calls, smooth typing experience
❌ Slight delay for very fast typers

Image Loading
Current: Next.js Image component with lazy loading

✅ Automatic optimization and lazy loading
❌ Requires image dimensions or fill (using fill everywhere)

Pagination
Current: Traditional pagination with page numbers

✅ Clear navigation, URL-based state
❌ Not as smooth as infinite scroll

Styling: Tailwind CSS
Decision: Tailwind CSS with custom CSS for specific components

✅ Pros: Fast development, consistent spacing/colors, small production bundle
❌ Cons: HTML can become verbose, requires learning utility names

Loading States
Current: Skeleton components for loading

✅ Better perceived performance, maintains layout
❌ Additional component maintenance overhead
