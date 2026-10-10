// Salon details — PLACEHOLDERS. Replace with real information when provided.
export const SALON = {
  name: "Prishu Makeover",
  whatsappNumber: "917973393881",
  phoneDisplay: "+91 79733 93881",
  address: "7X5V+5W Chohla Sahib, Punjab 143408",
  hours: [
    { day: "Monday – Saturday", time: "10:00 AM – 8:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
  instagram: "https://instagram.com/prishu_makeover97",
  facebook: "https://facebook.com/",
  mapsQuery: "7X5V+5W Chohla Sahib, Punjab 143408",
};

export const SERVICE_NAMES = [
  "Bridal Makeover",
  "Party Makeover",
  "Nail Extensions & Nail Art",
  "Threading",
  "Waxing",
  "Manicure",
  "Pedicure",
] as const;

export type Booking = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
};

export function validateBooking(b: Booking, today: string): Partial<Record<keyof Booking, string>> {
  const e: Partial<Record<keyof Booking, string>> = {};
  if (b.name.trim().length < 2) e.name = "Please enter your full name.";
  if (b.name.length > 80) e.name = "Name is too long.";
  const digits = b.phone.replace(/[\s+\-()]/g, "");
  if (!/^\d{10,13}$/.test(digits)) e.phone = "Enter a valid phone number (10–13 digits).";
  if (!b.service) e.service = "Please choose a service.";
  if (!b.date) e.date = "Please pick a date.";
  else if (b.date < today) e.date = "Date can't be in the past.";
  if (!b.time) e.time = "Please pick a time.";
  if (b.notes.length > 500) e.notes = "Please keep notes under 500 characters.";
  return e;
}

export function whatsappLink(b?: Booking) {
  const msg = b
    ? `Hello ${SALON.name}! I'd like to request an appointment.\n\nName: ${b.name}\nPhone: ${b.phone}\nService: ${b.service}\nPreferred date: ${b.date}\nPreferred time: ${b.time}${b.notes ? `\nNotes: ${b.notes}` : ""}`
    : `Hello ${SALON.name}! I'd like to know more about your services.`;
  return `https://wa.me/${SALON.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}
