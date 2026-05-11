import './style.css'
import { idDictionary } from '../helpers/constants/id-dictionary'
import { setupOnOffSwitch } from './on-off'
import { setupFontSizeInput, setupFontTypeSelect } from './font'
import { setupInterLetterSpacingSelect, setupInterWordSpacingSelect, setupLineSpacingSelect } from './spacing'
import { setupTextColorInput } from './color'
import { setupReadingRulerButton } from './reading-ruler'
import { setupPageSummaryButton } from './page-summary'
import { setupOptionsButton } from './options'

document.querySelector('#app')!.innerHTML = `
  <div>
    <h3 class="h3">Dyslexia Extension</h3>
    <input class="input" id=${idDictionary.onOffSwitchInput} type="checkbox">
    <span class="span span-bold" id=${idDictionary.onOffSwitchSpan}></span>
    <br>
    <span class="span">Font style: </span>
    <br>
    <select class="select" id=${idDictionary.fontTypeSelect}></select>
    <br>
    <span class="span">Font size: </span>
    <br>
    <input class="input" id=${idDictionary.fontSizeInput} type="range">
    <label class="label" id=${idDictionary.fontSizeLabel} for=${idDictionary.fontSizeInput}></label>
    <br>
    <span class="span">Character spacing: </span>
    <br>
    <select class="select" id=${idDictionary.interLetterSpacingSelect}></select>
    <br>
    <span class="span">Word spacing: </span>
    <br>
    <select class="select" id=${idDictionary.interWordSpacingSelect}></select>
    <br>
    <span class="span">Line spacing: </span>
    <br>
    <select class="select" id=${idDictionary.lineSpacingSelect}></select>
    <br>
    <span class="span">Text colour: </span>
    <br>
    <input class="input" id=${idDictionary.textColorInput} type="color">
    <br>
    <br>
    <button class="button" id=${idDictionary.readingRulerButton}></button>
    <br>
    <br>
    <button class="button" id=${idDictionary.pageSummaryButton}>Generate Page Summary</button>
    <br>
    <br>
    <button class="button" id=${idDictionary.optionsButton}>Options</button>
  </div>
  <div id=${idDictionary.loadingOverlayDiv}>
      <div id=${idDictionary.loadingOverlaySpinnerDiv}></div>
  </div>
`

setupOnOffSwitch(document.querySelector(`#${idDictionary.onOffSwitchInput}`)!, document.querySelector(`#${idDictionary.onOffSwitchSpan}`)!)
setupFontTypeSelect(document.querySelector(`#${idDictionary.fontTypeSelect}`)!)
setupFontSizeInput(document.querySelector(`#${idDictionary.fontSizeInput}`)!, document.querySelector(`#${idDictionary.fontSizeLabel}`)!)
setupInterLetterSpacingSelect(document.querySelector(`#${idDictionary.interLetterSpacingSelect}`)!)
setupInterWordSpacingSelect(document.querySelector(`#${idDictionary.interWordSpacingSelect}`)!)
setupLineSpacingSelect(document.querySelector(`#${idDictionary.lineSpacingSelect}`)!)
setupTextColorInput(document.querySelector(`#${idDictionary.textColorInput}`)!)
await setupReadingRulerButton(document.querySelector(`#${idDictionary.readingRulerButton}`)!)
setupPageSummaryButton(document.querySelector(`#${idDictionary.pageSummaryButton}`)!)
setupOptionsButton(document.querySelector(`#${idDictionary.optionsButton}`)!)