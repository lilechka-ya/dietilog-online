document.addEventListener('DOMContentLoaded', () => {
    // Функционал клика по миниатюрам
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnails img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Замена главного изображения на кликнутую миниатюру
            mainImage.src = thumbnail.src;
            mainImage.alt = thumbnail.alt;
            
            // Обновление стиля активной миниатюры
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });

    // Функционал отзывов
    const reviewForm = document.querySelector('.review-form');
    const reviewList = document.querySelector('.review-list');
    
    // Загрузка отзывов из localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviewList.innerHTML = '';
        
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <h4>${review.username}</h4>
                <p>${review.comment}</p>
                <small>${new Date(review.timestamp).toLocaleDateString('ru-RU')}</small>
            `;
            reviewList.appendChild(reviewElement);
        });
    }

    // Сохранение отзыва в localStorage
    function saveReview(username, comment) {
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.push({
            username,
            comment,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    // Обработка отправки формы отзыва
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = reviewForm.querySelector('input[name="username"]').value;
        const comment = reviewForm.querySelector('textarea[name="comment"]').value;
        
        if (username && comment) {
            saveReview(username, comment);
            loadReviews();
            reviewForm.reset();
        }
    });

    // Первоначальная загрузка отзывов
    loadReviews();
});