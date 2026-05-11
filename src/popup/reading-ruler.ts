import { sendToActiveTabAndGetResponse } from "@/apis/google-message"
import { loadOptions, saveOptions } from "@/apis/google-storage"

export async function setupReadingRulerButton(element: HTMLButtonElement) {
    const userOptions = await loadOptions()

    let active = userOptions.readingRulerActive

    const updateButton = () => {
        element.textContent = active ? 'Disable Reading Ruler' : 'Enable Reading Ruler'
        element.classList.toggle('button--active', active)
    }

    updateButton()

    element.addEventListener('click', async () => {
        const response = await sendToActiveTabAndGetResponse({ type: 'TOGGLE_READING_RULER' })

        active = response?.active ?? false

        await saveOptions({ readingRulerActive: active })

        updateButton()
    })
}