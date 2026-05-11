export function setupOptionsButton(element: HTMLButtonElement) {
    element.addEventListener('click', async () => {
        await chrome.runtime.openOptionsPage()
    })
}