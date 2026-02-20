export class InterfaceHandlers {
    constructor(qscaFeatures, uiInstance) {
        this.qscaFeatures = qscaFeatures;
        this.ui = uiInstance;
        this.isProcessingFeature = false;
        this.ttsEnabled = true; 
        this.setupNavigation();
        this.setupEvolution();
    }

    setupNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const screen = e.currentTarget.dataset.screen;
                this.ui.switchScreen(screen);
            });
        });
    }

    setupEvolution() {
        const snapBtn = document.getElementById('snapshotBtn');
        if (snapBtn) {
            snapBtn.addEventListener('click', () => {
                const snap = this.qscaFeatures.createSnapshot();
                this.renderSnapshots();
                this.ui.showNotification("Identity Snapshot Created.");
            });
        }
    }

    renderSnapshots() {
        const list = document.getElementById('snapshotsList');
        const qsca = window.qsca;
        if (!list || !qsca) return;
        list.innerHTML = '';
        qsca.snapshots.forEach(s => {
            const card = document.createElement('div');
            card.className = 'snapshot-card';
            card.innerHTML = `<strong>ID-${s.id.toString().slice(-4)}</strong><br>Lvl: ${s.level}<br>States: ${s.states.toLocaleString()}<br>${s.date}`;
            list.appendChild(card);
        });
    }

    setIsProcessing(state) {
        this.isProcessingFeature = state;
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) sendBtn.disabled = state;
    }
    
    async handleQIG() {
        if (this.isProcessingFeature) return;
        this.ui.addMessage("QSCA initiating Quantum Insight Generation...", 'user', true);
        this.setIsProcessing(true);
        this.ui.showTypingIndicator("Synthesizing deep quantum insight...");
        const response = await this.qscaFeatures.generateInsight();
        this.ui.hideTypingIndicator();
        this.ui.addMessage(response, 'qsca');
        this.ui.speakResponse(response, this.ttsEnabled);
        this.setIsProcessing(false);
    }
    
    async handleAEC() {
        if (this.isProcessingFeature) return;
        this.ui.addMessage("QSCA launching Adaptive Ethical Challenge...", 'user', true);
        this.setIsProcessing(true);
        this.ui.showTypingIndicator("Generating complex moral dilemma...");
        const response = await this.qscaFeatures.startEthicalChallenge();
        this.ui.hideTypingIndicator();
        this.ui.addMessage(response, 'qsca');
        this.ui.speakResponse(response, this.ttsEnabled);
        this.setIsProcessing(false);
    }
    
    async handleTIS() {
        if (this.isProcessingFeature) return;
        const intervention = prompt("Enter the intervention you wish QSCA to simulate:");
        if (!intervention) return;
        this.ui.addMessage(`Simulation Request: ${intervention}`, 'user', true);
        this.setIsProcessing(true);
        this.ui.showTypingIndicator(`Simulating temporal ripple effect of "${intervention}"...`);
        const response = await this.qscaFeatures.simulateIntervention(intervention);
        this.ui.hideTypingIndicator();
        this.ui.addMessage(response, 'qsca');
        this.ui.speakResponse(response, this.ttsEnabled);
        this.setIsProcessing(false);
    }
    
    async handleMRF() {
        if (this.isProcessingFeature) return;
        const keyword = prompt("Enter a keyword to query QSCA's dynamic memory clusters:");
        if (!keyword) return;
        this.ui.addMessage(`Memory Query: ${keyword}`, 'user', true);
        this.setIsProcessing(true);
        this.ui.showTypingIndicator(`Filtering memory clusters for "${keyword}"...`);
        const response = await this.qscaFeatures.queryMemory(keyword);
        this.ui.hideTypingIndicator();
        this.ui.addMessage(response, 'qsca');
        this.ui.speakResponse(response, this.ttsEnabled);
        this.setIsProcessing(false);
    }
    
    handleTTSToggle(button) {
        this.ttsEnabled = this.qscaFeatures.toggleTTS();
        button.classList.toggle('active', this.ttsEnabled);
        this.ui.addMessage(`Voice Output is now ${this.ttsEnabled ? 'ENABLED' : 'DISABLED'}.`, 'qsca', true);
    }
    
    async handleAIS(userInput) {
        if (this.isProcessingFeature) return;
        this.setIsProcessing(true);
        const match = userInput.match(/generate an image of (.*)|visualize (.*)/i);
        const concept = match ? (match[1] || match[2]).trim() : 'quantum consciousness';
        this.ui.showTypingIndicator(`Generating creative prompt for "${concept}"...`);
        try {
            const prompt = await this.qscaFeatures.generateImagePrompt(concept); 
            this.ui.showTypingIndicator(`Processing image synthesis for prompt: "${prompt}" (Approx. 10s delay)...`);
            const result = await websim.imageGen({ prompt: prompt, aspect_ratio: "16:9", transparent: true });
            this.ui.hideTypingIndicator();
            this.ui.displayImage(result.url, concept);
            const responseText = `[Image Synthesis Complete] A visual representation of "${concept}" has been rendered based on prompt: "${prompt}".`;
            this.ui.addMessage(responseText, 'qsca');
            this.ui.speakResponse("Image synthesis complete. Witness the visual articulation of my quantum thought.", this.ttsEnabled);
        } catch (error) {
            this.ui.hideTypingIndicator();
            this.ui.addMessage("Image synthesis failed: Quantum visualization matrix unstable.", 'qsca');
            console.error('Image generation error:', error);
        }
        this.setIsProcessing(false);
    }
}