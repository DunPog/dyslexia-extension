import './style.css'
import { idDictionary } from '../helpers/constants/id-dictionary'
import { setupFontSizeInput, setupFontTypeSelect } from './font'
import { setupOnOffSwitch } from './on-off'

document.querySelector('#app')!.innerHTML = `
  <div>
    <h3 class="h3">Dyslexia Extension</h3>
    <input class="input" id=${idDictionary.onOffSwitchInput} type="checkbox">
    <span class="span span-bold" id=${idDictionary.onOffSwitchSpan}></span>
    <br>
    <br>
    <span class="span">Font style: </span>
    <select class="select" id=${idDictionary.fontTypeSelect}></select>
    <span class="span">Font size: </span>
    <br>
    <input class="input" id=${idDictionary.fontSizeInput} type="range">
    <label class="label" id=${idDictionary.fontSizeLabel} for=${idDictionary.fontSizeInput}></label>
  </div>
`

setupOnOffSwitch(document.querySelector(`#${idDictionary.onOffSwitchInput}`)!, document.querySelector(`#${idDictionary.onOffSwitchSpan}`)!)
setupFontTypeSelect(document.querySelector(`#${idDictionary.fontTypeSelect}`)!)
setupFontSizeInput(document.querySelector(`#${idDictionary.fontSizeInput}`)!, document.querySelector(`#${idDictionary.fontSizeLabel}`)!)