import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <p className="about-eyebrow">A little about Alzikrayat</p>
        <h1>Some moments are too good to leave behind.</h1>
        <p className="about-lead">
          Alzikrayat is a calm, shared home for photographs and the stories
          that make them yours. Save a moment, add a few words, and find it
          again whenever you want.
        </p>
        <div className="about-actions">
          <Link to="/gallery" className="btn-primary">Visit the gallery</Link>
          <Link to="/" className="btn-secondary">Back to home</Link>
        </div>
      </section>

      <section className="about-note" aria-label="Our idea">
        <span className="about-note-mark" aria-hidden="true">✦</span>
        <p>
          A photograph keeps the moment. The story helps it stay close.
        </p>
      </section>

      <section aria-labelledby="about-how-title">
        <h2 className="about-section-heading" id="about-how-title">
          Made for the moments that matter
        </h2>
        <div className="about-values">
          <article className="about-value">
            <span className="about-value-number">01</span>
            <h3>Share a memory</h3>
            <p>
              Add a photo to your collection and give it a title that brings
              the moment back.
            </p>
          </article>
          <article className="about-value">
            <span className="about-value-number">02</span>
            <h3>Keep the story</h3>
            <p>
              Leave a description or a comment so the little details are not
              lost with time.
            </p>
          </article>
          <article className="about-value">
            <span className="about-value-number">03</span>
            <h3>Come back anytime</h3>
            <p>
              Browse the gallery, revisit familiar faces, and discover moments
              shared by others.
            </p>
          </article>
        </div>
      </section>

      <section className="about-footer">
        <p>Have a memory you would like to keep?</p>
        <Link to="/gallery" className="btn-primary">Explore Alzikrayat</Link>
      </section>
    </div>
  );
}

export default About;
