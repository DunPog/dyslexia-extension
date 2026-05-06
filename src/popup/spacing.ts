import { loadOptions, saveOptions } from "@/apis/google-storage"
import { tryEnableOptions } from "./on-off"
import { interSpacingArray } from "@/helpers/constants/inter-spacing-array"
import { lineSpacingArray } from "@/helpers/constants/line-spacing-array"

export function setupInterLetterSpacingSelect(element: HTMLSelectElement) {
    interSpacingArray.forEach(i => {
        const option = document.createElement('option')
        option.value = i
        option.textContent = i + '%'
        element.appendChild(option)
    })

    document.addEventListener('DOMContentLoaded', async () => {
        const userOptions = await loadOptions()

        element.value = userOptions.interLetterSpacing
    })

    element.addEventListener('change', async () => {
        await saveOptions({
            interLetterSpacing: element.value
        })

        await tryEnableOptions()
    })
}

export function setupInterWordSpacingSelect(element: HTMLSelectElement) {
    interSpacingArray.forEach(i => {
        const option = document.createElement('option')
        option.value = i
        option.textContent = i + '%'
        element.appendChild(option)
    })

    document.addEventListener('DOMContentLoaded', async () => {
        const userOptions = await loadOptions()

        element.value = userOptions.interWordSpacing
    })

    element.addEventListener('change', async () => {
        await saveOptions({
            interWordSpacing: element.value
        })

        await tryEnableOptions()
    })
}

export function setupLineSpacingSelect(element: HTMLSelectElement) {
    lineSpacingArray.forEach(l => {
        const option = document.createElement('option')
        option.value = l
        option.textContent = l
        element.appendChild(option)
    })

    document.addEventListener('DOMContentLoaded', async () => {
        const userOptions = await loadOptions()

        element.value = userOptions.lineSpacing
    })

    element.addEventListener('change', async () => {
        await saveOptions({
            lineSpacing: element.value
        })

        await tryEnableOptions()
    })
}