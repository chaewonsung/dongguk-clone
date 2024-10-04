import '/src/styles/index.scss';
import $ from 'jquery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* GSAP Reuse Function */

/* Header */
$('.full-header-buttons').on('click', function () {
  $('.container').toggleClass('full-header-on');
  $('.container').hasClass('full-header-on')
    ? fullHeaderTl.play()
    : fullHeaderTl.restart().pause();
});

const fullHeaderTl = gsap
  .timeline({ defaults: { duration: 0.4 }, paused: true, repeatRefresh: true })
  .fromTo('.full-header ', { yPercent: -100 }, { yPercent: 0 })
  .to('.full-header-fake-bg', { yPercent: 100 })
  .fromTo(
    '.full-header-gnb a',
    { autoAlpha: 0, yPercent: 100 },
    { autoAlpha: 1, yPercent: 0, stagger: 0.1 }
  )
  .fromTo(
    '.full-header .address-content',
    { yPercent: 100 },
    { yPercent: 0, duration: 0.3 }
  )
  .fromTo('.full-header-icon', { autoAlpha: 0 }, { autoAlpha: 1 })
  .fromTo(
    '.full-header-icon .rotate-v2',
    { rotate: -5 },
    {
      rotate: 15,
      repeat: -1,
      yoyo: true,
      yoyoEase: 'power2-out',
      duration: 1,
    }
  );

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

/* Section : Introduction - Icon Animation */
const iconTween = gsap.from('section.introduction [class*=icon]', {
  width: 0,
  margin: 0,
  stagger: 0.4,
  paused: true,
  delay: 0.2,
});

ScrollTrigger.create({
  trigger: 'section.introduction',
  start: 'top 90%',
  onEnter: () => iconTween.play(),
  onLeaveBack: () => iconTween.restart(true).pause(),
});

/* Footer - Related Site */
$('footer .related-site').on('click', function () {
  $(this).toggleClass('active');
  $('.site-link-list').toggle();
});
