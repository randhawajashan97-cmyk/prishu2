import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Sparkles, Heart, ShieldCheck, Gem, Users, Star, Flower2, Menu, X, Phone, MapPin, Clock,
  Instagram, Facebook, MessageCircle, ChevronLeft, ChevronRight, Brush, Crown,
} from "lucide-react";
import threading from "@/assets/threading.jpg";
import waxing from "@/assets/waxing.jpg";
import manicure from "@/assets/manicure.jpg";
import pedicure from "@/assets/pedicure.jpg";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";
import nails from "@/assets/nails.jpg";
import party from "@/assets/party.jpg";
import { SALON, SERVICE_NAMES, validateBooking, whatsappLink, type Booking } from "@/lib/salon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prishu Makeover — Bridal Makeup, Nails & Beauty Studio" },
      { name: "description", content: "Professional bridal makeup, party looks, nail extensions, threading, waxing, manicure and pedicure at Prishu Makeover. Book on WhatsApp." },
      { property: "og:title", content: "Prishu Makeover — Luxury Beauty & Bridal Studio" },
      { property: "og:description", content: "Enhance your beauty, celebrate your style. Bridal, party makeup, nail art and beauty care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["About", "#about"], ["Services", "#services"], ["Gallery", "#gallery"],
  ["Reviews", "#reviews"], ["Contact", "#contact"],
] as const;

const SERVICES = [
  { name: "Bridal Makeover", img: hero, desc: "Timeless bridal looks crafted for your most special day.", items: ["Bridal & HD bridal makeup", "Engagement & reception makeup", "Pre-bridal packages", "Hairstyling & draping"] },
  { name: "Party Makeover", img: party, desc: "Glamorous looks for every celebration and evening.", items: ["Party & birthday makeup", "Engagement guest makeup", "Festive makeup", "Evening & special-event looks"] },
  { name: "Nail Extensions & Nail Art", img: nails, desc: "Elegant, long-lasting nails designed to impress.", items: ["Gel & acrylic extensions", "French designs", "Bridal & trendy nail art", "Maintenance & removal"] },
  { name: "Threading", img: threading, desc: "Precise shaping for clean, defined features.", items: ["Eyebrow", "Upper lip", "Forehead", "Full face"] },
  { name: "Waxing", img: waxing, desc: "Smooth, gentle and hygienic hair removal.", items: ["Full & half arm", "Full leg", "Underarm", "Full body"] },
  { name: "Manicure", img: manicure, desc: "Pampering hand care with a polished finish.", items: ["Classic manicure", "Spa manicure", "Gel manicure", "Shaping & cuticle care"] },
  { name: "Pedicure", img: pedicure, desc: "Relaxing foot care that leaves you refreshed.", items: ["Classic pedicure", "Spa pedicure", "Foot exfoliation", "Relaxing foot treatments"] },
];

const GALLERY = [
  { img: hero, label: "Traditional Bridal", tall: true },
  { img: party, label: "Party Glam" },
  { img: nails, label: "Nail Extensions" },
  { img: about, label: "Natural Glam", tall: true },
  { img: party, label: "Modern Bridal" },
  { img: nails, label: "Bridal Nail Art" },
];

const WHY = [
  { icon: Users, t: "Personal Consultations", d: "Every look begins with understanding you." },
  { icon: Brush, t: "Professional Techniques", d: "Trained artistry for flawless results." },
  { icon: Gem, t: "Quality Products", d: "Trusted, skin-friendly premium brands." },
  { icon: ShieldCheck, t: "Hygiene First", d: "Sanitised tools and a clean studio." },
  { icon: Heart, t: "Attention to Detail", d: "Care in every stroke and finish." },
  { icon: Crown, t: "Special Occasions", d: "Weddings, parties, festivals and more." },
];

