(function () {
  // =========================
  // Variables
  // =========================

  // $ - prefix, element from DOM

  const $burgerBtn = document.querySelector('.header__burger');
  const $dropdowns = document.querySelectorAll('.dropdown');

  const $searchTriggers = document.querySelectorAll('.search__trigger');
  const $searchModal = document.querySelector('.search__modal');
  const $closeSearchModal = document.querySelector('.search__close_btn');
  const $searchInput = document.querySelector('.search input');

  const $langsTriggers = document.querySelectorAll('.langs__trigger');
  const $langsModal = document.querySelector('.langs__modal');
  const $closeLangsModal = document.querySelector('.langs__close_btn');

  const $cookie = document.querySelector('.cookies');
  const $closeCookieBtn = document.querySelector('.cookies__close_btn');

  // =========================
  // Events
  // =========================

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      if (window && !window.localStorage.getItem("cookie") && $cookie && !$cookie.classList.contains("active")) {
        $cookie.classList.add("active");
      }
    }, 2500);
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
    // $navigation.toggleAttribute("active");
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

  // =========================
  // Functions
  // =========================

  function pressEscapeKey() {
    if ($searchModal && $searchModal.classList.contains("active")) {
      $searchModal.classList.remove("active");
    }

    if ($langsModal && $langsModal.classList.contains("active")) {
      closeLangsModal();
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
})();