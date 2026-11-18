/**
 * About page
 * explains what Alzikrayat is, what the user can do in it, how the JWT login keeps it secure,
 * which technologies were used (organized by the 3 tiers), and the information about the project
 */



import React from 'react';

// the about page of the app
// parameters; none (reads the logged in user from the AuthContext to choose the last button)
// Returns the about page JSX
const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">About Alzikrayt</h1>
      
      <div className="space-y-6 text-gray-700 leading-relaxed text-base">
        <p>
          Welcome to <strong className="text-gray-900">Alzikrayt</strong>, a dedicated photo-sharing web application built to help users preserve, manage, and share their most cherished visual memories in a private and secure space.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 pt-2">Our Purpose</h2>
        <p>
          In a digital world overflowing with transient feeds, Alzikrayt provides a focused environment where moments matter. Whether it is capturing everyday highlights, documenting recovery journeys, or saving milestone snapshots, our platform ensures your memories remain organized and accessible.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 pt-2">Key Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Secure Authentication:</strong> Register and log in securely to manage your personal photo collection.</li>
          <li><strong>Seamless Uploads:</strong> Easily upload high-resolution images with supporting titles and descriptions.</li>
          <li><strong>Interactive Gallery:</strong> Browse through shared photographs, explore details, and engage through comments.</li>
          <li><strong>Clean Interface:</strong> A minimalist, distraction-free design focused entirely on the content that matters most.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 pt-2">Technology Stack</h2>
        <p>
          Alzikrayt is engineered using modern full-stack web technologies, utilizing a responsive React frontend paired with a robust Node.js and Express backend, secured with JSON Web Tokens (JWT) and styled using Tailwind CSS.
        </p>
      </div>
    </div>
  );
};

export default About;
