import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <header className="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            {/* Logo image */}
            <img
              src="/logo.png"
              alt="Smart Text Analyzer Logo"
              className="logo-img mr-3"
            />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Smart Text Analyzer
            </h1>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleLogin}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover-bg-gray-50 hover-text-gray-900 transition-colors"
            >
              Login
            </button>
            <button 
              onClick={handleSignup}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover-bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup'); // Redirect to signup for getting started
  };

  const handleLearnMore = () => {
    // You can add a learn more page or scroll to features section
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="hero-title">
            Empowering Smarter Communication
          </h2>
          <p className="hero-description">
            Smart Text Analyzer helps you understand, improve, and refine your writing using advanced text analysis tools. 
            Identify grammar issues, detect tone, summarize content, and get suggestions to enhance clarity and impact.
          </p>
          <div className="cta-buttons">
            <button onClick={handleGetStarted} className="btn-primary">
              Get Started
            </button>
            <button onClick={handleLearnMore} className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const features = [
    {
      title: "Grammar Checker",
      description: "Automatically detects and corrects grammar mistakes in your text.",
      icon: "📝"
    },
    {
      title: "Style Suggestions",
      description: "Gives tips to improve sentence clarity, flow, and writing style.",
      icon: "✨"
    },
    {
      title: "Readability Score",
      description: "Shows how easy your content is to read and understand.",
      icon: "📊"
    },
    {
      title: "Summarization",
      description: "Quickly creates a short summary of your longer text or document.",
      icon: "📄"
    },
    {
      title: "Upload PDF/Scanned Docs",
      description: "Allows you to upload PDF or scanned files for analysis.",
      icon: "📁"
    },
    {
      title: "Tone Rewriter (Formal/Casual etc.)",
      description: "Changes the tone of your text to match formal, casual, or other styles.",
      icon: "🎭"
    },
    {
      title: "Generative Dashboard (Analytics)",
      description: "Displays useful analytics and insights about your writing patterns.",
      icon: "📈"
    },
    {
      title: "Q&A from Uploaded Topic",
      description: "Lets you ask questions and get answers based on uploaded content.",
      icon: "❓"
    },
    {
      title: "Coach Quiz Generator",
      description: "Automatically creates quizzes from your learning material.",
      icon: "🧠"
    },
    {
      title: "Feature Guides (Tips)",
      description: "Provides tips and guides to help you use each feature effectively.",
      icon: "💡"
    },
    {
      title: "Download as .txt/.pdf/.docx",
      description: "You can download your final output in TXT, PDF, or DOCX format.",
      icon: "💾"
    },
    {
      title: "Rich Text Editor",
      description: "Offers an editor where you can format and style your text easily.",
      icon: "📝"
    }
  ];

  const itemsPerPage = 4;
  const maxIndex = features.length - itemsPerPage;

  // Make navigation cyclic
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev < maxIndex ? prev + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : maxIndex
    );
  };

  const getCurrentFeatures = () => {
    return features.slice(currentIndex, currentIndex + itemsPerPage);
  };

  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the tools that make Smart Text Analyzer your go-to solution for better writing.
          </p>
        </div>

        {/* Navigation + Features Row */}
        <div className="flex justify-center items-center mb-8">
          <button
            onClick={prevSlide}
            className="nav-btn nav-btn-left"
            aria-label="Previous"
          >
            &#8249;
          </button>
          <div className="features-container flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {getCurrentFeatures().map((feature, index) => (
                <div key={index} className="feature-flip-card">
                  <div className="feature-flip-content">
                    {/* Front Side */}
                    <div className="feature-flip-front">
                      <div className="feature-flip-emoji">{feature.icon}</div>
                      <div className="feature-flip-title">{feature.title}</div>
                    </div>
                    {/* Back Side */}
                    <div className="feature-flip-back">
                      <div className="feature-flip-back-content">
                        <div className="feature-flip-desc">{feature.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={nextSlide}
            className="nav-btn nav-btn-right"
            aria-label="Next"
          >
            &#8250;
          </button>
        </div>

        {/* Page Indicator */}
        {/* <div className="text-center mt-6">
          <span className="text-sm text-gray-500">
            Showing {currentIndex + 1} - {Math.min(currentIndex + itemsPerPage, features.length)} of {features.length}
          </span>
        </div> */}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-2">Smart Text Analyzer</h4>
          <p className="text-gray-400">
            © 2025 Smart Text Analyzer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />  
    </div>
  );
};

export default Home;