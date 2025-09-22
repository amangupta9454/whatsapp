import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronDown, ChevronUp, Lightbulb, RefreshCw, Brain, Target, Clock, Zap, AlertCircle } from 'lucide-react';

const Interview = () => {
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    topic: '',
    numberOfQuestions: 5
  });
  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [explanations, setExplanations] = useState({});
  const [loadingExplanation, setLoadingExplanation] = useState({});
  const [error, setError] = useState('');

  const API_KEY = 'AIzaSyDr8QA71C688MJ3KXuUR32ZqWDvomajHoM';
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

  // Particle Background Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 80 : 150; // Responsive particle count

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.pulse = Math.random() * 0.02 + 0.01;
        this.pulseDirection = 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.opacity += this.pulse * this.pulseDirection;
        if (this.opacity >= 0.8 || this.opacity <= 0.1) {
          this.pulseDirection *= -1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 3
        );
        gradient.addColorStop(0, `rgba(99, 102, 241, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(99, 102, 241, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const connectionDistance = window.innerWidth < 768 ? 80 : 120;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = 0.15 * (1 - distance / connectionDistance);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfQuestions' ? parseInt(value) : value
    }));
    setError(''); // Clear error when user types
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const generateQuestions = async () => {
    setLoading(true);
    setError('');
    
    const prompt = `You are an elite technical interviewer and senior hiring manager with 15+ years of experience at top tech companies. Generate ${formData.numberOfQuestions} highly strategic and realistic interview questions for a ${formData.role} position with ${formData.experience} years of experience, specifically focusing on ${formData.topic}.

CRITICAL REQUIREMENTS:
1. Generate questions that mirror REAL interview scenarios from top-tier companies
2. Each question should test different cognitive skills: problem-solving, system thinking, communication, technical depth
3. Questions must be progressive in difficulty and cover various aspects of ${formData.topic}
4. Include behavioral, technical, and situational questions appropriate for the experience level
5. Ensure questions are current with 2024 industry standards and emerging trends

QUESTION CATEGORIES TO INCLUDE:
- Core technical concepts and fundamentals
- Problem-solving and algorithmic thinking
- System design and architecture (for senior roles)
- Real-world application scenarios
- Behavioral and leadership questions
- Industry-specific challenges and solutions

EXPERIENCE LEVEL CALIBRATION:
- Entry Level (0-1 years): Focus on fundamentals, basic problem-solving, learning ability
- Junior (2-3 years): Practical application, debugging, collaboration
- Mid Level (4-6 years): Complex problem-solving, mentoring, project leadership
- Senior (7-10 years): System design, technical leadership, strategic thinking
- Expert (10+ years): Architecture decisions, team building, innovation, industry vision

FORMAT REQUIREMENTS:
Return a JSON array where each object contains:
{
  "question": "A detailed, realistic interview question that could be asked at a top tech company",
  "shortAnswer": "A concise but comprehensive answer (3-4 sentences) that demonstrates the key points an interviewer wants to hear",
  "difficulty": "Easy/Medium/Hard",
  "category": "Technical/Behavioral/System Design/Problem Solving",
  "interviewTip": "A brief tip on how to approach this question effectively"
}

Return ONLY the JSON array, no additional text or formatting.`;

    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        });

        if (response.status === 429) {
          const waitTime = Math.pow(2, retryCount) * 1000; // Exponential backoff
          setError(`Rate limit reached. Retrying in ${waitTime/1000} seconds...`);
          await delay(waitTime);
          retryCount++;
          continue;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
          throw new Error('Invalid response structure from API');
        }

        const generatedText = data.candidates[0].content.parts[0].text;
        
        const cleanedText = generatedText.replace(/```json|```/g, '').trim();
        const parsedQuestions = JSON.parse(cleanedText);
        
        if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
          throw new Error('Invalid questions format received');
        }
        
        setQuestions(parsedQuestions);
        setShowForm(false);
        setExpandedQuestions({});
        setExplanations({});
        setError('');
        break;

      } catch (error) {
        console.error('Error generating questions:', error);
        retryCount++;
        
        if (retryCount >= maxRetries) {
          setError('Failed to generate questions after multiple attempts. Please check your internet connection and try again.');
        } else {
          setError(`Attempt ${retryCount} failed. Retrying...`);
          await delay(1000 * retryCount);
        }
      }
    }
    
    setLoading(false);
  };

  const toggleQuestion = (index) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getExplanation = async (index, question) => {
    if (explanations[index]) return;
    
    setLoadingExplanation(prev => ({ ...prev, [index]: true }));

    const prompt = `You are a world-class interview coach and technical mentor. Provide an exceptionally detailed and strategic explanation for this interview question: "${question}"

Your explanation should cover:

🎯 STRATEGIC ANALYSIS:
- Why interviewers ask this specific question
- What they're really evaluating beyond the surface answer
- How this question fits into the overall interview assessment

🧠 COGNITIVE FRAMEWORK:
- Step-by-step thought process for approaching the question
- Mental models and frameworks to structure your response
- Key principles to demonstrate your expertise

💡 EXPERT INSIGHTS:
- Industry best practices and current standards
- Common misconceptions and pitfalls to avoid
- Advanced concepts that separate good from great candidates

🗣️ COMMUNICATION STRATEGY:
- How to structure your answer for maximum impact
- Key phrases and terminology that demonstrate expertise
- How to handle follow-up questions confidently

📈 DIFFERENTIATION TACTICS:
- What makes an answer stand out from other candidates
- How to showcase unique value and perspective
- Ways to connect this topic to broader business impact

Provide actionable, specific advice that transforms an average candidate into someone who commands respect and gets the offer.`;

    let retryCount = 0;
    const maxRetries = 2;

    while (retryCount < maxRetries) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        });

        if (response.status === 429) {
          const waitTime = Math.pow(2, retryCount) * 1000;
          await delay(waitTime);
          retryCount++;
          continue;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
          throw new Error('Invalid response structure from API');
        }

        const explanation = data.candidates[0].content.parts[0].text;
        
        setExplanations(prev => ({
          ...prev,
          [index]: explanation
        }));
        break;

      } catch (error) {
        console.error('Error getting explanation:', error);
        retryCount++;
        
        if (retryCount >= maxRetries) {
          setExplanations(prev => ({
            ...prev,
            [index]: 'Failed to load explanation. Please try again later.'
          }));
        } else {
          await delay(1000 * retryCount);
        }
      }
    }
    
    setLoadingExplanation(prev => ({ ...prev, [index]: false }));
  };

  const startOver = () => {
    setShowForm(true);
    setQuestions([]);
    setExpandedQuestions({});
    setExplanations({});
    setError('');
    setFormData({
      role: '',
      experience: '',
      topic: '',
      numberOfQuestions: 5
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-900/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30';
      case 'hard': return 'text-red-400 bg-red-900/30';
      default: return 'text-blue-400 bg-blue-900/30';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'technical': return <Brain className="w-4 h-4" />;
      case 'behavioral': return <Target className="w-4 h-4" />;
      case 'system design': return <Zap className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-slate-900 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                Elite Interview Prep
              </h1>
              <p className="text-slate-400 text-sm sm:text-base">Master your next interview in 10 minutes</p>
              <div className="flex items-center justify-center space-x-2 sm:space-x-4 mt-4 text-xs sm:text-sm text-slate-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Quick Prep</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Expert Level</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg flex items-center space-x-2 text-red-300 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); generateQuestions(); }} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Role/Position</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400 text-sm sm:text-base"
                  placeholder="e.g., Senior Frontend Developer, ML Engineer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Years of Experience</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-white text-sm sm:text-base"
                  required
                >
                  <option value="">Select experience level</option>
                  <option value="0-1">0-1 years (Entry Level)</option>
                  <option value="2-3">2-3 years (Junior)</option>
                  <option value="4-6">4-6 years (Mid Level)</option>
                  <option value="7-10">7-10 years (Senior)</option>
                  <option value="10+">10+ years (Expert/Principal)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Focus Topic/Technology</label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400 text-sm sm:text-base"
                  placeholder="e.g., React & TypeScript, System Design, Python & AI"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Number of Questions</label>
                <select
                  name="numberOfQuestions"
                  value={formData.numberOfQuestions}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-white text-sm sm:text-base"
                >
                  <option value={3}>3 Questions (Quick Review)</option>
                  <option value={5}>5 Questions (Standard Prep)</option>
                  <option value={8}>8 Questions (Comprehensive)</option>
                  <option value={10}>10 Questions (Deep Dive)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span>Generating Elite Questions...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Generate Interview Questions</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="relative z-10 p-3 sm:p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Elite Interview Questions
                </h1>
                <p className="text-slate-400 text-sm sm:text-base">
                  {formData.role} • {formData.experience} years • {formData.topic}
                </p>
              </div>
              <button
                onClick={startOver}
                className="bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 border border-slate-600 text-sm sm:text-base self-start sm:self-auto"
              >
                <RefreshCw className="w-4 h-4" />
                <span>New Session</span>
              </button>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {questions.map((q, index) => (
              <div key={index} className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-xl overflow-hidden hover:border-slate-600/50 transition-all duration-200">
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div className="flex-1 pr-3 sm:pr-4">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-indigo-400 font-semibold text-sm sm:text-base">Q{index + 1}</span>
                        {q.difficulty && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(q.difficulty)}`}>
                            {q.difficulty}
                          </span>
                        )}
                        {q.category && (
                          <span className="flex items-center space-x-1 px-2 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">
                            {getCategoryIcon(q.category)}
                            <span className="hidden sm:inline">{q.category}</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                        {q.question}
                      </h3>
                      {q.interviewTip && (
                        <p className="text-xs sm:text-sm text-indigo-300 mt-2 italic">
                          💡 {q.interviewTip}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="text-indigo-400 hover:text-indigo-300 transition-colors p-1 flex-shrink-0"
                    >
                      {expandedQuestions[index] ? 
                        <ChevronUp className="w-5 h-5" /> : 
                        <ChevronDown className="w-5 h-5" />
                      }
                    </button>
                  </div>

                  {expandedQuestions[index] && (
                    <div className="border-t border-slate-700 pt-3 sm:pt-4 space-y-3 sm:space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-300 mb-2 flex items-center text-sm sm:text-base">
                          <Target className="w-4 h-4 mr-2 text-green-400" />
                          Strategic Answer:
                        </h4>
                        <p className="text-slate-300 bg-slate-700/30 p-3 sm:p-4 rounded-lg border border-slate-600/30 leading-relaxed text-sm sm:text-base">
                          {q.shortAnswer}
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={() => getExplanation(index, q.question)}
                          disabled={loadingExplanation[index]}
                          className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 hover:from-purple-600/30 hover:to-indigo-600/30 border border-purple-500/30 text-purple-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 hover:shadow-lg text-sm sm:text-base"
                        >
                          {loadingExplanation[index] ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Lightbulb className="w-4 h-4" />
                          )}
                          <span>
                            {loadingExplanation[index] ? 'Loading...' : 'Get Expert Analysis'}
                          </span>
                        </button>
                      </div>

                      {explanations[index] && (
                        <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/30 p-4 sm:p-6 rounded-lg">
                          <h4 className="font-medium text-indigo-300 mb-3 flex items-center text-sm sm:text-base">
                            <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            Expert Interview Analysis:
                          </h4>
                          <div className="text-slate-300 whitespace-pre-line leading-relaxed text-sm sm:text-base">
                            {explanations[index]}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8 text-slate-400">
            <p className="flex items-center justify-center space-x-2 text-sm sm:text-base">
              <Zap className="w-4 h-4" />
              <span>Click questions to reveal strategic answers and expert analysis</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
