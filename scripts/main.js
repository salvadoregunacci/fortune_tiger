(function () {
  // =========================
  // Variables
  // =========================

  // $ - prefix, element from DOM

  const $burgerBtn = document.querySelector('.header__burger');
  const $dropdowns = document.querySelectorAll('.dropdown');
  const $toTopBtn = document.querySelector('.to_top_btn');

  const $searchTriggers = document.querySelectorAll('.search__trigger');
  const $searchModal = document.querySelector('.search__modal');
  const $closeSearchModal = document.querySelector('.search__close_btn');
  const $searchInput = document.querySelector('.search input');

  const $langsTriggers = document.querySelectorAll('.langs__trigger');
  const $langsModal = document.querySelector('.langs__modal');
  const $closeLangsModal = document.querySelector('.langs__close_btn');

  const $cookie = document.querySelector('.cookies');
  const $closeCookieBtn = document.querySelector('.cookies__close_btn');

  const $policyInputs = document.querySelectorAll('.form__policy_input');
  const $formsSubmit = document.querySelectorAll('.form');

  let $titleSections = document.querySelectorAll('.title_section');
  const $navigationMenu = document.querySelector('.navigation__menu');

  // swipe touch
  let startX;
  let startY;
  let threshold = 100;

  // =========================
  // Events
  // =========================

  window && window.addEventListener("click", (e) => {
    const _isDropmenu = e.target && e.target.closest(".dropdown");

    if (_isDropmenu) {
      return;
    }

    $dropdowns?.forEach(el => {
      el.classList.remove("active");
    });
  });

  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.addEventListener('touchmove', (e) => {
    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;
    let diffX = startX - currentX;
    let diffY = startY - currentY;

    const isTableTouch = e.target.closest("table");

    if (isTableTouch) return;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > threshold && window.innerWidth <= 1250) {
        _closeMenu();
      } else if (diffX < -threshold) {
        _openMenu();
      }
    }
  });

  document.addEventListener('touchend', (e) => {
    startX = null;
    startY = null;
  });

  window.addEventListener('scroll', addVisibleClassTitle);
  window.addEventListener('load', addVisibleClassTitle);

  $formsSubmit?.forEach(item => {
    item.addEventListener("submit", onSubmitForm);
  });

  $policyInputs?.forEach(item => {
    item.addEventListener("change", onChangePolicy);
  });

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      if (window && !window.localStorage.getItem("cookie") && $cookie && !$cookie.classList.contains("active")) {
        $cookie.classList.add("active");
      }
    }, 2000);
  });

  $closeCookieBtn?.addEventListener("click", () => {
    $cookie?.classList.remove("active");
    window.localStorage.setItem("cookie", true);
  });

  $dropdowns?.forEach(el => {
    el.addEventListener("click", (e) => {
      const _curEl = e.target.closest(".dropdown");

      $dropdowns.forEach(item => {
        if (item !== _curEl) {
          item.classList.remove("active");
        }
      });

      if (_curEl) {
        _curEl.classList.toggle("active");
      }
    });
  });

  $burgerBtn?.addEventListener("click", () => {
    $burgerBtn.classList.toggle("active");
    $navigationMenu.classList.toggle("active");
  });

  $searchTriggers?.forEach(item => {
    item.addEventListener("click", () => {
      if ($searchModal && $searchInput) {
        $searchInput.focus();
        $searchModal.classList.add("active");
      }
    });
  });

  $langsTriggers?.forEach(item => {
    item.addEventListener("click", () => {
      item.classList.add("active");

      if ($langsModal) {
        $langsModal.classList.add("active");
      }
    });
  });

  $closeSearchModal?.addEventListener("click", () => {
    if ($searchModal) {
      $searchModal.classList.remove("active");
    }
  });

  $closeLangsModal?.addEventListener("click", () => {
    closeLangsModal();
  });

  $langsModal?.addEventListener("click", (e) => {
    if (e.target.classList.contains("langs__modal")) {
      closeLangsModal();
    }
  });

  window && window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") pressEscapeKey();
  });

  $toTopBtn?.addEventListener("click", scrollToTop);

  window.addEventListener("scroll", onScrollPage);

  // =========================
  // Functions
  // =========================

  function _openMenu() {
    if ($navigationMenu && $burgerBtn && !$burgerBtn.classList.contains("active")) {
      $burgerBtn.classList.add("active");
      $navigationMenu.classList.add("active");
    }
  }


  function _closeMenu() {
    if ($navigationMenu && $burgerBtn && $burgerBtn.classList.contains("active")) {
      $burgerBtn.classList.remove("active");
      $navigationMenu.classList.remove("active");
    }
  }


  function onSubmitForm(e) {
    e.preventDefault();
    const _curForm = e.target;

    if (_curForm && _curForm.classList.contains("disabled")) {
      const _errField = _curForm.querySelector(".form__error");
      const _policy = _curForm.querySelector(".form__policy");

      if (_errField && _policy) {
        _errField.textContent = _policy.getAttribute("data-text-err") || "Ошибка валидации";
        _errField.classList.add("active");

        setTimeout(() => _errField.classList.remove("active"), 3000);
      }

      return;
    }

    _curForm && _curForm.submit();
  }


  function onChangePolicy(e) {
    if (e.target && e.target.tagName === "INPUT") {
      const _parentForm = e.target.closest(".form");

      if (!_parentForm) return;

      if (e.target.checked) {
        _parentForm.classList.remove("disabled");
      } else {
        _parentForm.classList.add("disabled");
      }
    }
  }


  function onScrollPage(e) {
    const _triggerHeight = getTenPercentOfPageHeight();
    const _scrollY = getScrollTop();

    if (!$toTopBtn) return;

    if (_scrollY > _triggerHeight) {
      $toTopBtn.classList.add("active");
    } else {
      $toTopBtn.classList.remove("active");
    }
  }


  function getTenPercentOfPageHeight() {
    const pageHeight = Math.max(
      document.documentElement.clientHeight,
      document.body.clientHeight
    );

    const tenPercent = 0.1 * pageHeight;
    return tenPercent;
  }


  function getScrollTop() {
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }


  function scrollToTop() {
    if (!window) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  function pressEscapeKey() {
    if ($searchModal && $searchModal.classList.contains("active")) {
      $searchModal.classList.remove("active");
    }

    if ($langsModal && $langsModal.classList.contains("active")) {
      closeLangsModal();
    }

    if ($dropdowns && $dropdowns.length) {
      $dropdowns.forEach(item => {
        item.classList.remove("active");
      });
    }
  }


  function closeLangsModal() {
    if ($langsModal) {
      $langsModal.classList.add("close");
      $langsTriggers.forEach(item => item.classList.remove("active"));

      setTimeout(() => {
        $langsModal.classList.remove("close");
        $langsModal.classList.remove("active");
      }, 800);
    }
  }


  function addVisibleClassTitle() {
    $titleSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const threshold = windowHeight * 0.2;

      if (sectionTop < windowHeight - threshold) {
        section.classList.add('visible');
      }
    });
  };
})();