import { HEADER } from '../..';
import { BG } from './background';
import { Contact, nameInput, telInput } from './contacts';
import { GroupField, GroupItem, Groups } from './groups';
import { createMain } from './main';

export const createAside = (target, contact) => {
  const ASIDE = document.createElement('aside');
  ASIDE.className = 'aside';
  // header
  const header = document.createElement('div');
  header.className = 'aside__header';

  const h2 = document.createElement('h2');
  h2.className = 'aside__h2';
  h2.textContent = target === 'groups' ? 'Группы контактов' : 'Добавление контакта';

  const deleteAside = (e) => {
    const aside = e.target.closest('.aside');
    BG.remove();
    aside.remove();
    const curMain = document.querySelector('main');
    curMain.remove();
    const updatedMain = createMain();
    HEADER.after(updatedMain);
  };
  const closeBtn = document.createElement('button');
  closeBtn.className = 'aside__closeBtn';
  closeBtn.addEventListener('click', deleteAside);

  header.append(h2, closeBtn);

  // main

  const main = target === 'groups' ? Groups() : Contact(target, contact);
  // buttons
  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'aside__buttons';
  const saveButton = document.createElement('button');
  saveButton.className = 'buttons__save';
  saveButton.textContent = 'Сохранить';
  buttonWrapper.append(saveButton);

  let saveButtonHandler;

  if (target === 'groups') {
    const addButton = document.createElement('button');
    addButton.className = 'buttons__add';
    addButton.textContent = 'Добавить';
    addButton.addEventListener('click', () => {
      const inputField = GroupField();
      main.append(inputField);
    });
    buttonWrapper.prepend(addButton);

    saveButtonHandler = () => {
      const input = main.querySelector('.group__input');
      if (!input || !input.value) return;
      const groupToAdd = input.value;
      const savedData = localStorage.getItem('groups');
      const parsedData = savedData ? JSON.parse(savedData) : {};
      parsedData[groupToAdd] = [];
      localStorage.setItem('groups', JSON.stringify(parsedData));
      const inputGroup = input.closest('.group');
      inputGroup.remove();
      main.append(GroupItem(groupToAdd));
    };
  } else {
    saveButtonHandler = (e) => {
      const name = nameInput.value;
      const tel = telInput.value;
      const groupInput = ASIDE.querySelector('.contact__select');
      const group = groupInput.value;

      if (!name || !tel || !group) return;
      const newContact = { name, tel, group };
      const savedData = localStorage.getItem('groups') || {};
      const data = JSON.parse(savedData);

      if (target === 'contacts') {
        data[group].push(newContact);
      } else {
        const index = data[contact.group].findIndex((el) => el.tel === contact.tel);
        if (newContact.group === contact.group) {
          data[group][index] = newContact;
        } else {
          data[contact.group].splice(index, 1);
          data[newContact.group].push(newContact);
        }
      }

      localStorage.setItem('groups', JSON.stringify(data));
      deleteAside(e);
    };
  }
  saveButton.addEventListener('click', saveButtonHandler);

  ASIDE.append(header, main, buttonWrapper);
  return ASIDE;
};
