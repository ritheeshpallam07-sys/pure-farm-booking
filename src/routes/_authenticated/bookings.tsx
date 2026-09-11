import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Booking = Tables<"milk_bookings">;

export const Route = createFileRoute("/_authenticated/bookings")({
  head: () => ({
    meta: [
      { title: "Milk Bookings | rp — raw & pure" },
      { name: "description", content: "Private list of customer milk bookings for rp — raw & pure." },
      { property: "og:title", content: "Milk Bookings | rp — raw & pure" },
      { property: "og:description", content: "Private owner booking list." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BookingsPage,
});

function BookingsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    supabase.from("milk_bookings").select("*").order("created_at", { ascending: false }).then(({ data, error: loadError }) => {
      if (!active) return;
      if (loadError) setError("Bookings could not be loaded. Please try again.");
      else setBookings(data ?? []);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="font-semibold text-foreground">rp — raw & pure</Link>
          <button type="button" onClick={handleSignOut} className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">Sign out</button>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">Milk bookings</h1>
        <p className="mt-2 text-muted-foreground">Newest customer requests appear first.</p>

        {loading && <p className="mt-10 text-sm text-muted-foreground">Loading bookings…</p>}
        {error && <p role="alert" className="mt-10 text-sm text-destructive">{error}</p>}
        {!loading && !error && bookings.length === 0 && (
          <div className="mt-10 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">No bookings yet.</div>
        )}
        {!loading && bookings.length > 0 && (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {bookings.map((booking) => (
              <article key={booking.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold text-foreground">{booking.customer_name}</h2>
                  <time className="shrink-0 text-xs text-muted-foreground">{new Date(booking.created_at).toLocaleDateString()}</time>
                </div>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div><dt className="text-muted-foreground">Phone</dt><dd className="font-medium text-foreground">{booking.phone}</dd></div>
                  <div><dt className="text-muted-foreground">Address</dt><dd className="text-foreground">{booking.address}</dd></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><dt className="text-muted-foreground">Quantity</dt><dd className="text-foreground">{booking.quantity}</dd></div>
                    <div><dt className="text-muted-foreground">Delivery time</dt><dd className="capitalize text-foreground">{booking.preferred_time}</dd></div>
                  </div>
                  {booking.message && <div><dt className="text-muted-foreground">Message</dt><dd className="text-foreground">{booking.message}</dd></div>}
                </dl>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}