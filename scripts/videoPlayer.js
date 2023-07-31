(function () {
  // =========================
  // Variables
  // =========================

  // $ - prefix, element from DOM

  let $playerWrap = document.getElementById("video_player");
  const $videoPosters = document.querySelectorAll('.video__poster');

  // =========================
  // Events
  // =========================

  if (!$playerWrap) {
    _addPlayer();
  }

  if ($videoPosters && $videoPosters.length > 0) {
    $videoPosters.forEach(item => {
      item.addEventListener("click", uploadVideo);
    });
  }

  window && window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") pressEscapeKey();
  });

  // =========================
  // Functions
  // =========================

  function pressEscapeKey() {
    if ($playerWrap && $playerWrap.classList.contains("active")) {
      closeVideoPlayer();
    }
  }

  function uploadVideo(e) {
    const _parentEl = e.target.closest(".video__poster");

    if (!(_parentEl && $playerWrap)) return;

    const _sourceURL = _parentEl.getAttribute("data-video-url");
    $playerWrap.innerHTML = '';

    if (!_sourceURL) return;

    const _url = new URL(_sourceURL);
    const _queryParams = new URLSearchParams(_url.search);
    const _videoId = _queryParams.get('v');

    const _iframeTemplate = `
    <iframe
      src="https://www.youtube.com/embed/${_videoId}?autoplay=1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      style="max-width: 1280px; max-height: 720px; width: 100%; height: 100%;"
    >
    </iframe>
  `;

    $playerWrap.insertAdjacentHTML("beforeend", _iframeTemplate);
    $playerWrap.classList.add("active");
    $playerWrap.addEventListener("click", overClickVideoPlayer)
  }


  function overClickVideoPlayer(e) {
    const _tEl = e.target;

    if (_tEl && _tEl.id === "video_player") {
      closeVideoPlayer();
    }
  }


  function closeVideoPlayer() {
    if (!$playerWrap) return;

    $playerWrap.classList.remove("active");
    $playerWrap.innerHTML = '';
  }


  function _addPlayer() {
    const _player = document.createElement("div");
    _player.id = "video_player";
    document.body.append(_player);

    $playerWrap = document.getElementById("video_player");
  }
})();

