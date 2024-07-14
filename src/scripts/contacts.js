const createInput = (type, placeholder) => {
  const input = document.createElement('input');
  input.className = 'contact__input';
  input.type = type;
  input.placeholder = placeholder;
  return input;
};

const createSelect = (selectedGroup) => {
  const select = document.createElement('select');
  select.className = 'contact__select';
  if (!selectedGroup) {
    const defaultOpt = document.createElement('option');
    defaultOpt.textContent = 'Выберите группу';
    defaultOpt.disabled = true;
    defaultOpt.selected = true;
    defaultOpt.hidden = true;
    select.append(defaultOpt);
  }

  const savedData = localStorage.getItem('groups') || '{}';
  const groupsList = Object.keys(JSON.parse(savedData));
  groupsList.forEach((group) => {
    const opt = document.createElement('option');
    opt.value = group;
    opt.textContent = group;
    opt.selected = group === selectedGroup;
    select.append(opt);
  });
  return select;
};

export const nameInput = createInput('text', 'Введите ФИО');
export const telInput = createInput('number', 'Введите номер');

export const Contact = (target, contact) => {
  const CONTACT = document.createElement('div');
  CONTACT.className = 'contact';

  let groupInput;
  if (target === 'edit') {
    nameInput.value = contact.name;
    telInput.value = contact.tel;
    groupInput = createSelect(contact.group);
  } else {
    nameInput.value = '';
    telInput.value = '';
    groupInput = createSelect();
  }

  CONTACT.append(nameInput, telInput, groupInput);
  return CONTACT;
};
