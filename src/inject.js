$(function () {
   const regex = /https:\/\/secure\.simplepractice\.com\/clients\/\w*\/insurance_claims\/\d*\/edit/i;
   const scriptUrl =
      'https://cdn.jsdelivr.net/gh/m4ttheweric/fill-claim@latest/dist/fill-claim.min.js';
   if (regex.test(window.location.href)) {
      $.getScript(scriptUrl);
   }
});
