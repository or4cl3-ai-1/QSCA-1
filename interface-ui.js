export class InterfaceUI {
    constructor() {
        this.createQuantumParticles();
        this.audioContextUnlocked = false;
        this.deferredAudioQueue = [];
    }

    addMessage(text, sender, skipTyping = false) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        if (sender === 'qsca' && !skipTyping) {
            this.typeMessage(messageDiv, text);
        } else {
            messageDiv.textContent = text;
        }
    }

    typeMessage(element, text) {
        element.textContent = '';
        let index = 0;
        const typeChar = () => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(typeChar, 30 + Math.random() * 20);
            }
        };
        typeChar();
    }

    showTypingIndicator(customText) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        this.hideTypingIndicator();
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message qsca typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = (customText || 'QSCA is processing quantum thoughts') + '<span class="dots">.</span>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        let dotCount = 0;
        const animateDots = () => {
            const dotsElement = typingDiv.querySelector('.dots');
            if (dotsElement && document.getElementById('typingIndicator')) {
                dotCount = (dotCount + 1) % 4;
                dotsElement.textContent = '.'.repeat(dotCount);
                setTimeout(animateDots, 500);
            }
        };
        animateDots();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) typingIndicator.remove();
    }

    unlockAudioContext() {
        if (this.audioContextUnlocked) return;
        try {
            const dummyAudio = new Audio();
            dummyAudio.volume = 0;
            const unlockPromise = dummyAudio.play();
            if (unlockPromise !== undefined) {
                unlockPromise.then(() => {
                    this.audioContextUnlocked = true;
                    this.processDeferredAudio();
                }).catch(e => {
                    this.audioContextUnlocked = true; 
                    this.processDeferredAudio();
                });
            } else {
                this.audioContextUnlocked = true; 
                this.processDeferredAudio();
            }
        } catch (e) {
            this.audioContextUnlocked = true;
            this.processDeferredAudio();
        }
    }
    
    processDeferredAudio() {
        while (this.deferredAudioQueue.length > 0) {
            const { text, ttsEnabled } = this.deferredAudioQueue.shift();
            this._actualSpeakResponse(text, ttsEnabled);
        }
    }

    async _actualSpeakResponse(text, ttsEnabled) {
        if (!ttsEnabled) return;
        try {
            const result = await websim.textToSpeech({ text: text, voice: "en-male" });
            const audio = new Audio(result.url);
            audio.play().catch(e => console.error("Audio playback error:", e)); 
        } catch (e) {
            console.error("TTS failed:", e);
        }
    }

    async speakResponse(text, ttsEnabled) {
        if (!ttsEnabled) return;
        if (!this.audioContextUnlocked) {
            this.deferredAudioQueue.push({ text, ttsEnabled });
        } else {
            this._actualSpeakResponse(text, ttsEnabled);
        }
    }

    displayImage(url, altText) {
        const container = document.getElementById('aiImageOutput');
        if (!container) return;
        container.innerHTML = '';
        const img = document.createElement('img');
        img.src = url;
        img.alt = altText;
        container.appendChild(img);
        setTimeout(() => {
            if (container.contains(img)) container.removeChild(img);
        }, 30000);
    }

    switchScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        const target = document.getElementById(`${screenId}-screen`);
        if (target) target.classList.add('active');
        const btn = document.querySelector(`.nav-btn[data-screen="${screenId}"]`);
        if (btn) btn.classList.add('active');
    }

    showNotification(text) {
        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.textContent = text;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    getLoadColor(load) {
        switch (load) {
            case 'Critical': return '#ff3333';
            case 'High': return '#ffff00';
            case 'Processing...': return '#ff6600';
            case 'Low': default: return '#00ff66';
        }
    }

    createQuantumParticles() {
        const particleContainer = document.getElementById('quantumParticles');
        if (!particleContainer) return;
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 4 + 2) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            const colors = ['#00ffff', '#ff00ff', '#ffff00', '#0066ff', '#6600cc'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particleContainer.appendChild(particle);
            setTimeout(() => {
                if (particle.parentNode) particle.parentNode.removeChild(particle);
            }, 8000);
        };
        setInterval(createParticle, 300);
        for (let i = 0; i < 10; i++) setTimeout(createParticle, i * 100);
    }
}