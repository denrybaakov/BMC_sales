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




  //===================== category-list =====================
  $('.navigation li').hover(function () {
    clearTimeout($.data(this, 'timer'));

    $('ul', this).stop(true, true).css({ 'display': 'flex' }).slideDown(200);

  }, function () {
    $.data(this, 'timer', setTimeout($.proxy(function () {
      $('ul', this).stop(true, true).slideUp(200);
    }, this), 100));
  });





  var res = $('.category-list__dop');
  $('#list-more').on("click", function () {
    res.fadeIn(2000);
    res.css({ 'display': 'block' }).fadeIn(2000);
    $(this).css({ 'display': 'none' })
  });








  //======================= modal ===============================

  var modal = $('.modal'),
    modalBtn = $('[data-toggle=modal]'),
    closeBtn = $('.modal__close'),
    scrollBtn = $('.scroll-top'),
    modalDialog = $('.modal__dialog');

  var closeReview = $('.review__close');
  var modalReview = $('.review');

  modalBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });

  closeBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });

  closeReview.on('click', function () {
    modalReview.removeClass('review--visible');
  })

  // close esc
  $(this).keydown(function (event) {
    if (event.which == 27) {
      modal.removeClass('modal--visible');
      modalReview.removeClass('review--visible');
    }
  });

  //---close click
  $(this).mouseup(function (event) {
    if (event.target != modalDialog[0] && modalDialog.has(event.target).length === 0) {
      modal.removeClass('modal--visible');
      modalReview.removeClass('review--visible');
    }
  });




  //=============== валидация формы =================
  $('.modal__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило, converted to {required:true}
      userName: {
        required: true,
        minlength: 2
      },
      userPhone: {
        required: true,
        minlength: 18
      },
      // правило-объект
      userEmail: {
        required: true,
        email: true
      },
      policyCheckbox: {
        required: true
      }
    }, // сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        minlength: "Имя не короче 2-х букв"
      },
      userPhone: {
        required: "Телефон обязательно",
        minlength: "Телефон должен быть полным"
      },
      userEmail: {
        required: "Обязательно укажите корректный Email",
        email: "Введите в формате example@mail.ru"
      },
      policyCheckbox: {
        required: "Необходимо дать согласие"
      }
    },
    submitHandler: function (form) {
      event.preventDefault();
      $.ajax({
        type: "POST",
        url: "./send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          // $('.modal').hide();
          modal.removeClass('modal--visible');

          $('.review').addClass('review--visible');

        }
      });
    },
    errorPlacement: function (error, element) { // -----ошибка checkbox ))))
      if (element.attr("type") == "checkbox") {
        return element.next('label').append(error);
      }
      error.insertAfter($(element));
    }
  });

  closeBtn.on('click', function () {
    modal.removeClass('modal--visible');
  });


  //=================== Mask Phone =====================
  $('[type=tel]').mask('+7 (000) 000-00-00', { placeholder: "Ваш номер телефона: " });




  //==================== select =============================

  $('.select').each(function () {
    const _this = $(this),
      selectOption = _this.find('option'),
      selectOptionLength = selectOption.length,
      selectedOption = selectOption.filter(':selected'),
      duration = 10; // длительность анимации 

    $(this).hide();
    $(this).wrap('<div class="select"></div>');
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
      duration = 0; // длительность анимации 

    $(this).hide();
    $(this).wrap('<div class="select2"></div>');
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


//================= animation modal =========================

// let link = document.querySelector('.login-link');
let popup = document.querySelector('.modal__dialog');
let close = popup.querySelector('.modal-close');

let form = popup.querySelector('.modal__form');
let name = popup.querySelector('[name=userName]');
let phone = popup.querySelector('[name=userPhone]');
let email = popup.querySelector('[name=userEmail]');
// let password = popup.querySelector('[name=password]');

form.addEventListener("submit", function (evt) {
  if (!name.value || !phone.value || !email.value) {
    evt.preventDefault();
    //небольшой хак  анимация ошибки отрабатывала несколько раз
    popup.classList.remove('js-modal-error');
    popup.offsetWidth = popup.offsetWidth;

    popup.classList.add('js-modal-error');

  }
});



//=========================== timer ===============================
