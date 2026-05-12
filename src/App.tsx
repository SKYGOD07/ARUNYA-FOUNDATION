import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { AuthProvider } from './lib/AuthContext';

// Lazy load pages for better performance — each page is a separate chunk
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const CausesPage = lazy(() => import('./pages/CausesPage').then(module => ({ default: module.CausesPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(module => ({ default: module.GalleryPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(module => ({ default: module.BlogPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const CurriculumPage = lazy(() => import('./pages/CurriculumPage').then(module => ({ default: module.CurriculumPage })));
const VolunteerPage = lazy(() => import('./pages/VolunteerPage').then(module => ({ default: module.VolunteerPage })));

/* ── Minimal loading skeleton to prevent CLS ── */
const PageSkeleton = () => (
    <div style={{
        minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
        <div style={{
            width: 36, height: 36, border: '3px solid rgba(11,31,58,0.1)',
            borderTopColor: '#E6B325', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
);

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Suspense fallback={<PageSkeleton />}>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/causes" element={<CausesPage />} />
                            <Route path="/gallery" element={<GalleryPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/curriculum" element={<CurriculumPage />} />
                            <Route path="/volunteer" element={<VolunteerPage />} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
