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
        const [tab] = await chrome.tabs.query({ active: true, currentWindow:true })

        if (!tab.id) {
            return
        }

        const response = await chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_READING_RULER' })

        active = response?.active ?? false

        await saveOptions({ readingRulerActive: active })

        updateButton()
    })
}