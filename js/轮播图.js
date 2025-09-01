document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('indicators');

    const slides = document.querySelectorAll('.slide');
    const slideCount = slides.length;
    let currentIndex = 0;
    let autoSlideInterval;

    // 创建指示点
    for (let i = 0; i < slideCount; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.dataset.index = i;
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }

    const indicators = document.querySelectorAll('.indicator');

    // 更新幻灯片位置
    function updateSlidePositions() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');

            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index === (currentIndex - 1 + slideCount) % slideCount) {
                slide.classList.add('prev');
            } else if (index === (currentIndex + 1) % slideCount) {
                slide.classList.add('next');
            } else if (index === (currentIndex - 2 + slideCount) % slideCount) {
                slide.classList.add('far-prev');
            } else if (index === (currentIndex + 2) % slideCount) {
                slide.classList.add('far-next');
            }
        });

        // 更新指示点
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // 切换到指定幻灯片
    function goToSlide(index) {
        currentIndex = (index + slideCount) % slideCount;
        updateSlidePositions();
    }

    // 下一张幻灯片
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlidePositions();
    }

    // 上一张幻灯片
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlidePositions();
    }

    // 设置自动轮播
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    // 暂停自动轮播
    function pauseAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // 事件监听
    prevBtn.addEventListener('click', () => {
        pauseAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        pauseAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    carousel.addEventListener('mouseenter', pauseAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // 初始化轮播
    updateSlidePositions();
    startAutoSlide();
});