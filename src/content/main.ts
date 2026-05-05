import { loadOptions } from "@/apis/google-storage"
import { customFontFaces } from "@/helpers/custom-font-faces"
import { buildStyleString } from "@/helpers/style-builder"
import { styleDictionary } from "@/helpers/style-dictionary"

let styleElement: HTMLStyleElement | null = null

async function enableOptions() {
  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = '__dyslexia-extension__'
    document.head.appendChild(styleElement)
  }

  const userOptions = await loadOptions()

  const styleString = buildStyleString(styleDictionary, {
    fontFamily: userOptions.fontFamily
  })

  const fontFaceString = customFontFaces

  styleElement.textContent = `
    body * {
      ${styleString}
    }
    ${fontFaceString}
  `
}

function disableOptions() {
  styleElement?.remove()
  styleElement = null
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'ENABLE_OPTIONS') {
    enableOptions()
  }
  if (message.type === 'DISABLE_OPTIONS') {
    disableOptions()
  }
})

async function init() {
  const userOptions = await loadOptions()

  if (userOptions.onOffSwitch) {
    enableOptions()
  }
}

init()