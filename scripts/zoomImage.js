(function () {
  // =========================
  // Variables
  // =========================

  // $ - prefix, element from DOM

  const $fullModal = document.querySelector('.full_modal');
  const $fullModalContent = document.querySelector('.full_modal__content');
  const $imageContainer = document.querySelector('.full_modal__box');
  const $screenboxes = document.querySelectorAll('.screenbox img');
  const $zoomImages = document.querySelectorAll('.zoom_img');
  let _zoomed = false;


  // =========================
  // Events
  // =========================

  $zoomImages?.forEach(item => {
    item.addEventListener("click", onClickSimpleZoom);
  });

  $screenboxes?.forEach(item => {
    item.addEventListener("click", onOpenFullScreenbox);
  });

  $fullModal?.addEventListener("click", closeZoomModal);

  if ($imageContainer) {
    $imageContainer.style.transform = 'scale(1)';
    $imageContainer.addEventListener('click', onZoomImage);
  }

  window && window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") pressEscapeKey();
  });

  // =========================
  // Functions
  // =========================

  function pressEscapeKey() {
    if ($fullModal && $fullModal.classList.contains("active")) {
      closeZoomModal();
    }
  }


  function onClickSimpleZoom(e) {
    e.stopPropagation();

    const _el = e.target && e.target.closest(".zoom_img");
    let _actualPath = null;

    if (!(_el && _el.tagName === "IMG" && $imageContainer)) return;

    if (window.innerWidth <= 420) {
      _actualPath = _el.getAttribute("data-sm-path");
    } else {
      _actualPath = _el.getAttribute("data-lg-path");
    }

    $imageContainer.insertAdjacentHTML("beforeend", `<img src="${_actualPath ?_actualPath : _el.src}" alt="${_el.alt}">`);
    $fullModal.classList.add("active");
  }


  function onOpenFullScreenbox(e) {
    e.stopPropagation();

    let _el = e.target;
    let isOtherSource = false;

    if (!(_el && $fullModal && _el.tagName === "IMG" && $imageContainer)) return;


    if (window.innerWidth <= 420) {
      _el = _el.closest(".screenbox");
      _el = _el && _el.querySelector("source");

      if (_el) isOtherSource = true;
    }

    $imageContainer.insertAdjacentHTML("beforeend", `<img src="${isOtherSource ? _el.srcset : _el.src}" alt="${_el.alt}">`);
    $fullModal.classList.add("active");
  }


  function onZoomImage(e) {
    e.stopPropagation();

    if (_zoomed) {
      $fullModalContent?.classList.remove("zoom");
      $imageContainer.style.transformOrigin = 'center center';
      $imageContainer.style.transform = 'scale(1)';
      _zoomed = false;
    } else {
      const rect = $imageContainer.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      $imageContainer.style.transformOrigin = `${mouseX}px ${mouseY}px`;
      $imageContainer.style.transform = 'scale(2)';
      $fullModalContent?.classList.add("zoom");
      _zoomed = true;
    }
  }


  function closeZoomModal() {
    $fullModal.classList.remove("active");
    $fullModalContent.classList.remove("zoom");
    $imageContainer.style.transform = 'scale(1)';
    $imageContainer.innerHTML = '';
    _zoomed = false;
  }

})();