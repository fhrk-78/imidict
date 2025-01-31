import { apiUri, imigoApiResponse } from "./constsant"
import "./style.css"

let isLoaded = false
let dict: [string, string, string, string][] = []

function findWord(value: string) {
  let result = []
  for (const word of dict) {
    if (word[0].includes(value) || word[1].includes(value)) {
      result.push(word)
    }
  }
  return result
}

const si = document.querySelector('#search') as HTMLInputElement
const sb = document.querySelector('#search-button') as HTMLButtonElement
const rb = document.querySelector('#result') as HTMLDivElement

sb.addEventListener('click', () => {
  if (!isLoaded) alert('読み込み中です！')
  rb.innerHTML = ''
  findWord(si.value).forEach((word) => {
    rb.insertAdjacentHTML('beforeend', `
      <div class="word">
        <span class="word_title">${word[0]}</span>
        <span class="word_type">${word[2]}</span>
        <p class="word_mean">${word[1]}</p>
        <p class="word_description">${word[3]}</p>
      </div>
    `.trim())
  })
})

fetch(apiUri)
  .then((res) => res.json())
  .then((data: imigoApiResponse) => {
    dict = data.イミ語辞書.slice(1).sort()
    isLoaded = true
    dict.forEach((word) => {
      rb.insertAdjacentHTML('beforeend', `
        <div class="word">
          <span class="word_title">${word[0]}</span>
          <span class="word_type">${word[2]}</span>
          <p class="word_mean">${word[1]}</p>
          <p class="word_description">${word[3]}</p>
        </div>
      `.trim())
    })
  })
