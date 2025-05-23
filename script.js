const clickButton = document.querySelector('.bt-click');

// Для touch-устройств
clickButton.addEventListener('touchstart', function(e) {
    e.preventDefault();
    this.style.transform = 'scale(0.92)';
    this.style.boxShadow = '0 0 10px rgba(255, 87, 34, 0.8)';
});

clickButton.addEventListener('touchend', function(e) {
    e.preventDefault();
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 0 20px rgba(255, 87, 34, 0.5)';
});

// Для обычных кликов (на компьютере)
clickButton.addEventListener('mousedown', function() {
    this.style.transform = 'scale(0.92)';
    this.style.boxShadow = '0 0 10px rgba(255, 87, 34, 0.8)';
});

clickButton.addEventListener('mouseup', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 0 20px rgba(255, 87, 34, 0.5)';
});

clickButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 0 20px rgba(255, 87, 34, 0.5)';
});
