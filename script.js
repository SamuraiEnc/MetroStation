const clickButton = document.querySelector('.bt-click');
const BtShop = document.querySelector('.bt-shop');
const txtPointer = document.querySelector('.pointer');
let counter = 0;
let click = 200;
let lastTapTime = 0;
let ID = null;

// Инициализация игры
window.addEventListener('load', function() {
    loadGame();
    if (!ID) {
        CheckID();
    }
});

// Автосохранение каждую секунду
setInterval(saveGame, 1000);

// Сохранение при закрытии
window.addEventListener('beforeunload', saveGame);

// Обработчики для сенсорных устройств
clickButton.addEventListener('touchstart', function(e) {
    e.preventDefault();
    this.style.transform = 'scale(0.92)';
    this.style.boxShadow = '0 0 10px rgba(255, 87, 34, 0.8)';
});

clickButton.addEventListener('touchend', function(e) {
    e.preventDefault();
    handleClick();
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 0 20px rgba(255, 87, 34, 0.5)';
});

// Обработчики для компьютера
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

clickButton.addEventListener('click', function() {
    handleClick();
});

BtShop.addEventListener('click', function() {
    alert(ID);
});

BtShop.addEventListener('touchend', function() {
    alert(ID);
});

// Основная функция обработки клика
function handleClick() {
    const currentTime = Date.now();
    if (currentTime - lastTapTime < 100) return;
    lastTapTime = currentTime;
    
    counter += click;
    updateDisplay();
}

// Обновление отображения счетчика
function updateDisplay() {
    txtPointer.textContent = formatNumber(counter);
}

// Форматирование чисел
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'm';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

// Проверка и установка ID
function CheckID() {
    const savedID = localStorage.getItem('metroStationID');
    if (savedID) {
        ID = savedID;
    } else {
        do{
        ID = prompt("Введите ваш игровой ID", "") || "player_" + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('metroStationID', ID);
        } while(ID)
    }
}

// Сохранение игры
function saveGame() {
    const gameData = {
        counter: counter,
        clickValue: click,
        lastSave: new Date().toISOString()
    };
    localStorage.setItem('metroStationSave_' + ID, JSON.stringify(gameData));
    console.log('Игра сохранена');
}

// Загрузка игры
function loadGame() {
    CheckID(); // Сначала убедимся, что ID есть
    
    const savedData = localStorage.getItem('metroStationSave_' + ID);
    if (savedData) {
        try {
            const gameData = JSON.parse(savedData);
            counter = gameData.counter || 0;
            click = gameData.clickValue || 200;
            updateDisplay();
            console.log('Игра загружена');
        } catch(e) {
            console.error('Ошибка загрузки:', e);
        }
    }
}
