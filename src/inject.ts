interface Injection {
   urlTest: () => boolean;
   inject: () => void;
}

declare var $: any;

$(function () {
   const injections: Record<string, Injection> = {
      fillClaim: {
         urlTest: () =>
            /\/insurance_claims\/\d*\/edit/i.test(window.location.href),
         inject: () => {
            $.getScript(
               'https://cdn.jsdelivr.net/gh/m4ttheweric/fill-claim@latest/dist/fill-claim.min.js'
            );
         }
      },
      autoEdit: {
         urlTest: () =>
            /\/insurance_claims\/\d+\?editMe=y/i.test(window.location.href),
         inject: () => {
            location.href = document.URL.replace(
               '?editMe=y',
               '/edit?autoMagicFill=y'
            );
         }
      },
      openClaimsInTabs: {
         urlTest: () =>
            /\/billings\/insurance#claims/i.test(window.location.href),
         inject: () => {
            const openButton = `<a class="primary button" href="javascript:void(0)" style="float: right;margin-bottom: 18px;background-color: #8a2be2;">Magic Fill All Prepared Claims!</a>`;

            function openInTabs() {
               $('table.insurance-claims-list tr')
                  .filter(function (this: any) {
                     return (
                        $(this).find('span.badge:contains("Prepared")').length >
                        0
                     );
                  })
                  .each(function (this: any) {
                     window.open($(this).data('url') + '?editMe=y', '_blank');
                  });
            }
            function addButton() {
               const btn = $(openButton).on('click', () => {
                  openInTabs();
               });
               $('#claims').prepend(btn);
            }

            addButton();
         }
      }
   };

   Object.entries(injections).forEach(([prop, injection]) => {
      if (injection.urlTest()) {
         injection.inject();
      }
   });
});
