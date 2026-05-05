import { fontArray } from "../helpers/font-array"
import { sendToActiveTab } from "../apis/google-message"
import { loadOptions, saveOptions } from "@/apis/google-storage"
import { idDictionary } from "@/helpers/id-dictionary"

async function tryEnableOptions(){
    const onOffSwitch = (document.getElementById(idDictionary.onOffSwitchInput) as HTMLInputElement)

    if (onOffSwitch.checked){
        try {
            await sendToActiveTab({ type: 'ENABLE_OPTIONS' })
        } catch (e) {
            return
        }
    }
}

async function disableOptions(){
    try {
        await sendToActiveTab({ type: 'DISABLE_OPTIONS' })
    } catch (e) {
        return
    }
}

export function setupFontSelector(element: HTMLSelectElement) {
    fontArray.forEach(f => {
        const option = document.createElement('option')
        option.value = f
        option.textContent = f.split(',')[0].replace(/['"]/g, '')
        element.appendChild(option)
    })

    document.addEventListener('DOMContentLoaded', async () => {
        const userOptions = await loadOptions()

        element.value = userOptions.fontFamily
    })

    element.addEventListener('change', async () => {
        await saveOptions({
            fontFamily: element.value
        })

        await tryEnableOptions()
    })
}

export function setupOnOffSwitch(inputElement: HTMLInputElement, spanElement: HTMLSpanElement) {
    const onOffSwitchEnabled = 'Enabled'
    const onOffSwitchDisabled = 'Disabled'

    document.addEventListener('DOMContentLoaded', async () => {
        const userOptions = await loadOptions()

        inputElement.checked = userOptions.onOffSwitch

        spanElement.textContent = inputElement.checked ? onOffSwitchEnabled : onOffSwitchDisabled

        if (inputElement.checked) {
            try {
                await sendToActiveTab({ type: 'ENABLE_OPTIONS' })
            } catch (e) {
                return
            }
        } else {
            await disableOptions()
        }
    })
    
    inputElement.addEventListener('change', async () => {
        spanElement.textContent = inputElement.checked ? onOffSwitchEnabled : onOffSwitchDisabled

        if (inputElement.checked) {
            await saveOptions({
                onOffSwitch: true
            })
            
            try {
                await sendToActiveTab({ type: 'ENABLE_OPTIONS' })
            } catch (e) {
                return
            }
        } else {
            await saveOptions({
                onOffSwitch: false
            })

            await disableOptions()
        }
    })
}