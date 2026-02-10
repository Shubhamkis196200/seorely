import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './index.css';

const Home = React.lazy(() => import('./pages/Home'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const ToolsPage = React.lazy(() => import('./pages/ToolsPage'));
const GuidesPage = React.lazy(() => import('./pages/GuidesPage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const ToolDetail = React.lazy(() => import('./pages/ToolDetail'));

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/:slug" element={<ToolDetail />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
