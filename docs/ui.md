# UI Component Instructions

Use shadcn/ui for all user interface elements in this project. Do not create custom UI components.

## Required Rules
- Use shadcn/ui components for buttons, forms, dialogs, cards, inputs, dropdowns, navigation, alerts, and other UI elements.
- Do not build bespoke components when a shadcn/ui equivalent already exists.
- Keep the visual style consistent with the existing Tailwind-based design system.
- Prefer composition with shadcn/ui primitives instead of introducing ad hoc markup.

## Implementation Notes
- Import and use the existing shadcn/ui components from the project setup.
- Use Tailwind utilities for layout, spacing, and responsive behavior around shadcn components.
- If a UI pattern is missing, extend the existing shadcn-based approach rather than creating a custom component.
