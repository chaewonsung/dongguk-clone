import '/src/styles/index.scss';
import './common.js';
import $ from 'jquery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

window.addEventListener('load', function () {
  gsap.registerPlugin(ScrollTrigger);

  /* Main - Change Bg Color */
  ScrollTrigger.create({
    trigger: 'section.program-guide',
    start: 'top bottom',
    end: 'bottom bottom',
    onEnter() {
      $('main').removeClass().addClass('yellow');
    },
    onLeaveBack() {
      $('main').removeClass().addClass('green');
    },
    onLeave() {
      $('main').removeClass().addClass('orange');
    },
    onEnterBack() {
      $('main').removeClass().addClass('yellow');
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
    .timeline()
    .fromTo(
      '.greeting-center .img-01',
      { scale: 0, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1 }
    )
    .fromTo('.greeting-center .img-02', { autoAlpha: 0 }, { autoAlpha: 1 })
    .fromTo(
      '.greeting-center .img-03',
      { scale: 2, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1 }
    )
    .add(greetingEmojiTl);

  /* Section : Program guide - Letter Animation */
  gsap.utils.toArray('.letter-item').forEach((item) => {
    const q = gsap.utils.selector(item);
    const letterTl = gsap
      .timeline({ paused: true, defaults: { duration: 0.3 }, delay: 0.3 })
      .to(q('.letter-envelope-close-img'), { rotateX: 180 })
      .set(q('.letter-envelope-close-img'), { zIndex: 0 })
      .to(q('.letter-paper'), { y: 0 })
      .to(q('.letter-envelope-in-img'), { display: 'block' }, '<')
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

  let sloganTl;

  ScrollTrigger.create({
    trigger: 'section.slogan',
    start: 'top bottom',
    onEnter() {
      sloganTl.play();
    },
    onLeaveBack() {
      sloganTl.restart(true).pause();
    },
  });

  gsap.matchMedia().add('(min-width: 769px)', () => {
    /* Section : Slogan Animation */

    sloganTl = gsap
      .timeline({ paused: true, delay: 0.3 })
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
  });

  gsap.matchMedia().add('(max-width: 768px)', () => {
    sloganTl = gsap
      .timeline({
        paused: true,
        delay: 0.3,
        defaults: { stagger: 0.2, duration: 0.4 },
      })
      .to('section.slogan .absolute', {
        rotateX: 90,
        transformOrigin: 'bottom center',
      })
      .fromTo(
        'section.slogan .static',
        { rotateX: 90, transformOrigin: 'top center' },
        { rotateX: 0 },
        0
      );
  });
});
