(function () {
  'use strict';
  if (window.__hymmshotAnalyticsLoaded) return;
  window.__hymmshotAnalyticsLoaded = true;

  const measurementId = 'G-DZDDHW8FY1';
  const installerName = 'HymmShot-Setup-1.0.0.exe';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  if (!document.querySelector('script[data-hymmshot-ga4]')) {
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    tag.dataset.hymmshotGa4 = 'true';
    document.head.appendChild(tag);
  }
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  function sendEvent(name, parameters) {
    try {
      if (typeof window.gtag !== 'function') return;
      window.gtag('event', name, parameters);
    } catch (_) {
      // Tracking must never interfere with navigation or media playback.
    }
  }

  function pagePath() { return window.location.pathname || '/'; }

  document.addEventListener('click', function (event) {
    if (!event.target || typeof event.target.closest !== 'function') return;
    const link = event.target.closest('a[data-download-cta]');
    if (!link || !link.href || !link.href.includes(installerName)) return;
    sendEvent('download_click', {
      cta_location: link.dataset.downloadCta,
      download_file: installerName,
      app_version: '1.0.0',
      page_path: pagePath(),
      link_url: link.href
    });
  });

  function trackProductVideo() {
    const video = document.querySelector('video[data-analytics-video]');
    if (!video) return;
    const baseParameters = {
      video_name: video.dataset.videoName || 'HymmShot product demo',
      video_file: video.dataset.videoFile || 'PanoramiX.mp4',
      page_path: pagePath()
    };
    let viewSent = false;
    let visibilityTimer = null;
    let completeSent = false;
    const progressSent = new Set();

    function clearVisibilityTimer() {
      if (visibilityTimer !== null) {
        window.clearTimeout(visibilityTimer);
        visibilityTimer = null;
      }
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        const entry = entries[0];
        if (!entry || viewSent) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (visibilityTimer === null) {
            visibilityTimer = window.setTimeout(function () {
              viewSent = true;
              visibilityTimer = null;
              sendEvent('video_view', baseParameters);
              observer.disconnect();
            }, 1000);
          }
        } else clearVisibilityTimer();
      }, { threshold: [0, 0.5, 1] });
      observer.observe(video);
    }

    video.addEventListener('timeupdate', function () {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const percent = (video.currentTime / video.duration) * 100;
      [25, 50, 75].forEach(function (milestone) {
        if (percent >= milestone && !progressSent.has(milestone)) {
          progressSent.add(milestone);
          sendEvent('video_progress', Object.assign({}, baseParameters, { video_percent: milestone }));
        }
      });
      if (percent >= 90 && !completeSent) {
        completeSent = true;
        sendEvent('video_complete', Object.assign({}, baseParameters, { video_percent: 100 }));
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackProductVideo, { once: true });
  } else trackProductVideo();
})();
