import page, { generateMetadata } from "./[slug]/page";

// The home page reuses the [slug] page, including its metadata
// (title, description, canonical and hreflang).
export { generateMetadata };
export const dynamic = "force-dynamic";
export default page;
