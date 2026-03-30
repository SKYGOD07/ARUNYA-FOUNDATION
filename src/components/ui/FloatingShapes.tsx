import { motion, useScroll, useTransform } from 'framer-motion';

export const FloatingShapes = () => {
    const { scrollYProgress } = useScroll();

    // Parallax values for scrolling
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const y5 = useTransform(scrollYProgress, [0, 1], [0, -150]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
        }}>
            {/* Shape 1 - Large Deep Blue Circle */}
            <motion.div style={{ position: 'absolute', top: '15%', left: '-5%', y: y1 }}>
                <motion.div
                    style={{
                        width: '30vw', height: '30vw', maxWidth: 400, maxHeight: 400,
                        borderRadius: '50%',
                        background: 'rgba(30, 58, 95, 0.12)',
                        border: '1px solid rgba(30, 58, 95, 0.2)',
                    }}
                    animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>

            {/* Shape 2 - Golden Donut / Ring (like the static one they liked) */}
            <motion.div style={{ position: 'absolute', top: '40%', right: '5%', y: y2 }}>
                <motion.div
                    style={{
                        width: '20vw', height: '20vw', maxWidth: 250, maxHeight: 250,
                        borderRadius: '50%',
                        border: '25px solid rgba(212, 168, 71, 0.25)',
                    }}
                    animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.05, 0.95, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />
            </motion.div>

            {/* Shape 3 - Solid Light Golden Circle */}
            <motion.div style={{ position: 'absolute', bottom: '15%', left: '10%', y: y3 }}>
                <motion.div
                    style={{
                        width: '15vw', height: '15vw', maxWidth: 180, maxHeight: 180,
                        borderRadius: '50%',
                        background: 'rgba(212, 168, 71, 0.20)',
                    }}
                    animate={{ x: [0, -30, 30, 0], y: [0, -40, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>

            {/* Shape 4 - Royal Blue Floating Pill / Capsule */}
            <motion.div style={{ position: 'absolute', top: '70%', right: '20%', y: y4 }}>
                <motion.div
                    style={{
                        width: '12vw', height: '25vw', maxWidth: 150, maxHeight: 300,
                        borderRadius: '999px',
                        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(37, 99, 235, 0.05))',
                        border: '1px solid rgba(37, 99, 235, 0.20)',
                        transformOrigin: 'center center',
                    }}
                    animate={{ rotate: [-20, 20, -20], x: [0, 40, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>

            {/* Shape 5 - Huge Faint White/Glass Circle off-screen right */}
            <motion.div style={{ position: 'absolute', top: '-10%', right: '-15%', y: y5 }}>
                <motion.div
                    style={{
                        width: '45vw', height: '45vw', maxWidth: 600, maxHeight: 600,
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.4)',
                        boxShadow: '0 8px 32px rgba(30, 58, 95, 0.03)',
                        backdropFilter: 'blur(2px)',
                    }}
                    animate={{ y: [0, 50, -20, 0], scale: [1, 1.02, 0.98, 1] }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>
        </div>
    );
};
