export default function TrackIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Track Your ModLab Progress</h1>
      <p className="mt-2 text-neutral-600 text-sm">
        Choose a tracker below to check on your recent purchases or booked appointments.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a href="/track/order" className="rounded-md border bg-white p-4 hover:shadow-sm transition">
          <div className="font-semibold">Order Tracker</div>
          <p className="mt-1 text-sm text-neutral-600">Look up the latest status, shipping details, and items in your order.</p>
        </a>
        <a href="/track/booking" className="rounded-md border bg-white p-4 hover:shadow-sm transition">
          <div className="font-semibold">Booking Tracker</div>
          <p className="mt-1 text-sm text-neutral-600">Review upcoming appointments and check whether they&apos;re confirmed.</p>
        </a>
      </div>
    </div>
  );
}
