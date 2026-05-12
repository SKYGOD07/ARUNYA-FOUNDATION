import { PageTransition } from '../components/ui/PageTransition';
import { Heart, ExternalLink } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const FOUNDING_100 = {
    milaapUrl: 'https://milaap.org/fundraisers/support-underprivileged-communities-14?utm_medium=whatsapp_status_poster&utm_source=app',
    instagramUrl: 'https://www.instagram.com/founding100_arunyaa?igsh=eDRqaDlkY2ZmYmN5',
};

export const CausesPage = () => {
    return (
        <PageTransition className="pt-[140px] pb-16">
            <section id="causes" style={{ padding: '2rem', maxWidth: 1400, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <motion.h2 {...fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0B1F3A', fontFamily: 'Poppins, Inter, sans-serif', marginBottom: '0.5rem' }}>
                        Our Programs
                    </motion.h2>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #E6B325, #C99A1E)', borderRadius: 2, margin: '0.75rem auto 1.25rem' }} />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                        Empowering underprivileged communities through impactful educational initiatives and sustainable development.
                    </motion.p>
                </div>

                {/* Founding 100 — Featured Card */}
                <motion.div
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.12 }}
                    style={{
                        maxWidth: 640, margin: '0 auto',
                        background: 'white', borderRadius: 24,
                        boxShadow: '0 2px 8px rgba(11,31,58,0.04), 0 8px 32px rgba(11,31,58,0.07)',
                        overflow: 'hidden',
                        border: '2px solid rgba(230,179,37,0.2)',
                        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s, border-color 0.3s',
                    }}
                    whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(230,179,37,0.15), 0 8px 24px rgba(11,31,58,0.08)' }}
                >
                    {/* Gold gradient banner */}
                    <div style={{
                        background: 'linear-gradient(135deg, #E6B325 0%, #C99A1E 100%)',
                        padding: '2rem 2rem 1.75rem',
                        position: 'relative', overflow: 'hidden',
                    }}>
                        <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                background: 'rgba(255,255,255,0.25)', borderRadius: 999,
                                padding: '0.3rem 0.9rem', marginBottom: '0.75rem',
                            }}>
                                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0B1F3A', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Flagship Initiative</span>
                            </div>
                            <h3 style={{
                                color: '#0B1F3A', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900,
                                fontFamily: 'Poppins, Inter, sans-serif', margin: 0,
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                            }}>
                                <Heart size={28} fill="#0B1F3A" strokeWidth={0} /> Founding 100
                            </h3>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: 1.75, margin: 0 }}>
                            Support impactful educational initiatives and community development through Founding 100. Your contribution directly empowers underprivileged communities with access to quality education and essential resources for a brighter future.
                        </p>

                        {/* Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                            {[
                                { value: '100', label: 'Founding Members' },
                                { value: '₹500', label: 'Monthly Contribution' },
                                { value: '∞', label: 'Impact Created' },
                            ].map((s, i) => (
                                <div key={i} style={{
                                    background: '#f8fafc', borderRadius: 16, padding: '1rem',
                                    textAlign: 'center', border: '1px solid rgba(11,31,58,0.06)',
                                }}>
                                    <div style={{ fontWeight: 900, fontSize: '1.3rem', color: '#0B1F3A', fontFamily: 'Poppins, Inter, sans-serif' }}>{s.value}</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.72rem', marginTop: '0.15rem' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <a
                                href={FOUNDING_100.milaapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: 14,
                                    background: 'linear-gradient(135deg, #E6B325 0%, #C99A1E 100%)',
                                    color: '#0B1F3A', fontWeight: 800, fontSize: '1rem',
                                    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                                    textDecoration: 'none', textAlign: 'center',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    boxShadow: '0 4px 16px rgba(230,179,37,0.3)',
                                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(230,179,37,0.45)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(230,179,37,0.3)';
                                }}
                            >
                                <ExternalLink size={18} /> Support Founding 100
                            </a>

                            <a
                                href={FOUNDING_100.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: '100%', padding: '0.85rem', borderRadius: 14,
                                    background: 'rgba(11,31,58,0.04)',
                                    border: '1px solid rgba(11,31,58,0.1)',
                                    color: '#0B1F3A', fontWeight: 600, fontSize: '0.9rem',
                                    cursor: 'pointer', fontFamily: 'inherit',
                                    textDecoration: 'none', textAlign: 'center',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    transition: 'all 0.25s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)';
                                    e.currentTarget.style.color = 'white';
                                    e.currentTarget.style.borderColor = 'transparent';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(11,31,58,0.04)';
                                    e.currentTarget.style.color = '#0B1F3A';
                                    e.currentTarget.style.borderColor = 'rgba(11,31,58,0.1)';
                                }}
                            >
                                <FaInstagram size={18} /> Follow Founding 100 on Instagram
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>
        </PageTransition>
    );
};
