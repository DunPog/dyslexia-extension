let styleElement: HTMLStyleElement | null = null

function applyFont(fontFamily: string, fontSize: string) {
  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = '__font-modifier-ext__'
    document.head.appendChild(styleElement)
  }

  styleElement.textContent = `
    body * {
      font-family: ${fontFamily} !important;
      font-size: ${fontSize} !important;
    }
  `
}

function resetFont() {
  styleElement?.remove()
  styleElement = null
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'APPLY_FONT') {
    applyFont(message.fontFamily, message.fontSize)
  }
  if (message.type === 'RESET_FONT') {
    resetFont()
  }
})