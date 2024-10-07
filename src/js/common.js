import '/src/styles/introduction.scss';
import $ from 'jquery';
import { gsap } from 'gsap';

$('.header-include').load('/pages/includes/header.html', function () {
  $('.full-header-buttons').on('click', function () {
    $('.container').toggleClass('full-header-on');
    $('.container').hasClass('full-header-on')
      ? fullHeaderTl.play()
      : fullHeaderTl.restart().pause();
  });

  const fullHeaderTl = gsap
    .timeline({
      defaults: { duration: 0.4 },
      paused: true,
      repeatRefresh: true,
    })
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
});
$('.footer-include').load('/pages/includes/footer.html', function () {
  /* Footer - Related Site */
  $('footer .related-site').on('click', function () {
    $(this).toggleClass('active');
    $('.site-link-list').toggle();
  });
});
