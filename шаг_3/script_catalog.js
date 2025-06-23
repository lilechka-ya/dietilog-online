document.addEventListener('DOMContentLoaded', () => {
  const cardGrid = document.querySelector('.card-grid');
  const cards = Array.from(document.querySelectorAll('.program-card'));
  const searchInput = document.querySelector('#searchInput');
  const sortSelect = document.querySelector('#sortSelect');
  const pagination = document.querySelector('.pagination');
  const itemsPerPage = 4;
  let currentPage = 1;
  let filteredCards = [...cards];

  // Функция для рендеринга карточек
  function renderCards(page = 1) {
    // Очищаем контейнер карточек
    cardGrid.innerHTML = '';

    // Показываем карточки для текущей страницы
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedCards = filteredCards.slice(start, end);

    // Добавляем карточки в DOM с анимацией
    paginatedCards.forEach((card, index) => {
      setTimeout(() => {
        cardGrid.appendChild(card);
        card.classList.add('visible');
      }, index * 100);
    });

    renderPagination();
  }

  // Функция для рендеринга пагинации
  function renderPagination() {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

    // Кнопка "Предыдущая"
    const prevButton = document.createElement('button');
    prevButton.className = 'page-btn';
    prevButton.textContent = 'Предыдущая';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderCards(currentPage);
      }
    });
    pagination.appendChild(prevButton);

    // Кнопки страниц
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.className = `page-btn ${i === currentPage ? 'active' : ''}`;
      pageButton.textContent = i;
      pageButton.disabled = i === currentPage;
      pageButton.addEventListener('click', () => {
        currentPage = i;
        renderCards(currentPage);
      });
      pagination.appendChild(pageButton);
    }

    // Кнопка "Следующая"
    const nextButton = document.createElement('button');
    nextButton.className = 'page-btn';
    nextButton.textContent = 'Следующая';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderCards(currentPage);
      }
    });
    pagination.appendChild(nextButton);
  }

  // Функция поиска
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    filteredCards = cards.filter((card) => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p:not(.price)').textContent.toLowerCase();
      return title.includes(query) || description.includes(query);
    });
    currentPage = 1;
    renderCards(currentPage);
  });

  // Функция сортировки
  sortSelect.addEventListener('change', () => {
    const sortValue = sortSelect.value;

    if (sortValue === 'alphabet') {
      filteredCards.sort((a, b) => {
        const titleA = a.querySelector('h3').textContent.toLowerCase();
        const titleB = b.querySelector('h3').textContent.toLowerCase();
        return titleA.localeCompare(titleB);
      });
    } else if (sortValue === 'price-asc') {
      filteredCards.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price) || 0;
        const priceB = parseFloat(b.dataset.price) || 0;
        return priceA - priceB;
      });
    } else if (sortValue === 'price-desc') {
      filteredCards.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price) || 0;
        const priceB = parseFloat(b.dataset.price) || 0;
        return priceB - priceA;
      });
    }

    currentPage = 1;
    renderCards(currentPage);
  });

  // Инициализация
  renderCards();
});