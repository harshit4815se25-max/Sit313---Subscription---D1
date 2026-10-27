import { useState } from "react";

function getCardDigits(value) {
  return value.replace(/\D/g, "");
}

function isValidExpiry(value) {
  const match = value.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);

  if (!match) {
    return false;
  }

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);

  const now = new Date();
  const currentMonth = now.getFullYear() * 12 + now.getMonth();
  const expiryMonth = year * 12 + month - 1;

  return expiryMonth >= currentMonth;
}

function isValidCardNumber(value) {
  const digits = getCardDigits(value);

  if (digits.length < 13 || digits.length > 19) {
    return false;
  }

  let sum = 0;
  let doubleDigit = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);

    if (doubleDigit) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    doubleDigit = !doubleDigit;
  }

  return sum % 10 === 0;
}

function PaymentModal({ onClose, onConfirm }) {
  const [cardholder, setCardholder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!cardholder.trim()) {
      setError("Please enter the cardholder name.");
      return;
    }

    if (!isValidCardNumber(cardNumber)) {
      setError("Please enter a valid demonstration card number.");
      return;
    }

    if (!isValidExpiry(expiry)) {
      setError("Enter a valid, unexpired expiry date in MM/YY format.");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      setError("Please enter a valid 3- or 4-digit CVV.");
      return;
    }

    // This is a coursework demonstration, not a payment gateway.
    // Never enter real card details.

    setSubmitting(true);

    try {
      await onConfirm();

      setCardholder("");
      setCardNumber("");
      setExpiry("");
      setCvv("");
    } catch (err) {
      setError(err.message || "Unable to upgrade your plan.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !submitting) {
          onClose();
        }
      }}
    >
      <section
        className="payment-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">DEV@DEAKIN PREMIUM</p>

            <h2 id="payment-modal-title">Upgrade your plan</h2>

            <p>Coursework demonstration only.</p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close payment modal"
          >
            ×
          </button>
        </div>

        <div className="payment-summary">
          <div>
            <span>Paid Plan</span>
            <strong>₹299 per month</strong>
          </div>

          <span className="payment-badge">Test mode</span>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-field">
            <label htmlFor="cardholder">Cardholder name</label>

            <input
              id="cardholder"
              value={cardholder}
              onChange={(event) => setCardholder(event.target.value)}
              autoComplete="off"
              maxLength={100}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="card-number">Demonstration card number</label>

            <input
              id="card-number"
              value={cardNumber}
              onChange={(event) => {
                const digits = getCardDigits(event.target.value);

                if (digits.length <= 19) {
                  setCardNumber(digits);
                }
              }}
              inputMode="numeric"
              autoComplete="off"
              placeholder="Enter fictional test data"
              required
            />
          </div>

          <div className="payment-row">
            <div className="form-field">
              <label htmlFor="card-expiry">Expiry (MM/YY)</label>

              <input
                id="card-expiry"
                value={expiry}
                onChange={(event) => {
                  const value = event.target.value
                    .replace(/[^\d/]/g, "")
                    .slice(0, 5);

                  setExpiry(value);
                }}
                placeholder="MM/YY"
                autoComplete="off"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="card-cvv">CVV</label>

              <input
                id="card-cvv"
                value={cvv}
                onChange={(event) => {
                  setCvv(
                    event.target.value.replace(/\D/g, "").slice(0, 4)
                  );
                }}
                inputMode="numeric"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <p className="payment-disclaimer">
            This is a coursework demonstration. No payment is processed.
            Do not enter real payment details.
          </p>

          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="button button-outline"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="button button-primary"
              disabled={submitting}
            >
              {submitting ? "Processing..." : "Confirm Upgrade"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default PaymentModal;