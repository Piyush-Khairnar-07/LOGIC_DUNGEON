export class SoundSynth {
    static ctx = null;

    static init() {
        if (!this.ctx) {
            try { 
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) this.ctx = new AudioContext(); 
            } catch(e){}
        }
    }

    static play(freq, type='sine', duration=0.2, vol=0.1) {
        if (!this.ctx) return;
        try {
            if (this.ctx.state === 'suspended') this.ctx.resume();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            
            gain.gain.setValueAtTime(vol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch(e){}
    }

    static interact(type) {
        this.init();
        switch(type) {
            case 'sun': this.play(500, 'sine', 0.2); break;
            case 'moon': this.play(600, 'sine', 0.2); break;
            case 'flame': this.play(250, 'sawtooth', 0.3, 0.05); break;
            case 'frost': this.play(800, 'triangle', 0.3, 0.05); break;
            case 'shadow': this.play(150, 'square', 0.4, 0.05); break;
            case 'sacredKey': 
                this.play(1000, 'sine', 0.3, 0.05); 
                setTimeout(() => this.play(1200, 'sine', 0.4, 0.05), 100); 
                break;
            case 'bell': 
                this.play(400, 'triangle', 1.0, 0.1); 
                setTimeout(() => this.play(405, 'triangle', 0.9, 0.05), 50); 
                break;
            case 'shadowCurse': 
                this.play(90, 'sawtooth', 0.6, 0.1); 
                setTimeout(() => this.play(80, 'square', 0.6, 0.05), 100);
                break;
            default: 
                this.play(440, 'sine', 0.2);
        }
    }

    static success() {
        this.init();
        this.play(600, 'sine', 0.1, 0.05);
        setTimeout(() => this.play(800, 'sine', 0.3, 0.08), 100);
    }

    static fail() {
        this.init();
        this.play(300, 'square', 0.1, 0.05);
        setTimeout(() => this.play(200, 'square', 0.3, 0.05), 100);
    }

    static gateOpen() {
        this.init();
        this.play(100, 'sawtooth', 1.0, 0.1);
        setTimeout(() => this.play(150, 'sawtooth', 0.8, 0.1), 300);
    }

    static intro() {
        this.init();
        this.play(200, 'sine', 2.0, 0.05);
    }
}
