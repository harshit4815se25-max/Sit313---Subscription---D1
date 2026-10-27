import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

import PaymentModal from "../components/PaymentModal.jsx";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Explore the DEV@Deakin community.",
    features: [
      "Access to standard articles",
      "Up to 5 posts per month",
      "Image uploads up to 2 MB",
      "Standard community features",
    ],
  },
  {
    name: "Paid",
    price: "₹299",
    period: "per month",
    description: "Get more flexibility for your development journey.",
    features: [
      "Access to standard articles",
      "Illustrative unlimited monthly posts",
      "Image uploads up to 10 MB",
      "Premium content access",
      "Additional community features",
    ],
  },
];

function Pricing() {
  const {
    user,
    loading,
    upgradePlan,
  } = useAuth();

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const currentPlan = user?.plan || "Free";

  function handleUpgradeClick() {
    setMessage("");
    setError("");

    if (loading) {
      return;
    }

    if (!user) {
      navigate("/login", {
        state: {
          from: "/pricing",
        },
      });

      return;
    }

    if (currentPlan === "Paid") {
      setMessage("You are already subscribed to the Paid plan.");
      return;
    }

    setShowModal(true);
  }

  async function handleConfirmUpgrade() {
    setError("");
    setMessage("");

    try {
      await upgradePlan();

      setShowModal(false);

      setMessage(
        "Your plan has been upgraded successfully. Welcome to the Paid plan!"
      );
    } catch (err) {
      setError(err.message || "Unable to upgrade your plan.");
      throw err;
    }
  }

  return (
    <section className="pricing-page">
      <div className="pricing-hero">
        <p className="eyebrow">SIMPLE. FLEXIBLE. DEVELOPER-FOCUSED.</p>

        <h1>Choose your DEV@Deakin plan</h1>

        <p>
          Compare the available features and choose the plan that
          suits your learning and development goals.
        </p>

        {loading ? (
          <div className="current-plan-banner">
            Checking your account...
          </div>
        ) : user ? (
          <div className="current-plan-banner">
            <span>
              Signed in as <strong>{user.name}</strong>
            </span>

            <span className="current-plan-label">
              Current plan: {currentPlan}
            </span>
          </div>
        ) : (
          <div className="current-plan-banner">
            <span>
              Viewing plans as a guest.
            </span>

            <button
              type="button"
              className="text-button"
              onClick={() => navigate("/login")}
            >
              Login to manage your plan
            </button>
          </div>
        )}
      </div>

      {message && (
        <div className="notification notification-success" role="status">
          {message}
        </div>
      )}

      {error && (
        <div className="notification notification-error" role="alert">
          {error}
        </div>
      )}

      <div className="pricing-grid">
        {plans.map((plan) => {
          const isCurrentPlan =
            user && currentPlan === plan.name;

          const isPaidPlan = plan.name === "Paid";

          return (
            <article
              key={plan.name}
              className={`pricing-card ${
                isPaidPlan ? "pricing-card-featured" : ""
              }`}
            >
              {isPaidPlan && (
                <span className="popular-badge">
                  PREMIUM
                </span>
              )}

              <div className="pricing-card-header">
                <h2>{plan.name}</h2>

                <p>{plan.description}</p>
              </div>

              <div className="price-display">
                <span className="price-value">
                  {plan.price}
                </span>

                <span className="price-period">
                  {plan.period}
                </span>
              </div>

              <div className="plan-divider" />

              <h3>Plan features</h3>

              <ul className="plan-feature-list">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className="feature-check" aria-hidden="true">
                      ✓
                    </span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pricing-card-action">
                {isCurrentPlan ? (
                  <button
                    type="button"
                    className="button button-current"
                    disabled
                  >
                    Current Plan
                  </button>
                ) : isPaidPlan && user && currentPlan === "Paid" ? (
                  <button
                    type="button"
                    className="button button-current"
                    disabled
                  >
                    Already Upgraded
                  </button>
                ) : isPaidPlan ? (
                  <button
                    type="button"
                    className="button button-primary button-full"
                    onClick={handleUpgradeClick}
                    disabled={loading}
                  >
                    Upgrade Plan
                  </button>
                ) : (
                  <button
                    type="button"
                    className="button button-outline button-full"
                    onClick={() => {
                      if (!user) {
                        navigate("/login");
                      }
                    }}
                  >
                    {user ? "Free Plan" : "Login to Get Started"}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="pricing-note">
        <h2>Choose with confidence</h2>

        <p>
          The subscription features and prices shown here are
          illustrative examples for this coursework demonstration.
          No real payment is processed.
        </p>
      </div>

      {showModal && (
        <PaymentModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmUpgrade}
        />
      )}
    </section>
  );
}

export default Pricing;