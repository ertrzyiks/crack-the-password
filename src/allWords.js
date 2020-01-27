import trie from 'trie-prefix-tree'
import three from '../data/all_words_alpha_3'
import four from '../data/all_words_alpha_4'
import five from '../data/all_words_alpha_5'

export default {
  easy: trie(three),
  normal: trie(four),
  hard: trie(five)
}
