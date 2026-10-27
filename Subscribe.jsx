import { useState } from "react";

function Subscribe() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/newsletter/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const text = await response.text();
      let data = {};

      if (text.trim()) {
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("The server returned an invalid response.");
        }
      }

      if (!response.ok) {
        throw new Error(data.message || "Subscription failed. Please try again.");
      }

      setMessage(data.message || "Successfully subscribed to the newsletter!");
      setEmail("");
    } catch (error) {
      setMessage(error.message || "Unable to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <section className="page-hero subscribe-hero">
        <span className="eyebrow">STAY CONNECTED</span>

        <h1>
          Ideas worth sharing.
          <br />
          <span>Delivered to your inbox.</span>
        </h1>

        <p>
          Subscribe to the DEV@Deakin newsletter for technology insights,
          programming tips, new articles, and learning opportunities.
        </p>
      </section>

      <section className="section">
        <div className="subscribe-card">
          <div className="subscribe-icon">✉</div>

          <h2>Join our newsletter</h2>

          <p>
            Enter your email address to stay updated with the DEV@Deakin
            community.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="newsletter-email">Email address</label>

            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe Now"}
            </button>
          </form>

          {message && (
            <p role="status" aria-live="polite">
              {message}
            </p>
          )}

          <small>
            Join our community and keep learning, creating, and sharing.
          </small>
        </div>
      </section>
    </div>
  );
}

export default Subscribe;