$(document).on('ready', function () {

  /*-------------------------------------------------------------------------------
    PRE LOADER
  -------------------------------------------------------------------------------*/

  $(window).load(function () {
    $('.preloader').fadeOut(1000);
  });

  /*-------------------------------------------------------------------------------
    jQuery Parallax
  -------------------------------------------------------------------------------*/

  function initParallax() {
    $('#home').parallax('50%', 0.3);

  }

  initParallax();

  /*-------------------------------------------------------------------------------
    LazyLoad
  -------------------------------------------------------------------------------*/

  function updateBgForMobile(selector, value) {
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    if (mobile) {
      selector.setAttribute('data-bg', value);
    }
  }

  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
    load_delay: 300,
    callback_enter: () => {
      const homeId = document.getElementById('home');
      updateBgForMobile(homeId, 'url(../img/home-bg_78.jpg)');
    }
  });

  /*-------------------------------------------------------------------------------
    Back top
  -------------------------------------------------------------------------------*/

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('.go-top').fadeIn(200);
    } else {
      $('.go-top').fadeOut(200);
    }
  });

  // Animate the scroll to top
  $('.go-top').click(function (event) {
    event.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 300);
  });

});
