import '/src/styles/index.scss';
import $ from 'jquery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Main - Change Bg Color */
ScrollTrigger.create({
  trigger: 'section.program-guide',
  start: 'top bottom-=130',
  end: 'bottom bottom-=230',
  toggleClass: { targets: 'main', className: 'yellow' },
  onLeave() {
    $('main').addClass('orange');
  },
  onEnterBack() {
    $('main').removeClass('orange');
  },
});

/* Section : Greeting - Animation */

const greetingEmojiTl = gsap
  .timeline({
    defaults: { repeat: -1, yoyo: true, yoyoEase: 'power1.out', duration: 1 },
  })
  .to('.greeting-emoji .rotate-v1', {
    rotate: 360,
    inherit: false,
    repeat: -1,
    duration: 10,
    ease: 'none',
  })
  .fromTo(
    '.greeting-emoji .rotate-v2',
    { rotate: 5 },
    {
      rotate: 20,
    },
    0
  )
  .fromTo(
    '.greeting-emoji .rotate-v3',
    { rotate: -5 },
    {
      rotate: -20,
    },
    0
  );

gsap
  .timeline({})
  .fromTo('.greeting-center .anim-01', { scale: 0 }, { scale: 1 })
  .fromTo('.greeting-center .anim-02', { opacity: 0 }, { opacity: 1 })
  .fromTo(
    '.greeting-center .anim-03',
    { scale: 2, opacity: 0 },
    { scale: 1, opacity: 1 }
  )
  .add(greetingEmojiTl);

/* Section : Slogan Animation */
ScrollTrigger.create({
  trigger: 'section.slogan',
  start: '40% bottom',
  onEnter() {
    sloganTl.play();
  },
  onLeaveBack() {
    sloganTl.reverse();
  },
});
const sloganTl = gsap
  .timeline({ paused: true })
  .to('.slogan-phrase-bg', {
    rotateX: 90,
    transformOrigin: 'bottom center',
    stagger: 0.3,
  })
  .to(
    '.slogan-phrase .absolute',
    {
      rotateX: 90,
      transformOrigin: 'bottom center',
      stagger: (index) => (index < 2 ? 0 : 0.3),
    },
    0
  )
  .fromTo(
    '.slogan-phrase .static',
    { rotateX: 90, transformOrigin: 'top center' },
    { rotateX: 0, stagger: (index) => (index < 2 ? 0 : 0.3) },
    0
  );

/* Section : Program guide - Letter Animation */
gsap.utils.toArray('.letter-item').forEach((item) => {
  const q = gsap.utils.selector(item);
  const letterTl = gsap
    .timeline({ paused: true, defaults: { duration: 0.3 }, delay: 0.3 })
    .to(q('.letter-envelope-close-img'), { rotateX: 180 })
    .set(q('.letter-envelope-close-img'), { zIndex: 0 })
    .to(q('.letter-paper'), { y: 0 })
    .to(q('.letter-envelope-inner-img'), { display: 'block' }, '<')
    .to(q('.letter-envelope-close-img'), { autoAlpha: 0 }, '<');

  item.addEventListener('mouseenter', function () {
    gsap.to(q('.letter-bubble'), { autoAlpha: 0, duration: 0.3 });
    letterTl.play();
  });
  item.addEventListener('mouseleave', function () {
    gsap.to(q('.letter-bubble'), { autoAlpha: 1 });
    letterTl.reverse();
  });
});

/* Footer - Related Site */
$('footer .related-site').on('click', function () {
  $(this).toggleClass('active');
  $('.site-link-list').toggle();
});
