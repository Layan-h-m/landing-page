/**
 * BREAKTHROUGH AUTHOR LIVE — SITE CONFIGURATION
 * ------------------------------------------------
 * This is the ONE place to edit before this page goes live.
 * Every "Join the Challenge" button and price/coupon mention on the
 * page reads from the values below — change them here and the whole
 * page updates automatically (see js/main.js for how it's applied).
 */
window.BAL_CONFIG = {
  // Where every CTA button sends visitors. Point this at your real
  // checkout page (e.g. your GHL / Stripe / ThriveCart order form).
  CHECKOUT_URL: "https://example.com/replace-with-your-checkout-url",

  // The coupon code that drops the $950 regular price to $47.
  // Shown in the price section exactly as typed here.
  COUPON_CODE: "REPLACE_COUPON",

  // Direct URL to the hosted sales video (mp4, or an embeddable
  // YouTube/Vimeo/Wistia URL). Leave blank ("") to keep the
  // placeholder player in the hero section.
  VIDEO_URL: "",

  // Facebook Pixel ID for retargeting (PageView / ViewContent /
  // InitiateCheckout / Purchase). Leave blank ("") and no pixel
  // script will load at all.
  FACEBOOK_PIXEL_ID: "",
};
