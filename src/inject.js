$(function () {
   const regex = /https:\/\/secure\.simplepractice\.com\/clients\/\w*\/insurance_claims\/\d*\/edit/i;
   if (regex.test(window.location.href)) {
      $.getScript(
         'https://cdn.jsdelivr.net/gh/m4ttheweric/fill-claim@latest/dist/fill-claim.min.js'
      );
   }
});
