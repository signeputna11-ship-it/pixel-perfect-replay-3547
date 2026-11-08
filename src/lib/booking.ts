import { z } from "zod";
export const DEMO_TIMES = ["09:00", "11:30", "15:00"];
export function demoBookingDays(now: Date) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + i + 1);
    return d;
  });
}
export const bookingIntakeSchema = z.object({ name: z.string().trim().min(1).max(100), email: z.string().trim().email().max(254), intention: z.string().trim().min(1).max(500) });