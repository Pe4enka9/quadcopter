const inputs = document.querySelectorAll('input');

let isValid = true;

inputs.forEach(input => {
    input.addEventListener('input', () => {
        isValid = true;
        const error = input.parentElement.querySelector('.error');

        if (input.value === '') {
            isValid = false;

            error.textContent = 'Поле обязательно для заполнения';
            error.classList.add('active');

            return;
        } else {
            error.classList.remove('active');
        }
    });
});

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    inputs.forEach(input => {
        if (input.value === '') {            
            isValid = false;
            
            const error = input.parentElement.querySelector('.error');
            error.textContent = 'Поле обязательно для заполнения';
            error.classList.add('active');

            return;
        }
    });

    if (isValid) this.submit();
});

const phoneNumber = document.getElementById('phone_number');
const maskOptions = {
    mask: '+{7} (000) 000-00-00',
};
const mask = IMask(phoneNumber, maskOptions);

