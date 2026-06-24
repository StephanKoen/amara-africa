// Renders a JSON-LD structured-data block. Content is authored by us (trusted),
// so serialising directly is safe. Used for SEO rich results and to help AI
// engines (ChatGPT, Perplexity, Google AI Overviews) parse the site.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
