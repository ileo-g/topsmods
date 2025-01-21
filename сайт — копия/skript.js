const mods = [
    { name: 'Мод 1', file: 'mod1.zip', description: 'Это описание мода 1.' },
    { name: 'Мод 2', file: 'mod2.zip', description: 'Это описание мода 2.' },
    { name: 'Мод 3', file: 'mod3.zip', description: 'Это описание мода 3.' },
    { name: 'Мод 4', file: 'mod4.zip', description: 'Это описание мода 4.' },
    { name: 'Мод 5', file: 'mod5.zip', description: 'Это описание мода 5.' },
    { name: 'Мод 6', file: 'mod6.zip', description: 'Это описание мода 6.' },
    { name: 'Мод 7', file: 'mod7.zip', description: 'Это описание мода 7.' },
    { name: 'Мод 8', file: 'mod8.zip', description: 'Это описание мода 8.' },
    { name: 'Мод 9', file: 'mod9.zip', description: 'Это описание мода 9.' },
    { name: 'Мод 10', file: 'mod10.zip', description: 'Это описание мода 10.' }
];

const feedbacks = [];

function loadMods() {
    const modContainer = document.getElementById('mod-container');
    modContainer.innerHTML = ''; // Очищаем контейнер перед загрузкой
    mods.forEach(mod => {
        const modCard = document.createElement('div');
        modCard.classList.add('mod-card');
        modCard.innerHTML = `
            <strong>${mod.name}</strong>
            <p>${mod.description}</p>
            <button onclick="downloadMod('${mod.file}')">Скачать</button>
        `;
        modContainer.appendChild(modCard);
    });
}

function downloadMod(modFileName) {
    const link = document.createElement('a');
    link.href = `mods/${modFileName}`;
    link.download = modFileName; // Убедитесь, что атрибут download установлен
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function searchMods() {
    const query = document.getElementById('search').value.toLowerCase();
    const modContainer = document.getElementById('mod-container');
    const items = modContainer.getElementsByClassName('mod-card');

    Array.from(items).forEach(item => {
        const modName = item.getElementsByTagName('strong')[0].innerText.toLowerCase();
        if (modName.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function submitFeedback() {
    const feedbackInput = document.getElementById('feedback-input');
    const feedbackText = feedbackInput.value.trim();
    
    if (feedbackText) {
        feedbacks.push(feedbackText);
        feedbackInput.value = '';
        displayFeedbacks();
    } else {
        alert('Пожалуйста, введите ваш отзыв.');
    }
}

function displayFeedbacks() {
    const feedbackContainer = document.getElementById('feedback-container');
    feedbackContainer.innerHTML = '';
    feedbacks.forEach(feedback => {
        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('faq-item');
        feedbackItem.innerText = feedback;
        feedbackContainer.appendChild(feedbackItem);
    });
}

// Загружаем моды при загрузке страницы
loadMods();