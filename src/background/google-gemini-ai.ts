import { geminiPromptBuilder } from "@/helpers/functions/gemini-prompt-builder"

chrome.runtime.onMessage.addListener(async (message, _sender, sendResponse) => {
    if (message.type === 'GENERATE_AI_SUMMARY') {
        const summary = await callGemini(message.text)

        sendResponse({ status: summary.response, result: summary.text })

        return true
    }
})

async function callGemini(text: string) {
    const geminiApiKey = await chrome.storage.local.get('apiKey')

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': typeof geminiApiKey.apiKey === 'string' ? geminiApiKey.apiKey : ''
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: geminiPromptBuilder(text)
                            }
                        ]
                    }
                ]
            })
        }
    )

    console.log(response)

    const json = await response.json()

    return {
        response: response.status, 
        text: json.candidates?.[0]?.content?.parts?.[0]?.text
    }
}