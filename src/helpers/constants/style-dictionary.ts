export const styleDictionary = {
    fontFamily: (value:string) => value ? `font-family: ${value} !important` : undefined,
    fontSize: (value:string) => value ? `font-size: ${value}px !important` : undefined,
    interLetterSpacing: (value:string) => value ? `letter-spacing: ${value}% !important` : undefined,
    interWordSpacing: (value:string) => value ? `word-spacing: ${value}% !important` : undefined,
    lineSpacing: (value:string) => value ? `line-height: ${value} !important` : undefined,
    textColor: (value:string) => value ? `color: ${value} !important` : undefined,
} as const