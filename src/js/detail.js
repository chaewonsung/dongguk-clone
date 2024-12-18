import '/src/styles/detail.scss';
import './common.js';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

window.addEventListener('load', function () {
  gsap.registerPlugin(ScrollTrigger);

  new Swiper('section.story .swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: 'section.story .swiper-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: 'section.story .swiper-button-prev',
      nextEl: 'section.story .swiper-button-next',
    },
    breakpoints: {
      650: { slidesPerView: 2 },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /* Section : Notice - Icon Animation */
  gsap.to('section.notice [class*=icon]', {
    width: '1em',
    margin: '0 0.3em',
    stagger: 0.4,
  });
});
