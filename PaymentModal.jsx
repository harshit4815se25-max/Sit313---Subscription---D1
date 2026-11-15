import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const luhn = (n) => {
  let sum = 0, alt = false;
  for (let i = n.length - 1; i >= 0; i--) {
    let d = +n[i];
    if (alt && (d *= 2) > 9) d -= 9;
    sum += d; alt = !alt;
  }
  return sum % 10 === 0;
};

export default function PaymentModal({ onClose, onSuccess }) {
  const { upgrade } = useAuth();
  const [f, setF] = useState({ name: "", cardNumber: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const onNumber = (v) =>
    set("cardNumber", v.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim());
  const onExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    set("expiry", d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
  };

  const validate = () => {
    const e = {};
    const num = f.cardNumber.replace(/\s/g, "");
    const m = /^(\d{2})\/(\d{2})$/.exec(f.expiry);
    if (!f.name.trim()) e.name = "Enter the name on the card.";
    if (!/^\d{13,19}$/.test(num) || !luhn(num)) e.cardNumber = "Card number is not valid.";
    if (!m || +m[1] < 1 || +m[1] > 12) e.expiry = "Use MM/YY.";
    else if (new Date(2000 + +m[2], +m[1], 1) <= new Date()) e.expiry = "This card has expired.";
    if (!/^\d{3,4}$/.test(f.cvc)) e.cvc = "3 or 4 digits.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    setBusy(true);
    try {
      onSuccess(await upgrade(f));
    } catch (err) {
      setServerError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal" onSubmit={submit} noValidate role="dialog" aria-modal="true" aria-labelledby="pay-title">
        <h2 id="pay-title">Upgrade to Premium</h2>
        <p className="muted">$9 / month. Demo only, no real payment is taken.</p>

        <label>Name on card
          <input value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="cc-name" autoFocus />
          {errors.name && <small className="err">{errors.name}</small>}
        </label>
        <label>Card number
          <input value={f.cardNumber} onChange={(e) => onNumber(e.target.value)} inputMode="numeric" placeholder="4242 4242 4242 4242" autoComplete="cc-number" />
          {errors.cardNumber && <small className="err">{errors.cardNumber}</small>}
        </label>
        <div className="row">
          <label>Expiry
            <input value={f.expiry} onChange={(e) => onExpiry(e.target.value)} placeholder="MM/YY" inputMode="numeric" autoComplete="cc-exp" />
            {errors.expiry && <small className="err">{errors.expiry}</small>}
          </label>
          <label>CVC
            <input value={f.cvc} onChange={(e) => set("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" autoComplete="cc-csc" />
            {errors.cvc && <small className="err">{errors.cvc}</small>}
          </label>
        </div>

        {serverError && <p className="alert error">{serverError}</p>}

        <div className="modal-actions">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn" disabled={busy}>{busy ? "Processing…" : "Pay $9 and upgrade"}</button>
        </div>
      </form>
    </div>
  );
}
