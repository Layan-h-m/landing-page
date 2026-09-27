/**
 * BREAKTHROUGH AUTHOR LIVE — Page behavior
 * Reads window.BAL_CONFIG (js/config.js) and wires it into the page:
 *   - every "Join the Challenge" button/link gets the checkout URL
 *   - the coupon code placeholder is filled in
 *   - the hero video placeholder is swapped for a real embed if a
 *     VIDEO_URL is supplied
 *   - the Facebook Pixel loads only if a FACEBOOK_PIXEL_ID is supplied
 *   - the mobile sticky CTA appears once the hero button scrolls away
 *   - FAQ <details> elements close their siblings for a tidy accordion
 */
(function () {
  "use strict";

  var config = window.BAL_CONFIG || {};

  function isPlaceholder(value, placeholderMarkers) {
    if (!value) return true;
    return placeholderMarkers.some(function (marker) {
      return value.indexOf(marker) !== -1;
    });
  }

  /* ---- Wire up every CTA button to the checkout URL ---- */
  function applyCheckoutLinks() {
    var url = config.CHECKOUT_URL;
    var hasRealUrl = !isPlaceholder(url, ["example.com", "REPLACE"]);
    var ctas = document.querySelectorAll("[data-cta]");
    ctas.forEach(function (el) {
      if (hasRealUrl) {
        el.setAttribute("href", url);
      } else {
        // No real checkout URL configured yet — keep buttons focusable
        // and honest rather than silently pointing at a fake page.
        el.setAttribute("href", "#price");
        el.setAttribute(
          "data-unconfigured",
          "Set CHECKOUT_URL in js/config.js"
        );
      }
    });
  }

  /* ---- Fill in the coupon code wherever it's referenced ---- */
  function applyCouponCode() {
    var code = config.COUPON_CODE || "REPLACE_COUPON";
    document.querySelectorAll("[data-coupon-code]").forEach(function (el) {
      el.textContent = code;
    });
  }

  /* ---- Swap the video placeholder for a real embed, if provided ---- */
  function applyVideo() {
    var url = config.VIDEO_URL;
    if (!url) return;

    var frame = document.querySelector("[data-video-frame]");
    if (!frame) return;

    var isDirectFile = /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
    frame.innerHTML = "";

    if (isDirectFile) {
      var video = document.createElement("video");
      video.src = url;
      video.controls = true;
      video.playsInline = true;
      frame.appendChild(video);
    } else {
      var iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.title = "Breakthrough Author Live — free training";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      frame.appendChild(iframe);
    }
  }

  /* ---- Facebook Pixel (loads only when an ID is configured) ---- */
  function applyFacebookPixel() {
    var pixelId = config.FACEBOOK_PIXEL_ID;
    if (!pixelId) return;

    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    /* eslint-enable */
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
    window.fbq("track", "ViewContent");

    document.querySelectorAll("[data-cta]").forEach(function (el) {
      el.addEventListener("click", function () {
        window.fbq("track", "InitiateCheckout");
      });
    });
  }

  /* ---- Mobile sticky CTA: show once the hero CTA scrolls offscreen ---- */
  function initStickyCta() {
    var sticky = document.querySelector("[data-sticky-cta]");
    var heroCta = document.querySelector("[data-hero-cta]");
    if (!sticky || !heroCta || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          sticky.classList.toggle("is-visible", !entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(heroCta);
  }

  /* ---- FAQ accordion: keep only one panel open at a time ---- */
  function initFaqAccordion() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item) other.removeAttribute("open");
        });
      });
    });
  }

  function initFooterYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyCheckoutLinks();
    applyCouponCode();
    applyVideo();
    applyFacebookPixel();
    initStickyCta();
    initFaqAccordion();
    initFooterYear();
  });
})();
