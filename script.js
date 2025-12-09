let currentPage = 1;

function goToPage(pageNum) {
    document.getElementById(`page${currentPage}`).classList.remove('active');
    currentPage = pageNum;
    document.getElementById(`page${currentPage}`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function sendMessage() {
    const customMsg = document.getElementById('customMessage').value;
    const signature = document.getElementById('signature');
    const button = event.target;
    const heart = document.getElementById('finalHeart');
    
    let fullMessage = "Hey! 💝\n\n";
    fullMessage += "I'm not upset or angry with you at all! ";
    fullMessage += "I just wanted to take a moment to tell you how special you are to me. ";
    fullMessage += "You mean so much to me, and I'm grateful for you every day.\n\n";
    
    if (customMsg.trim()) {
        fullMessage += "My Personal Message:\n" + customMsg + "\n\n";
    }
    
    fullMessage += "With all my love ❤️";
    
    // Replace with your WhatsApp number (include country code, no + or spaces)
    // Example: For India +91 1234567890, use: "911234567890"
    const phone = "916206269895"; // Change this to your number
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(waLink, '_blank');
    
    heart.style.color = '#ff6b6b';
    heart.style.transform = 'scale(1.3)';
    heart.style.animation = 'heartbeat 0.5s ease-in-out 5';
    
    signature.textContent = 'Opening WhatsApp to send the message... 💕';
    
    button.textContent = 'WhatsApp Opened! 💕';
    button.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)';
    
    setTimeout(() => {
        signature.textContent = 'Message ready to send! 💌';
        button.textContent = 'Send Another Message';
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