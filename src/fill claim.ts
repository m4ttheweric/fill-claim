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
   const nwflInfo: NWFLInfo = {
      taxId: '911455635',
      phone: '2063639601'
   };

   //sets drop down for id type:
   const supervisorIdType = '0B';

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
         getSuperVisorFromStorage() != null ? 'Magic!' : 'Setup Magic...';

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
         '<a style="align-self: center;padding: 8px;" id="edit-magic" href="javascript:void(0)">Edit Supervisor</a>'
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

   function onMagicButton(e: any) {
      const supervisorInfo = getSuperVisorFromStorage();

      if (!supervisorInfo) {
         getSuperVisorInfoFromUser();
         return;
      }

      const fields: Record<string, Field> = {
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
            value: supervisorIdType
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
            value: nwflInfo.taxId
         },
         billingPhone: {
            selector: 'input[name="billing_provider[phone_number]"]',
            value: nwflInfo.phone
         }
      };

      Object.entries(fields).map(([key, { selector, value }]) => {
         if ($(selector).length === 0) {
            alert('Error: Could not find field: ' + key);
         } else {
            $(selector).val(value);
         }
      });

      alert('Claim has been magicked!');
   }

   function getSuperVisorInfoFromUser() {
      const supervisorInfo = {
         firstName: prompt('Supervisor First Name:'),
         lastName: prompt('Supervisor Last Name:'),
         npi: prompt('Supervisor NPI#:'),
         license: prompt('Supervisor License#:')
      };

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