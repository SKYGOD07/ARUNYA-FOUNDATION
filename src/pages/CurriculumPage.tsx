import { PageTransition } from '../components/ui/PageTransition';
import { motion } from 'framer-motion';
import {
    BookOpen, Smile, Library, GraduationCap, Target, Heart,
    Lightbulb, Gamepad2, Palette, ShieldCheck, Clock, Brain,
    Sparkles, TreePine, HandHeart, Users, Megaphone
} from 'lucide-react';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

/* ── Curriculum Data from PDF ──────────────────────── */

const groups = [
    {
        name: 'Group A',
        ages: '4 – 6 Years',
        type: 'Early Learners',
        icon: <Smile size={28} />,
        color: '#2563eb',
        focus: 'Basic alphabet, varnamala, counting, and learning through fun activities and visuals',
        subjects: [
            { name: 'English', topics: 'Alphabet (A–Z), Phonics, Letter recognition, Basic vocabulary (body parts, colors, family members)', methods: 'Songs, rhymes, storytelling, flashcards, real objects; learning through play and repetition' },
            { name: 'Hindi', topics: 'Varnamala (अ–ज्ञ), Pronunciation, Simple words (माँ, पानी, घर)', methods: 'Oral repetition, storytelling, local language connection, picture charts' },
            { name: 'Mathematics', topics: 'Counting (1–100), Number recognition, Shapes (circle, square), Big–Small, More–Less', methods: 'Stones, leaves, sticks; draw on ground; activity-based sorting and matching' },
            { name: 'EVS', topics: 'Myself, Family, Cleanliness, Good touch–Bad touch (basic awareness)', methods: 'Conversation method, storytelling, role play' },
            { name: 'Activity', topics: 'Drawing, Coloring, Rhymes and Games', methods: 'Free drawing, Action games and group participation' },
        ],
    },
    {
        name: 'Group B',
        ages: '7 – 11 Years',
        type: 'Primary Learners',
        icon: <Library size={28} />,
        color: '#d4a847',
        focus: 'Strengthening reading, writing, basic math, phonics, and simple communication skills',
        subjects: [
            { name: 'English', topics: 'Alphabet with usage, Word formation, Simple sentences, Reading small paragraphs, Daily-use words (eat, go, come)', methods: 'Picture reading, word cards, sentence-making games, reading aloud' },
            { name: 'Hindi', topics: 'Varnamala with examples, Reading words/sentences, Basic writing practice', methods: 'Dictation, blackboard practice, peer reading' },
            { name: 'Mathematics', topics: 'Counting, Number spelling, Tables (2–10), Basic operations, Time (clock), Money concepts', methods: 'Real-life examples (buying/selling), group recitation, number games' },
            { name: 'EVS', topics: 'Environment, Animals, Fruits and Plants names, Clean surroundings and Personal hygiene', methods: 'Nature walk, discussion, observation-based learning' },
            { name: 'Life Skills', topics: 'Communication basics, Following instructions, Teamwork, Group activities, role play, storytelling', methods: 'Group activities, role play, storytelling' },
            { name: 'Activities', topics: 'Drawing, Story Telling and Games', methods: 'Drawing of National Flag, House, Tree etc; Memory Games, Action Games, Quiz-Based Learning' },
        ],
    },
    {
        name: 'Group C',
        ages: '12 – 15 Years',
        type: 'Secondary Learners',
        icon: <GraduationCap size={28} />,
        color: '#2563eb',
        focus: 'Vocabulary building, reading comprehension, basic operations in math, and spoken English skills',
        subjects: [
            { name: 'English', topics: 'Vocabulary, Spellings with meanings, Basic grammar, Spoken English, Paragraph writing, Self-introduction', methods: 'Conversation practice, role play (market/school), peer speaking, word-of-the-day' },
            { name: 'Hindi', topics: 'Reading comprehension, Sentence formation, Short paragraph writing', methods: 'Reading practice, explanation, group discussion' },
            { name: 'Mathematics', topics: 'Addition, Subtraction, Multiplication, Division, Word problems, Practical math (money, measurement)', methods: 'Practice exercises, real-life examples, group problem-solving' },
            { name: 'EVS', topics: 'Basic health, hygiene, surroundings, community awareness, basic rights and duties', methods: 'Discussion, storytelling, case-based examples' },
            { name: 'Life Skills', topics: 'Decision-making, Confidence building, Respect, Gender sensitivity (basic level)', methods: 'Group discussion, situational activities' },
            { name: 'Activities', topics: 'Group Discussions, Games, Creative tasks', methods: 'Debate, Storytelling, Teamwork Challenges' },
        ],
    },
];

