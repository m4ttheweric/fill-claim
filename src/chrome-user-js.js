$(function () {
   if (
      window.location.href.indexOf('insurance_claims') > -1 &&
      window.location.href.indexOf('/edit') > -1
   ) {
      $.getScript(
         'https://cdn.jsdelivr.net/gh/m4ttheweric/fill-claim@v1.2/dist/fill-claim.min.js'
      );
   }
});
