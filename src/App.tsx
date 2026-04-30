import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import TestsPage from './pages/TestsPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/tests" element={<TestsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
