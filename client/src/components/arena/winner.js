import {showModal} from "./modal";
import {createFighterImage} from "./fighterPreview";

export function showWinnerModal(fighter) {
  let winnerImage = createFighterImage(fighter)
  winnerImage.setAttribute('class', 'arena___winner')
  showModal({
    title: `The winner is ${fighter.name}`,
    bodyElement: winnerImage,
    // eslint-disable-next-line no-restricted-globals
    onClose: () => location.reload()
  })
}
