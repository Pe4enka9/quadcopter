const regex = {
    first_name: /^[A-Za-zА-Яа-яёЁ]+([-'][A-Za-zА-Яа-яёЁ]+)*$/,
    last_name: /^[A-Za-zА-Яа-яёЁ]+([-'][A-Za-zА-Яа-яёЁ]+)*$/,
    patronymic: /^[A-Za-zА-Яа-яёЁ]+([-'][A-Za-zА-Яа-яёЁ]+)*$/,
    passport: /^\d{2} \d{2} \d{6}$/,
    password: /^[a-zA-Z0-9]{6,20}$/,
};

const errorMessages = {
    first_name: 'Только буквы, а также дефис или апостроф',
    last_name: 'Только буквы, а также дефис или апостроф',
    patronymic: 'Только буквы, а также дефис или апостроф',
    passport: 'Введите в формате XX XX XXXXXX',
    password: 'От 6 до 20 латинских букв и цифр без пробелов и спецсимволов',
    password_repeat: 'Пароли не совпадают',
};

function passwordValidation() {
    const password = document.getElementById('password');
    const passwordRepeat = document.getElementById('password_repeat');
    const error = passwordRepeat.parentElement.querySelector('.error');

    if (password.value !== passwordRepeat.value) {
        error.textContent = errorMessages.password_repeat;
        error.classList.add('active');
        
        return false;
    } else {
        error.textContent = '';
        error.classList.remove('active');

        return true;
    }
}

const inputs = document.querySelectorAll('input');

let isValid = true;

inputs.forEach(input => {
    input.addEventListener('input', () => {
        isValid = true;
        const error = input.parentElement.querySelector('.error');

        if (input.name === 'patronymic' && input.value === '') return;

        if (input.name === 'password_repeat') {
            isValid = passwordValidation();
            return;
        }

        if (input.value === '') {
            isValid = false;

            error.textContent = 'Поле обязательно для заполнения';
            error.classList.add('active');

            return;
        } else {
            error.classList.remove('active');
        }

        for (const key in regex) {
            if (input.name === key) {
                isValid = regex[key].test(input.value);

                if (!isValid) {
                    error.textContent = errorMessages[key];
                    error.classList.add('active');
                } else {
                    error.textContent = '';
                    error.classList.remove('active');
                }

                return;
            }
        }
    });
});

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    inputs.forEach(input => {
        if (input.value === '') {            
            isValid = false;

            if (input.name === 'patronymic') return;
            
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

