$(function () {
   if (
      /https:\/\/secure\.simplepractice\.com\/clients\/\w*\/insurance_claims\/\d*\/edit/i.test(
         window.location.href
      )
   ) {
      $.getScript(
         'https://cdn.jsdelivr.net/gh/m4ttheweric/fill-claim@latest/dist/fill-claim.min.js'
      );
   }
});
