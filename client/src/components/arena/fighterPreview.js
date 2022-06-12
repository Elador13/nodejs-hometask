import { createElement } from './domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  const fighterImage = createFighterImage(fighter)

  const fighterName = createElement({ tagName: 'h2', className: 'fighter-preview___name' });
  fighterName.innerHTML = fighter ? fighter.name : '';

  const fighterHealth = createElement({ tagName: 'h3', className: 'fighter-preview___health' });
  fighterHealth.innerHTML = fighter ? `Health: ${fighter.health}` : '';

  const fighterAtDef = createElement({ tagName: 'span', className: 'fighter-preview___attdef' });
  fighterAtDef.innerHTML = fighter ? `Attack: ${fighter.attack} / Defense: ${fighter.defense}` : '';

  fighterElement.append(fighterImage, fighterName, fighterHealth, fighterAtDef)

  return fighterElement;
}

export function createFighterImage(fighter = {source: '', name: ''}) {
  const { source, name} = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
