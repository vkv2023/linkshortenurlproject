# Authentication Instructions

Use Clerk for all authentication in this project. Do not introduce any alternative auth mechanism, custom session flow, or manual token handling.

## Required Rules
- All sign-in, sign-up, and session checks must use Clerk.
- Do not implement custom auth logic, local storage auth checks, or alternate providers.
- The /dashboard route is a protected page and must require an authenticated Clerk session.
- If an authenticated user visits the homepage, redirect them to /dashboard.
- If an unauthenticated user reaches a protected route, trigger the Clerk sign-in flow rather than bypassing auth.

## UI Expectations
- Clerk sign-in and sign-up actions must open in a modal.
- Keep the auth experience consistent with the existing Clerk-based UI.
- Preserve clear sign-in and sign-up controls in the main interface.

## Implementation Notes
- Prefer Clerk components and helpers already used in the app.
- Keep sensitive values in environment variables and never expose secrets in client code.
- Follow the current Clerk Next.js patterns and avoid relying on outdated examples.
