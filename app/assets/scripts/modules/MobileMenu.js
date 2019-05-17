import $ from 'jquery';

class MobileMenu {
    constructor(){
        //Selection
        this.siteHeader = $(".site-header");
        this.menuIcon = $(".site-header__menu-icon");
        this.menuContent = $(".site-header__menu-content");
        this.events();

    }

    //Event Handling
    events(){
        this.menuIcon.click(this.toggleTheMenu.bind(this));
    }

    //Manage Functionality
    /*The this keyword here is set to the DOM element of the event and NOT the object itself. We need to use bind in the event to get to the object itself.*/
    toggleTheMenu() {
        this.menuContent.toggleClass("site-header__menu-content--is-visible");
        this.siteHeader.toggleClass("site-header--is-expanded");
        this.menuIcon.toggleClass("site-header__menu-icon--close-x");
    }

}

export default MobileMenu;