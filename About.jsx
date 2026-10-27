import { Link } from "react-router-dom";

const featuredArticles = [
  {
    category: "Web Development",
    title: "Getting Started with Modern Web Development",
    description:
      "Explore the technologies and essential skills behind modern websites and web applications.",
    author: "DEV@Deakin Team",
    date: "October 20, 2026",
    icon: "🌐",
  },
  {
    category: "JavaScript",
    title: "JavaScript Concepts Every Developer Should Know",
    description:
      "Understand the fundamentals that help you build interactive and reliable web applications.",
    author: "DEV@Deakin Team",
    date: "October 22, 2026",
    icon: "⚡",
  },
  {
    category: "Technology",
    title: "How AI Is Changing Software Development",
    description:
      "Discover how artificial intelligence is influencing the way developers design and build software.",
    author: "DEV@Deakin Team",
    date: "October 25, 2026",
    icon: "🤖",
  },
];

function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">WELCOME TO DEV@DEAKIN</span>

          <h1>
            Learn. Build.
            <br />
            <span>Share Your Ideas.</span>
          </h1>

          <p>
            A community for curious minds, aspiring developers, and technology
            enthusiasts. Discover articles, share knowledge, and grow together.
          </p>

          <div className="hero-actions">
            <Link to="/articles" className="btn btn-primary">
              Explore Articles →
            </Link>

            <Link to="/signup" className="btn btn-secondary">
              Join Our Community
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>Learn</strong>
              <span>New skills</span>
            </div>

            <div>
              <strong>Create</strong>
              <span>New projects</span>
            </div>

            <div>
              <strong>Connect</strong>
              <span>With developers</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card visual-card-main">
            <span className="visual-icon">{"</>"}</span>
            <h3>Build Something Great</h3>
            <p>Your next idea starts here.</p>

            <div className="code-preview">
              <span>const</span> future = <span>"developer"</span>;
              <br />
              <span>console</span>.log(future);
            </div>
          </div>

          <div className="floating-badge badge-top">💡 Keep Learning</div>
          <div className="floating-badge badge-bottom">🚀 Keep Building</div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPLORE & DISCOVER</span>
            <h2>Ideas worth sharing.</h2>
            <p>Discover insights, tutorials, and perspectives from technology.</p>
          </div>

          <Link to="/articles" className="text-link">
            View all articles →
          </Link>
        </div>

        <div className="article-grid">
          {featuredArticles.map((article, index) => (
            <article className="article-card" key={article.title}>
              <div className={`article-art article-art-${index + 1}`}>
                <span>{article.icon}</span>
                <small>{article.category}</small>
              </div>

              <div className="article-card-content">
                <span className="category-label">{article.category}</span>

                <h3>{article.title}</h3>

                <p>{article.description}</p>

                <div className="article-meta">
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                </div>

                <Link to="/articles" className="text-link">
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="community-banner">
        <div>
          <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>
          <h2>Have something worth sharing?</h2>
          <p>
            Join our community, explore new ideas, and take the next step in
            your development journey.
          </p>
        </div>

        <Link to="/signup" className="btn btn-light">
          Get Started →
        </Link>
      </section>
    </div>
  );
}

export default Home;