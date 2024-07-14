export const GroupItem = (name) => {
  const ITEM = document.createElement('div');
  ITEM.className = 'group';

  const title = document.createElement('div');
  title.className = 'group__title';
  title.textContent = name;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'group__deleteButton';

  const deleteGroup = (e) => {
    const data = JSON.parse(localStorage.getItem('groups'));
    delete data[name];
    localStorage.setItem('groups', JSON.stringify(data));

    const currentGroups = e.target.closest('.groups');
    const asideHeader = document.querySelector('.aside__header');
    currentGroups.remove();
    const updatedGroups = Groups();
    asideHeader.after(updatedGroups);
  };

  deleteButton.addEventListener('click', deleteGroup);

  ITEM.append(title, deleteButton);
  return ITEM;
};

export const Groups = () => {
  const GROUPS = document.createElement('div');
  GROUPS.className = 'groups';
  const data = localStorage.getItem('groups');

  if (!data) return GROUPS;

  const groupsList = Object.keys(JSON.parse(data));
  groupsList.forEach((item) => {
    const groupItem = GroupItem(item);
    GROUPS.append(groupItem);
  });
  return GROUPS;
};

export const GroupField = () => {
  const GroupField = document.createElement('div');
  GroupField.className = 'group';

  const input = document.createElement('input');
  input.className = 'group__input';
  input.type = 'text';
  input.placeholder = 'Введите название';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'group__deleteButton';
  deleteButton.addEventListener('click', () => GroupField.remove());
  GroupField.append(input, deleteButton);
  return GroupField;
};
