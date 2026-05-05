import './style.css'
import { setupFontSelector, setupOnOffSwitch } from './font'
import { idDictionary } from '../helpers/id-dictionary'

document.querySelector('#app')!.innerHTML = `
  <div>
    <h3 class="h3">Dyslexia Extension</h3>
    <label class="label">
      <input class="input" id=${idDictionary.onOffSwitchInput} type="checkbox">
      <span class="span span-bold" id=${idDictionary.onOffSwitchSpan}></span>
    </label>
    <br>
    <br>
    <span class="span">Font style: </span>
    <select class="select" id=${idDictionary.fontSelectorId}>
  </div>
`

setupFontSelector(document.querySelector(`#${idDictionary.fontSelectorId}`)!)
setupOnOffSwitch(document.querySelector(`#${idDictionary.onOffSwitchInput}`)!, document.querySelector(`#${idDictionary.onOffSwitchSpan}`)!)