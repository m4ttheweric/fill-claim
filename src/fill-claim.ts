interface SupervisorInfo {
   firstName: string;
   lastName: string;
   npi: string;
   license: string;
}
interface NWFLInfo {
   taxId: string;
   phone: string;
}
interface Field {
   selector: string;
   value: string;
}

(function ($) {
   const SUPERVISOR_STORAGE_KEY = 'supervisorInfo';

   //should not need to change
   const NWFL_INFO: NWFLInfo = {
      taxId: '911455635',
      phone: '2063639601'
   };

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
      if (getSuperVisorFromStorage() != null) {
         addEditButton();
      }
   }

   function addMagicButton() {
      const btnText =
         getSuperVisorFromStorage() != null ? 'Magic Fill!' : 'Setup Magic...';

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
      localStorage.removeItem(SUPERVISOR_STORAGE_KEY);
      getSuperVisorInfoFromUser();
   }

   function getSuperVisorFromStorage(): SupervisorInfo {
      const storedSupervisorInfo = localStorage.getItem(SUPERVISOR_STORAGE_KEY);
      if (storedSupervisorInfo != null) {
         try {
            const supervisorInfo = JSON.parse(storedSupervisorInfo);
            if (
               !!supervisorInfo.firstName &&
               !!supervisorInfo.lastName &&
               !!supervisorInfo.npi &&
               !!supervisorInfo.license
            ) {
               //good to go
               return supervisorInfo;
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

   function makeFields(supervisorInfo: SupervisorInfo): Record<string, Field> {
      return {
         supervisorLastName: {
            selector: 'input[name="box17_provider[last_name]"]',
            value: supervisorInfo.lastName
         },
         supervisorFirstName: {
            selector: 'input[name="box17_provider[first_name]"]',
            value: supervisorInfo.firstName
         },
         supervisorIdType: {
            selector: 'select[name="box17_provider[secondary_id_type]"]',
            value: SUPERVISOR_ID_TYPE
         },
         supervisorSecondaryId: {
            selector: 'input[name="box17_provider[secondary_id]"]',
            value: supervisorInfo.license
         },
         supervisorNpi: {
            selector: 'input[name="box17_provider[npi]"]',
            value: supervisorInfo.npi
         },
         taxId: {
            selector: 'input[name="billing_provider[tax_id]"]',
            value: NWFL_INFO.taxId
         },
         billingPhone: {
            selector: 'input[name="billing_provider[phone_number]"]',
            value: NWFL_INFO.phone
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
      const supervisorInfo = getSuperVisorFromStorage();

      if (!supervisorInfo) {
         getSuperVisorInfoFromUser();
         return;
      }

      fillFields(makeFields(supervisorInfo));
   }

   function getSuperVisorInfoFromUser() {
      const stored = getSuperVisorFromStorage();
      const supervisorInfo = {
         firstName: stored != null ? stored.firstName : '',
         lastName: stored != null ? stored.lastName : '',
         npi: stored != null ? stored.npi : '',
         license: stored != null ? stored.license : ''
      };

      supervisorInfo.firstName = prompt(
         'Supervisor First Name:',
         supervisorInfo.firstName
      );
      supervisorInfo.lastName = prompt(
         'Supervisor Last Name:',
         supervisorInfo.lastName
      );
      supervisorInfo.license = prompt(
         'Supervisor License#:',
         supervisorInfo.license
      );
      supervisorInfo.npi = prompt('Supervisor NPI#:', supervisorInfo.npi);

      if (
         !confirm(
            'Is this correct?: \n\n' +
               Object.entries(supervisorInfo)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join('\n')
         )
      ) {
      } else {
         localStorage.setItem(
            SUPERVISOR_STORAGE_KEY,
            JSON.stringify(supervisorInfo)
         );
         addButtons();
         alert(
            'You are good to go!\n\nIf you clear your browsing data you may need to re-enter your supervisor info.\n\nYou are now set up for magic!'
         );
      }
   }
   //@ts-ignore
})(jQuery);
