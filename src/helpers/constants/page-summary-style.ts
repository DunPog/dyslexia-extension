export const pageSummaryStyle = `
<style>
    :host { all: initial; }

    .summary-panel-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 2147483644; /* 4th highest possible zIndex value (To allow overlay to display in front of the background blur) */
        backdrop-filter: blur(2px);
        animation: fadeIn 0.2s ease;
    }
    
    .summary-panel {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: min(1000px, 90vw);
        max-height: 80vh;
        overflow-y: auto;
        background: var(--ext-bg, #FAFAC8);
        z-index: 2147483645; /* 3rd highest possible zIndex value (To allow reading ruler to display in front of this overlay) */
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.25s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    @keyframes slideUp {
        from { opacity: 0; transform: translate(-50%, calc(-50% + 16px)); }
        to   { opacity: 1; transform: translate(-50%, -50%); }
    }
</style>
`