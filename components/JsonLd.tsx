// Renders a JSON-LD structured-data block. Pass any schema.org object (or array).
// Kept tiny and shared so every page emits consistent, valid markup.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// The publisher/author used across Article markup, so it stays identical everywhere.
export const ORG = {
  '@type': 'Organization',
  name: 'Fathom',
  url: 'https://fathomjournal.in/',
};