// PLACEHOLDER testimonials — replace with genuine reviews.
const REVIEWS = [
  { name: "Sample Client 1", text: "Placeholder review — replace with a genuine customer testimonial about their bridal experience.", rating: 5 },
  { name: "Sample Client 2", text: "Placeholder review — replace with a real review about party makeup or nail art.", rating: 5 },
  { name: "Sample Client 3", text: "Placeholder review — replace with a real review from a happy customer.", rating: 5 },
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="Prishu Makeover home">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-gradient text-primary-foreground">
        <Flower2 className="h-5 w-5" />
      </span>
      <span className="leading-none">
        <span className="block font-serif text-2xl text-foreground">Prishu</span>
        <span className="block text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Makeover</span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="text-sm tracking-wide text-foreground/80 transition-colors hover:text-primary">{l}</a>
          ))}
          <a href="#book" className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground shadow-soft transition hover:opacity-90">Book Now</a>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-5 py-4 md:hidden" aria-label="Mobile">
          {[...NAV, ["Book Now", "#book"] as const].map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="py-2 text-foreground">{l}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">{eyebrow}</p>
      <h2 className="text-4xl text-foreground md:text-5xl">{title}</h2>
      <div className="mx-auto mt-4 h-px w-20 bg-gold-gradient" />
      {sub && <p className="mt-5 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-blush-gradient pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:py-20">
        <div className="fade-up">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-primary">Luxury Beauty Studio</p>
          <h1 className="text-5xl leading-[1.05] text-foreground md:text-7xl">
            Enhance Your Beauty, <em className="text-gold-gradient">Celebrate Your Style</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Discover your perfect look with professional makeup, bridal transformations, nail artistry, and beauty care at Prishu Makeover.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#book" className="rounded-full bg-primary px-7 py-3.5 text-primary-foreground shadow-soft transition hover:opacity-90">Book Your Appointment</a>
            <a href="#services" className="rounded-full border border-primary/40 px-7 py-3.5 text-foreground transition hover:bg-card">Explore Our Services</a>
          </div>
        </div>
        <div className="relative fade-up">
          <div className="absolute -inset-4 rounded-[2.5rem] border border-gold/50" />
          <img src={hero} alt="Bride with elegant bridal makeup" width={1280} height={1600}
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft" />
        </div>
      </div>
    </section>
  );
}

