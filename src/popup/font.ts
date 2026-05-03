import { fontArray } from "../helpers/font-array"
import { sendToActiveTab } from "./google-message"
import { loadOptions, saveOptions } from "@/apis/google-storage"
import { idDictionary } from "@/helpers/id-dictionary"

async function tryEnableOptions(){
    const onOffSwitch = (document.getElementById(idDictionary.onOffSwitch) as HTMLInputElement)

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
        option.textContent = f.split(',')[0].replace(/"/g, '')
        element.appendChild(option)
    })

    document.addEventListener("DOMContentLoaded", async () => {
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

export function setupOnOffSwitch(element: HTMLInputElement) {
    document.addEventListener("DOMContentLoaded", async () => {
        const userOptions = await loadOptions()

        element.checked = userOptions.onOffSwitch

        if (element.checked) {
            await sendToActiveTab({ type: 'ENABLE_OPTIONS' })
        } else {
            await disableOptions()
        }
    })
    
    element.addEventListener('change', async () => {
        if (element.checked) {
            await saveOptions({
                onOffSwitch: true
            })

            await sendToActiveTab({ type: 'ENABLE_OPTIONS' })
        } else {
            await saveOptions({
                onOffSwitch: false
            })

            await disableOptions()
        }
    })
}