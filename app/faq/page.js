export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">FAQs</h1>
      <div className="mt-4 space-y-4 text-neutral-700 text-sm">
        <div>
          <div className="font-medium">Do you ship internationally?</div>
          <p>We currently ship within the U.S. only.</p>
        </div>
        <div>
          <div className="font-medium">How long do orders take?</div>
          <p>Most orders ship within 2-3 business days.</p>
        </div>
      </div>
    </div>
  );
}