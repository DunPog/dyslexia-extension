const fonts = [
  'Arial, sans-serif',
  'Verdana, sans-serif',
  '"Trebuchet MS", sans-serif',
]

const fontSelect = document.createElement('select')
const fontSizeInput = document.createElement('input')
const applyBtn = document.createElement('button')
const resetBtn = document.createElement('button')
const status = document.createElement('p')

document.body.style.cssText = 'padding:16px; width:240px; font-family:sans-serif;'

const title = document.createElement('h3')
title.textContent = 'Font Modifier'
title.style.marginTop = '0'

fonts.forEach(f => {
  const opt = document.createElement('option')
  opt.value = f
  opt.textContent = f.split(',')[0].replace(/"/g, '')
  fontSelect.appendChild(opt)
})
fontSelect.style.cssText = 'width:100%; margin-bottom:8px;'

fontSizeInput.type = 'range'
fontSizeInput.min = '16'
fontSizeInput.max = '19'
fontSizeInput.value = '16'
fontSizeInput.style.cssText = 'width:100%; margin-bottom:4px;'

const sizeLabel = document.createElement('label')
sizeLabel.textContent = 'Font size: 16px'

applyBtn.textContent = 'Apply'
applyBtn.style.cssText = 'margin-right:8px; padding:6px 12px; cursor:pointer;'

resetBtn.textContent = 'Reset'
resetBtn.style.cssText = 'padding:6px 12px; cursor:pointer;'

status.style.cssText = 'font-size:12px; color:gray; margin-top:8px;'

document.body.append(title, fontSelect, fontSizeInput, sizeLabel, document.createElement('br'), applyBtn, resetBtn, status)

fontSizeInput.addEventListener('input', () => {
  sizeLabel.textContent = `Font size: ${fontSizeInput.value}px`
})

async function sendToActiveTab(message: object) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  if (tab.id !== undefined) {
    await chrome.tabs.sendMessage(tab.id, message)
  }
}

applyBtn.addEventListener('click', async () => {
  const fontFamily = fontSelect.value
  const fontSize = `${fontSizeInput.value}px`

  await sendToActiveTab({ type: 'APPLY_FONT', fontFamily, fontSize })
})

resetBtn.addEventListener('click', async () => {
  await sendToActiveTab({ type: 'RESET_FONT' })
})