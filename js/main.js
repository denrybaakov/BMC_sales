$(document).ready(function () {
  var swiperSchool = new Swiper('.school-form__swiper', {
    loop: true,
    navigation: {
      nextEl: '.school-form__next',
      prevEl: '.school-form__prev',
    },
  });

  var swiperService = new Swiper('.service__swiper', {
    loop: true,
    navigation: {
      nextEl: '.service-button__next',
      prevEl: '.service-button__prev',
    },
  });

  var swiperFavorite = new Swiper('.favorite__swiper', {
    loop: true,
    navigation: {
      nextEl: '.favorite-block-button__next',
      prevEl: '.favorite-block-button__prev',
    },
  });


  var galleryThumbs = new Swiper('.card-info__gallary-thumbs', {
    spaceBetween: 10,
    slidesPerView: 5,
    loop: true,
    freeMode: true,
    loopedSlides: 5, //looped slides should be the same
    watchSlidesVisibility: false,
    watchSlidesProgress: false,
  });
  var galleryTop = new Swiper('.card-info__gallary', {
    spaceBetween: 10,
    loop: true,
    loopedSlides: 5, //looped slides should be the same
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: galleryThumbs,
    },
  });






  //======================= SELECT ==============================
  $('.select').each(function () {
    const _this = $(this),
      selectOption = _this.find('option'),
      selectOptionLength = selectOption.length,
      selectedOption = selectOption.filter(':selected'),
      duration = 450; // длительность анимации 

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $('<div>', {
      class: 'new-select',
      text: _this.children('option:disabled').text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
      class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 1; i < selectOptionLength; i++) {
      $('<div>', {
        class: 'new-select__item',
        html: $('<span>', {
          text: selectOption.eq(i).text()
        })
      })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function () {
      if (!$(this).hasClass('on')) {
        $(this).addClass('on');
        selectList.slideDown(duration);

        selectItem.on('click', function () {
          let chooseItem = $(this).data('value');

          $('select').val(chooseItem).attr('selected', 'selected');
          selectHead.text($(this).find('span').text());

          selectList.slideUp(duration);
          selectHead.removeClass('on');
        });

      } else {
        $(this).removeClass('on');
        selectList.slideUp(duration);
      }
    });
  });


  $('.select2').each(function () {
    const _this = $(this),
      selectOption = _this.find('option'),
      selectOptionLength = selectOption.length,
      selectedOption = selectOption.filter(':selected'),
      duration = 450; // длительность анимации 

    _this.hide();
    _this.wrap('<div class="select2"></div>');
    $('<div>', {
      class: 'new-select2',
      text: _this.children('option:disabled').text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select2');
    $('<div>', {
      class: 'new-select__list2'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list2');
    for (let i = 1; i < selectOptionLength; i++) {
      $('<div>', {
        class: 'new-select__item2',
        html: $('<span>', {
          text: selectOption.eq(i).text()
        })
      })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item2');
    selectList.slideUp(0);
    selectHead.on('click', function () {
      if (!$(this).hasClass('on')) {
        $(this).addClass('on');
        selectList.slideDown(duration);

        selectItem.on('click', function () {
          let chooseItem = $(this).data('value');

          $('select').val(chooseItem).attr('selected', 'selected');
          selectHead.text($(this).find('span').text());

          selectList.slideUp(duration);
          selectHead.removeClass('on');
        });

      } else {
        $(this).removeClass('on');
        selectList.slideUp(duration);
      }
    });
  });

















});