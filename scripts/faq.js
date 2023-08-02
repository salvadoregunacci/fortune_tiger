(function () {
  // =========================
  // Variables
  // =========================

  // $ - prefix, element from DOM

  const $faqTitles = document.querySelectorAll('.faq__item_header');

  // =========================
  // Events
  // =========================

  $faqTitles?.forEach(faq => {
    faq.addEventListener("click", onClickFaq);
  });

  // =========================
  // Functions
  // =========================

  function onClickFaq(e) {
    const curItem = e.target.closest(".faq__item");

    curItem.toggleAttribute("active");
    document.querySelectorAll('.faq__item').forEach(item => item !== curItem ? item.removeAttribute("active") : null);
  }
})()