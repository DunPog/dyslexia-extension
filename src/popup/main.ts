import './style.css'
import { idDictionary } from '../helpers/constants/id-dictionary'
import { setupOnOffSwitch } from './on-off'
import { setupFontSizeInput, setupFontTypeSelect } from './font'
import { setupInterLetterSpacingSelect, setupInterWordSpacingSelect, setupLineSpacingSelect } from './spacing'
import { setupTextColorInput } from './color'

document.querySelector('#app')!.innerHTML = `
  <div>
    <h3 class="h3">Dyslexia Extension</h3>
    <input class="input" id=${idDictionary.onOffSwitchInput} type="checkbox">
    <span class="span span-bold" id=${idDictionary.onOffSwitchSpan}></span>
    <br>
    <br>
    <span class="span">Font style: </span>
    <br>
    <select class="select" id=${idDictionary.fontTypeSelect}></select>
    <br>
    <br>
    <span class="span">Font size: </span>
    <br>
    <input class="input" id=${idDictionary.fontSizeInput} type="range">
    <label class="label" id=${idDictionary.fontSizeLabel} for=${idDictionary.fontSizeInput}></label>
    <br>
    <br>
    <span class="span">Character spacing: </span>
    <br>
    <select class="select" id=${idDictionary.interLetterSpacingSelect}></select>
    <br>
    <br>
    <span class="span">Word spacing: </span>
    <br>
    <select class="select" id=${idDictionary.interWordSpacingSelect}></select>
    <br>
    <br>
    <span class="span">Line spacing: </span>
    <br>
    <select class="select" id=${idDictionary.lineSpacingSelect}></select>
    <br>
    <br>
    <span class="span">Text colour: </span>
    <br>
    <input class="input" id=${idDictionary.textColorInput} type="color">
  </div>
`

setupOnOffSwitch(document.querySelector(`#${idDictionary.onOffSwitchInput}`)!, document.querySelector(`#${idDictionary.onOffSwitchSpan}`)!)
setupFontTypeSelect(document.querySelector(`#${idDictionary.fontTypeSelect}`)!)
setupFontSizeInput(document.querySelector(`#${idDictionary.fontSizeInput}`)!, document.querySelector(`#${idDictionary.fontSizeLabel}`)!)
setupInterLetterSpacingSelect(document.querySelector(`#${idDictionary.interLetterSpacingSelect}`)!)
setupInterWordSpacingSelect(document.querySelector(`#${idDictionary.interWordSpacingSelect}`)!)
setupLineSpacingSelect(document.querySelector(`#${idDictionary.lineSpacingSelect}`)!)
setupTextColorInput(document.querySelector(`#${idDictionary.textColorInput}`)!)