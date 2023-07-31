(function () {
  // =========================
  // Variables
  // =========================

  // $ - prefix, element from DOM

  const $lbFullWrap = document.querySelectorAll('.lightbox__full');
  const $lbCloseZoom = document.querySelectorAll('.lightbox__zoom_close');
  const $lbThumbnails = document.querySelectorAll('.lightbox__thumb');
  const $lbZoom = document.querySelectorAll('.lightbox__zoom');

  // =========================
  // Events
  // =========================

  $lbFullWrap?.forEach(fullWrap => {
    fullWrap.addEventListener("click", (e) => openZoomContainer(e));
  });

  $lbCloseZoom?.forEach(btnClose => {
    btnClose.addEventListener("click", (e) => closeZoomContainer(e));
  });

  $lbThumbnails?.forEach(thumb => {
    thumb.addEventListener("click", (e) => openMdImg(e));
  });

  $lbZoom?.forEach(zoomContainer => {
    zoomContainer.addEventListener("click", (e) => closeZoomContainer(e));
  });

  window && window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      pressEscapeKey()
    };
  });

  // =========================
  // Functions
  // =========================

  function openZoomContainer(e) {
    const $curLightbox = e.target.closest(".lightbox");
    const $curMdImg = $curLightbox.querySelector(".lightbox__full img");
    const $curMdImgSm = $curLightbox.querySelector(".lightbox__full source");
    const $zoomContainer = $curLightbox.querySelector(".lightbox__zoom");
    const $zoomImg = $zoomContainer?.querySelector("img");


    if (window.innerWidth <= 420) {
      $zoomImg.src = $curMdImgSm.srcset;
    } else {
      $zoomImg.src = $curMdImg.src;
    }
    $zoomContainer?.setAttribute("active", "");
  }


  function closeZoomContainer(e = null) {
    if (e) {
      const $zoomContainer = e.target?.closest(".lightbox__zoom");
      $zoomContainer?.removeAttribute("active");
    }
  }


  function openMdImg(e) {
    const $curThumbImg = e.target.querySelector("img");
    const $curThumbImgSm = e.target.querySelector("source");
    const $curLightbox = e.target.closest(".lightbox");
    const $curMdImg = $curLightbox.querySelector(".lightbox__full img");
    const $curMdImgSm = $curLightbox.querySelector(".lightbox__full source");
    let temp = $curThumbImg.src;

    if (window.innerWidth <= 420) {
      temp = $curThumbImgSm.srcset;
      $curThumbImgSm.srcset = $curMdImgSm.srcset;
      $curMdImgSm.srcset = temp;
    } else {
      $curThumbImg.src = $curMdImg.src;
      $curMdImg.src = temp;
    }
  }


  function pressEscapeKey() {
    const _zoomBlocks = document.querySelectorAll('.lightbox__zoom');

    if (_zoomBlocks && _zoomBlocks.length > 0) {
      _zoomBlocks.forEach(el => {
        el.removeAttribute("active");
      });
    }
  }
})();