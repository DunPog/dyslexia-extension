import { loadOptions } from "@/apis/google-storage"
import { customFontFaces } from "@/helpers/constants/custom-font-faces"
import { buildStyleString } from "@/helpers/functions/style-builder"
import { styleDictionary } from "@/helpers/constants/style-dictionary"
import { headerStyles } from "@/helpers/functions/header-styles"
import { ReadingRuler } from "./reading-ruler"
import { setupSummaryOverlay } from "./page-summary"
import { marked } from "marked"
import { articleBuilder } from "@/helpers/functions/extract-page-content"
import { idDictionary } from "@/helpers/constants/id-dictionary"

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
    interLetterSpacing: userOptions.interLetterSpacing,
    interWordSpacing: userOptions.interWordSpacing,
    lineSpacing: userOptions.lineSpacing
  })

  const colorStyleString = buildStyleString(styleDictionary, {
    textColor: userOptions.textColor
  })

  const sizeStyleString = buildStyleString(styleDictionary, {
    fontSize: userOptions.fontSize
  })

  const headerStyleString = headerStyles(userOptions.fontSize)

  const fontFaceString = customFontFaces

  styleElement.textContent = `
    body *:not(figure, figure *) {
      ${styleString}
    }

    body *:not(a, a *, figure, figure *) {
      ${colorStyleString}
    }

    body *:not(h1, h1 *, h2, h2 *, h3, h3 *, h4, h4 *, h5, h5 *, h6, h6 *, figure, figure *) {
      ${sizeStyleString}
    }

    ${headerStyleString}
    ${fontFaceString}
  `
}

function disableOptions() {
  styleElement?.remove()
  styleElement = null
}

const readingRuler = new ReadingRuler()

chrome.runtime.onMessage.addListener(async (message, _sender, sendResponse) => {
  if (message.type === 'ENABLE_OPTIONS') {
    enableOptions()
  }

  if (message.type === 'DISABLE_OPTIONS') {
    disableOptions()
  }

  if (message.type === 'TOGGLE_READING_RULER') {
    readingRuler.toggle()
    
    sendResponse({ active: readingRuler.active })

    return true
  }

  if (message.type === 'PAGE_SUMMARY') {
    if (document.getElementById(idDictionary.pageSummaryOverlay)) {
      return
    }
    
    const article = articleBuilder()

    const response = await chrome.runtime.sendMessage({ type: 'GENERATE_AI_SUMMARY', text: article })

    let pageSummary = typeof response.result === 'string' ? response.result : 'Failed to generate page summary.'

    if (response.status === 400 || response.status === 403) {
      pageSummary = 'Invalid Gemini API key. Please generate a Gemini API key and save it in the extension Options'
    }

    if (response.status === 429) {
      pageSummary = 'Too many page summary requests. You may have exceeded your daily allowance. (Refer to the Google Gemini API dashboard for more details)'
    }

    const html = await marked.parse(pageSummary)

    setupSummaryOverlay(html)

    return true
  }
})

async function init() {
  const userOptions = await loadOptions()

  if (userOptions.onOffSwitch) {
    enableOptions()
  }

  if (userOptions.readingRulerActive) {
    readingRuler.activate()
  }
}

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    init()
  }
})

init()