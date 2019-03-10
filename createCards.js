export default function createCards(data) {
  const app = document.getElementById('app')

  data.forEach((el, i) => {
    if (i === 0) return null
    const card = document.createElement('div')

    card.classList.add('player', 'card', 'player-' + i)
    app.appendChild(card)
  })

  return data
}