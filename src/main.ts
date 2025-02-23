import { apiUri, imigoApiResponse } from "./constsant"
import "./style.css"
//import { translate2I } from "./translate"

let isLoaded = false
let dict: [string, string, string, string][] = []
let collocationDict: [string, string, string, string][] = []

function findWord(value: string) {
  let result = []
  for (const word of dict) {
    if (word[0].includes(value) || word[1].includes(value)) {
      result.push([word[0], word[2], word[1], word[3]])
    }
  }
  for (const word of collocationDict) {
    if (word[0].includes(value) || word[1].includes(value)) {
      result.push([word[0], '熟語/用例', word[1], word[2]])
    }
  }
  return result
}

function showResult(inputword: string) {
  if (!isLoaded) alert('読み込み中です！')
  rb.innerHTML = ''
  findWord(inputword).sort((a, b) => {
    if (a[0].length - b[0].length === 0) return a[2].length - b[2].length
    return a[0].length - b[0].length
  }).forEach((word) => {
    rb.insertAdjacentHTML('beforeend', `
      <div class="word">
        <span class="word_title">${word[0]}</span>
        <span class="word_type">${word[1]}</span>
        <p class="word_mean">${word[2]}</p>
        <p class="word_description">${word[3]}</p>
      </div>
    `.trim())
  })
}

//const tj = document.querySelector('#translate-japanese') as HTMLTextAreaElement
//const ti = document.querySelector('#translate-imish') as HTMLTextAreaElement

const si = document.querySelector('#search') as HTMLInputElement
const sb = document.querySelector('#search-button') as HTMLButtonElement
const rb = document.querySelector('#result') as HTMLDivElement

/*tj.addEventListener('change', () => {
  ti.value = ''
  translate2I(dict.map((v) => {return { word: v[0], mean: v[1], type: v[2] }}), tj.value).forEach((word) => {
    ti.value += word.word + ' '
  })
})*/

sb.addEventListener('click', () => {
  showResult(si.value)
})

fetch(apiUri)
  .then((res) => res.json())
  .then((data: imigoApiResponse) => {
    dict = data.イミ語辞書.slice(1)
    collocationDict = data.イミ語熟語.slice(1)
    isLoaded = true
    document.querySelector('.warn')?.classList.add('close')
    showResult('')
  })
