document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector('textarea');
    const submitButton = form.querySelector('button[type="submit"]');

    // Функция для отображения сообщений об ошибках
    function showError(input, message) {
        // Удаляем существующее сообщение об ошибке, если есть
        const existingError = input.nextElementSibling;
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff3333';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.3rem';
        errorDiv.textContent = message;
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
        input.style.borderColor = '#ff3333';
    }

    // Функция для очистки сообщений об ошибках
    function clearErrors() {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        [nameInput, emailInput, messageInput].forEach(input => {
            input.style.borderColor = '#cfdff5';
        });
    }

    // Регулярное выражение для проверки email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        let isValid = true;

        // Валидация имени
        if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Имя должно содержать минимум 2 символа');
            isValid = false;
        }

        // Валидация email
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Введите корректный email адрес');
            isValid = false;
        }

        // Валидация сообщения
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
            isValid = false;
        }

        // Если все проверки пройдены, можно отправить форму
        // Сейчас просто выводим в консоль
        if (isValid) {
            console.log('Форма отправлена:', {
                nameInput: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
            form.reset();
            alert('Сообщение успешно отправлено!');
        }
    });

    // Валидация в реальном времени при вводе
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            clearErrors();
        });
    });
});