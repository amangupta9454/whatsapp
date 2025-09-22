import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import st1 from "/st1.jpg";
import st2 from "/st2.png";
import st3 from "/st3.jpeg";
import st4 from "/st4.jpg";
import st5 from "/st5.jpeg";
import { Bot, Sparkles, Zap, Download } from "lucide-react";

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: 'AI-Powered Builder',
      description: 'Create professional resumes with intelligent suggestions and templates tailored to your industry.',
      icon: Sparkles,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Customizable Templates',
      description: 'Choose from a variety of modern, ATS-friendly templates to showcase your unique skills.',
      icon: Zap,
      gradient: 'from-blue-500 to-teal-500',
    },
    {
      title: 'Instant Download',
      description: 'Download your polished resume in PDF format with just one click, ready to impress employers.',
      icon: Download,
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const testimonials = [
    {
      name: 'Khushi Singh',
      role: 'Electrical Engineer',
      quote: 'AI_Career helped me craft a resume that landed me my dream job at a top tech company!',
      image: st1,
    },
    {
      name: 'Aman Gupta',
      role: 'Mern Stack Developer',
      quote: 'The templates were so easy to customize, and the AI suggestions made my resume stand out.',
      image: st2,
    },
    {
      name: 'Himanshu Gupta',
      role: 'Data Analyst',
      quote: 'I got multiple interview calls within days of using my new resume. Highly recommend!',
      image: st3,
    },
    {
      name: 'Shashi Pratap',
      role: 'Mechanical Engineer',
      quote: 'The user interface is intuitive, and the process was quick and hassle-free.',
      image: st4,
    },
    {
      name: 'Manish Dargan',
      role: 'Web Developer',
      quote: 'The AI_Career resume builder is a game-changer. It is fast, efficient, and the results are fantastic!',
      image: st5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 overflow-hidden">
      {/* Enhanced Background with Floating Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-2xl animate-float-reverse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-teal-500/20 to-green-500/20 rounded-full blur-3xl animate-float-slow-reverse"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-float"></div>
        
        {/* Medium floating shapes */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-2xl animate-float-medium"></div>
        <div className="absolute top-3/4 right-1/4 w-56 h-56 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-2xl animate-float-medium-reverse"></div>
        
        {/* Small floating particles */}
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-float-fast"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-r from-yellow-500/15 to-orange-500/15 rounded-full blur-xl animate-float-fast-reverse"></div>
        <div className="absolute top-2/3 left-1/5 w-40 h-40 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-xl animate-float-medium"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-1/2 right-10 w-20 h-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rotate-45 blur-sm animate-float-geometric"></div>
        <div className="absolute bottom-1/4 left-10 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rotate-12 blur-sm animate-float-geometric-reverse"></div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative flex items-center justify-center min-h-screen">
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="reveal-on-scroll opacity-0 transform translate-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-400  via-blue-500 to-cyan-400 text-transparent bg-clip-text mb-8 leading-tight">
              Build Your Dream Resume with AI_Career
              <span className="relative inline-block">
                
                <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 blur-xl rounded-lg"></div>
              </span>
            </h1>
          </div>
          <div className="reveal-on-scroll opacity-0 transform translate-y-8" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Create a professional, ATS-friendly resume in minutes with our AI-powered builder. Stand out and land your dream job today!
            </p>
          </div>
          <div className="reveal-on-scroll opacity-0 transform translate-y-8" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/resume"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-purple-500/25 hover:shadow-3xl hover:shadow-purple-500/40 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10">Start Building Now</span>
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 rounded-2xl blur-xl transition-all duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 px-6 relative">
        <div className="reveal-on-scroll opacity-0 transform translate-y-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-fuchsia-400  via-blue-500 to-cyan-400 text-transparent bg-clip-text">
            Why Choose AI_Career?
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="reveal-on-scroll opacity-0 transform translate-y-8 group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center transition-all duration-700 hover:scale-105 hover:shadow-3xl hover:shadow-purple-500/20 hover:bg-white/10 hover:border-white/20 h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 opacity-0 group-hover:opacity-100 rounded-3xl transition-all duration-700"></div>
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-100 mb-4 group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-24 px-6 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent relative">
        <div className="reveal-on-scroll opacity-0 transform translate-y-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-fuchsia-400  via-blue-500 to-cyan-400 text-transparent bg-clip-text">
            What Our Users Say
          </h2>
        </div>
        <div className="max-w-7xl mx-auto">
          {/* First row - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="reveal-on-scroll opacity-0 transform translate-y-8 group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center transition-all duration-700 hover:scale-105 hover:shadow-3xl hover:shadow-blue-500/20 hover:bg-white/10 hover:border-white/20 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-all duration-700"></div>
                  <div className="relative">
                    <div className="relative inline-block mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-24 h-24 rounded-full mx-auto border-4 border-white/20 group-hover:border-white/40 transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-white transition-colors duration-300">{testimonial.name}</h3>
                    <p className="text-purple-400 text-sm mb-6 font-semibold">{testimonial.role}</p>
                    <p className="text-gray-300 italic text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">"{testimonial.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Second row - 2 cards centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.slice(3, 5).map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="reveal-on-scroll opacity-0 transform translate-y-8 group"
                style={{ animationDelay: `${(index + 3) * 0.15}s` }}
              >
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center transition-all duration-700 hover:scale-105 hover:shadow-3xl hover:shadow-blue-500/20 hover:bg-white/10 hover:border-white/20 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-all duration-700"></div>
                  <div className="relative">
                    <div className="relative inline-block mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-24 h-24 rounded-full mx-auto border-4 border-white/20 group-hover:border-white/40 transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-white transition-colors duration-300">{testimonial.name}</h3>
                    <p className="text-purple-400 text-sm mb-6 font-semibold">{testimonial.role}</p>
                    <p className="text-gray-300 italic text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">"{testimonial.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chatbot Button */}
      <div className="fixed bottom-8 left-8 z-50">
        <Link 
          to="https://mindstep-bot.netlify.app/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-xl border border-blue-400/30 rounded-full p-5 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/40 hover:border-blue-400/60"
          aria-label="Open AI Career Coach Chatbot"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 rounded-full blur-lg transition-all duration-500"></div>
          <Bot className="w-8 h-8 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
        </Link>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -20px) rotate(1deg); }
          50% { transform: translate(-10px, -30px) rotate(-1deg); }
          75% { transform: translate(-20px, 10px) rotate(0.5deg); }
        }

        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-25px, 15px) rotate(-1deg); }
          50% { transform: translate(15px, 25px) rotate(1deg); }
          75% { transform: translate(25px, -10px) rotate(-0.5deg); }
        }

        @keyframes float-slow-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-15px, -25px) rotate(0.5deg); }
          66% { transform: translate(20px, 15px) rotate(-0.5deg); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, -20px) rotate(2deg); }
        }

        @keyframes float-medium-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-25px, 25px) rotate(-2deg); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(15px, -15px) rotate(1deg); }
          66% { transform: translate(-20px, 10px) rotate(-1deg); }
        }

        @keyframes float-fast-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-15px, -15px) rotate(3deg); }
        }

        @keyframes float-geometric {
          0%, 100% { transform: translate(0, 0) rotate(45deg); }
          25% { transform: translate(10px, -10px) rotate(50deg); }
          50% { transform: translate(-5px, -15px) rotate(40deg); }
          75% { transform: translate(-10px, 5px) rotate(55deg); }
        }

        @keyframes float-geometric-reverse {
          0%, 100% { transform: translate(0, 0) rotate(12deg); }
          50% { transform: translate(15px, 10px) rotate(20deg); }
        }

        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 15s ease-in-out infinite; }
        .animate-float-slow-reverse { animation: float-slow-reverse 25s ease-in-out infinite; }
        .animate-float { animation: float-slow 18s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 12s ease-in-out infinite; }
        .animate-float-medium-reverse { animation: float-medium-reverse 14s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 8s ease-in-out infinite; }
        .animate-float-fast-reverse { animation: float-fast-reverse 10s ease-in-out infinite; }
        .animate-float-geometric { animation: float-geometric 16s ease-in-out infinite; }
        .animate-float-geometric-reverse { animation: float-geometric-reverse 12s ease-in-out infinite; }
        
        .animate-reveal {
          animation: reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .reveal-on-scroll {
          transition-property: opacity, transform;
          transition-duration: 0.8s;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        html {
          scroll-behavior: smooth;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 60px -12px rgba(168, 85, 247, 0.15);
        }
      `}</style>
    </div>
  );
};

export default Home;
