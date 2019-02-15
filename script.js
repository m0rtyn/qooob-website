const createCards = (data) => {
  const app = document.getElementById('app')

  data.forEach((el, i) => {
    const card = document.createElement('div')

    card.classList.add('player', 'card', 'player-' + i)
    app.appendChild(card)
  })

  return data
}

const addCardContent = (arr) => {
  const cards = document.querySelectorAll('.card')
  cards.forEach((card, i) => {
    const name = document.createTextNode(arr[i][1])
    const bookNames = []
    const authors = []
    const tags = []
    const comments = []

    if (i === 0) return

    for (let j = 0; j < arr[i].length; j++) {
      const expression = num => (j - num) % 5 === 0
      const bookNamesExpr = expression(3)
      const authorsExpr = expression(4)
      const tagsExpr = expression(5)
      const commentsExpr = expression(6)

      switch (true) {
        // names: 3 8 13 18 23 28
        case 3:
          bookNames.push(arr[i][j])
          break;
        case bookNamesExpr:
          bookNames.push(arr[i][j])
          break;
        case authorsExpr:
          authors.push(arr[i][j])
          break;
        case tagsExpr:
          tags.push(arr[i][j])
          break;
        case commentsExpr:
          comments.push(arr[i][j])
          break;

        default:
          break;
      }
    }

    card.append(bookNames)
    card.append(authors)
    card.append(tags)
    card.append(comments)
  })
}

fetch(
    'https://script.google.com/macros/s/AKfycbwSOfTrDxmPwief24p8ipCMdzA5xG8fSnGWi1ObIwZle9SrSPs/exec',
  )
  .then(response => response.json())
  .then(({
    result,
  }) => createCards(result))
  .then(addCardContent)