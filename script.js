import createCards from './createCards.js'
import collectData from './collectData.js'
import {
  addCardsContent
} from './addCardsContent.js'

const app = document.getElementById('app')

while (app.firstChild) {
  app.removeChild(app.firstChild);
}

window.fetch(
    'https://script.google.com/macros/s/AKfycbwSOfTrDxmPwief24p8ipCMdzA5xG8fSnGWi1ObIwZle9SrSPs/exec'
  )
  .then(response => response.json())
  .then(({
    result
  }) => createCards(result))
  .then(collectData)
  .then(({
    data,
    booksTags
  }) => addCardsContent(data, booksTags))