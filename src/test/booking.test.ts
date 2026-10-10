import { describe, it, expect } from "vitest";
import { validateBooking } from "@/lib/salon";

const ok = { name: "Priya Sharma", phone: "98765 43210", service: "Bridal Makeover", date: "2026-12-01", time: "11:00", notes: "" };

describe("booking validation", () => {
  it("accepts a complete request", () => {
    expect(validateBooking(ok, "2026-10-09")).toEqual({});
  });
  it("requires name, phone, service, date and time", () => {
    const e = validateBooking({ name: "", phone: "", service: "", date: "", time: "", notes: "" }, "2026-10-09");
    expect(Object.keys(e).sort()).toEqual(["date", "name", "phone", "service", "time"]);
  });
  it("rejects past dates", () => {
    expect(validateBooking({ ...ok, date: "2026-10-01" }, "2026-10-09").date).toBeDefined();
  });
});
