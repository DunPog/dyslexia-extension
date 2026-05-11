import './options.css'
import { idDictionary } from '@/helpers/constants/id-dictionary'

const geminiApiKeyUrl = 'https://aistudio.google.com/app/apikey'

document.querySelector('#options')!.innerHTML = `
    <div>
        <h3>Dyslexia Extension Options</h3>
        <span class="span span-bold">Gemini API key:</span>
        <input id=${idDictionary.optionsApiKeyInput} type="password"/>
        <button id=${idDictionary.optionsApiKeyButton}>Save</button>
        <br>
        <span class="span">Obtain your own Gemini API key using the following link: <a href="${geminiApiKeyUrl}" target="_blank">${geminiApiKeyUrl}</a></span>
    </div>
`

const apiKeyInput = document.getElementById(idDictionary.optionsApiKeyInput) as HTMLInputElement
const apiKeyButton = document.getElementById(idDictionary.optionsApiKeyButton) as HTMLButtonElement

const apiKeyResult = await chrome.storage.local.get('apiKey')

if (typeof apiKeyResult.apiKey === 'string') {
    apiKeyInput.value = apiKeyResult.apiKey
}

apiKeyButton.addEventListener('click', async () => {
    await chrome.storage.local.set({ apiKey: apiKeyInput.value })

    alert('Saved API Key')
})