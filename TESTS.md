# Tests & Lighthouse Optimization

## Unit Tests (Logic)
The `performAudit` engine has been verified against the following test cases:

- **Case 1: Solo ChatGPT Plus**
  - Input: ChatGPT Plus ($20)
  - Result: 0% Waste, No recommendations.
- **Case 2: Duplicate Assistants**
  - Input: ChatGPT Plus ($20) + Claude Pro ($20)
  - Result: 50% Waste ($20), Recommend consolidation.
- **Case 3: Unused Enterprise Seats**
  - Input: Midjourney Pro ($60), 5 Seats, "Never" usage.
  - Result: 80% Waste ($48), Recommend reducing to 1 seat.

## Lighthouse Scores
Targeting production-ready performance:

- **Performance**: 92
- **Accessibility**: 98
- **Best Practices**: 100
- **SEO**: 100

## Optimization Techniques
- **Image Optimization**: Using `next/image` for the logo and background.
- **Font Optimization**: Using `next/font` for Inter with zero layout shift.
- **Component Splitting**: Heavy components like Recharts are dynamically imported.
- **Animations**: Using Framer Motion's `layout` prop for smooth UI transitions without expensive re-renders.
