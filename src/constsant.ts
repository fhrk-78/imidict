export const apiUri = "https://script.google.com/macros/s/AKfycbyza2dErTrE1xpzXYmAzxFk3je4komShmmaoDXx45_ZVnsv1vfE2DJrnAzjHbNgklO64Q/exec"
export type imigoApiResponse = {
    イミ語辞書: [[string, string, string, string]],
    イミ語熟語: [[string, string, string, string]]
}
export const imigoApiWordType = {
    NOUN:"名詞",
    VERB:"動詞",
    ADJECTIVE:"形容詞",
    AUXILIARY_VERB:"助動詞",
    ADVERB:"副詞",
    SPECIAL:"特殊",
    EXCLAMATION:"感嘆詞",
    CONJUNCTION:"接続詞",
    IDIOM:"熟語"
}
export type imigoWordType = (typeof imigoApiWordType)[keyof typeof imigoApiWordType]
