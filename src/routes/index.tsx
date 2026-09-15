import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import farmHero from "@/assets/farm-hero.jpg.asset.json";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "rp — raw & pure | Fresh Farm Milk" },
      {
        name: "description",
        content:
          "Fresh, natural milk collected from our cows and delivered to your doorstep by rp — raw & pure.",
      },
      { property: "og:title", content: "rp — raw & pure | Fresh Farm Milk" },
      {
        property: "og:description",
        content:
          "Fresh, natural milk collected from our cows and delivered to your doorstep.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const brandName = "rp — raw & pure";

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <HeroSection />
        <FarmJourney />
        <AboutSection />
        <WhyChooseUsSection />
        <HowItWorksSection />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function Header({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Why Us", href: "#why-us" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Book Milk", href: "#book-milk" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="text-lg font-semibold text-foreground">
          {brandName}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#book-milk"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            Book Milk
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border/60 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book-milk"
              onClick={() => setMenuOpen(false)}
              className="inline-flex w-full justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Book Milk
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  const scrollToBooking = () => {
    const element = document.getElementById("book-milk");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[80vh] items-end overflow-hidden sm:min-h-[82vh]">
      <img
        src={farmHero.url}
        alt="Healthy cows beside a small dairy shed in a green farm field"
        width={1536}
        height={1024}
        className="absolute inset-0 h-full w-full scale-[1.01] object-cover object-[58%_center] transition-transform duration-[1600ms] hover:scale-[1.02] sm:object-center"
        loading="eager"
      />
      <div className="absolute inset-0 bg-foreground/50" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24 lg:px-8">
        <div className="max-w-2xl">
           <p className="mb-5 text-sm font-semibold text-primary-foreground">
            {brandName}
          </p>
           <h1 className="text-4xl font-semibold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Fresh milk.<br />Straight from our farm.
          </h1>
           <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/90 sm:text-xl">
              Pure, fresh milk collected from our cows and delivered to your doorstep.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={scrollToBooking}
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
            >
              Book Fresh Milk
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FarmJourney() {
  const items = [
    { label: "From our cows", icon: CowIcon },
    { label: "Fresh milk", icon: BottleIcon },
    { label: "To your home", icon: HomeIcon },
  ];

  return (
    <section aria-label="From our cows to your home" className="section-reveal paper-texture relative z-10 -mt-1 bg-paper px-4 py-9 sm:px-6 sm:py-11">
      <div className="mx-auto grid max-w-3xl grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-6">
        {items.map((item, index) => (
          <div key={item.label} className="contents">
            <div className="flex min-w-0 flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-background text-primary shadow-sm sm:h-14 sm:w-14">
                <item.icon className="h-6 w-6" />
              </div>
              <p className="mt-3 text-xs font-semibold text-foreground sm:text-sm">{item.label}</p>
            </div>
            {index < items.length - 1 && (
              <svg aria-hidden="true" viewBox="0 0 44 12" className="h-3 w-7 text-earth/60 sm:w-11">
                <path d="M1 6c9-5 18 5 28 0 3-1.5 6-1 10 0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <path d="m36 2 5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section-reveal section-padding relative overflow-hidden bg-cream">
      <LeafSprig className="absolute -left-5 top-9 h-24 w-24 rotate-12 text-sage/50" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium uppercase text-earth">
          About us
        </p>
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
          Pure milk. Nothing complicated.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Fresh milk from our cows, handled with care and delivered to your home.
        </p>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  const cards = [
    {
      title: "From our cows",
      description: "Fresh milk collected directly from our cows.",
      icon: CowIcon,
    },
    {
      title: "Fresh & natural",
      description: "Simple, fresh milk without unnecessary complexity.",
      icon: LeafIcon,
    },
    {
      title: "Carefully handled",
      description: "Milk is collected and handled with care.",
      icon: DropletIcon,
    },
    {
      title: "Delivered to your home",
      description: "Fresh milk delivered conveniently to your home.",
      icon: TruckIcon,
    },
  ];

  return (
    <section id="why-us" className="section-reveal section-padding paper-texture">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase text-earth">
            Why choose us
          </p>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Naturally simple, from farm to home
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-xl bg-accent p-3 text-primary">
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "We collect",
      description: "Fresh milk is collected from our cows.",
    },
    {
      step: "02",
      title: "We prepare",
      description: "Milk is handled carefully to maintain freshness.",
    },
    {
      step: "03",
      title: "We deliver",
      description: "Your fresh milk is delivered to your doorstep.",
    },
  ];

  return (
    <section id="how-it-works" className="section-reveal section-padding relative overflow-hidden rounded-t-[2.5rem] bg-cream sm:rounded-t-[4rem]">
      <LeafSprig className="absolute -right-6 bottom-8 h-28 w-28 -rotate-12 text-sage/40" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase text-earth">
            How it works
          </p>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Fresh milk, simply prepared and delivered
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-background text-xl font-semibold text-primary">
                {item.step}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: "",
    time: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const { error } = await supabase.from("milk_bookings").insert({
      customer_name: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      quantity: formData.quantity,
      preferred_time: formData.time,
      message: formData.message.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      setSubmitError("We couldn't save your booking. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      address: "",
      quantity: "",
      time: "",
      message: "",
    });
    setSubmitted(false);
  };

  return (
    <section id="book-milk" className="section-reveal section-padding paper-texture">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase text-earth">
            Fresh from the farm
          </p>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Book Fresh Milk
          </h2>
          <p className="mt-3 text-muted-foreground">
            Choose your quantity and delivery time.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-lg sm:p-8">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">Thank you!</h3>
              <p className="mt-2 text-muted-foreground">
                Your milk booking has been received. We will contact you shortly.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted"
              >
                Make another booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                  Customer Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-foreground">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your delivery address"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="quantity"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Quantity of Milk
                  </label>
                  <select
                    id="quantity"
                    name="quantity"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-all focus:border-primary focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select quantity</option>
                    <option value="500ml">500 ml</option>
                    <option value="1litre">1 litre</option>
                    <option value="2litres">2 litres</option>
                    <option value="5litres">5 litres</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="time" className="mb-1.5 block text-sm font-medium text-foreground">
                    Preferred Delivery Time
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-all focus:border-primary focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Optional Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any special instructions..."
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-primary px-6 py-3.5 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60"
              >
                 {submitting ? "Saving booking…" : "Book Fresh Milk"}
              </button>

              {submitError && <p role="alert" className="text-center text-sm text-destructive">{submitError}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section-reveal section-padding rounded-t-[2.5rem] bg-cream sm:rounded-t-[4rem]">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium uppercase text-earth">
          Contact
        </p>
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
          {brandName}
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">Fresh milk, straight from our farm to your home.</p>

        <div className="mt-8 border-y border-border py-8">
          <p className="mt-4 text-muted-foreground">
            Phone / WhatsApp: <span className="text-foreground">[placeholder]</span>
          </p>
          <p className="mt-1 text-muted-foreground">
            Address: <span className="text-foreground">[placeholder]</span>
          </p>
          <a
            href="#book-milk"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            Book Milk
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="paper-texture border-t border-border/60 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-medium text-foreground">{brandName}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Fresh milk, straight from our farm to your home.
        </p>
        <p className="mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function CowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 10h.01" />
      <path d="M14 10h.01" />
      <path d="M10 14a3.5 3.5 0 0 0 4 0" />
      <path d="M18.37 9.5c.34.75.63 1.56.63 2.5a6 6 0 0 1-12 0c0-2.5 1.5-4.5 3.5-5.5" />
      <path d="M7.5 8c-1.5 1-2.5 3-2.5 4" />
      <path d="M4 10a2 2 0 0 1 2-2" />
      <path d="M20 10a2 2 0 0 0-2-2" />
      <path d="M6 12v6a2 2 0 0 0 2 2" />
      <path d="M18 12v6a2 2 0 0 1-2 2" />
    </svg>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.6C13.5 5.7 17 7.5 20 11" />
      <path d="M11 20a7 7 0 0 0 1.8-13.4C9.5 5.7 6 7.5 3 11" />
      <path d="M11 20v-9" />
    </svg>
  );
}

function DropletIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-6.5s-3.5-5-4-6.5c-.5 1.5-2 3.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}

function BottleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 3h6" />
      <path d="M10 3v4l-2 3v9a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-9l-2-3V3" />
      <path d="M8 12h8" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function LeafSprig({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 86C42 68 52 42 62 12" />
      <path d="M38 64C24 61 20 51 20 42c13 1 21 8 18 22Z" />
      <path d="M50 43c-9-10-6-21 0-28 9 8 11 18 0 28Z" />
      <path d="M57 29c10-8 21-5 27 2-9 8-19 9-27-2Z" />
      <path d="M31 74c-11-2-19 4-22 11 10 4 18 1 22-11Z" />
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18h-3.5" />
      <path d="M17 18h2a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-.4-.8l-2.4-1.8a1 1 0 0 0-.6-.2H15" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
