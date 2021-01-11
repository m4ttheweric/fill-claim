interface SupervisorInfo {
   firstName: string;
   lastName: string;
   npi: string;
   license: string;
}
interface NWFLInfo {
   taxId: string;
   phone: string;
   [key: string]: string;
}

type ClaimInfo = SupervisorInfo & NWFLInfo;

interface Field {
   selector: string;
   value: string;
}

(function ($) {
   const CLAIM_INFO_STORAGE_KEY = 'nwflClaimInfo';

   //should not need to change
   const DEFAULT_TAX_ID = '911455635';
   const DEFAULT_PHONE = '(206) 363-9601';

   //sets drop down for id type:
   const SUPERVISOR_ID_TYPE = '0B';

   //should not need to change

   $(function () {
      if (isEditClaimPage()) {
         addButtons();
      }
   });

   function isEditClaimPage() {
      return (
         window.location.href.indexOf('insurance_claims') > -1 &&
         window.location.href.indexOf('/edit') > -1
      );
   }

   function addButtons() {
      addMagicButton();
      if (getClaimInfoFromStorage() != null) {
         addEditButton();
      }
   }

   function addMagicButton() {
      const btnText =
         getClaimInfoFromStorage() != null ? 'Magic Fill!' : 'Setup Magic...';

      $('#magical-fill').remove();

      const btn = $(
         '<a class="button primary" id="magical-fill" href="javascript:void(0)">' +
            btnText +
            '</a>'
      ).on('click', onMagicButton);

      $('#control-bar div.actions').append(btn);
   }

   function addEditButton() {
      $('#edit-magic').remove();
      const btn = $(
         '<a style="align-self: center;padding: 8px;" id="edit-magic" href="javascript:void(0)">Edit</a>'
      ).on('click', onEditButton);

      $('#control-bar div.actions').append(btn);
   }

   function onEditButton() {
      getClaimInfoFromUser();
   }

   function getClaimInfoFromStorage(): ClaimInfo {
      const storedClaimInfo = localStorage.getItem(CLAIM_INFO_STORAGE_KEY);
      if (storedClaimInfo != null) {
         try {
            const claimInfo = JSON.parse(storedClaimInfo);
            if (
               !!claimInfo.firstName &&
               !!claimInfo.lastName &&
               !!claimInfo.npi &&
               !!claimInfo.license
            ) {
               //good to go
               return claimInfo;
            } else {
               return null;
            }
         } catch (e) {
            return null;
         }
      } else {
         return null;
      }
   }

   function makeFields(claimInfo: ClaimInfo): Record<string, Field> {
      return {
         supervisorLastName: {
            selector: 'input[name="box17_provider[last_name]"]',
            value: claimInfo.lastName
         },
         supervisorFirstName: {
            selector: 'input[name="box17_provider[first_name]"]',
            value: claimInfo.firstName
         },
         supervisorIdType: {
            selector: 'select[name="box17_provider[secondary_id_type]"]',
            value: SUPERVISOR_ID_TYPE
         },
         supervisorSecondaryId: {
            selector: 'input[name="box17_provider[secondary_id]"]',
            value: claimInfo.license
         },
         supervisorNpi: {
            selector: 'input[name="box17_provider[npi]"]',
            value: claimInfo.npi
         },
         taxId: {
            selector: 'input[name="billing_provider[tax_id]"]',
            value: claimInfo.taxId
         },
         billingPhone: {
            selector: 'input[name="billing_provider[phone_number]"]',
            value: claimInfo.phone
         }
      };
   }

   function fillFields(fields: Record<string, Field>) {
      const filledStyle = { 'background-color': '#ffd5f6', color: '#111' };
      Object.entries(fields).map(([key, { selector, value }]) => {
         if ($(selector).length === 0) {
            alert('Error: Could not find field: ' + key);
         } else {
            $(selector).val(value).css(filledStyle);
         }
      });
      alert('Claim has been magicked!\n\nFilled fields are highlighted pink.');
      $('html, body').animate(
         {
            scrollTop: $(fields.supervisorLastName.selector).offset().top / 1.5
         },
         500
      );
   }

   function onMagicButton(e: any) {
      const claimInfo = getClaimInfoFromStorage();

      if (!claimInfo) {
         getClaimInfoFromUser();
         return;
      }

      fillFields(makeFields(claimInfo));
   }

   const FriendlyClaimProps: ClaimInfo = Object.freeze({
      firstName: 'Supervisor First Name (Box 17)',
      lastName: 'Supervisor Last Name (Box 17)',
      license: 'Supervisor License # (Box 17a)',
      npi: 'Supervisor NPI # (Box 17b)',
      taxId: 'Federal Tax ID # (Box 25)',
      phone: 'Billing Provider Info Phone (Box 33)'
   });

   function promptForClaimInfo(existing: ClaimInfo): ClaimInfo {
      return {
         firstName: prompt(
            FriendlyClaimProps.firstName,
            existing?.firstName || ''
         ),
         lastName: prompt(
            FriendlyClaimProps.lastName,
            existing?.lastName || ''
         ),
         license: prompt(FriendlyClaimProps.license, existing?.license || ''),
         npi: prompt(FriendlyClaimProps.npi, existing?.npi || ''),
         taxId: prompt(FriendlyClaimProps.taxId, DEFAULT_TAX_ID),
         phone: prompt(FriendlyClaimProps.phone, DEFAULT_PHONE)
      };
   }
   function getClaimInfoFromUser() {
      const fromUser = promptForClaimInfo(getClaimInfoFromStorage());

      if (
         !confirm(
            'Is the information entered correct?: \n\n' +
               Object.entries(fromUser)
                  .map(([key, value]) => `${FriendlyClaimProps[key]}: ${value}`)
                  .join('\n')
         )
      ) {
      } else {
         localStorage.setItem(CLAIM_INFO_STORAGE_KEY, JSON.stringify(fromUser));
         addButtons();
         alert(
            'If you clear your browsing data you may need to re-enter your supervisor info.\n\nYou are now set up for magic!'
         );
      }
   }
   //@ts-ignore
})(jQuery);
