var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
      navigator.userAgent
    )
      ? !0
      : !1;
  var Scrollbar = window.Scrollbar;
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.BackToTop();
      Init.preloader();
      Init.header();
      Init.wow();
      Init.counterCircle();
      Init.timepicker();
      Init.slick();
      Init.dropdown();
      Init.formValidation();
      Init.contactForm();
      Init.pricetoggle();
    },

    BackToTop: function () {
      var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
      var rootElement = document.documentElement;
      function handleScroll() {
        var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
        if (rootElement.scrollTop / scrollTotal > 0.05) {
          scrollToTopBtn.classList.add("showBtn");
        } else {
          scrollToTopBtn.classList.remove("showBtn");
        }
      }
      function scrollToTop() {
        rootElement.scrollTo({ top: 0, behavior: "smooth" });
      }
      scrollToTopBtn.addEventListener("click", scrollToTop);
      document.addEventListener("scroll", handleScroll);
    },
    preloader: function () {
      setTimeout(function () {
        $("#preloader").fadeOut("slow");
      }, 800);
    },

    w: function (e) {
      if (isMobile) {
        $("body").addClass("is-mobile");
      }
    },

    header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }
      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }
      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".mobile-nav__container"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".sticky-header__content"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          // let toggleBtn = document.createElement("BUTTON");
          // toggleBtn.setAttribute("aria-label", "dropdown toggler");
          // toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          // self.append(function () {
          //   return toggleBtn;
          // });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }
      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }
      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
    },
    wow: function () {
      if ($(".wow").length) {
        var wow = new WOW({
          boxClass: "wow",
          animateClass: "animated",
          mobile: true,
          live: true,
        });
        wow.init();
      }
    },
    counterCircle: function () {
      $(".circle_percent").each(function () {
        var $this = $(this),
          $dataV = $this.data("percent"),
          $dataDeg = $dataV * 3.6,
          $round = $this.find(".round_per");

        $round.css("transform", "rotate(" + parseInt($dataDeg + 180) + "deg)");

        $this.append(
          '<div class="circle_inbox"><span class="percent_text"></span></div>'
        );

        $this.prop("Counter", 0).animate(
          { Counter: $dataV },
          {
            duration:4200,
            easing: "swing",
            step: function (now) {
              $this.find(".percent_text").text(Math.ceil(now) + "%");
            },
          }
        );

        if ($dataV >= 51) {
          $round.css("transform", "rotate(360deg)");
          setTimeout(function () {
            $this.addClass("percent_more");
          }, 1000);
          setTimeout(function () {
            $round.css(
              "transform",
              "rotate(" + parseInt($dataDeg + 180) + "deg)"
            );
          }, 1000);
        }
      });
    },
    timepicker: function () {
      $("#numberInput").on("input", function () {
        $(this).val(
          $(this)
            .val()
            .replace(/[^0-9]/g, "")
        );
      });
    },

    slick: function () {
      if ($(".service-slider").length) {
        $(".service-slider").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          variablewidth: false,
          draggable: true,
          arrows: false,
          dots: true,
          lazyLoad: "linear",
          speed: 850,
          autoplaySpeed: 2000,
          responsive: [
            {
              breakpoint: 821,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 599,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
      }
      if ($(".horoscope-slider").length) {
        $(".horoscope-slider").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          variablewidth: false,
          draggable: true,
          arrows: false,
          dots: true,
          lazyLoad: "linear",
          speed: 850,
          autoplaySpeed: 2000,
          responsive: [
            {
              breakpoint: 821,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 599,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
      }
      if ($(".testimonial-slider").length) {
        $(".testimonial-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          variablewidth: false,
          draggable: true,
          arrows: false,
          dots: true,
          lazyLoad: "linear",
          speed: 850,
          autoplaySpeed: 2000,
        });
      }

      $(".btn-prev").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickPrev");
      });
      $(".btn-next").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickNext");
      });
    },

    pricetoggle: function () {
      $("#checkboxInput").on("change", function () {
        const block1 = $("#block-1");
        const block2 = $("#block-2");

        if ($(this).prop("checked")) {
          block1.fadeOut(500, function () {
            block1.removeClass("active");
            block2.addClass("active").fadeIn(500);
          });
        } else {
          block2.fadeOut(500, function () {
            block2.removeClass("active");
            block1.addClass("active").fadeIn(500);
          });
        }
      });
    },

    dropdown: function () {
      const selectedAll = document.querySelectorAll(".wrapper-dropdown");

      selectedAll.forEach((selected) => {
        const optionsContainer = selected.children[2];
        const optionsList = selected.querySelectorAll(
          "div.wrapper-dropdown li"
        );

        selected.addEventListener("click", () => {
          let arrow = selected.children[1];

          if (selected.classList.contains("active")) {
            handleDropdown(selected, arrow, false);
          } else {
            let currentActive = document.querySelector(
              ".wrapper-dropdown.active"
            );

            if (currentActive) {
              let anotherArrow = currentActive.children[1];
              handleDropdown(currentActive, anotherArrow, false);
            }

            handleDropdown(selected, arrow, true);
          }
        });

        // update the display of the dropdown
        for (let o of optionsList) {
          o.addEventListener("click", () => {
            selected.querySelector(".selected-display").innerHTML = o.innerHTML;
          });
        }
      });

      window.addEventListener("click", function (e) {
        if (e.target.closest(".wrapper-dropdown") === null) {
          closeAllDropdowns();
        }
      });

      function closeAllDropdowns() {
        const selectedAll = document.querySelectorAll(".wrapper-dropdown");
        selectedAll.forEach((selected) => {
          const optionsContainer = selected.children[2];
          let arrow = selected.children[1];

          handleDropdown(selected, arrow, false);
        });
      }

      function handleDropdown(dropdown, arrow, open) {
        if (open) {
          arrow.classList.add("rotated");
          dropdown.classList.add("active");
        } else {
          arrow.classList.remove("rotated");
          dropdown.classList.remove("active");
        }
      }
    },

    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
      if ($(".login-form").length) {
        $(".login-form").validate();
      }
    },
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h5 class='color-primary mt-16 mb-16'>Email Sent Successfully</h5>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h5 class='color-primary mt-16 mb-16'>There is an error</h5>";
              }
              $("#messages").show("slow");
              $("#messages").slideDown("slow");
              setTimeout(function () {
                $("#messages").slideUp("hide");
                $("#messages").hide("slow");
              }, 4000);
            },
          });
        } else {
          return !1;
        }
      });
    },
  };
  Init.i();
})(window, document, jQuery);
