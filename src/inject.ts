interface Injection {
   urlTest: () => boolean;
   inject: () => void;
   injected: boolean;
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
         },
         injected: false
      },
      autoEdit: {
         urlTest: () =>
            /\/insurance_claims\/\d+\?(editAndMagic=y|editMe=y)/i.test(
               window.location.href
            ),
         inject: () => {
            if (/\?editAndMagic=y/i.test(window.location.href)) {
               location.href = document.URL.replace(
                  '?editAndMagic=y',
                  '/edit?autoMagicFill=y'
               );
            } else {
               location.href = document.URL.replace('?editMe=y', '/edit');
            }
         },
         injected: false
      },
      openClaimsInTabs: {
         urlTest: () =>
            /\/billings\/insurance#claims/i.test(window.location.href),
         inject: () => {
            const magicFillButtonHtml = `<a class="primary button" href="javascript:void(0)" style="float: right;margin-bottom: 18px;background-color: #8a2be2;">Magic Fill All Prepared Claims!</a>`;
            const openButtonHtml = `<a class="primary button" href="javascript:void(0)" style="float: right;margin-left: 8px;margin-bottom: 18px;background-color: #8a2be2;">Open All Prepared Claims!</a>`;

            function launchClaim(launchStyle: 'magic' | 'open') {
               const magic = '?editAndMagic=y';
               const justOpen = '?editMe=y';
               const queryString = launchStyle === 'magic' ? magic : justOpen;

               $('table.insurance-claims-list tr')
                  .filter(function (this: any) {
                     return (
                        $(this).find('span.badge:contains("Prepared")').length >
                        0
                     );
                  })
                  .each(function (this: any) {
                     console.log(
                        'opening: ',
                        $(this).data('url') + queryString
                     );
                     window.open($(this).data('url') + queryString, '_blank');
                  });
            }
            function addButton() {
               const magicBtn = $(magicFillButtonHtml).on('click', () => {
                  launchClaim('magic');
               });
               const openBtn = $(openButtonHtml).on('click', () => {
                  launchClaim('open');
               });

               $('#claims').prepend(magicBtn);
               $('#claims').prepend(openBtn);
            }

            addButton();
         },
         injected: false
      }
   };

   function testInjections() {
      Object.entries(injections).forEach(([prop, injection]) => {
         if (injection.urlTest() && injection.injected === false) {
            injection.inject();
            injection.injected = true;
         }
      });
   }

   testInjections();

   window.addEventListener('hashchange', testInjections, false);
});
