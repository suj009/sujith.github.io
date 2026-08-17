import type { Metadata } from "next";
import { OrderTicket } from "@/components/lab/OrderTicket";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Order Ticket",
  description:
    "A real-time order ticket: density, live state, and hold-to-confirm error prevention. Designed and built in the browser. Simulated data.",
};

export default function OrderTicketPage() {
  return (
    <div className={styles.page}>
      <div className={styles.caption}>
        <span className={styles.eyebrow}>Lab / 01</span>
        <h1 className={styles.title}>
          Order Ticket <span>· real-time panel, built in the browser</span>
        </h1>
      </div>

      <div className={styles.stage}>
        <OrderTicket />
      </div>

      <p className={styles.footnote}>
        <b>Simulated data</b> — public ticker names, random-walk prices, no live feed. Press and{" "}
        <b>hold</b> the order button to confirm: error-prevention at speed, made literal.
      </p>
    </div>
  );
}
