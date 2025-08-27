// Replace with your actual Render backend URL
const BACKEND_URL = 'https://portfolio-xgqz.onrender.com';

// React components
const { useState, useEffect } = React;

// Placeholder images for demo projects
const PLACEHOLDER_IMAGES = [
    "https://source.unsplash.com/400x200/?technology,code",
    "https://source.unsplash.com/400x200/?app,design",
    "https://source.unsplash.com/400x200/?website,development",
    "https://source.unsplash.com/400x200/?software,project",
    "https://source.unsplash.com/400x200/?react,frontend",
    "https://source.unsplash.com/400x200/?backend,api",
    "https://source.unsplash.com/400x200/?portfolio,web",
    "https://source.unsplash.com/400x200/?javascript,programming",
    "https://source.unsplash.com/400x200/?css,html",
    "https://source.unsplash.com/400x200/?database,cloud"
];

// Generate lots of placeholder projects
function getPlaceholderProjects(count = 12) {
    return Array.from({ length: count }).map((_, i) => ({
        id: `placeholder-${i}`,
        title: `Project Demo ${i + 1}`,
        description: "This is a placeholder project description. It showcases the project's features and technologies used.",
        link: "#",
        image: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
        tags: ["React", "API", "Demo"]
    }));
}

function ProjectList({ showImages = false, projects: propProjects }) {
    const [projects, setProjects] = useState(propProjects || []);
    const [loading, setLoading] = useState(!propProjects);
    const [error, setError] = useState('');

    useEffect(() => {
        if (propProjects) return;
        fetch(`${BACKEND_URL}/api/projects`)
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load projects.');
                setLoading(false);
            });
    }, [propProjects]);

    if (loading) return <div className="loader">Loading projects...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="projects-grid">
            {projects.map((project, idx) => (
                <div
                    className="project-card"
                    key={project._id || project.id || project.title}
                    style={{ animationDelay: `${idx * 0.07}s` }}
                >
                    {showImages && project.image && (
                        <img src={project.image} alt={project.title} />
                    )}
                    <h3>{project.title}</h3>
                    <div className="project-meta">{project.meta}</div>
                    <p>{project.description}</p>
                    {project.tags && (
                        <div className="project-tags">
                            {project.tags.map((tag, i) => (
                                <span className="project-tag" key={i}>{tag}</span>
                            ))}
                        </div>
                    )}
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            View Project
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
}

function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [sending, setSending] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setSending(true);
        setStatus('');
        fetch(`${BACKEND_URL}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(res => {
                setStatus(res.ok ? 'Message sent!' : 'Failed to send message.');
                setForm({ name: '', email: '', message: '' });
                setSending(false);
            })
            .catch(() => {
                setStatus('Failed to send message.');
                setSending(false);
            });
    };

    return (
        <form id="contact-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
            />
            <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
            />
            <button type="submit" disabled={sending}>
                {sending ? 'Sending...' : 'Send'}
            </button>
            {status && <div id="contact-status">{status}</div>}
        </form>
    );
}

function HomePage({ onNavigate }) {
    return (
        <div>
            <header>
                <h1>Kazuki Koto</h1>
                <p>Welcome to my portfolio!</p>
            </header>
            <main>
                <section id="projects">
                    <h2>
                        Projects
                        <button
                            style={{
                                marginLeft: 16,
                                fontSize: "1rem",
                                background: "none",
                                border: "none",
                                color: "#3358e6",
                                cursor: "pointer",
                                textDecoration: "underline"
                            }}
                            onClick={() => onNavigate("projects")}
                        >
                            View All Projects →
                        </button>
                    </h2>
                    <ProjectList />
                </section>
                <section id="contact">
                    <h2>Contact Me</h2>
                    <ContactForm />
                </section>
            </main>
        </div>
    );
}

// Dedicated template for the projects page with hardcoded placeholder projects
function ProjectsPage({ onNavigate }) {
    const placeholderProjects = [
        {
            id: "p1",
            title: "Weather Dashboard",
            description: "A responsive dashboard that displays real-time weather data for any city using OpenWeatherMap API.",
            image: "https://source.unsplash.com/400x200/?weather,clouds",
            tags: ["React", "API", "Weather"],
            link: "#"
        },
        {
            id: "p2",
            title: "Task Manager Pro",
            description: "A productivity app to manage daily tasks, set reminders, and track progress with beautiful charts.",
            image: "https://source.unsplash.com/400x200/?tasks,productivity",
            tags: ["React", "Charts", "Productivity"],
            link: "#"
        },
        {
            id: "p3",
            title: "Portfolio Website",
            description: "A personal portfolio template built with React and styled-components, featuring smooth animations.",
            image: "https://source.unsplash.com/400x200/?portfolio,website",
            tags: ["React", "Portfolio", "CSS"],
            link: "#"
        },
        {
            id: "p4",
            title: "Recipe Finder",
            description: "Search for recipes by ingredients and dietary preferences. Includes animated transitions and modals.",
            image: "https://source.unsplash.com/400x200/?food,recipe",
            tags: ["React", "API", "Food"],
            link: "#"
        },
        {
            id: "p5",
            title: "Expense Tracker",
            description: "Track your expenses and visualize spending habits with interactive graphs and filters.",
            image: "https://source.unsplash.com/400x200/?finance,money",
            tags: ["React", "Finance", "Charts"],
            link: "#"
        },
        {
            id: "p6",
            title: "Blog Platform",
            description: "A modern blog platform with markdown support, comments, and user authentication.",
            image: "https://source.unsplash.com/400x200/?blog,writing",
            tags: ["React", "Blog", "Auth"],
            link: "#"
        },
        {
            id: "p7",
            title: "E-commerce Store",
            description: "A demo e-commerce store with product listings, cart, and checkout animations.",
            image: "https://source.unsplash.com/400x200/?ecommerce,shop",
            tags: ["React", "E-commerce", "UI"],
            link: "#"
        },
        {
            id: "p8",
            title: "Chat Application",
            description: "A real-time chat app with WebSocket integration and animated message bubbles.",
            image: "https://source.unsplash.com/400x200/?chat,communication",
            tags: ["React", "WebSocket", "Chat"],
            link: "#"
        },
        {
            id: "p9",
            title: "Fitness Tracker",
            description: "Log workouts, set goals, and monitor progress with animated charts and stats.",
            image: "https://source.unsplash.com/400x200/?fitness,workout",
            tags: ["React", "Fitness", "Charts"],
            link: "#"
        },
        {
            id: "p10",
            title: "Photo Gallery",
            description: "A responsive photo gallery with lazy loading and animated lightbox previews.",
            image: "https://source.unsplash.com/400x200/?gallery,photos",
            tags: ["React", "Gallery", "Animation"],
            link: "#"
        },
        {
            id: "p11",
            title: "Music Player",
            description: "A sleek music player with playlist support and animated visualizations.",
            image: "https://source.unsplash.com/400x200/?music,player",
            tags: ["React", "Music", "Audio"],
            link: "#"
        },
        {
            id: "p12",
            title: "Travel Journal",
            description: "Share travel experiences with maps, photos, and animated story sections.",
            image: "https://source.unsplash.com/400x200/?travel,journal",
            tags: ["React", "Travel", "Maps"],
            link: "#"
        }
    ];

    return (
        <div>
            <div className="projects-page-header">
                <h1>All Projects</h1>
                <p>Explore a variety of projects, demos, and experiments.</p>
                <button
                    style={{
                        marginTop: 16,
                        fontSize: "1rem",
                        background: "#3358e6",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "0.5rem 1.2rem",
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(51,88,230,0.08)"
                    }}
                    onClick={() => onNavigate("home")}
                >
                    ← Back to Home
                </button>
            </div>
            <main className="projects-page-main">
                <div className="projects-grid">
                    {placeholderProjects.map((project, idx) => (
                        <div
                            className="project-card"
                            key={project.id}
                            style={{ animationDelay: `${idx * 0.07}s` }}
                        >
                            <img src={project.image} alt={project.title} />
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="project-tags">
                                {project.tags.map((tag, i) => (
                                    <span className="project-tag" key={i}>{tag}</span>
                                ))}
                            </div>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                View Project
                            </a>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

function App() {
    const [page, setPage] = useState("home");
    return page === "projects"
        ? <ProjectsPage onNavigate={setPage} />
        : <HomePage onNavigate={setPage} />;
}

// Mount React app
document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.getElementById('root'));
});
