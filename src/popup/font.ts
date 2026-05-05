import { fontArray } from "../helpers/constants/font-array"
import { loadOptions, saveOptions } from "@/apis/google-storage"
import { tryEnableOptions } from "./on-off"

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