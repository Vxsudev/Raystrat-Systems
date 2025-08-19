# **App Name**: ROI Automation Hub

## Core Features:

- Sectioned Layout: Single-page layout with Hero, Services, Results, Pricing, FAQ, and Contact sections.
- Dynamic Navigation: Sticky top navigation bar that automatically darkens on scroll, with CTAs for booking an audit and downloading a playbook.
- Contact Form: Contact form submission to /api/contact.submit, storing data in Firestore and sending transactional emails via SendGrid.
- Lead Intake: Service interest capture form posting to /api/lead-intake, writing to Firestore and enqueuing a follow-up task.
- Metrics Display: Display public stats fetched from /api/metrics, including metrics like recovered INR, reply rate, hours saved, and content per month.
- AI-Powered Automation Suggestion: AI tool analyzes user-provided content bottlenecks, suggesting the most relevant service automation.
- Interactive FAQ: FAQ section with accordions that expand on click, providing detailed answers to common questions.

## Style Guidelines:

- Primary color: Gold (#D4AF37) to convey value and sophistication.
- Background color: Charcoal (#0B0C0E) for a premium and modern look.
- Accent color: Off-white (#363636) to highlight important elements while maintaining a cohesive dark theme.
- Headline font: 'Space Grotesk' (sans-serif) for H1/H2 headings to create a strong, geometric impression. 
- Body font: 'Inter' (sans-serif) for body text, ensuring readability and a clean, modern feel.
- Use crisp, professional icons that reflect automation, efficiency, and ROI.
- Maintain a clean, organized layout with clear section dividers and consistent spacing.