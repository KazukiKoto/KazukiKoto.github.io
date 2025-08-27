// Replace with your actual Render backend URL
const BACKEND_URL = 'https://portfolio-xgqz.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    setupContactForm();
});

function loadProjects() {
    fetch(`${BACKEND_URL}/api/projects`)
        .then(res => res.json())
        .then(projects => {
            const list = document.getElementById('projects-list');
            list.innerHTML = '';
            projects.forEach(project => {
                const div = document.createElement('div');
                div.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
                list.appendChild(div);
            });
        })
        .catch(() => {
            document.getElementById('projects-list').innerText = 'Failed to load projects.';
        });
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('contact-status');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };
        fetch(`${BACKEND_URL}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.ok ? 'Message sent!' : 'Failed to send message.')
        .then(msg => status.innerText = msg)
        .catch(() => status.innerText = 'Failed to send message.');
        form.reset();
    });
}
