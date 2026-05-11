import { sendToActiveTab } from "@/apis/google-message"
import { loadingStyle } from "@/helpers/constants/loading-style"

let loadingStyleElement : HTMLStyleElement | null = null

export function setupPageSummaryButton(element: HTMLButtonElement) {
    element.addEventListener('click', async () => {
        try {
            element.disabled = true

            loadingStyleElement = document.createElement('style')
            loadingStyleElement.id = '__loading-style__'
            document.head.appendChild(loadingStyleElement)

            loadingStyleElement.textContent = loadingStyle

            await sendToActiveTab({ type: 'PAGE_SUMMARY' })
        } catch (e) {
            return
        } finally {
            element.disabled = false

            if (loadingStyleElement !== null) {
                document.head.removeChild(loadingStyleElement)
            }

            loadingStyleElement = null
        }
    })
}