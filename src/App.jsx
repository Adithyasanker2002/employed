import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import Add from './Add.jsx'; 
import Edit from './Edit.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} /> 
        <Route path="/" element={<Home />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;