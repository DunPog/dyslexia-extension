import { fontArray } from "../helpers/constants/font-array"
import { loadOptions, saveOptions } from "@/apis/google-storage"
import { tryEnableOptions } from "./on-off"

export function setupFontTypeSelect(element: HTMLSelectElement) {
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

export function setupFontSizeInput(inputElement: HTMLInputElement, labelElement: HTMLLabelElement) {
    inputElement.min = '16'
    inputElement.max = '19'
    inputElement.value = '16'

    labelElement.textContent = `${inputElement.value}px`

    document.addEventListener('DOMContentLoaded', async () => {
        const userOptions = await loadOptions()

        inputElement.value = userOptions.fontSize

        labelElement.textContent = `${inputElement.value}px`
    })

    inputElement.addEventListener('change', async () => {
        labelElement.textContent = `${inputElement.value}px`

        await saveOptions({
            fontSize: inputElement.value
        })

        await tryEnableOptions()
    })
}