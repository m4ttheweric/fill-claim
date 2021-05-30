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
            location.href = /\?editAndMagic=y/i.test(window.location.href)
               ? document.URL.replace(
                    '?editAndMagic=y',
                    '/edit?autoMagicFill=y'
                 )
               : document.URL.replace('?editMe=y', '/edit');
         },
         injected: false
      },
      openClaimsInTabs: {
         urlTest: () =>
            /\/billings\/insurance#claims/i.test(window.location.href),
         inject: () => {
            const magicFillButtonHtml = `<a class="primary button" href="javascript:void(0)" style="float: right;margin-bottom: 18px;background-color: #8a2be2;">Magic Fill All Prepared Claims!</a>`;
            const openButtonHtml = `<a class="primary button" href="javascript:void(0)" style="float: right;margin-left: 8px;margin-bottom: 18px;background-color: #8a2be2;">Open All Prepared Claims!</a>`;
            const preparedClaims = () =>
               $('table.insurance-claims-list tr').filter(function (this: any) {
                  return (
                     $(this).find('span.badge:contains("Prepared")').length > 0
                  );
               });

            function launchClaim(launchStyle: 'magic' | 'open') {
               const queryString =
                  launchStyle === 'magic' ? '?editAndMagic=y' : '?editMe=y';
               if (preparedClaims().length === 0) {
                  alert(
                     'There are currently no claims in the "Prepared" state.'
                  );
               } else {
                  preparedClaims().each(function (this: any) {
                     window.open($(this).data('url') + queryString, '_blank');
                  });
               }
            }
            function addButton() {
               $(magicFillButtonHtml)
                  .on('click', () => {
                     launchClaim('magic');
                  })
                  .prependTo('#claims');
               $(openButtonHtml)
                  .on('click', () => {
                     launchClaim('open');
                  })
                  .prependTo('#claims');
            }

            addButton();
         },
         injected: false
      }
   };

   function testInjections() {
      Object.entries(injections).forEach(([prop, injection]) => {
         if (injection.urlTest() && !injection.injected) {
            injection.inject();
            injection.injected = true;
         }
      });
   }

   window.addEventListener('hashchange', testInjections, false);

   testInjections();
});
