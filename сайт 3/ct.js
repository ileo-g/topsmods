// Пример: Загрузка контента для глав
document.querySelectorAll('.chapter ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        alert(`Загрузка контента для: ${this.textContent}`);
        // Здесь можно добавить загрузку контента через AJAX
    });
});