const learningObjectives = [
    { icon: <BookOpen size={24} />, title: 'Build Basic Literacy & Numeracy', desc: 'Develop foundational skills in reading, writing, and arithmetic through simple, practical, and activity-based methods.' },
    { icon: <Megaphone size={24} />, title: 'Enhance Confidence & Communication', desc: 'Encourage children to express themselves freely, participate in discussions, and improve their speaking and listening skills.' },
    { icon: <Heart size={24} />, title: 'Inculcate Good Habits & Moral Values', desc: 'Promote discipline, cleanliness, respect, empathy, and responsible behavior in daily life.' },
    { icon: <Gamepad2 size={24} />, title: 'Make Learning Interactive & Enjoyable', desc: 'Use games, storytelling, and hands-on activities to create a fun and engaging learning environment.' },
    { icon: <Users size={24} />, title: 'Ensure Accessibility for All', desc: 'Provide inclusive and easy-to-understand education that caters to diverse learning needs and backgrounds.' },
];

const sessionSteps = [
    { step: 'Step 1', title: 'Warm-Up', duration: '5–10 minutes', desc: 'Quick questions based on previous learning. Short fun activity or game to engage students.', icon: <Sparkles size={20} /> },
    { step: 'Step 2', title: 'Revision', duration: 'Important Component', desc: 'Brief revision of the previous session. Reinforcement of concepts already taught.', icon: <Brain size={20} /> },
    { step: 'Step 3', title: 'Academic Learning', duration: 'Core Session', desc: 'Age-appropriate academic content — alphabet, phonics, counting, vocabulary, math operations, and more.', icon: <BookOpen size={20} /> },
];

const valueEducation = [
    { title: 'Cleanliness & Hygiene', desc: 'Daily habits like handwashing, personal cleanliness, and keeping surroundings clean.', icon: <ShieldCheck size={20} /> },
    { title: 'Respect for Others', desc: 'Being polite, listening to elders/peers, and valuing diversity.', icon: <HandHeart size={20} /> },
    { title: 'Personal Safety Awareness', desc: 'Understanding safe vs unsafe situations, basic self-protection, and asking for help.', icon: <Target size={20} /> },
    { title: 'Sharing & Kindness', desc: 'Encouraging empathy, helping others, and working cooperatively.', icon: <Heart size={20} /> },
    { title: 'Discipline & Responsibility', desc: 'Following rules, completing tasks, and taking ownership of actions.', icon: <Clock size={20} /> },
];

