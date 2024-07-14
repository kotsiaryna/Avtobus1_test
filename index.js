import { createAside } from './src/scripts/aside';
import { BG } from './src/scripts/background';
import { createMain } from './src/scripts/main';
import './styles.scss';

export const HEADER = document.querySelector('header');
const MAIN = createMain();
HEADER.after(MAIN);
const GROUPS = document.querySelector('.contacts__groups');
const CONTACTS = document.querySelector('.contacts__add');

export const addAside = (target) => {
  const ASIDE = createAside(target);
  const MAIN = document.querySelector('main');
  MAIN.before(BG, ASIDE);
};

GROUPS.addEventListener('click', () => addAside('groups'));
CONTACTS.addEventListener('click', () => addAside('contacts'));
