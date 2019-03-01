export default function (data) {
  const app = document.getElementById('app')

  data.forEach((el, i) => {
    if (i === 0) return
    const card = document.createElement('div')

    card.classList.add('player', 'card', 'player-' + i)
    app.appendChild(card)
  })

  return data
}