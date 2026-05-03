import './style.css'
import { setupFontSelector, setupOnOffSwitch } from './font'
import { idDictionary } from '../helpers/id-dictionary'

document.querySelector('#app')!.innerHTML = `
  <div>
    <h3 class="h3">Dyslexia Extension</h3>
    <label class="label">
      <input class="input" id=${idDictionary.onOffSwitch} type="checkbox">
    </label>
    <select class="select" id=${idDictionary.fontSelectorId}>
  </div>
`

setupFontSelector(document.querySelector(`#${idDictionary.fontSelectorId}`)!)
setupOnOffSwitch(document.querySelector(`#${idDictionary.onOffSwitch}`)!)