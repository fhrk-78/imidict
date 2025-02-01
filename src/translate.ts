import { imigoWordType } from "./constsant"

const segmenter = new Intl.Segmenter("ja", { granularity: "word" });

export function translate2I(dict:{
    word: string,
    mean: string,
    type: imigoWordType
}[], target: string) {
    let result: {
        word: string,
        mean: string,
        type: imigoWordType
    }[] = []
    for (const word of [...segmenter.segment(target)]) {
        if (/.*は/.test(word.segment)) {
            result.push({
                word: word.segment.slice(0, -1).concat('n'),
                mean: '',
                type: '動詞'
            })
            continue
        }

        let candidate: [{
            word: string,
            mean: string,
            type: imigoWordType
        }, Intl.SegmentData][] = []
        dict.forEach((item) => {
            if (item.mean.includes(word.segment)) {
                candidate.push([item, word])
            }
        })
        if (candidate.length > 0) {
            const sorted = candidate.sort((a, b) => (word.segment.length - b[0].mean.length) - (word.segment.length - a[0].mean.length))
            result.push(sorted[0][0])
        }
    }
    return result
}
