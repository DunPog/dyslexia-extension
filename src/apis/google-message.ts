export async function sendToActiveTab(message: object) {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

        if (tab.id !== undefined) {
            await chrome.tabs.sendMessage(tab.id, message)
        }
    } catch (e) {
        return null
    }
}

export async function sendToActiveTabAndGetResponse(message: object) {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

        if (tab.id !== undefined) {
            return await chrome.tabs.sendMessage(tab.id, message)
        }
    } catch (e) {
        return null
    }
}