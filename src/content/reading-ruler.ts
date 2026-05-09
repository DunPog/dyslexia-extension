import { saveOptions } from "@/apis/google-storage"
import { elementBuilder } from "@/helpers/functions/element-builder"

export class ReadingRuler {
    private container: HTMLElement | null = null
    private topShade: HTMLElement | null = null
    private rulerBand: HTMLElement | null = null
    private bottomShade: HTMLElement | null = null
    private notification: HTMLElement | null = null
    private isActive = false
    private rulerBandHeight = 40 // (in px)

    get active() {
        return this.isActive
    }

    activate() {
        if (this.isActive) {
            return
        }

        this.isActive = true

        this.createReadingRulerStyles()
        this.createRulerOverlay()
        this.createRulerNotification()

        document.addEventListener('mousemove', this.onMouseMove)
        document.addEventListener('keydown', this.onKeyDown)
    }

    deactivate() {
        if (!this.active) {
            return
        }

        this.isActive = false

        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('keydown', this.onKeyDown)

        this.container?.remove()
        this.container = null

        this.notification?.remove()
        this.notification = null

        document.getElementById('reading-ruler-styles')?.remove()
    }

    toggle() {
        this.isActive ? this.deactivate() : this.activate()
    }

    private createReadingRulerStyles() {
        if (document.getElementById('reading-ruler-styles')) {
            return
        }

        const style = document.createElement('style')
        style.id = 'reading-ruler-styles'

        style.textContent = `
            #reading-ruler-container * {
                pointer-events: none !important;
            }

            #reading-ruler-notification {
                font-family: Arial, sans-serif;
                animation: ruler-fadein 0.2s ease;
            }

            @keyframes ruler-fadein {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `

        document.head.appendChild(style)
    }

    private createRulerOverlay() {
        const lowBrightness = 'brightness(0.25)'
        const defaultBrightness = 'brightness(1)'

        this.container = elementBuilder('div', {
            id: 'reading-ruler-container',
            position: 'fixed',
            zIndex: '2147483646', // 2nd highest possible zIndex value (To prevent other page elements from interfering)
            inset: '0',
            pointerEvents: 'none'
        })

        this.topShade = elementBuilder('div', {
            position: 'fixed',
            top: '0', 
            left: '0',
            width: '100%',
            backdropFilter: lowBrightness,
            WebkitBackdropFilter: lowBrightness,
            transition: 'height 40ms linear'
        })

        this.rulerBand = elementBuilder('div', {
            position: 'fixed',
            left: '0',
            width: '100%',
            height: `${this.rulerBandHeight}px`,
            backdropFilter: defaultBrightness,
            WebkitBackdropFilter: defaultBrightness,
            outline: '1px solid rgba(255,240,100,0.35)'
        })

        this.bottomShade = elementBuilder('div', {
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            backdropFilter: lowBrightness,
            WebkitBackdropFilter: lowBrightness,
            transition: 'height 40ms linear'
        })

        this.container.append(this.topShade, this.rulerBand, this.bottomShade)

        document.documentElement.appendChild(this.container)
    }

    private createRulerNotification() {
        this.notification = elementBuilder('div', {
            id: 'reading-ruler-notification',
            position: 'fixed',
            zIndex: '2147483647', // Highest possible zIndex value (To prevent other page elements from interfering)
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(20,20,20,0.92)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '13px',
            letterSpacing: '0.01em',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
        })

        this.notification.innerHTML = 'Reading Ruler is active &nbsp;·&nbsp; Press <kbd style="background:#444;padding:1px 6px;border-radius:4px;font-family:monospace">Esc</kbd> to exit'
        
        document.documentElement.appendChild(this.notification)
    }

    private onMouseMove = (event: MouseEvent) => {
        const clientY = event.clientY
        const halfLineHeight = this.rulerBandHeight / 2
        const top = Math.max(0, clientY - halfLineHeight)
        const bottom = Math.max(0, window.innerHeight - (clientY + halfLineHeight))

        if (this.topShade) {
            this.topShade.style.height = `${top}px`
        }

        if (this.bottomShade) {
            this.bottomShade.style.height = `${bottom}px`
        }

        if (this.rulerBand) {
            this.rulerBand.style.top = `${top}px`
            this.rulerBand.style.height = `${this.rulerBandHeight}px`
        }
    }

    private onKeyDown = async (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            this.deactivate()

            await saveOptions({
                readingRulerActive: false
            })
        }
    }
}