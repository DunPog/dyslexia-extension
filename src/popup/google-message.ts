export async function sendToActiveTab(message: object) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    if (tab.id !== undefined) {
        await chrome.tabs.sendMessage(tab.id, message)
    }
}