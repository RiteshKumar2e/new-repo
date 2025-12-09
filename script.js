let currentPage = 1;

function goToPage(pageNum) {
    document.getElementById(`page${currentPage}`).classList.remove('active');
    currentPage = pageNum;
    document.getElementById(`page${currentPage}`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function sendMessage(event) {
    const signature = document.getElementById('signature');
    const button = event.target;
    const heart = document.getElementById('finalHeart');

    // ✅ Instagram username (WITHOUT @)
    const instaUsername = "riteshkr256";

    // ✅ Instagram DM redirect (opens chat)
    const instaLink = `https://www.instagram.com/direct/t/${instaUsername}`;
    window.open(instaLink, "_blank");

    heart.style.color = '#ff6b6b';
    heart.style.transform = 'scale(1.3)';
    heart.style.animation = 'heartbeat 0.5s ease-in-out 5';

    signature.textContent = 'Opening Instagram chat… 💜';

    button.textContent = 'Instagram Opened 💜';
    button.style.background = 'linear-gradient(135deg, #fd5949 0%, #d6249f 50%, #285AEB 100%)';

    setTimeout(() => {
        signature.textContent = 'Chat open ho gaya, message bhej sakte ho ✨';
        button.textContent = 'Send Again';
        button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }, 2000);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentPage < 5) {
        goToPage(currentPage + 1);
    } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        goToPage(currentPage - 1);
    }
});
