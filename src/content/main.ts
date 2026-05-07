import { loadOptions } from "@/apis/google-storage"
import { customFontFaces } from "@/helpers/constants/custom-font-faces"
import { buildStyleString } from "@/helpers/functions/style-builder"
import { styleDictionary } from "@/helpers/constants/style-dictionary"
import { headerStyles } from "@/helpers/constants/header-styles"

let styleElement: HTMLStyleElement | null = null

async function enableOptions() {
  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = '__dyslexia-extension__'
    document.head.appendChild(styleElement)
  }

  const userOptions = await loadOptions()

  const styleString = buildStyleString(styleDictionary, {
    fontFamily: userOptions.fontFamily,
    fontSize: userOptions.fontSize,
    interLetterSpacing: userOptions.interLetterSpacing,
    interWordSpacing: userOptions.interWordSpacing,
    lineSpacing: userOptions.lineSpacing,
    textColor: userOptions.textColor
  })

  const headerStyleString = headerStyles(userOptions.fontSize)

  const fontFaceString = customFontFaces

  styleElement.textContent = `
    body *:not(a, a *) {
      ${styleString}
    }
    ${headerStyleString}
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