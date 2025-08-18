import React from 'react'
import '../styles/HomeComp.css'

const HomeComp = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image-wrapper">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfr8iTsC4T-MBJC_DLcbMxz6_lrO_6uU60bXWPdxiZYVFVegG8NM3j1UgYW2ZKvz0Ey4WTLQqlL71YodZAJ0yWlmO-GHBUi6j5wPAS6ICXxiSKrmone7cGqtt96XXgQSmyuBaGMONy2s6m7iQ2AcKASNCfu9ImWsFsNaTXpaHo-3hjeTAayLggYvD1XnrEtk_lzFhqBsNSGSvwNJctyvTl4IlE8D7N9UKTYRz6NDnRIq9eIE1aeiZzuGWqrTHJpLj7gETxDtWAL7Vg"
            alt="Hero"
            className="hero-image"
          />
          <div className="hero-overlay-content">
            <h1 className="hero-title">Your Personal Growth Companion</h1>
            <p className="hero-desc">
              Reflectly is your AI-powered journaling companion, designed to help you understand your thoughts and emotions better.
              Start your journey towards self-discovery today.
            </p>
            <button className="get-started-btn">Get Started</button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="key-features-section">
        <h2 className="key-features-title">Key Features</h2>
        <p className="key-features-desc">
          Explore the core functionalities that make Reflectly a powerful tool for personal growth and reflection.
        </p>
        <div className="features-list">
          {/* Feature 1 */}
          <div className="feature-card">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
              alt="Create and Edit Entries"
            />
            <div className="feature-title">Create and Edit Entries</div>
            <div className="feature-desc">
              Easily create new journal entries and edit existing ones to capture your thoughts and experiences accurately.
            </div>
          </div>
          {/* Feature 2 */}
          <div className="feature-card">
            <img
              src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
              alt="Visualize Your Progress"
            />
            <div className="feature-title">Visualize Your Progress</div>
            <div className="feature-desc">
              Track your journaling activity over time with insightful graphs that show your progress and consistency.
            </div>
          </div>
          {/* Feature 3 */}
          <div className="feature-card">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"
              alt="Maintain Your Journal Log"
            />
            <div className="feature-title">Maintain Your Journal Log</div>
            <div className="feature-desc">
              Keep a comprehensive log of all your journal entries, organized by date for easy access and review.
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to Reflect?</h2>
        <p className="cta-desc">
          Begin your path to self-discovery and emotional well-being with Reflectly. Sign up now and start journaling today.
        </p>
        <button className="cta-btn">Start Your Journey</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div>
          @2024 Reflectly. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default HomeComp