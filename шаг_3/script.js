document.addEventListener('DOMContentLoaded', () => {
  // Функциональность слайдера
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentSlide = 0;

  // Создание кнопок навигации
  const slider = document.querySelector('.slider');
  const prevButton = document.createElement('button');
  prevButton.className = 'slider-btn prev';
  prevButton.innerHTML = '←';
  const nextButton = document.createElement('button');
  nextButton.className = 'slider-btn next';
  nextButton.innerHTML = '→';
  slider.appendChild(prevButton);
  slider.appendChild(nextButton);

  // Функция для показа определенного слайда
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  // Следующий слайд
  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  });

  // Предыдущий слайд
  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  });

  // Анимация при прокрутке для секций features
  const features = document.querySelectorAll('.feature[data-animate]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  features.forEach((feature) => {
    observer.observe(feature);
  });
});