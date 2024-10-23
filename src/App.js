import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Navbar />
          {/* Rest of your app components */}
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
