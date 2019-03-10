import emojiRegex from 'emoji-regex'

const TAGS_NUMBER = 9
const NOT_EMOJI_REGEX = /[^\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
const emRegex = emojiRegex()
const tagsAmounts = new Array(TAGS_NUMBER).fill(0)
let data
const cardTitle = document.createElement('H2')
const bookNamesParagraph = document.createElement('P')
const booksAmountParagraph = document.createElement('P')
const booksAmount = countBooks(i)
const tags = {
  paper: {
    emoji: '📗',
    count: 0,
  },
  electronic: {
    emoji: '⚡',
    count: 0,
  },
  audio: {
    emoji: '🎧',
    count: 0,
  },
  manga: {
    emoji: '🌸',
    count: 0,
  },
  comics: {
    emoji: '🖼️',
    count: 0,
  },
  foreignLang: {
    emoji: '🇰🇿',
    count: 0,
  },
  rereaded: {
    emoji: '🔄',
    count: 0,
  },
  purchased: {
    emoji: '💲',
    count: 0,
  },
  favorite: {
    emoji: '⭐',
    count: 0,
  },
}

// @todo export default 

export default function addCardsContent(appData, booksTags) {
  data = appData
  const cards = document.querySelectorAll('.card')
  console.log(booksTags);

  cards.forEach((card, i) => {
    // console.log('CARD==>', card)



    // parseData(booksTags, i)
    appendBooksAmount(card, booksAmount, booksAmountParagraph)
    countTags(tags, booksTags)
    appendTags(tags, card)
  })
}

const countBooks = function (i) {
  let booksAmount = 0;
  for (let j = 0; j < data[i].length; j++) {
    const bookNamesExpr = j < 3 ? false : (j - 3) % 5 === 0
    let cell = data[i + 1][j]

    if (bookNamesExpr && cell !== '') {
      booksAmount += 1
    }
  }

  return booksAmount
}

const appendTags = (tags, card) => {
  const tagsParagraph = document.createElement('P')

  tagsParagraph.className = 'tags'
  for (const type in tags) {
    // console.log('TAG_TYPE==>', type)
    const emoji = document.createTextNode(tags[type].emoji)
    const count = document.createTextNode(tags[type].count)

    if (tags[type].count === 0) {
      card.append(tagsParagraph)
    } else if (tags[type].count === 1) {
      tagsParagraph.appendChild(emoji)
      card.append(tagsParagraph)
    } else {
      tagsParagraph.appendChild(count)
      tagsParagraph.appendChild(emoji)
      card.append(tagsParagraph)
    }
  }
}

const countTags = (tags, booksTags) => {
  const tagsStr = booksTags.join('')
  const countEmoji = (emoji) => {
    const re = new RegExp(`${emoji}`, "g")

    // console.log('==> ', tagsStr, '==>', tagsStr.match(re))
    if (tagsStr.match(re)) return tagsStr.match(re).length

    return 0
  }

  for (let k = 0; k < booksTags.length; k++) {
    if (booksTags[k] !== '') {
      // console.log('BOOKS_TAGS==>', booksTags[k]);
      switch (booksTags[k]) {
        case tags.paper.emoji:
          tags.paper.count = countEmoji(tags.paper.emoji);
        case tags.manga.emoji:
          tags.manga.count = countEmoji(tags.manga.emoji);
        case tags.comics.emoji:
          tags.comics.count = countEmoji(tags.comics.emoji);
        case tags.electronic.emoji:
          tags.electronic.count = countEmoji(tags.electronic.emoji);
        case tags.audio.emoji:
          tags.audio.count = countEmoji(tags.audio.emoji);
        case tags.foreignLang.emoji:
          tags.foreignLang.count = countEmoji(tags.foreignLang.emoji);
        case tags.rereaded.emoji:
          tags.rereaded.count = countEmoji(tags.rereaded.emoji);
        case tags.purchased.emoji:
          tags.purchased.count = countEmoji(tags.purchased.emoji);
        case tags.favorite.emoji:
          tags.favorite.count = countEmoji(tags.favorite.emoji);
        default:
          break;
      }
    }
  }
}

const appendBooksAmount = (card, booksAmount, paragraph) => {
  paragraph.className = 'books-amount'
  for (let i = 0; i < booksAmount; i++) {
    // if (i > 0) console.log('PLAYER_REPORT==>', i, data[i])
    const bookEmoji = document.createElement('SPAN')
    bookEmoji.className = 'book-emoji'
    bookEmoji.append('📘')
    paragraph.append(bookEmoji)
  }
  paragraph.dataset.booksAmount = booksAmount === 0 ? '¯\\_(ツ)_/¯' : booksAmount
  if (card.className !== 'next-month') card.append(paragraph)
}

const appendCardTitle = (card, cardTitle, i) => {
  if (data[i + 1][1] !== '') {
    cardTitle.append(data[i + 1][1])
    card.append(cardTitle)
    return
  }
  cardTitle.append('Следующий месяц')
  card.append(cardTitle)
  card.className = 'next-month'
}