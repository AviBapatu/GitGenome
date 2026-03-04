import { Howl } from "howler";

class SoundManager {
    private ambience: Howl | null = null;
    private isMuted: boolean = false;

    public playAmbience(src: string) {
        if (this.ambience) {
            this.ambience.stop();
        }

        this.ambience = new Howl({
            src: [src],
            loop: true,
            volume: 0.3,
            mute: this.isMuted,
        });

        this.ambience.play();
    }

    public playEffect(src: string, volume: number = 0.5) {
        if (this.isMuted) return;

        const effect = new Howl({
            src: [src],
            volume,
        });

        effect.play();
    }

    public stopAmbience() {
        if (this.ambience) {
            this.ambience.stop();
        }
    }

    public toggleMute(): boolean {
        this.isMuted = !this.isMuted;

        if (this.ambience) {
            this.ambience.mute(this.isMuted);
        }

        return this.isMuted;
    }

    public getMutedState(): boolean {
        return this.isMuted;
    }
}

// Export as singleton
export const soundManager = new SoundManager();
