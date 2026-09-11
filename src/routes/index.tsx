import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import heroMilk from "@/assets/hero-milk.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "rp — raw & pure | Fresh Organic Milk" },
      {
        name: "description",
        content:
          "Fresh organic milk sourced directly from cows and delivered fresh to your doorstep. Book your daily milk with rp — raw & pure.",
      },
      { property: "og:title", content: "rp — raw & pure | Fresh Organic Milk" },
      {
        property: "og:description",
        content:
          "Fresh organic milk sourced directly from cows and delivered fresh to your doorstep.",
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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="text-lg font-semibold tracking-tight text-foreground">
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

        <a
          href="#book-milk"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 md:inline-flex"
        >
          Book Milk
        </a>

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

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
            {brandName}
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Fresh. Pure. Straight from the Cow.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Fresh organic milk, sourced directly from cows and served fresh to your
            doorstep.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={scrollToBooking}
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Book Milk
            </button>
            <button
              type="button"
              onClick={scrollToAbout}
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-8 py-3.5 text-base font-medium text-foreground transition-all hover:bg-muted"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-3xl bg-cream shadow-sm">
            <img
              src={heroMilk}
              alt="Fresh organic milk in a glass bottle with green leaves"
              width={1344}
              height={896}
              className="h-auto w-full object-cover"
              priority="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section-padding bg-cream">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
          About us
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Pure milk. Nothing complicated.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {brandName} focuses on providing fresh milk directly from cows to customers,
          with an emphasis on natural freshness and quality. We keep things simple:
          no unnecessary processing, no long supply chains — just honest milk from
          healthy cows delivered to you.
        </p>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  const cards = [
    {
      title: "Direct from cows",
      description: "Our milk comes straight from the cow, keeping the journey short and transparent.",
      icon: CowIcon,
    },
    {
      title: "Fresh & natural",
      description: "We prioritise freshness and natural quality in every delivery.",
      icon: LeafIcon,
    },
    {
      title: "Quality focused",
      description: "Clean handling and careful collection help us maintain the quality you expect.",
      icon: DropletIcon,
    },
    {
      title: "Delivered to customers",
      description: "Fresh milk brought conveniently to your doorstep, so you never run out.",
      icon: TruckIcon,
    },
  ];

  return (
    <section id="why-us" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
            Why choose us
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Milk the way it should be
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
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
      title: "Milk is collected fresh",
      description: "Each day, milk is collected with care from healthy cows.",
    },
    {
      step: "02",
      title: "Quality is maintained",
      description: "We handle and store the milk cleanly to preserve its freshness.",
    },
    {
      step: "03",
      title: "Customer receives the milk",
      description: "Your milk is delivered fresh to your doorstep at your preferred time.",
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-cream">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
            How it works
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            From farm to you in three simple steps
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend or database here.
    // For now, the booking is handled on the frontend and shown as confirmed.
    console.log("Booking submitted:", formData);
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
    <section id="book-milk" className="section-padding">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
            Book your milk
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Book fresh milk today
          </h2>
          <p className="mt-3 text-muted-foreground">
            Fill in your details below and we will get in touch with you shortly.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
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
                className="w-full rounded-full bg-primary px-6 py-3.5 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                Book Milk
              </button>

              <p className="text-center text-xs text-muted-foreground">
                This form is currently frontend-only. Connect a backend or database here
                when ready.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-cream">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
          Contact
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Get in touch
        </h2>

        <div className="mt-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
          <p className="text-lg font-semibold text-foreground">{brandName}</p>
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
    <footer className="border-t border-border/60 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-medium text-foreground">{brandName}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Fresh organic milk, straight from the cow to your doorstep.
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
