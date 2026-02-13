const movies = [
    { id: 1, title: 'The Dark Knight', rating: 9.0, genre: 'Action', img: 'assets/images/dark.jpg' },
    { id: 2, title: 'Inception', rating: 8.8, genre: 'Sci-Fi', img: 'assets/images/inception.jpg' },
    { id: 3, title: 'Interstellar', rating: 8.7, genre: 'Sci-Fi', img: 'assets/images/int.jpg' },
    { id: 4, title: 'The Matrix', rating: 8.7, genre: 'Action', img: 'assets/images/mat.jpg' },
    { id: 5, title: 'Pulp Fiction', rating: 8.9, genre: 'Crime', img: 'assets/images/pulp.jpg' },
];
const suggestions = [
    ...movies,
    { id: 6, title: 'Forrest Gump', rating: 8.8, genre: 'Drama', img: 'assets/images/dark.jpg' },
    { id: 7, title: 'Dumb and Dumber', rating: 7.3, genre: 'Comedy', img: 'assets/images/inception.jpg' },
    { id: 8, title: 'The Shining', rating: 8.4, genre: 'Horror', img: 'assets/images/pulp.jpg' },
];

// Loading - hide when page ready
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader')?.classList.add('hidden'), 800);
});

// Navbar scroll
window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
});

// Parallax effect on hero video
window.addEventListener('scroll', () => {
    const video = document.getElementById('heroVideo');
    if (video && window.scrollY < window.innerHeight) {
        video.style.transform = `translateY(${window.scrollY * 0.4}px) scale(1.1)`;
    }
}, { passive: true });

// AI Suggestions
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('aiBtn').onclick = () => {
        const input = document.getElementById('aiInput').value.toLowerCase();
        const moodMap = { 'feel-good': 'drama', 'funny': 'comedy', 'scary': 'horror', 'thriller': 'action' };
        const term = moodMap[input] || input;
        const filtered = term
            ? suggestions.filter(m => m.genre.toLowerCase().includes(term) || m.title.toLowerCase().includes(term))
            : suggestions.slice(0, 4);
        document.getElementById('aiResults').innerHTML = filtered.length ? filtered.map(m => `
            <div class="movie">
                <img src="${m.img}" alt="${m.title}">
                <div class="movie-info"><h3>${m.title}</h3><p>★ ${m.rating} · ${m.genre}</p></div>
            </div>
        `).join('') : '<p style="color:var(--gray)">No matches. Try: action, sci-fi, comedy, drama, horror</p>';
    };
});

// Movie grid
document.getElementById('grid').innerHTML = movies.map(m => `
    <div class="movie">
        <img src="${m.img}" alt="${m.title}">
        <div class="movie-info">
            <h3>${m.title}</h3>
            <p>★ ${m.rating} · ${m.genre}</p>
        </div>
    </div>
`).join('');
