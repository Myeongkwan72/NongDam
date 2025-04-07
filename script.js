// main banner 슬라이드
$(document).ready(function () {
  $(".main_banner").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplayspeed: 3000,
    pauseOnFoucus: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});

// recipe 슬라이드
$(document).ready(function () {
  $(".main_recipe").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    // autoplay: true,
    // autoplayspeed: 3000,
    pauseOnFoucus: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
