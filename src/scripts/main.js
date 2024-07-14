import { createAside } from './aside';
import { BG } from './background';

const createGroup = (title) => {
  const group = document.createElement('div');
  group.className = 'groupItem opened';
  group.textContent = title;

  const toggleOpen = () => {
    group.classList.toggle('opened');
    group.nextElementSibling.hidden = !group.classList.contains('opened');
  };
  group.addEventListener('click', toggleOpen);

  return group;
};

const createContact = (contact, group) => {
  const contactItem = document.createElement('div');
  contactItem.className = 'contactItem';

  const contactItemInner = document.createElement('div');
  contactItemInner.className = 'contactItem__inner';

  const name = document.createElement('div');
  name.className = 'contactItem__name';
  name.textContent = contact.name;

  const tel = document.createElement('div');
  tel.className = 'contactItem__tel';
  tel.textContent = contact.tel;

  const dataWrapper = document.createElement('div');
  dataWrapper.className = 'contactItem__data';

  dataWrapper.append(name, tel);

  const buttonCont = document.createElement('div');
  buttonCont.className = 'contactItem__buttons';

  const editButton = document.createElement('button');
  editButton.className = 'contactItem__editButton';

  const editContact = () => {
    const ASIDE = createAside('edit', contact);
    const MAIN = document.querySelector('main');
    MAIN.before(BG, ASIDE);
  };

  editButton.addEventListener('click', editContact);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'contactItem__deleteButton';

  const deleteContact = () => {
    contactItem.remove();
    const data = JSON.parse(localStorage.getItem('groups'));
    const index = data[group].findIndex((el) => el.tel === contact.tel);
    console.log(index);
    data[group].splice(index, 1);
    localStorage.setItem('groups', JSON.stringify(data));
  };

  deleteButton.addEventListener('click', deleteContact);

  buttonCont.append(editButton, deleteButton);

  contactItemInner.append(dataWrapper, buttonCont);
  contactItem.append(contactItemInner);

  return contactItem;
};

export const createMain = () => {
  const main = document.createElement('main');
  main.className = 'main';

  const savedData = localStorage.getItem('groups');
  if (!savedData || Object.values(JSON.parse(savedData)).every((value) => value.length === 0)) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'Список контактов пуст';
    main.append(empty);
    return main;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'main__wrapper';
  main.append(wrapper);
  const data = JSON.parse(savedData);

  for (let [group, list] of Object.entries(data)) {
    const groupItem = createGroup(group);
    const groupList = document.createElement('div');
    groupList.className = 'groupList';

    list.forEach((el) => {
      groupList.append(createContact(el, group));
    });
    if (list.length) wrapper.append(groupItem, groupList);
  }

  return main;
};
