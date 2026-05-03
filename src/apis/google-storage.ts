import { defaultUserOptions } from "@/helpers/default-user-options"
import { UserOptions } from "@/types/user-options"

export async function saveOptions(options: Partial<UserOptions>): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(options, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve()
      }
    })
  })
}

export async function loadOptions(): Promise<UserOptions> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(
      Object.keys(defaultUserOptions),
      (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)

          return
        }

        resolve({
          ...defaultUserOptions,
          ...result
        })
      }
    )
  })
}