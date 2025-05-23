const clickButton = document.querySelector('.bt-click');
const txtPointer = document.querySelector('.pointer');
let counter = 0;
let click = 200;

// Для touch-устройств
clickButton.addEventListener('touchstart', function(e) {
    e.preventDefault();
    this.style.transform = 'scale(0.92)';
    this.style.boxShadow = '0 0 10px rgba(255, 87, 34, 0.8)';
});

clickButton.addEventListener('touchend', function(e) {
    e.preventDefault();
    counter+=click;
    console.log(counter);
    txtPointer.textContent = formatNumber(counter);
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

clickButton.addEventListener('click', function(){
    counter+=click;
    console.log(counter);
    txtPointer.textContent = formatNumber(counter);
});

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'm'; // 1.2m
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k'; // 1.5k
    }
    return num.toString(); // Меньше 1000 - выводим как есть
}
