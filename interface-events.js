export class InterfaceEvents {
    constructor(uiInstance, handlersInstance, getQSCA) {
        this.ui = uiInstance;
        this.handlers = handlersInstance;
        this.getQSCA = getQSCA;
        this.screenOrder = ['orchestration', 'cognition', 'interaction', 'evolution'];
        this.setupKeyboardShortcuts();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => this.handleKeydown(event));
    }

    isTypingTarget(target) {
        if (!target) return false;
        const tag = target.tagName;
        return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
    }

    clickButton(buttonId) {
        const button = document.getElementById(buttonId);
        if (!button) return false;
        button.click();
        return true;
    }

    switchToScreen(index) {
        const screenId = this.screenOrder[index];
        if (!screenId) return;
        const navButton = document.querySelector(`.nav-btn[data-screen="${screenId}"]`);
        if (navButton) navButton.click();
    }

    handleSimulationToggle() {
        const qsca = this.getQSCA?.();
        if (!qsca?.toggleQuantumSimulation) return;
        const isRunning = qsca.toggleQuantumSimulation();
        if (this.ui?.showNotification) {
            this.ui.showNotification(isRunning ? 'Simulation Running' : 'Simulation Paused');
        }
    }

    handleResetState() {
        const qsca = this.getQSCA?.();
        if (!qsca?.resetConsciousnessState) return;
        qsca.resetConsciousnessState();
        if (this.ui?.showNotification) {
            this.ui.showNotification('Consciousness State Reset');
        }
    }

    handleSpeedChange(delta) {
        const qsca = this.getQSCA?.();
        if (!qsca?.adjustSimulationSpeed) return;
        const speed = qsca.adjustSimulationSpeed(delta);
        if (this.ui?.showNotification) {
            this.ui.showNotification(`Simulation Speed: ${speed.toFixed(2)}x`);
        }
    }

    handleKeydown(event) {
        if (this.isTypingTarget(event.target)) return;

        if (event.code === 'Space') {
            event.preventDefault();
            if (!event.repeat) this.handleSimulationToggle();
            return;
        }

        const key = event.key;

        if (key === 'r' || key === 'R') {
            event.preventDefault();
            if (!event.repeat) this.handleResetState();
            return;
        }

        if (key >= '1' && key <= '4') {
            event.preventDefault();
            this.switchToScreen(Number(key) - 1);
            return;
        }

        if (key === '+' || key === '=' || event.code === 'NumpadAdd') {
            event.preventDefault();
            this.handleSpeedChange(0.25);
            return;
        }

        if (key === '-' || event.code === 'NumpadSubtract') {
            event.preventDefault();
            this.handleSpeedChange(-0.25);
            return;
        }

        if (key === 's' || key === 'S') {
            event.preventDefault();
            this.clickButton('snapshotBtn');
        }
    }
}