function About() {
  const points = ["Professional beauty services", "Personalized makeup looks", "Hygienic beauty treatments", "Attention to detail", "Friendly and professional service"];
  return (
    <section id="about" className="scroll-mt-20 px-5 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <img src={about} alt="Makeup artist working with a client" loading="lazy" width={1024} height={1280}
          className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft" />
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">About Us</p>
          <h2 className="text-4xl text-foreground md:text-5xl">Welcome to Prishu Makeover</h2>
          <p className="mt-6 text-muted-foreground">
            At Prishu Makeover, beauty is personal. We offer thoughtfully tailored services designed to make every client feel confident, beautiful and truly special — whether it's your wedding day, a celebration, or simply time for yourself.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-foreground">
                <Sparkles className="h-4 w-4 shrink-0 text-gold" /> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Services({ onBook }: { onBook: (s: string) => void }) {
  return (
    <section id="services" className="scroll-mt-20 bg-cream px-5 py-24">
      <SectionTitle eyebrow="Our Beauty Services" title="Crafted for Every Occasion" sub="Prices available on request — message us for a personalised quote." />
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <article key={s.name} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-soft">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={s.img} alt={s.name} loading="lazy" width={1200} height={912} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-2xl text-foreground">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <ul className="mt-4 flex-1 space-y-1.5 text-sm text-foreground/80">
                {s.items.map((i) => <li key={i}>· {i}</li>)}
              </ul>
              <button onClick={() => onBook(s.name)} className="mt-6 self-start rounded-full border border-primary px-5 py-2 text-sm text-primary transition hover:bg-primary hover:text-primary-foreground">
                Book Now
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-20 px-5 py-24">
      <SectionTitle eyebrow="Gallery" title="Bridal Beauty Gallery" sub="Sample images shown — your real work will be featured here." />
      <div className="mx-auto max-w-6xl columns-2 gap-4 md:columns-3">
        {GALLERY.map((g, i) => (
          <figure key={i} className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl">
            <img src={g.img} alt={g.label} loading="lazy"
              className={`w-full object-cover transition duration-700 group-hover:scale-105 ${g.tall ? "aspect-[3/4]" : "aspect-square"}`} />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/70 to-transparent p-4 font-serif text-lg text-primary-foreground opacity-0 transition group-hover:opacity-100">
              {g.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="bg-cocoa px-5 py-24 text-primary-foreground">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">Why Us</p>
        <h2 className="text-4xl md:text-5xl">Why Choose Prishu Makeover?</h2>
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {WHY.map((w) => (
          <div key={w.t} className="rounded-3xl border border-gold/25 p-8 text-center">
            <w.icon className="mx-auto h-9 w-9 text-gold" strokeWidth={1.3} />
            <h3 className="mt-4 text-2xl">{w.t}</h3>
            <p className="mt-2 text-sm opacity-75">{w.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const EMPTY: Booking = { name: "", phone: "", service: "", date: "", time: "", notes: "" };

function BookingForm({ service, setService }: { service: string; setService: (s: string) => void }) {
  const [f, setF] = useState<Booking>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Booking, string>>>({});
  const [sent, setSent] = useState(false);
  const data = { ...f, service };
  const today = new Date().toISOString().slice(0, 10);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateBooking(data, today);
    setErrors(errs);
    if (Object.keys(errs).length) { setSent(false); return; }
    window.open(whatsappLink(data), "_blank", "noopener");
    setSent(true);
  };

  const field = "w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring";
  const Err = ({ k }: { k: keyof Booking }) => errors[k] ? <p className="mt-1 text-xs text-destructive" role="alert">{errors[k]}</p> : null;
  const set = (k: keyof Booking) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  return (
    <section id="book" className="scroll-mt-20 bg-blush-gradient px-5 py-24">
      <SectionTitle eyebrow="Appointments" title="Your Beauty Appointment Starts Here" sub="Fill in your details and send your request to us on WhatsApp. We'll reply to confirm availability." />
      <form onSubmit={submit} noValidate className="mx-auto grid max-w-3xl gap-5 rounded-3xl bg-card p-6 shadow-soft md:grid-cols-2 md:p-10">
        <label className="block"><span className="mb-1 block text-sm">Full name *</span>
          <input className={field} value={f.name} onChange={set("name")} maxLength={80} autoComplete="name" /><Err k="name" /></label>
        <label className="block"><span className="mb-1 block text-sm">Phone number *</span>
          <input className={field} value={f.phone} onChange={set("phone")} type="tel" autoComplete="tel" /><Err k="phone" /></label>
        <label className="block md:col-span-2"><span className="mb-1 block text-sm">Preferred service *</span>
          <select className={field} value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Select a service</option>
            {SERVICE_NAMES.map((s) => <option key={s}>{s}</option>)}
          </select><Err k="service" /></label>
        <label className="block"><span className="mb-1 block text-sm">Preferred date *</span>
          <input className={field} type="date" min={today} value={f.date} onChange={set("date")} /><Err k="date" /></label>
        <label className="block"><span className="mb-1 block text-sm">Preferred time *</span>
          <input className={field} type="time" value={f.time} onChange={set("time")} /><Err k="time" /></label>
        <label className="block md:col-span-2"><span className="mb-1 block text-sm">Additional requirements</span>
          <textarea className={field} rows={3} value={f.notes} onChange={set("notes")} maxLength={500} /><Err k="notes" /></label>
        <div className="md:col-span-2">
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-primary-foreground transition hover:opacity-90">
            <MessageCircle className="h-5 w-5" /> Book Appointment on WhatsApp
          </button>
          {sent && (
            <p className="mt-4 rounded-xl bg-secondary p-4 text-center text-sm text-secondary-foreground" role="status">
              Your request is ready in WhatsApp — please press send. Your appointment is confirmed only once the salon replies.
            </p>
          )}
          {Object.keys(errors).length > 0 && <p className="mt-4 text-center text-sm text-destructive">Please fix the highlighted fields.</p>}
        </div>
      </form>
    </section>
  );
}

function Reviews() {
  const [i, setI] = useState(0);
  const r = REVIEWS[i] ?? REVIEWS[0]!;
  const go = (d: number) => setI((i + d + REVIEWS.length) % REVIEWS.length);
  return (
    <section id="reviews" className="scroll-mt-20 px-5 py-24">
      <SectionTitle eyebrow="Testimonials" title="Loved by Our Clients" sub="Sample placeholders — genuine reviews coming soon." />
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center gap-1" aria-label={`${r.rating} out of 5 stars`}>
          {Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="h-5 w-5 fill-gold text-gold" />)}
        </div>
        <blockquote className="mt-6 font-serif text-2xl italic text-foreground md:text-3xl">“{r.text}”</blockquote>
        <p className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">{r.name}</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} aria-label="Previous review" className="rounded-full border border-border p-2 hover:bg-secondary"><ChevronLeft /></button>
          {REVIEWS.map((_, k) => <span key={k} className={`h-2 w-2 rounded-full ${k === i ? "bg-primary" : "bg-border"}`} />)}
          <button onClick={() => go(1)} aria-label="Next review" className="rounded-full border border-border p-2 hover:bg-secondary"><ChevronRight /></button>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const items = [
    { icon: MapPin, t: "Address", v: SALON.address },
    { icon: Phone, t: "Phone", v: SALON.phoneDisplay, href: `tel:+${SALON.whatsappNumber}` },
    { icon: MessageCircle, t: "WhatsApp", v: "Chat with us", href: whatsappLink() },
  ];
  return (
    <section id="contact" className="scroll-mt-20 bg-cream px-5 py-24">
      <SectionTitle eyebrow="Contact" title="Visit Our Studio" />
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <div className="space-y-5 rounded-3xl bg-card p-8">
          {items.map((it) => (
            <div key={it.t} className="flex gap-4">
              <it.icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div><p className="text-sm text-muted-foreground">{it.t}</p>
                {it.href ? <a href={it.href} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">{it.v}</a> : <p className="text-foreground">{it.v}</p>}
              </div>
            </div>
          ))}
          <div className="flex gap-4">
            <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div><p className="text-sm text-muted-foreground">Business hours</p>
              {SALON.hours.map((h) => <p key={h.day} className="text-foreground">{h.day}: {h.time}</p>)}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <a href={SALON.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-border p-3 hover:bg-secondary"><Instagram className="h-5 w-5" /></a>
            <a href={SALON.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full border border-border p-3 hover:bg-secondary"><Facebook className="h-5 w-5" /></a>
          </div>
        </div>
        <iframe title="Salon location map" loading="lazy" className="min-h-80 w-full rounded-3xl border-0"
          src={`https://www.google.com/maps?q=${encodeURIComponent(SALON.mapsQuery)}&output=embed`} />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-cocoa px-5 pb-8 pt-16 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-serif text-3xl">Prishu <span className="text-gold">Makeover</span></p>
          <p className="mt-3 text-sm opacity-70">A luxury beauty studio for bridal, party makeup, nails and personal care.</p>
        </div>
        <div><p className="mb-3 text-gold">Explore</p>
          {NAV.map(([l, h]) => <a key={h} href={h} className="block py-1 text-sm opacity-75 hover:opacity-100">{l}</a>)}</div>
        <div><p className="mb-3 text-gold">Services</p>
          {SERVICE_NAMES.map((s) => <a key={s} href="#services" className="block py-1 text-sm opacity-75 hover:opacity-100">{s}</a>)}</div>
        <div><p className="mb-3 text-gold">Contact</p>
          <p className="text-sm opacity-75">{SALON.address}</p>
          <a href={`tel:+${SALON.whatsappNumber}`} className="mt-2 block text-sm opacity-75">{SALON.phoneDisplay}</a>
          <div className="mt-4 flex gap-3">
            <a href={SALON.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
            <a href={SALON.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <p className="mt-12 border-t border-gold/20 pt-6 text-center text-xs opacity-60">© {new Date().getFullYear()} Prishu Makeover. All rights reserved.</p>
    </footer>
  );
}

function Index() {
  const [service, setService] = useState("");
  const book = (s: string) => {
    setService(s);
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services onBook={book} />
        <Gallery />
        <Why />
        <BookingForm service={service} setService={setService} />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
