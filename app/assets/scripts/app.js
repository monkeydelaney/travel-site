import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import Modal from './modules/Modal';
import StickyHeader from './modules/StickyHeader';
import $ from 'jquery';


var mobileMenu = new MobileMenu();
new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".testimonial"), "85%");
var stickyHeader = new StickyHeader();
var modal = new Modal();