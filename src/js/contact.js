document.addEventListener('DOMContentLoaded', () => {

    // show alert of an element
    function showAlert(element, alertText) {
        element.classList.remove('hide');
        element.classList.add('appear');
        element.innerHTML = alertText;
    }
    
    // hide alert of an element
    function hideAlert(element) {
        element.classList.remove('appear');
        element.classList.add('hide');
        element.innerHTML = '';
    }
    
    // fields validation
    function fieldsValidation(element) {
        const siblingAlert = element.nextSibling.nextSibling;

        if (!element.value) showAlert(siblingAlert, 'This field is required.');
        else hideAlert(siblingAlert);
        
        const mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+([\.-]?\w+))+$/;
        if (element.type === 'email' && element.value && !mailPattern.test(element.value)) {
            showAlert(siblingAlert, 'Invaild email.');
        }
        
        const telPattern = /^\+([0-9]{11})$/;
        if (element.type === 'tel' && element.value && !telPattern.test(element.value)) {
            showAlert(siblingAlert, 'Invalid phone, must start with + and have 11 characters without spaces.');
        }

        if (element.type === 'textarea' && element.value && element.value.length < 50) {
            showAlert(siblingAlert, 'This field must have at least 50 characters.');
        }
    }

    // show or hide alerts on submit form for required fields
    const submitButton = document.getElementById('contact__submit');
    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.required').forEach(item => {
                fieldsValidation(item);
            });
        });
    }
    
    // show or hide alerts on blur required fields
    document.querySelectorAll('.required').forEach(item => {
        item.addEventListener('blur', item => {
            fieldsValidation(item.target);
        });
    });

});