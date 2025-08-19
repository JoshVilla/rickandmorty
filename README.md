# Rick and Morty Character Browser

This is a **Rick and Morty character browser** built with **Next.js 14+ (App Router)**, featuring character search, detailed character views, and favorites management. The application uses a **client-heavy approach** with API integration to the Rick and Morty API.

---

## Tech Stack

- **Frontend:** Next.js 19, React, TypeScript, Tailwind CSS, React Query
- **State Management:** URL-driven state + React Query for caching & server state
- **Backend/Service:** REST API (Rick and Morty API)
- **Routing:** Next.js App Router (`useNavigation`)
- **UI Components:** Reusable components with Skeletons for loading states

---

## Overall Architecture

- **Component-driven structure:** Each feature (Search, Pagination, CharacterCard, EpisodeItem) has its own folder/component.
- **Data fetching:** React Query handles caching, loading, and error states.
- **URL-driven state:** Search and pagination are reflected in the URL to allow deep linking and browser navigation.

---

## Trade-offs & Decisions

### Search Implementation

- **Current:** Debounced search with 500ms delay
- **Pros:** ✅ Reduces API calls, smooth typing experience
- **Cons:** ❌ Slight delay for very fast typers

### Image Loading

- **Current:** Next.js Image component with lazy loading
- **Pros:** ✅ Automatic optimization and lazy loading
- **Cons:** ❌ Requires image dimensions or using `fill` everywhere

### Pagination

- **Current:** Traditional pagination with page numbers
- **Pros:** ✅ Clear navigation, URL-based state
- **Cons:** ❌ Not as smooth as infinite scroll

### Styling

- **Decision:** Tailwind CSS with custom CSS for specific components
- **Pros:** ✅ Fast development, consistent spacing/colors, small production bundle
- **Cons:** ❌ HTML can become verbose, requires learning utility names

### Loading States

- **Current:** Skeleton components for loading
- **Pros:** ✅ Better perceived performance, maintains layout
- **Cons:** ❌ Additional component maintenance overhead

---

## Error Handling Strategy

- **Decision:** Multiple error boundary levels

  - Route-level error boundaries (`app/character/[id]/error.tsx`)
  - Global not-found page (`app/not-found.tsx`)
  - Component-level error states in React Query

- **Trade-offs:**
  - ✅ Graceful degradation, good user experience, prevents app crashes
  - ❌ Additional boilerplate code

---

## Usage

1. Clone the repository:

````bash
git clone <repo-url>

2. Install dependencies:
```bash
npm install

3. Install dependencies:
```bash
npm run dev

3. Open the app in the browser:
```browser
http://localhost:5000
````

This project uses **Cypress** for end-to-end testing.

### Install Cypress

npm install cypress --save-dev

# or

yarn add cypress --dev

### Open Cypress Test Runner

npm run cypress

### Using Cypress Application

**Choose Testing**  
Choose E2E Testing

**Choose Browser**  
Choose any browser (Chrome is a recommend)

**Test File List**  
On the left, you’ll see a list of all your test files (usually under `cypress/e2e`).

**Run a Test**  
Click a test file to open it in a browser.  
Cypress will automatically run all the tests in that file.  
You can watch tests execute step by step in real-time.