export const CurriculumPage = () => {
    return (
        <PageTransition className="pb-16">
            <section style={{ padding: '2rem', position: 'relative', zIndex: 10 }}>
                {/* ═══════════════ HEADER ═══════════════ */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2 {...fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>
                        Teaching Syllabus & Learning Framework
                    </motion.h2>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '1rem auto' }} />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} style={{ color: '#6b7280', fontSize: '1.05rem', maxWidth: 750, margin: '0 auto', lineHeight: 1.8 }}>
                        The Arunya Foundation aims to provide foundational education to children through engaging, inclusive, and activity-based learning methods. The program focuses on basic literacy, numeracy, life skills, and value-based education, ensuring holistic development.
                    </motion.p>
                </div>

                {/* ═══════════════ LEARNING OBJECTIVES ═══════════════ */}
                <div style={{ maxWidth: 1200, margin: '0 auto 5rem' }}>
                    <motion.h3 {...fadeUp} style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '0.75rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Learning Objectives</motion.h3>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '0 auto 2.5rem' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {learningObjectives.map((obj, idx) => (
                            <motion.div key={idx} {...fadeUp} transition={{ ...fadeUp.transition, delay: idx * 0.08 }} style={{
                                background: 'white', borderRadius: 20, padding: '1.75rem',
                                border: '1px solid rgba(30,58,95,0.08)',
                                boxShadow: '0 4px 24px rgba(30,58,95,0.06)',
                            }}>
                                <div style={{ width: 48, height: 48, borderRadius: '50%', background: idx % 2 === 0 ? 'linear-gradient(135deg, #2563eb, #1e3a5f)' : 'linear-gradient(135deg, #d4a847, #b8922e)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {obj.icon}
                                </div>
                                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e3a5f', marginBottom: '0.5rem', fontFamily: 'Outfit, Inter, sans-serif' }}>{obj.title}</h4>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>{obj.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ═══════════════ CURRICULUM STRUCTURE ═══════════════ */}
                <div style={{ maxWidth: 1200, margin: '0 auto 5rem' }}>
                    <motion.h3 {...fadeUp} style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '0.75rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Curriculum Structure</motion.h3>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '0 auto 1rem' }} />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.95rem', maxWidth: 600, margin: '0 auto 3rem', lineHeight: 1.7 }}>
                        The curriculum is designed for three age groups, each with tailored subjects, topics, and teaching methods.
                    </motion.p>

                    {/* Group Overview Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        {groups.map((group, idx) => (
                            <motion.div key={idx} {...fadeUp} transition={{ ...fadeUp.transition, delay: idx * 0.1 }} style={{
                                background: 'white', borderRadius: 24, padding: '2rem',
                                border: '1px solid rgba(30,58,95,0.08)',
                                boxShadow: '0 4px 24px rgba(30,58,95,0.06)',
                                position: 'relative', overflow: 'hidden',
                            }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: group.color === '#d4a847' ? 'linear-gradient(135deg, #d4a847, #b8922e)' : 'linear-gradient(135deg, #2563eb, #1e3a5f)' }} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: group.color === '#d4a847' ? 'linear-gradient(135deg, #d4a847, #b8922e)' : 'linear-gradient(135deg, #2563eb, #1e3a5f)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {group.icon}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif', lineHeight: 1.2 }}>{group.name}</h4>
                                        <span style={{ color: group.color, fontWeight: 700, fontSize: '0.85rem' }}>{group.ages} · {group.type}</span>
                                    </div>
                                </div>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>{group.focus}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Detailed Subject Tables Per Group */}
                    {groups.map((group, gIdx) => (
                        <motion.div key={gIdx} {...fadeUp} transition={{ ...fadeUp.transition, delay: gIdx * 0.1 }} style={{
                            background: 'white', borderRadius: 24, padding: '2rem',
                            border: '1px solid rgba(30,58,95,0.08)',
                            boxShadow: '0 4px 24px rgba(30,58,95,0.06)', marginBottom: '2rem',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: group.color === '#d4a847' ? 'linear-gradient(135deg, #d4a847, #b8922e)' : 'linear-gradient(135deg, #2563eb, #1e3a5f)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>
                                    {group.icon}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>{group.name} — {group.type}</h4>
                                    <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>{group.ages}</span>
                                </div>
                            </div>

                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ background: group.color === '#d4a847' ? 'linear-gradient(135deg, rgba(212,168,71,0.1), rgba(184,146,46,0.05))' : 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(30,58,95,0.04))' }}>
                                            <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: '#1e3a5f', fontWeight: 700, borderBottom: '2px solid rgba(30,58,95,0.1)', width: '15%' }}>Subject</th>
                                            <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: '#1e3a5f', fontWeight: 700, borderBottom: '2px solid rgba(30,58,95,0.1)', width: '45%' }}>Topics Covered</th>
                                            <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: '#1e3a5f', fontWeight: 700, borderBottom: '2px solid rgba(30,58,95,0.1)', width: '40%' }}>Teaching Methods</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {group.subjects.map((sub, sIdx) => (
                                            <tr key={sIdx} style={{ borderBottom: '1px solid rgba(30,58,95,0.06)', background: sIdx % 2 === 1 ? 'rgba(30,58,95,0.015)' : 'transparent' }}>
                                                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#1e3a5f', verticalAlign: 'top' }}>{sub.name}</td>
                                                <td style={{ padding: '0.85rem 1rem', color: '#4b5563', lineHeight: 1.6, verticalAlign: 'top' }}>{sub.topics}</td>
                                                <td style={{ padding: '0.85rem 1rem', color: '#6b7280', lineHeight: 1.6, fontStyle: 'italic', verticalAlign: 'top' }}>{sub.methods}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ═══════════════ SESSION STRUCTURE ═══════════════ */}
                <div style={{ maxWidth: 1000, margin: '0 auto 5rem' }}>
                    <motion.h3 {...fadeUp} style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '0.75rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Session Structure</motion.h3>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '0 auto 1rem' }} />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.95rem', maxWidth: 650, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                        Each session follows a structured format with 30 minutes of volunteer preparation before beginning the session with children.
                    </motion.p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {sessionSteps.map((s, idx) => (
                            <motion.div key={idx} {...fadeUp} transition={{ ...fadeUp.transition, delay: idx * 0.1 }} style={{
                                background: 'white', borderRadius: 20, padding: '1.75rem',
                                border: '1px solid rgba(30,58,95,0.08)',
                                boxShadow: '0 4px 24px rgba(30,58,95,0.06)',
                                position: 'relative',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #1e3a5f)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {s.icon}
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 1, color: '#d4a847' }}>{s.step}</span>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif', lineHeight: 1.2 }}>{s.title}</h4>
                                    </div>
                                </div>
                                <span style={{ display: 'inline-block', background: 'rgba(37,99,235,0.08)', color: '#2563eb', padding: '0.25rem 0.75rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>{s.duration}</span>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ═══════════════ TEACHING METHODOLOGY ═══════════════ */}
                <div style={{ maxWidth: 1000, margin: '0 auto 5rem' }}>
                    <motion.h3 {...fadeUp} style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '0.75rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Teaching Methodology</motion.h3>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '0 auto 2.5rem' }} />

                    <motion.div {...fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <div style={{ background: 'white', borderRadius: 20, padding: '2rem', border: '1px solid rgba(30,58,95,0.08)', boxShadow: '0 4px 24px rgba(30,58,95,0.06)' }}>
                            <h4 style={{ color: '#1e3a5f', marginBottom: '1rem', borderBottom: '2px solid #d4a847', paddingBottom: '0.5rem', display: 'inline-block', fontFamily: 'Outfit, Inter, sans-serif' }}>Key Methods</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#4b5563', lineHeight: 2 }}>
                                <li style={{ padding: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#d4a847' }}>✔</span> Shapes and visual aids to teach numbers and letters</li>
                                <li style={{ padding: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#d4a847' }}>✔</span> Chart papers and illustrations</li>
                                <li style={{ padding: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#d4a847' }}>✔</span> Real-life examples for better understanding</li>
                                <li style={{ padding: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#d4a847' }}>✔</span> Encouraging participation and hands-on learning</li>
                            </ul>
                        </div>

                        <div style={{ background: 'white', borderRadius: 20, padding: '2rem', border: '1px solid rgba(30,58,95,0.08)', boxShadow: '0 4px 24px rgba(30,58,95,0.06)' }}>
                            <h4 style={{ color: '#1e3a5f', marginBottom: '1rem', borderBottom: '2px solid #2563eb', paddingBottom: '0.5rem', display: 'inline-block', fontFamily: 'Outfit, Inter, sans-serif' }}>Activity-Based Learning</h4>
                            <div style={{ marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 1, color: '#9ca3af' }}>Creative Activities</span>
                                <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '0.25rem' }}>Drawing (House, School, Flag, etc.), Coloring and Craft</p>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 1, color: '#9ca3af' }}>Interactive Activities</span>
                                <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '0.25rem' }}>Storytelling sessions, Role-playing</p>
                            </div>
                            <div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 1, color: '#9ca3af' }}>Educational Games</span>
                                <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '0.25rem' }}>Jump and Count, Action Words Game, Memory Game, Pass the Ball</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ═══════════════ VALUE EDUCATION ═══════════════ */}
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <motion.h3 {...fadeUp} style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '0.75rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Value Education & Life Skills</motion.h3>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '0 auto 1rem' }} />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.95rem', maxWidth: 600, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                        Students are guided to develop essential life values that support their overall growth and positive behavior.
                    </motion.p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                        {valueEducation.map((v, idx) => (
                            <motion.div key={idx} {...fadeUp} transition={{ ...fadeUp.transition, delay: idx * 0.08 }} style={{
                                background: 'linear-gradient(135deg, #f0f7ff, #fefefe)', borderRadius: 16, padding: '1.5rem',
                                border: '1px solid rgba(37,99,235,0.08)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #d4a847, #b8922e)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {v.icon}
                                    </div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>{v.title}</h4>
                                </div>
                                <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6 }}>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </section>
        </PageTransition>
    );
};
