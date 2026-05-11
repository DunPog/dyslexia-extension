export function geminiPromptBuilder(text: string) {
    return `
        You are a helpful assistant.

        TASK:
        Restructure the article according to the following criteria:
        - Use an active rather than passive voice
        - Be concise; avoid using long, dense paragraphs
        - Write in simple clear language using every day words
        - Consider using bullet points and numbering rather than continuous prose
        - Give instructions clearly
        - Avoid double negatives
        - Avoid jargon and abbreviations where possible; always provide the expanded form when first used. Provide a glossary of jargon

        ARTICLE:
        ${text}
    `
}