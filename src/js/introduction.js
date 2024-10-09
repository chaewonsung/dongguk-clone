import '/src/styles/introduction.scss';
import './common.js';
import $ from 'jquery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

window.addEventListener('load', function () {
  gsap.registerPlugin(ScrollTrigger);

  /* Load Animation */
  gsap
    .timeline()
    .from('.center-list li', {
      yPercent: 100,
      autoAlpha: 0,
      stagger: {
        grid: [1, 5],
        from: 'edges',
        each: 0.1,
      },
    })
    .to('.center-intro-bg-icon .rotate', {
      rotate: 30,
      repeat: -1,
      yoyo: true,
      yoyoEase: 'power1.out',
      duration: 1.2,
    });

  /* Infinite Phrase */
  gsap
    .timeline({
      scrollTrigger: {
        trigger: 'section.infinite-phrase',
        scrub: 0,
        invalidateOnRefresh: true,
        // Change Main Bg Color
        onEnter: () => $('main').addClass('green'),
        onLeaveBack: () => $('main').removeClass('green'),
      },
    })
    .to('.infinite-phrase .to-left', {
      x: () => innerWidth / -2,
      ease: 'none',
    })
    .fromTo(
      '.infinite-phrase .to-right',
      {
        x: (i, el) => -(el.scrollWidth - innerWidth),
      },
      { x: () => `+=${innerWidth / 2}` },
      0
    );
});
