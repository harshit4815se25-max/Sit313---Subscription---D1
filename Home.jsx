import { Link } from "react-router-dom";

function Home() {
const features = [
{
icon: "💡",
title: "Learn New Skills",
description:
"Explore practical tutorials, programming guides, and insights to strengthen your technical knowledge.",
},
{
icon: "🚀",
title: "Build Projects",
description:
"Turn your ideas into real projects and develop the skills needed to solve everyday problems.",
},
{
icon: "🤝",
title: "Connect with Developers",
description:
"Discover new perspectives, share your knowledge, and become part of a growing developer community.",
},
];

const articles = [
{
category: "Web Development",
title: "Getting Started with Modern Web Development",
description:
"Discover the technologies and essential skills behind modern websites and web applications.",
author: "DEV@Deakin Team",
date: "October 20, 2026",
icon: "🌐",
},
{
category: "JavaScript",
title: "Understanding JavaScript Fundamentals",
description:
"Learn about variables, functions, objects, and the concepts that make JavaScript powerful.",
author: "DEV@Deakin Team",
date: "October 22, 2026",
icon: "⚡",
},
{
category: "Programming",
title: "How to Start Your First Coding Project",
description:
"Learn how to plan your first project, organise your code, and build something useful.",
author: "DEV@Deakin Team",
date: "October 24, 2026",
icon: "💻",
},
];

return (
<> <section className="hero"> <div className="container"> <div className="hero-content"> <span className="eyebrow">Welcome to DEV@Deakin</span>


        <h1>
          Learn. Build.
          <br />
          <span>Share Your Ideas.</span>
        </h1>

        <p className="hero-description">
          A community for curious minds, aspiring developers, and
          technology enthusiasts. Discover articles, share knowledge,
          and grow together.
        </p>

        <div className="button-row">
          <Link to="/articles" className="button">
            Explore Articles →
          </Link>

          <Link to="/signup" className="button button-secondary">
            Join Our Community
          </Link>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <strong>Learn</strong>
            <span>Discover new skills</span>
          </div>

          <div className="hero-stat">
            <strong>Build</strong>
            <span>Create new projects</span>
          </div>

          <div className="hero-stat">
            <strong>Connect</strong>
            <span>Meet developers</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="section">
    <div className="container">
      <div className="section-heading">
        <span className="eyebrow">Why DEV@Deakin?</span>

        <h2>Your Ideas Deserve to Grow</h2>

        <p>
          Everything you need to learn, create, and connect with people
          who share your passion for technology.
        </p>
      </div>

      <div className="feature-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <div className="feature-icon" aria-hidden="true">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>

  <section className="section" style={{ background: "#ffffff" }}>
    <div className="container">
      <div className="section-heading">
        <span className="eyebrow">Explore & Discover</span>

        <h2>Ideas Worth Sharing</h2>

        <p>
          Discover tutorials, insights, and perspectives from the world
          of technology.
        </p>
      </div>

      <div className="articles-grid">
        {articles.map((article) => (
          <article className="article-card" key={article.title}>
            <div
              className="article-image-placeholder"
              aria-hidden="true"
            >
              {article.icon}
            </div>

            <div className="article-content">
              <span className="article-category">
                {article.category}
              </span>

              <h3>{article.title}</h3>

              <p>{article.description}</p>

              <div className="article-meta">
                <span>{article.author}</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>

              <Link to="/articles" className="article-link">
                Explore article <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="button-row mt-24">
        <Link to="/articles" className="button button-secondary">
          View All Articles →
        </Link>
      </div>
    </div>
  </section>

  <section className="cta-section">
    <div className="container">
      <div className="cta-content">
        <h2>Have Something Great to Share?</h2>

        <p>
          Join the DEV@Deakin community to discover ideas, learn from
          others, and continue your development journey.
        </p>

        <div className="button-row">
          <Link to="/signup" className="button">
            Join the Community →
          </Link>

          <Link to="/subscribe" className="button button-secondary">
            Subscribe to Updates
          </Link>
        </div>
      </div>
    </div>
  </section>
</>


);
}

export default Home;
