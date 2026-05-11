import { sendToActiveTab } from "@/apis/google-message"

export function setupPageSummaryButton(element: HTMLButtonElement) {
    element.addEventListener('click', async () => {
        try{
            await sendToActiveTab({ type: 'PAGE_SUMMARY' })
        } catch (e) {
            return
        }
    })
}