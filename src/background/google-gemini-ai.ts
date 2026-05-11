import { geminiPromptBuilder } from "@/helpers/functions/gemini-prompt-builder"

const geminiApiKey = 'AIzaSyAGoqiszJrlvWuMGaxZ82QxDjhPhwB4eMc'//import.meta.env.GEMINI_API_KEY

chrome.runtime.onMessage.addListener(async (message, _sender, sendResponse) => {
    if (message.type === 'GENERATE_AI_SUMMARY') {
        const response = await callGemini(message.text)

        sendResponse({ result: response })
    }

    return true
})

async function callGemini(text: string) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': geminiApiKey
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

    const json = await response.json()

    return json.candidates?.[0]?.content?.parts?.[0]?.text
}