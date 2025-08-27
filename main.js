// Replace with your actual Render backend URL
const BACKEND_URL = 'https://portfolio-xgqz.onrender.com';

// React components
const { useState, useEffect } = React;

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
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
    }, []);

    if (loading) return <div className="loader">Loading projects...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="projects-grid">
            {projects.map(project => (
                <div className="project-card" key={project._id || project.id || project.title}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
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

function App() {
    return (
        <div>
            <header>
                <h1>Kazuki Koto</h1>
                <p>Welcome to my portfolio!</p>
            </header>
            <main>
                <section id="projects">
                    <h2>Projects</h2>
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

// Mount React app
document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.getElementById('root'));
});
