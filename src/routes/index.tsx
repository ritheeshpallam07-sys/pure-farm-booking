import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import farmHero from "@/assets/farm-hero.jpg.asset.json";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "rp — raw & pure | Fresh Milk From Our Farm" },
      { name: "description", content: "Pure, fresh milk collected from our cows and delivered to your doorstep by rp — raw & pure." },
      { property: "og:title", content: "rp — raw & pure | Fresh Milk From Our Farm" },
      { property: "og:description", content: "Follow the journey of fresh milk from our cows to your home." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const brandName = "rp — raw & pure";
type Icon = ComponentType<SVGProps<SVGSVGElement>>;

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  useRevealOnce();
  return (
    <div className="min-h-screen overflow-hidden bg-background">
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

function useRevealOnce() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal-once");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }),
      { threshold: 0.14 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Why Us", href: "#why-us" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Book Milk", href: "#book-milk" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-foreground/15 bg-foreground/25 text-primary-foreground backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#" className="font-display text-xl">{brandName}</a>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => <a key={link.href} href={link.href} className="nav-underline text-xs font-medium uppercase text-primary-foreground/85 hover:text-primary-foreground">{link.label}</a>)}
        </nav>
        <a href="#book-milk" className="hidden rounded-full bg-primary-foreground px-5 py-2.5 text-sm font-medium text-primary shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 md:inline-flex">Book Milk</a>
        <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="inline-flex h-10 w-10 items-center justify-center text-primary-foreground md:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>
          <MenuIcon open={menuOpen} />
        </button>
      </div>
      <div className={`grid bg-background text-foreground transition-[grid-template-rows] duration-300 md:hidden ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden"><nav className="flex flex-col px-5 py-5">
          {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="border-b border-border py-3 text-sm font-medium">{link.label}</a>)}
          <a href="#book-milk" onClick={() => setMenuOpen(false)} className="mt-5 inline-flex justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">Book Milk</a>
        </nav></div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-foreground">
      <img src={farmHero.url} alt="Healthy cows in a peaceful green dairy farm at sunrise" width={1536} height={1024} loading="eager" className="hero-image-settle absolute inset-0 h-full w-full object-cover object-[61%_center] transition-transform duration-[1800ms] ease-out hover:scale-[1.012] sm:object-center" />
      <div className="absolute inset-0 bg-foreground/45" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-foreground/55 to-transparent" />
      <div className="relative mx-auto flex min-h-[92svh] max-w-7xl items-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="max-w-3xl text-primary-foreground">
          <p className="hero-stage hero-stage-1 mb-5 text-xs font-semibold uppercase">{brandName}</p>
          <h1 className="hero-stage hero-stage-2 text-5xl leading-[0.92] sm:text-7xl lg:text-8xl">
            Fresh milk.<br />Straight from our <em className="font-normal text-accent">farm.</em>
          </h1>
          <p className="hero-stage hero-stage-3 mt-6 max-w-xl text-base font-light leading-relaxed text-primary-foreground/90 sm:text-lg">Pure, fresh milk collected from our cows and delivered to your doorstep.</p>
          <div className="hero-stage hero-stage-4 mt-8 flex flex-wrap items-center gap-6">
            <a href="#book-milk" className="rounded-full bg-primary-foreground px-7 py-3.5 text-sm font-medium text-primary shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0">Book Fresh Milk</a>
            <span className="text-xs uppercase text-primary-foreground/75">From our cows → to your home</span>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-px left-0 right-0 h-10 rounded-t-[50%] bg-background sm:h-14" />
    </section>
  );
}

function FarmJourney() {
  const items: { label: string; kicker: string; icon: Icon }[] = [
    { label: "From our cows", kicker: "Origin", icon: CowIcon },
    { label: "Fresh milk", kicker: "Freshness", icon: BottleIcon },
    { label: "Handled with care", kicker: "Care", icon: DropletIcon },
    { label: "To your home", kicker: "Arrival", icon: HomeIcon },
  ];
  return (
    <section aria-label="Farm to home journey" className="reveal-once relative bg-background px-5 pb-24 pt-16 sm:px-8 sm:pb-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center"><p className="text-xs font-semibold uppercase text-earth">The fresh milk journey</p><h2 className="mt-3 text-4xl text-foreground sm:text-5xl">A simple path, carefully followed.</h2></div>
        <div className="relative grid gap-12 md:grid-cols-4 md:gap-6">
          <svg aria-hidden="true" className="absolute left-6 top-6 h-[calc(100%-3rem)] w-2 text-sage md:left-[12.5%] md:top-7 md:h-2 md:w-3/4" viewBox="0 0 100 1" preserveAspectRatio="none"><path className="draw-line" pathLength="1" d="M0 .5 C22 0 28 1 50 .5 S78 0 100 .5" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" /></svg>
          {items.map((item) => <div key={item.label} className="reveal-item relative flex items-center gap-5 md:flex-col md:text-center">
            <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-sage bg-paper text-primary shadow-sm"><item.icon className="h-6 w-6" /></div>
            <div><p className="text-[0.65rem] font-semibold uppercase text-earth">{item.kicker}</p><p className="mt-1 font-display text-xl text-foreground">{item.label}</p></div>
          </div>)}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="reveal-once relative bg-cream-dark px-5 py-24 sm:px-8 sm:py-32">
      <LeafSprig className="absolute -left-6 top-12 h-32 w-32 rotate-12 text-primary/15" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12">
        <div className="reveal-item lg:col-span-5">
          <p className="text-xs font-semibold uppercase text-earth">Our belief — 01</p>
          <h2 className="mt-5 text-5xl leading-[0.95] text-foreground sm:text-6xl">Pure milk.<br /><em>Nothing complicated.</em></h2>
          <p className="mt-7 max-w-md text-lg font-light leading-relaxed text-muted-foreground">Fresh milk from our cows, handled with care and delivered to your home.</p>
        </div>
        <div className="reveal-item relative lg:col-span-7 lg:pl-12">
          <div className="aspect-[4/3] overflow-hidden rounded-[45%_45%_0.5rem_0.5rem]"><img src={farmHero.url} alt="Cow standing beside a rural dairy shed" width={1536} height={1024} loading="lazy" className="h-full w-full object-cover object-[73%_center] transition-transform duration-700 hover:scale-[1.015]" /></div>
          <div className="absolute -bottom-8 left-0 max-w-[15rem] border border-border bg-paper p-5 shadow-md lg:left-0"><BottleIcon className="h-7 w-7 text-primary" /><p className="mt-3 font-display text-xl">From pasture to doorstep.</p></div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  const points: { title: string; copy: string; icon: Icon; position: string }[] = [
    { title: "From our cows", copy: "Collected directly from our cows.", icon: CowIcon, position: "lg:col-start-1 lg:row-start-1" },
    { title: "Fresh & natural", copy: "Simple, fresh milk.", icon: LeafIcon, position: "lg:col-start-3 lg:row-start-1" },
    { title: "Carefully handled", copy: "Handled with care at every step.", icon: DropletIcon, position: "lg:col-start-1 lg:row-start-2" },
    { title: "Delivered to your home", copy: "Conveniently brought to your doorstep.", icon: HomeIcon, position: "lg:col-start-3 lg:row-start-2" },
  ];
  return (
    <section id="why-us" className="reveal-once paper-texture relative bg-paper px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center"><p className="text-xs font-semibold uppercase text-earth">Why choose us — 02</p><h2 className="mt-4 text-5xl leading-none text-foreground sm:text-6xl">Good milk, cared for <em>simply.</em></h2></div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1.15fr_1fr] lg:grid-rows-2 lg:gap-x-14 lg:gap-y-10">
          {points.map((point) => <article key={point.title} className={`reveal-item group border-t border-border py-5 transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_10px_24px_-20px_var(--foreground)] ${point.position}`}>
            <point.icon className="h-7 w-7 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /><h3 className="mt-5 font-display text-2xl text-foreground">{point.title}</h3><p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">{point.copy}</p>
          </article>)}
          <div className="reveal-item relative hidden items-center justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:flex">
            <div className="absolute h-64 w-64 rounded-full border border-sage/60" /><div className="absolute h-48 w-48 rounded-full bg-accent/45" />
            <BottleIcon className="relative h-36 w-36 text-primary" />
            <LeafSprig className="absolute -bottom-1 right-5 h-24 w-24 -rotate-12 text-earth/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { step: "01", title: "We collect", copy: "Fresh milk is collected from our cows.", icon: CowIcon },
    { step: "02", title: "We prepare", copy: "Milk is handled carefully to maintain freshness.", icon: BottleIcon },
    { step: "03", title: "We deliver", copy: "Your fresh milk is delivered to your doorstep.", icon: HomeIcon },
  ];
  return (
    <section id="how-it-works" className="reveal-once relative bg-primary px-5 py-24 text-primary-foreground sm:px-8 sm:py-32">
      <div className="absolute -top-px left-0 right-0 h-10 rounded-b-[50%] bg-paper sm:h-14" />
      <div className="mx-auto max-w-6xl pt-6"><div className="mb-16 text-center"><p className="text-xs font-semibold uppercase text-primary-foreground/70">The process — 03</p><h2 className="mt-4 text-5xl sm:text-6xl">From farm, <em>in three steps.</em></h2></div>
        <div className="relative grid gap-12 md:grid-cols-3 md:gap-10">
          <svg aria-hidden="true" className="absolute left-8 top-7 hidden h-2 w-[calc(100%-4rem)] text-primary-foreground/35 md:block" viewBox="0 0 100 1" preserveAspectRatio="none"><path className="draw-line" pathLength="1" d="M0 .5 C20 0 30 1 50 .5 S80 0 100 .5" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" /></svg>
          {steps.map((item) => <article key={item.step} className="reveal-item relative text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary-foreground/35 bg-primary text-lg">{item.step}</div><item.icon className="mx-auto mt-8 h-7 w-7 text-accent" /><h3 className="mt-4 font-display text-3xl uppercase">{item.title}</h3><p className="mx-auto mt-3 max-w-xs text-sm font-light leading-relaxed text-primary-foreground/75">{item.copy}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", quantity: "", time: "", message: "" });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const { error } = await supabase.from("milk_bookings").insert({ customer_name: formData.name.trim(), phone: formData.phone.trim(), address: formData.address.trim(), quantity: formData.quantity, preferred_time: formData.time, message: formData.message.trim() || null });
    setSubmitting(false);
    if (error) { setSubmitError("We couldn't save your booking. Please try again."); return; }
    setSubmitted(true);
  };
  const handleReset = () => { setFormData({ name: "", phone: "", address: "", quantity: "", time: "", message: "" }); setSubmitted(false); };
  return (
    <section id="book-milk" className="reveal-once paper-texture relative bg-cream-dark px-5 py-24 sm:px-8 sm:py-32">
      <LeafSprig className="absolute -right-7 top-16 h-36 w-36 -rotate-12 text-primary/15" />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal-item lg:col-span-4 lg:pt-12"><p className="text-xs font-semibold uppercase text-earth">Arrival — 04</p><h2 className="mt-5 text-5xl leading-[0.95] text-foreground sm:text-6xl">Bring fresh milk <em>home.</em></h2><p className="mt-6 text-lg font-light text-muted-foreground">Choose your quantity and delivery time.</p><BottleIcon className="mt-10 h-24 w-24 text-primary/30" /></div>
        <div className="reveal-item lg:col-span-8">
          <div className="border border-border bg-card p-6 shadow-xl sm:p-10">
            {submitted ? <div className="py-12 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary"><CheckIcon className="h-8 w-8" /></div><h3 className="mt-6 font-display text-3xl text-foreground">Thank you!</h3><p className="mt-2 text-muted-foreground">Your milk booking has been received. We will contact you shortly.</p><button type="button" onClick={handleReset} className="mt-7 rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground transition duration-300 hover:-translate-y-0.5 hover:bg-muted active:translate-y-0">Make another booking</button></div> :
            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
              <Field label="Customer Name" id="name"><input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your full name" className="form-control" /></Field>
              <Field label="Phone Number" id="phone"><input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="Your phone number" className="form-control" /></Field>
              <div className="sm:col-span-2"><Field label="Address" id="address"><input id="address" name="address" type="text" required value={formData.address} onChange={handleChange} placeholder="Your delivery address" className="form-control" /></Field></div>
              <Field label="Quantity of Milk" id="quantity"><select id="quantity" name="quantity" required value={formData.quantity} onChange={handleChange} className="form-control"><option value="">Select quantity</option><option value="500ml">500 ml</option><option value="1litre">1 litre</option><option value="2litres">2 litres</option><option value="5litres">5 litres</option><option value="other">Other</option></select></Field>
              <Field label="Preferred Delivery Time" id="time"><select id="time" name="time" required value={formData.time} onChange={handleChange} className="form-control"><option value="">Select time</option><option value="morning">Morning</option><option value="afternoon">Afternoon</option><option value="evening">Evening</option></select></Field>
              <div className="sm:col-span-2"><Field label="Optional Message" id="message"><textarea id="message" name="message" rows={3} value={formData.message} onChange={handleChange} placeholder="Any special instructions..." className="form-control resize-none" /></Field></div>
              <div className="sm:col-span-2"><button type="submit" disabled={submitting} className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 disabled:opacity-60">{submitting ? "Saving booking…" : "Book Fresh Milk"}</button>{submitError && <p role="alert" className="mt-3 text-center text-sm text-destructive">{submitError}</p>}</div>
            </form>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) { return <label htmlFor={id} className="block"><span className="mb-2 block text-xs font-semibold uppercase text-earth">{label}</span>{children}</label>; }

function ContactSection() {
  return <section id="contact" className="reveal-once bg-paper px-5 py-20 sm:px-8"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 border-b border-border pb-16 md:flex-row md:items-end"><div><p className="text-xs font-semibold uppercase text-earth">Contact</p><h2 className="mt-4 text-4xl text-foreground sm:text-5xl">{brandName}</h2><p className="mt-3 font-light text-muted-foreground">Fresh milk, straight from our farm to your home.</p></div><div className="text-sm leading-7 text-muted-foreground"><p>Phone / WhatsApp: <span className="text-foreground">[placeholder]</span></p><p>Address: <span className="text-foreground">[placeholder]</span></p><a href="#book-milk" className="nav-underline mt-4 inline-block font-medium text-primary">Book Milk →</a></div></div></section>;
}

function Footer() { return <footer className="bg-paper px-5 pb-10 sm:px-8"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-xs text-muted-foreground sm:flex-row"><p>{brandName} · Fresh milk, straight from our farm to your home.</p><p>© {new Date().getFullYear()} {brandName}</p></div></footer>; }

function MenuIcon({ open }: { open: boolean }) { return <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>{open ? <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}</svg>; }
function CowIcon(props: SVGProps<SVGSVGElement>) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M10 10h.01M14 10h.01M10 14a3.5 3.5 0 0 0 4 0M18.4 9.5c.3.8.6 1.6.6 2.5a6 6 0 0 1-12 0c0-2.5 1.5-4.5 3.5-5.5M7.5 8C6 9 5 11 5 12M4 10a2 2 0 0 1 2-2M20 10a2 2 0 0 0-2-2M6 12v6a2 2 0 0 0 2 2M18 12v6a2 2 0 0 1-2 2" /></svg>; }
function LeafIcon(props: SVGProps<SVGSVGElement>) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M4 19C6 10 12 5 20 4c-1 8-6 14-16 15Z" /><path d="M4 19c4-4 8-7 12-9" /></svg>; }
function DropletIcon(props: SVGProps<SVGSVGElement>) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M12 22a7 7 0 0 0 7-7c0-3.2-4.5-9.3-7-13-2.5 3.7-7 9.8-7 13a7 7 0 0 0 7 7Z" /></svg>; }
function BottleIcon(props: SVGProps<SVGSVGElement>) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.35} strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M10 3v4l-2 3v9a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-9l-2-3V3M8 12h8" /></svg>; }
function HomeIcon(props: SVGProps<SVGSVGElement>) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 9-7 9 7M5 10v10h14V10M9 20v-6h6v6" /></svg>; }
function LeafSprig(props: SVGProps<SVGSVGElement>) { return <svg {...props} aria-hidden="true" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"><path d="M18 86C42 68 52 42 62 12M38 64C24 61 20 51 20 42c13 1 21 8 18 22ZM50 43c-9-10-6-21 0-28 9 8 11 18 0 28ZM57 29c10-8 21-5 27 2-9 8-19 9-27-2ZM31 74c-11-2-19 4-22 11 10 4 18 1 22-11Z" /></svg>; }
function CheckIcon(props: SVGProps<SVGSVGElement>) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m20 6-11 11-5-5" /></svg>; }