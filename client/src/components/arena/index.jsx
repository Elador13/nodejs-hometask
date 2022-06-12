import React from 'react';
import {createElement} from "./domHelper";
import "./styles/styles.css"
import {fight} from "./fight";
import {showWinnerModal} from "./winner";
import {createFighterImage} from "./fighterPreview";


function createArena(selectedFighters) {
  //Force set images
  console.log(selectedFighters)
  selectedFighters[0].source = "https://66.media.tumblr.com/tumblr_lq8g3548bC1qd0wh3o1_400.gif"
  selectedFighters[1].source = "http://www.fightersgeneration.com/np5/char/ssf2hd/bison-hdstance.gif"
  const arena = createElement({tagName: 'div', className: 'arena___root'});
  const healthIndicators = createHealthIndicators(...selectedFighters);
  const fighters = createFighters(...selectedFighters);
  arena.append(healthIndicators, fighters);
  return arena;
}

function createHealthIndicators(leftFighter, rightFighter) {
  const healthIndicators = createElement({tagName: 'div', className: 'arena___fight-status'});
  const versusSign = createElement({tagName: 'div', className: 'arena___versus-sign'});
  const leftFighterIndicator = createHealthIndicator(leftFighter, 'left');
  const rightFighterIndicator = createHealthIndicator(rightFighter, 'right');

  healthIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator);
  return healthIndicators;
}

function createHealthIndicator(fighter, position) {
  const {name} = fighter;
  const container = createElement({tagName: 'div', className: 'arena___fighter-indicator'});
  const fighterName = createElement({tagName: 'span', className: 'arena___fighter-name'});
  const indicator = createElement({tagName: 'div', className: 'arena___health-indicator'});
  const bar = createElement({
    tagName: 'div',
    className: 'arena___health-bar',
    attributes: {id: `${position}-fighter-indicator`}
  });

  fighterName.innerText = name;
  indicator.append(bar);
  container.append(fighterName, indicator);

  return container;
}

function createFighters(firstFighter, secondFighter) {
  const battleField = createElement({tagName: 'div', className: `arena___battlefield`});
  const firstFighterElement = createFighter(firstFighter, 'left');
  const secondFighterElement = createFighter(secondFighter, 'right');

  battleField.append(firstFighterElement, secondFighterElement);
  return battleField;
}

function createFighter(fighter, position) {
  const imgElement = createFighterImage(fighter);
  const positionClassName = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const fighterElement = createElement({
    tagName: 'div',
    className: `arena___fighter ${positionClassName}`,
  });

  fighterElement.append(imgElement);
  return fighterElement;
}

class Arena extends React.Component {
  componentDidMount() {
    this.startFight(this.props.fighters)
  }

  startFight(selectedFighters) {
    this.renderArena(selectedFighters);
  }

  renderArena(selectedFighters) {
    const root = document.getElementById('root');
    const arena = createArena(selectedFighters);
    const [firstFighter, secondFighter] = selectedFighters
    root.innerHTML = '';
    root.append(arena);

    fight(firstFighter, secondFighter)
      .then(fighter => {
        this.props.onFightEnd({
          fighter1: selectedFighters[0].name,
          fighter2: selectedFighters[1].name,
          winner: fighter.name
        })
        showWinnerModal(fighter)
      })

  }

  render() {
    return (
      <div id="rootFight">
      </div>
    );
  }
}

export default Arena;
