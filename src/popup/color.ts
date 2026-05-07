import { loadOptions, saveOptions } from "@/apis/google-storage"
import { tryEnableOptions } from "./on-off"

export function setupTextColorInput(element: HTMLInputElement) {
    document.addEventListener('DOMContentLoaded', async () => {
        const userOptions = await loadOptions()

        element.value = userOptions.textColor
    })

    let timeout: number | undefined

    element.addEventListener('input', () => {
        if (timeout) {
            clearTimeout(timeout)
        }

        timeout = window.setTimeout(() => {
            (async () => {
                await saveOptions({
                    textColor: element.value
                })

                await tryEnableOptions()
            })().catch(console.error)
        }, 300)
    })
}