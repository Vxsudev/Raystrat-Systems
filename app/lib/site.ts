export const SITE_URL = "https://raystratsystems.com";

export const IS_PRODUCTION = process.env.SITE_ENV === "production";

export const PUBLIC_EMAIL = "founder@raystratsystems.com";
export const LINKEDIN_URL = "https://www.linkedin.com/company/raystrat-systems";

export const INDEXABLE_ROUTES = ["/", "/ai-solutions", "/forward-deployed-engineering"];

// Formspree form endpoint. Not a secret — this is the public submission
// target for the client-side enquiry form; recipient routing is configured
// in the Formspree dashboard, not here. See ai/runtime-contracts.md Contract 2.
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbgjagaz";
