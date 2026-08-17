"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "motion/react";
import styles from "./OrderTicket.module.css";

/*
  Simulated instruments — public ticker names, random-walk prices, no live feed
  and nothing confidential. See the note in the Lab section copy.
*/
const SEED = [
  { sym: "NIFTY", ex: "Index", px: 24380.5 },
  { sym: "BANKNIFTY", ex: "Index", px: 52140.2 },
  { sym: "RELIANCE", ex: "NSE", px: 1412.75 },
  { sym: "HDFCBANK", ex: "NSE", px: 1668.4 },
  { sym: "INFY", ex: "NSE", px: 1632.4 },
  { sym: "TCS", ex: "NSE", px: 3444.15 },
];

const HIST = 24;

type Instrument = {
  sym: string;
  ex: string;
  px: number;
  base: number;
  prev: number;
  hist: number[];
};

const seedState = (): Instrument[] =>
  SEED.map((i) => ({ ...i, base: i.px, prev: i.px, hist: Array(HIST).fill(i.px) }));

const fmt = (n: number) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Maps a price history onto the sparkline's 100×26 viewBox. */
function sparkPath(hist: number[]) {
  const w = 100;
  const h = 26;
  const pad = 3;
  const min = Math.min(...hist);
  const max = Math.max(...hist);
  const range = max - min || 1;

  return hist
    .map((v, i) => {
      const x = (i / (hist.length - 1)) * w;
      const y = h - pad - ((v - min) / range) * (h - 2 * pad);
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function Sparkline({ hist, rising }: { hist: number[]; rising: boolean }) {
  return (
    <svg viewBox="0 0 100 26" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d={sparkPath(hist)}
        fill="none"
        stroke={rising ? "var(--lab-up)" : "var(--lab-down)"}
        strokeWidth={1.4}
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </svg>
  );
}

/** One watchlist row. Split out so a price change only re-renders its own row. */
function Row({
  inst,
  selected,
  onSelect,
  onArrow,
  rowRef,
  reduced,
}: {
  inst: Instrument;
  selected: boolean;
  onSelect: () => void;
  onArrow: (delta: number) => void;
  rowRef: (el: HTMLDivElement | null) => void;
  reduced: boolean | null;
}) {
  const change = ((inst.px - inst.base) / inst.base) * 100;
  const up = change >= 0;
  const rose = inst.px > inst.prev;

  return (
    <div
      ref={rowRef}
      className={styles.row}
      role="option"
      tabIndex={0}
      aria-selected={selected}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          onArrow(1);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          onArrow(-1);
        }
      }}
    >
      <div>
        <div className={styles.sym}>{inst.sym}</div>
        <div className={styles.ex}>{inst.ex}</div>
      </div>

      {/*
        The price cell flashes its background on every change. Keying the
        element on the price is what makes it re-run: React remounts it, so
        Motion replays the entrance from `initial` without the class-removal
        and forced-reflow dance the original needed to restart a CSS animation.
      */}
      <motion.div
        key={reduced ? undefined : inst.px}
        className={`${styles.px} mono`}
        initial={reduced ? false : { backgroundColor: rose ? "var(--lab-up-dim)" : "var(--lab-down-dim)", color: rose ? "var(--lab-up)" : "var(--lab-down)" }}
        animate={{ backgroundColor: "rgba(0,0,0,0)", color: "var(--lab-text)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {fmt(inst.px)}
      </motion.div>

      <div className={`${styles.chg} mono ${up ? styles.up : styles.down}`}>
        {up ? "+" : ""}
        {change.toFixed(2)}%
      </div>

      <div className={styles.spark}>
        {selected && <Sparkline hist={inst.hist} rising={inst.px >= inst.base} />}
      </div>
    </div>
  );
}

export function OrderTicket() {
  const reduced = useReducedMotion();

  const [inst, setInst] = useState<Instrument[]>(seedState);
  const [selected, setSelected] = useState(4); // INFY
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [type, setType] = useState<"market" | "limit">("market");
  const [qty, setQty] = useState(50);
  const [limitPrice, setLimitPrice] = useState("");
  const [holding, setHolding] = useState(false);
  const [armed, setArmed] = useState(false);
  const [toast, setToast] = useState<{ id: number; verb: string; qty: number; sym: string; px: number; type: string } | null>(null);

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const priceInput = useRef<HTMLInputElement>(null);

  // ---- price simulation ----
  useEffect(() => {
    const period = reduced ? 2000 : 1200;
    const id = setInterval(() => {
      setInst((prev) =>
        prev.map((it) => {
          const drift = Math.random() - 0.5;
          // Mean-reverting random walk: without the pull back toward base, the
          // series wanders off and the sparkline flattens into a diagonal.
          const step = it.base * 0.0006 * drift + (it.base - it.px) * 0.02;
          const px = Math.max(0.05, it.px + step);
          return { ...it, prev: it.px, px, hist: [...it.hist.slice(1), px] };
        }),
      );
    }, period);
    return () => clearInterval(id);
  }, [reduced]);

  const current = inst[selected];
  const price = type === "limit" ? parseFloat(limitPrice) || 0 : current.px;
  const estimate = qty * price;
  const disabled = qty <= 0 || (type === "limit" && price <= 0);

  // ---- hold to confirm ----
  const HOLD = reduced ? 0.3 : 0.7;
  const fill = useMotionValue(0);
  const run = useRef<AnimationPlaybackControls | null>(null);

  const commit = useCallback(() => {
    setToast({
      id: Date.now(),
      verb: side === "buy" ? "Buy" : "Sell",
      qty,
      sym: current.sym,
      px: price,
      type: type === "market" ? "Market order" : "Limit",
    });
    setHolding(false);
    setArmed(false);
    fill.set(0);
  }, [side, qty, current.sym, price, type, fill]);

  /*
    The original drove this with its own requestAnimationFrame loop and wrote
    fill.style.width each frame — a layout-triggering property, animated on the
    main thread. Motion's animate() runs the same ramp against a transform
    instead, so the fill is composited.
  */
  const beginHold = useCallback(() => {
    if (disabled) return;
    setHolding(true);
    run.current?.stop();
    run.current = animate(fill, 1, {
      duration: HOLD,
      ease: "linear",
      onComplete: commit,
    });
  }, [disabled, fill, HOLD, commit]);

  const cancelHold = useCallback(() => {
    run.current?.stop();
    run.current = null;
    setHolding(false);
    animate(fill, 0, { duration: 0.12, ease: "linear" });
  }, [fill]);

  useEffect(() => () => run.current?.stop(), []);

  // Auto-dismiss the toast.
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(id);
  }, [toast]);

  const focusRow = (from: number, delta: number) => {
    const next = (from + delta + inst.length) % inst.length;
    rowRefs.current[next]?.focus();
  };

  const chooseType = (next: "market" | "limit") => {
    setType(next);
    if (next === "limit") {
      setLimitPrice(current.px.toFixed(2));
      requestAnimationFrame(() => {
        priceInput.current?.focus();
        priceInput.current?.select();
      });
    }
  };

  const sideColor = side === "buy" ? "var(--lab-up)" : "var(--lab-down)";
  const sideDim = side === "buy" ? "var(--lab-up-dim)" : "var(--lab-down-dim)";

  return (
    <div
      className={styles.shell}
      style={{ ["--side" as string]: sideColor, ["--side-dim" as string]: sideDim }}
    >
      <div className={styles.terminal}>
        {/* ---------- watchlist ---------- */}
        <section className={styles.watch} aria-label="Watchlist">
          <div className={styles.head}>
            <span className={styles.headTitle}>Watchlist</span>
            <span className={styles.live}>
              <span className={styles.pip} />
              Live
            </span>
          </div>
          <div className={styles.rows} role="listbox" aria-label="Instruments">
            {inst.map((it, idx) => (
              <Row
                key={it.sym}
                inst={it}
                selected={idx === selected}
                reduced={reduced}
                rowRef={(el) => {
                  rowRefs.current[idx] = el;
                }}
                onSelect={() => setSelected(idx)}
                onArrow={(delta) => focusRow(idx, delta)}
              />
            ))}
          </div>
        </section>

        {/* ---------- order ticket ---------- */}
        <section className={styles.ticket} aria-label="Order ticket">
          <div className={styles.head}>
            <span className={styles.headTitle}>Order</span>
            <span className={`${styles.sel} mono`}>{current.sym}</span>
          </div>

          <div className={styles.body}>
            <div className={styles.side} role="group" aria-label="Side">
              <button
                type="button"
                data-side="buy"
                data-on={side === "buy"}
                onClick={() => setSide("buy")}
              >
                Buy
              </button>
              <button
                type="button"
                data-side="sell"
                data-on={side === "sell"}
                onClick={() => setSide("sell")}
              >
                Sell
              </button>
            </div>

            <div className={styles.field}>
              <label htmlFor="qty">
                Quantity <span className={styles.hint}>lots</span>
              </label>
              <div className={styles.stepper}>
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(0, q - 5))}
                >
                  −
                </button>
                <input
                  id="qty"
                  className="mono"
                  inputMode="numeric"
                  value={qty || ""}
                  aria-label="Quantity"
                  onChange={(e) => setQty(parseInt(e.target.value.replace(/\D/g, "")) || 0)}
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 5)}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label id="orderTypeLabel">Order type</label>
              <div className={styles.seg} role="group" aria-labelledby="orderTypeLabel">
                <button
                  type="button"
                  data-on={type === "market"}
                  onClick={() => chooseType("market")}
                >
                  Market
                </button>
                <button
                  type="button"
                  data-on={type === "limit"}
                  onClick={() => chooseType("limit")}
                >
                  Limit
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="price">
                Price{" "}
                <span className={styles.hint}>{type === "limit" ? "limit" : "at market"}</span>
              </label>
              <div className={styles.priceWrap} data-disabled={type !== "limit"}>
                <span className={styles.cur}>₹</span>
                <input
                  id="price"
                  ref={priceInput}
                  className="mono"
                  inputMode="decimal"
                  aria-label="Limit price"
                  disabled={type !== "limit"}
                  value={type === "limit" ? limitPrice : fmt(current.px)}
                  onChange={(e) => setLimitPrice(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.estimate}>
              <span className={styles.estLabel}>Est. value</span>
              <span className={`${styles.estValue} mono`}>₹{fmt(estimate)}</span>
            </div>

            <button
              type="button"
              className={styles.place}
              data-holding={holding}
              disabled={disabled}
              aria-label="Hold to place order"
              /*
                Pointer events rather than separate mouse and touch handlers.
                React attaches touchstart passively, so the preventDefault that
                used to sit here never ran — the browser then synthesised mouse
                events after the touch ones, and the emulated mousedown
                restarted the hold that touchend had just cancelled. One set of
                events for every input device has no such gap.
              */
              onPointerDown={beginHold}
              onPointerUp={cancelHold}
              onPointerLeave={cancelHold}
              onPointerCancel={cancelHold}
              onBlur={() => {
                if (armed) {
                  setArmed(false);
                  fill.set(0);
                }
              }}
              /*
                Holding is pointer-only, so keyboard users get an equivalent
                two-step confirm rather than being locked out of the primary
                action. Same deliberate-commit intent, different mechanism.
              */
              onKeyDown={(e) => {
                if (e.key !== "Enter" && e.key !== " ") return;
                e.preventDefault();
                if (disabled) return;
                if (!armed) {
                  setArmed(true);
                  fill.set(0.4);
                } else {
                  commit();
                }
              }}
            >
              <motion.span className={styles.fill} style={{ scaleX: fill }} />
              <span className={styles.placeLabel}>
                {armed ? "Press again to confirm" : `${side === "buy" ? "Buy" : "Sell"} ${qty} ${current.sym}`}
              </span>
              <span className={styles.placeHint}>Hold to confirm</span>
            </button>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className={styles.toast}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <span className={styles.toastDot} />
            <span className={styles.toastMsg}>
              <b className="mono">
                {toast.verb} {toast.qty} {toast.sym}
              </b>{" "}
              placed
              <span className={styles.toastSub}>
                {toast.type} · ₹{fmt(toast.px)} · est ₹{fmt(toast.qty * toast.px)}
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
