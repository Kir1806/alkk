export const headerButton = document.querySelector('.menu__button');
export const rightsideMenu = document.querySelector('.rightside-menu');
export const closeHeaderButton = document.querySelector('.rightside-menu__header-button');

headerButton.addEventListener('click', () => {
    rightsideMenu.classList.remove('rightside-menu--close');
});

closeHeaderButton.addEventListener('click', () => {
    rightsideMenu.classList.add('rightside-menu--close');
});