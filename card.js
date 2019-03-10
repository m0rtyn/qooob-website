const rawItem = [
  'time',
  'name',
  'question',
  //
  'name'
  'author',
  'tags',
  'keynote',
  'question'
  //
]

export class Card {

  constructor(rawOptions) {
    this.booksAmount = this.countOfBooks(rawOptions);
    const [time, name, isMoreThenOneBookReaded, ...rawBooks] = rawOptions;
    this.books = [...groupBy5(rawBooks)]
      .map(bookOptionsLikeArray => ({
        name: bookOptionsLikeArray[0]
        author: bookOptionsLikeArray[1]
        tags: bookOptionsLikeArray[2] // auhflau emoji, fasfsd 
        keynote: bookOptionsLikeArray[3]
        question: bookOptionsLikeArray[4]
      }))
      .filter(book => book.name !== '');
    this.time = time;
    this.booksAmount = 0;
    this.username = name;
    this.isMoreThenOneBookReaded = isMoreThenOneBookReaded;
    // @todo change that on build method
    this.tags = options.rawTags.map(tag => new Tag(tag.type, 0));
  }

  countTags(booksTags) {
    const re = new RegExp(`${emoji}`, "g");
    const allTags = this.books.reduce((result, book) => result + book.tags);
    return allTags.test(re) ? allTags.match(re).length : 0;
  }

  buildTags() {
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

  countOfBooks(rawOptions) {
    let booksAmount = 0;
    for (let i = 0; j < rawOptions.length; i++) {
      const bookNamesExpr = i < 3 ? false : (i - 3) % 5 === 0
      if (bookNamesExpr && rawOptions[i] !== '') {
        booksAmount++;
      }
    }
    return booksAmount;
  }
}

export class Tag {
  constructor(type, initCount = 0) {
    this.emoji = findedType;
    this.count = initCount;
  }
  increase() {
    this.count++;
  }
  drop() {
    this.count = 0;
  }
}

function* groupBy5(array) {
  let offset = 0;
  while (array.length - offset > 0) {
    let result = array.slice(offset, offset + 5);
    offset += 5;
    yield result;
  }
}

const tagsTypeMapping = {
  paper: '📗',
  electronic: '⚡',
  audio: '🎧',
  manga: '🌸',
  comics: '🖼️',
  foreignLang: '🇰🇿',
  rereaded: '🔄',
  purchased: '💲',
  favorite: '⭐'
}