document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('upload-form');
    const modList = document.getElementById('mod-list');
    const reviewForm = document.getElementById('review-form');
    const reviewList = document.getElementById('review-list');
    const modal = document.getElementById('registration-modal');
    const closeModal = document.getElementById('close-modal');
    const registerButton = document.getElementById('register-btn');
    const registrationForm = document.getElementById('registration-form');
    const loginForm = document.getElementById('login-form');
    const userProfile = document.getElementById('user-profile');
    const achievementsContainer = document.createElement('div');
    achievementsContainer.className = 'achievements';

    // Проверка на наличие учетной записи
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        modal.style.display = "block"; // Показываем модальное окно регистрации при загрузке страницы
    } else {
        const user = JSON.parse(currentUser);
        userProfile.textContent = `Профиль: ${user.username}`; // Отображаем имя пользователя
        displayAchievements(user.achievements); // Отображаем достижения
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Получаем значения из формы
        const modName = document.getElementById('mod-name').value;
        const modDescription = document.getElementById('mod-description').value;
        const modTags = document.getElementById('mod-tags').value;

        // Создаем элемент мода
        const modDiv = document.createElement('div');
        modDiv.className = 'mod';
        modDiv.innerHTML = `
            <h3>${modName}</h3>
            <p>${modDescription}</p>
            <p>Теги: ${modTags}</p>
            <button class="download-btn">Скачать</button>
        `;
        
        // Добавляем мод в список модов
        modList.appendChild(modDiv);

        // Очищаем форму после отправки
        form.reset();

        // Award achievement for uploading a mod
        if (currentUser) {
            const user = JSON.parse(currentUser);
            user.achievements.push('Загрузил мод');
            localStorage.setItem('currentUser', JSON.stringify(user));
            displayAchievements(user.achievements);
        }
    });

    // Показ уведомления при клике на кнопку "Скачать"
    modList.addEventListener('click', function(event) {
        if (event.target.classList.contains('download-btn')) {
            alert('Скачивание не доступно в демо-версии.');
        }
    });

    // Обработка формы отзыва
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const reviewName = document.getElementById('review-name').value;
        const reviewText = document.getElementById('review-text').value;

        // Создаем элемент отзыва
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review';
        reviewDiv.innerHTML = `
            <h3>${reviewName}</h3>
            <p>${reviewText}</p>
        `;

        // Добавляем отзыв в список отзывов
        reviewList.appendChild(reviewDiv);

        // Очищаем форму после отправки
        reviewForm.reset();

        // Award achievement for submitting a review
        if (currentUser) {
            const user = JSON.parse(currentUser);
            user.achievements.push('Оставил отзыв');
            localStorage.setItem('currentUser', JSON.stringify(user));
            displayAchievements(user.achievements);
        }
    });

    // Открытие модального окна регистрации
    registerButton.onclick = function() {
        modal.style.display = "block";
    }

    // Закрытие модального окна
    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    // Закрытие модального окна при клике вне окна
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Обработка формы регистрации
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const regUsername = document.getElementById('reg-username').value;
        const regEmail = document.getElementById('reg-email').value;
        const regPassword = document.getElementById('reg-password').value;

        // Сохранение учетных данных в localStorage
        const newUser = {
            username: regUsername,
            email: regEmail,
            password: regPassword,
            achievements: [] // Изначально достижения пустые
        };
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        alert(`Пользователь ${regUsername} зарегистрирован!`);
        modal.style.display = "none"; // Закрыть модальное окно после регистрации
        registrationForm.reset(); // Очистить форму
        userProfile.textContent = `Профиль: ${regUsername}`; // Обновить профиль пользователя
    });

    // Обработка формы входа
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = JSON.parse(localStorage.getItem('currentUser'));

        if (user && user.username === username && user.password === password) {
            alert(`Добро пожаловать, ${username}!`);
            userProfile.textContent = `Профиль: ${username}`; // Обновить профиль пользователя
            displayAchievements(user.achievements); // Отображаем достижения
        } else {
            alert('Неверное имя пользователя или пароль.');
        }
    });

    // Функция для отображения достижений
    function displayAchievements(achievements) {
        achievementsContainer.innerHTML = '<h3>Достижения:</h3>';
        achievements.forEach(achievement => {
            const achievementDiv = document.createElement('div');
            achievementDiv.className = 'achievement';
            achievementDiv.textContent = achievement;
            achievementsContainer.appendChild(achievementDiv);
        });
        userProfile.appendChild(achievementsContainer);
    }
});