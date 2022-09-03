document.addEventListener('DOMContentLoaded', () => {

    // const urlToPostDeta = 'https://database.deta.sh/v1/a0wwnrex/contactmessages/items';      // lab
    const urlToPostDeta = 'https://database.deta.sh/v1/a0fgw0th/contactmessages/items';         // personal

    // const xApiKeyDeta = 'a0wwnrex_JeRhBybn5iFYziStv9d2M6Mchd2b4B4H';                         // lab
    const xApiKeyDeta = 'a0fgw0th_qJnhonBfy71SQWGdN8fp3s4TwQdv5soz';                            // personal

    // auto load data form
    // document.getElementById('name').value = 'Arturo';
    // document.getElementById('email').value = 'test@test.com';
    // document.getElementById('phone').value = '+12345678911';
    // document.getElementById('message').value = 'lheiji piuhp eidu piu plheiji piuhp eidu piu plheiji piuhp eidu piu plheiji piuhp eidu piu p';

    
    // show alert of an element
    function showAlert(element, alertText) {
        element.classList.remove('hide');
        element.classList.add('appear');
        if (alertText) element.innerHTML = alertText;
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
        let returnValueBool = true;
        
        if (!element.value) {
            showAlert(siblingAlert, 'This field is required.');
            returnValueBool = false;
        }
        else hideAlert(siblingAlert);
        
        const mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+([\.-]?\w+))+$/;
        if (element.type === 'email' && element.value && !mailPattern.test(element.value)) {
            showAlert(siblingAlert, 'Invaild email.');
            returnValueBool = false;
        }
        
        const telPattern = /^\+([0-9]{11})$/;
        if (element.type === 'tel' && element.value && !telPattern.test(element.value)) {
            showAlert(siblingAlert, 'Invalid phone, must start with + and have 11 characters without spaces.');
            returnValueBool = false;
        }

        if (element.type === 'textarea' && element.value && element.value.length < 50) {
            showAlert(siblingAlert, 'This field must have at least 50 characters.');
            returnValueBool = false;
        }

        return returnValueBool;
    }

    // send data to Deta endpoint
    function sendData(data) {
        const url = urlToPostDeta; 
        const body = { item: data };
        const fetchParams = {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "X-API-Key": xApiKeyDeta
            },
            body: JSON.stringify(body)
        };
    
        fetch(url, fetchParams)
            .then(response => {
                if (response.ok) showAlert(document.querySelector('.contact__sent'));
                else showAlert(document.querySelector('.contact__error'));
            })
    }

    // show or hide alerts on submit form for required fields
    const submitButton = document.getElementById('contact__submit');
    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            let sendDataBool = true;

            document.querySelectorAll('.required').forEach(item => {
                const validation = fieldsValidation(item);
                if (!validation) sendDataBool = false;
            });

            if (sendDataBool) {
                const form = document.querySelector('.contact__form');
                const formElements = Array.from(form.elements); 
                let datos = {};
                
                for (let i=0; i < formElements.length-1; i++) {
                    datos[formElements[i].id] = formElements[i].value;
                }

                form.reset();
                sendData(datos);
            }
        });
    }
    
    // show or hide alerts on blur required fields
    document.querySelectorAll('.required').forEach(item => {
        item.addEventListener('blur', item => {
            fieldsValidation(item.target);
        });
    });

});