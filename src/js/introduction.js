import './common.js';
import $ from 'jquery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

/* Icon Animation */
gsap.utils.toArray('[class*="anim"]').forEach((elem) => {
  ScrollTrigger.create({
    trigger: elem,
    onEnter: () => elem.classList.add('active'),
    onLeaveBack: () => elem.classList.remove('active'),
  });
});

/* Infinite Phrase */
// gsap
//   .timeline({
//     scrollTrigger: {
//       trigger: 'section.infinite-phrase',
//       scrub: 0,
//     },
//   })
//   .to('.infinite-phrase .to-left', {
//     x: innerWidth / -2,
//     ease: 'none',
//   })
//   .to(
//     '.infinite-phrase .to-right',
//     {
//       x: innerWidth / 2,
//       ease: 'none',
//     },
//     0
//   );
