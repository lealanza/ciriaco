const copyMenu = () => {
    let dptCategory = document.querySelector('.dpt-cat')
    let dptPlace = document.querySelector('.departments')
    dptPlace.innerHTML = dptCategory.innerHTML;
    let mainNav = document.querySelector('.header-nav nav')
    let navPlace = document.querySelector('.off-canvas nav')
    navPlace.innerHTML = mainNav.innerHTML;
    let topNav = document.querySelector('.header-top')
    let topPlace = document.querySelector('.off-canvas .thetop-nav')
    topPlace.innerHTML = topNav.innerHTML;

}

copyMenu();

const menuButton = document.querySelector('.trigger'), 
        closeButton = document.querySelector('.t-close'),
        addClass = document.querySelector('.site');


menuButton.addEventListener('click', function(){
    addClass.classList.toggle('showmenu')
});
closeButton.addEventListener('click', function(){
    addClass.classList.remove('showmenu')
});

const subMenu = document.querySelectorAll('.has-child .icon-small');
subMenu.forEach((menu) => menu.addEventListener('click', toggle));

const toggle = (e) => {
    e.preventDefault();
    subMenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('expand'): null);
    if(this.closet('.has-child').classList!='expand');
    this.closet('.has-child').classList.toggle('expand')
}

