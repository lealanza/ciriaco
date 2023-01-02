const copyMenu = () => {
    var dptCategory = document.querySelector('.dpt-cat')
    var dptPlace = document.querySelector('.departments')
    dptPlace.innerHTML = dptCategory.innerHTML;
    var mainNav = document.querySelector('.header-nav nav')
    var navPlace = document.querySelector('.off-canvas nav')
    navPlace.innerHTML = mainNav.innerHTML;
    let topNav = document.querySelector('.header-top .wrapper')
    var topPlace = document.querySelector('.off-canvas .thetop-nav')
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

const submenu = document.querySelectorAll('.has-child');
submenu.forEach((menu) => menu.addEventListener('click', toggle));

function toggle (e){
    e.preventDefault();
    submenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('expand'): null);
    if(this.closest('.has-child').classList != 'expand');
    this.closest('.has-child').classList.toggle('expand')
}


