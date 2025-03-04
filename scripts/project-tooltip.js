document.addEventListener('DOMContentLoaded', () => {
    const bentoItems = document.querySelectorAll('.bento-item');
    const tooltip = document.createElement('div');
    tooltip.className = 'project-tooltip';
    document.body.appendChild(tooltip);

    const projectDescriptions = {
        'project1': 'Enso is a PyQt6-based AI learning assistant that enhances comprehension using the Feynman Technique. It processes PDF, DOCX, and TXT files, leveraging NLP for interactive learning. Powered by the Mistral 7B model via Ollama, it uses LangChain for AI workflows, FAISS for context retrieval, and HuggingFace embeddings for intelligent, real-time responses. With a modern UI, rich text formatting, and Socratic questioning, Enso fosters deeper understanding through dynamic, guided learning.',
        'project2': 'In my free time, I enjoy creating both oil and digital artwork, exploring different styles and techniques. I’m currently working on a new gallery feature for the website to showcase my work. Stay tuned—it’s coming soon!',
        'project3': 'Collaborating on game development projects, I worked with teams in KiwiJam 2024 and GDG Game Maker, contributing to music and element design. At KiwiJam, our team created a game in 48 hours, winning the Experimental Award, while in GDG Game Maker, we developed a game over seven weeks, earning the Most Technical Award. One of our games, Infected Pixels, was showcased at Armageddon Expo in Auckland this summer, highlighting our creativity and teamwork.',
        'project4': 'Atlephobia v0.13 is a side-scrolling RPG with 3D controls, featuring a rich, story-driven world where players interact with NPCs and explore a detailed pixel-art environment. Built in JavaScript, the game blends turn-based combat with scripted character behavior and environmental interactions, creating an immersive experience with classic RPG-style dialogue boxes. The village-like setting, combined with dynamic exploration mechanics, allows for deep engagement in the games evolving narrative, as development continues to refine mechanics and expand content.'
    };

    bentoItems.forEach((item, index) => {
        const projectKey = `project${index + 1}`;
        item.setAttribute('data-project', projectKey);

        item.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block';
            tooltip.textContent = projectDescriptions[projectKey];
        });

        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            tooltip.style.left = `${e.clientX + 15}px`;
            tooltip.style.top = `${e.clientY + 15}px`;
        });

        item.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });
});