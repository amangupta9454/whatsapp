import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Contact from './Components/Contact';
import CareerPath from './Components/Carrerpath';
import ResumeEmbed from './Components/ResumeEmbed';
import Footer from './Components/Footer';
import SkillAnalyzer from './Components/SkillAnalyzer';
import Assesment from './Components/Assesment';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import VerifyOtp from './VerifyOtp';

// Layout component to include Navbar and Footer
const LayoutWithFooter = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

// Layout component with only Navbar (no Footer)
const LayoutWithoutFooter = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Footer */}
        <Route path="/" element={<LayoutWithFooter><Home /></LayoutWithFooter>} />
        <Route path="/contact" element={<LayoutWithFooter><Contact /></LayoutWithFooter>} />
        <Route path="/skillanalyzer" element={<LayoutWithFooter><SkillAnalyzer /></LayoutWithFooter>} />

        {/* Routes without Footer */}
       
        <Route path="/career" element={<LayoutWithoutFooter><CareerPath /></LayoutWithoutFooter>} />
        
        <Route path="/resume" element={<LayoutWithoutFooter><ResumeEmbed /></LayoutWithoutFooter>} />
       
        <Route path="/assesment" element={<LayoutWithoutFooter><Assesment /></LayoutWithoutFooter>} />
        <Route path="/register" element={<LayoutWithoutFooter><Register /></LayoutWithoutFooter>} />
        <Route path="/login" element={<LayoutWithoutFooter><Login /></LayoutWithoutFooter>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify" element={<VerifyOtp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;