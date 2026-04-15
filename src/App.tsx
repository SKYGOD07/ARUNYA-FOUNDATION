import { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import { MainLayout } from './components/layout/MainLayout';
import { AuthProvider } from './lib/AuthContext';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const CausesPage = lazy(() => import('./pages/CausesPage').then(module => ({ default: module.CausesPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(module => ({ default: module.GalleryPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(module => ({ default: module.BlogPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const CurriculumPage = lazy(() => import('./pages/CurriculumPage').then(module => ({ default: module.CurriculumPage })));

function App() {
    const [isLoading, setIsLoading] = useState(() => {
        const hasVisited = sessionStorage.getItem('hasVisited');
        return !hasVisited;
    });

    const handleLoadingComplete = () => {
        sessionStorage.setItem('hasVisited', 'true');
        setIsLoading(false);
    };

    return (
        <AuthProvider>
            <BrowserRouter>
                {isLoading ? (
                    <LoadingScreen onComplete={handleLoadingComplete} />
                ) : (
                    <Suspense fallback={null}>
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
                            </Route>
                        </Routes>
                    </Suspense>
                )}
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
