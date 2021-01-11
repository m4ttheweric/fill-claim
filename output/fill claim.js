"use strict";
(function ($) {
    var SUPERVISOR_STORAGE_KEY = 'supervisorInfo';
    //should not need to change
    var NWFL_INFO = {
        taxId: '911455635',
        phone: '2063639601'
    };
    //sets drop down for id type:
    var SUPERVISOR_ID_TYPE = '0B';
    //should not need to change
    $(function () {
        if (isEditClaimPage()) {
            addButtons();
        }
    });
    function isEditClaimPage() {
        return (window.location.href.indexOf('insurance_claims') > -1 &&
            window.location.href.indexOf('/edit') > -1);
    }
    function addButtons() {
        addMagicButton();
        if (getSuperVisorFromStorage() != null) {
            addEditButton();
        }
    }
    function addMagicButton() {
        var btnText = getSuperVisorFromStorage() != null ? 'Magic!' : 'Setup Magic...';
        $('#magical-fill').remove();
        var btn = $('<a class="button primary" id="magical-fill" href="javascript:void(0)">' +
            btnText +
            '</a>').on('click', onMagicButton);
        $('#control-bar div.actions').append(btn);
    }
    function addEditButton() {
        $('#edit-magic').remove();
        var btn = $('<a style="align-self: center;padding: 8px;" id="edit-magic" href="javascript:void(0)">Edit</a>').on('click', onEditButton);
        $('#control-bar div.actions').append(btn);
    }
    function onEditButton() {
        localStorage.removeItem(SUPERVISOR_STORAGE_KEY);
        getSuperVisorInfoFromUser();
    }
    function getSuperVisorFromStorage() {
        var storedSupervisorInfo = localStorage.getItem(SUPERVISOR_STORAGE_KEY);
        if (storedSupervisorInfo != null) {
            try {
                var supervisorInfo = JSON.parse(storedSupervisorInfo);
                if (!!supervisorInfo.firstName &&
                    !!supervisorInfo.lastName &&
                    !!supervisorInfo.npi &&
                    !!supervisorInfo.license) {
                    //good to go
                    return supervisorInfo;
                }
                else {
                    return null;
                }
            }
            catch (e) {
                return null;
            }
        }
        else {
            return null;
        }
    }
    function makeFields(supervisorInfo) {
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
    function fillFields(fields) {
        Object.entries(fields).map(function (_a) {
            var key = _a[0], _b = _a[1], selector = _b.selector, value = _b.value;
            if ($(selector).length === 0) {
                alert('Error: Could not find field: ' + key);
            }
            else {
                $(selector).val(value);
            }
        });
        alert('Claim has been magicked!');
    }
    function onMagicButton(e) {
        var supervisorInfo = getSuperVisorFromStorage();
        if (!supervisorInfo) {
            getSuperVisorInfoFromUser();
            return;
        }
        fillFields(makeFields(supervisorInfo));
    }
    function getSuperVisorInfoFromUser() {
        var supervisorInfo = {
            firstName: prompt('Supervisor First Name:'),
            lastName: prompt('Supervisor Last Name:'),
            npi: prompt('Supervisor NPI#:'),
            license: prompt('Supervisor License#:')
        };
        if (!confirm('Is this correct?: \n\n' +
            Object.entries(supervisorInfo)
                .map(function (_a) {
                var key = _a[0], value = _a[1];
                return key + ": " + value;
            })
                .join('\n'))) {
        }
        else {
            localStorage.setItem(SUPERVISOR_STORAGE_KEY, JSON.stringify(supervisorInfo));
            addButtons();
            alert('You are good to go!\n\nIf you clear your browsing data you may need to re-enter your supervisor info.\n\nYou are now set up for magic!');
        }
    }
    //@ts-ignore
})(jQuery);
