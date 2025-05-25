//ИНИЦИАЛИЗАЦИЯ КНОПОК
const clickButton = document.querySelector('.bt-click');
const BtShop = document.querySelector('.bt-shop');
const BtBack = document.querySelector('.bt-back');
const BtBuyHelmet = document.querySelector('#helmet');
const BtBuyArmor = document.querySelector('#armor');
const BtBuyBackPack = document.querySelector('#backpack');
const BtBuyMk = document.querySelector('#mk');

const modal = document.getElementById('purchaseModal');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');


//ЦЕНЫ
const CostHelmet = 50000;
const CostArmor = 100000;
const CostBackPack = 75000;
const CostMk = 75000;

//ПРОЧЕЕ
const txtPointer = document.querySelector('.pointer');
let counter = 0;
let click = 10000;
let lastTapTime = 0;
let ID = null;
let touchStartY = 0;
let confirm;


// Инициализация игры
window.addEventListener('load', function() {
    loadGame();
    if (!ID) {
        CheckID();
    }
});

// Автосохранение каждую секунду
setInterval(saveGame, 1000);
setInterval(updateDisplay, 1000);

// Сохранение при закрытии
window.addEventListener('beforeunload', saveGame);

// ДЛЯ MAIN.HTML
if(clickButton){
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
        navigateToShop();
    });

    BtShop.addEventListener('touchend', function(e) {
        e.preventDefault();
        navigateToShop();
    });
}

//ДЛЯ SHOP.HTML
if(BtBack){
    //КНОПКА НАЗАД В MAIN.HTML
    BtBack.addEventListener('click', function() {
        navigateToMain();
    });

    BtBack.addEventListener('touchend', function(e) {
        e.preventDefault();
        navigateToMain();
    });

    //ПОКУПКИ
    //ПОКУПКА ШЛЕМА НАЧАЛО
    BtBuyHelmet.addEventListener('click', function(){
        modal.style.display = 'flex';
        confirm = CostHelmet;
    });

    BtBuyHelmet.addEventListener('touchstart', handleTouchStart);

    BtBuyHelmet.addEventListener('touchend', function(e){
         if(isScroll(e)){
            this.style.transform = 'scale(1)';
            return;
        } 
        e.preventDefault();
        this.style.transform = 'scale(1)';
        modal.style.display = 'flex';
        confirm = CostHelmet;
    });
    //ПОКУПКА ШЛЕМА КОНЕЦ

    //ПОКУПКА БРОНИ НАЧАЛО
     BtBuyArmor.addEventListener('click', function(){
        modal.style.display = 'flex';
       confirm = CostArmor;
    });

    BtBuyArmor.addEventListener('touchstart', handleTouchStart);

    BtBuyArmor.addEventListener('touchend', function(e){
         if(isScroll(e)){
            this.style.transform = 'scale(1)';
            return;
        } 
        e.preventDefault();
        this.style.transform = 'scale(1)';
        modal.style.display = 'flex';
        confirm = CostArmor;
    });
    //ПОКУПКА БРОНИ КОНЕЦ

    //ПОКУПКА РЮКЗАКА НАЧАЛО
     BtBuyBackPack.addEventListener('click', function(){
        modal.style.display = 'flex';
        confirm = CostBackPack;
    });

    BtBuyBackPack.addEventListener('touchstart', handleTouchStart);

    BtBuyBackPack.addEventListener('touchend', function(e){
          if(isScroll(e)){
            this.style.transform = 'scale(1)';
            return;
        } 
        e.preventDefault();
        this.style.transform = 'scale(1)';
        modal.style.display = 'flex';
        confirm = CostBackPack;
    });
    //ПОКУПКА РЮКЗАКА КОНЕЦ

    //ПОКУПКА МК НАЧАЛО
     BtBuyMk.addEventListener('click', function(){
        modal.style.display = 'flex';
        confirm = CostMk;
    });

     BtBuyMk.addEventListener('touchstart', handleTouchStart);

    BtBuyMk.addEventListener('touchend', function(e){
        if(isScroll(e)){
            this.style.transform = 'scale(1)';
            return;
        } 
        e.preventDefault();
        this.style.transform = 'scale(1)';
        modal.style.display = 'flex';
        confirm = CostMk;
    });
    //ПОКУПКА МК КОНЕЦ

    confirmBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    BuySuplies();
});

// Обработка отмены
cancelBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    alert('Покупка отменена!');
});

    confirmBtn.addEventListener('touchend', function(e) {
    e.preventDefault();
    modal.style.display = 'none';
    BuySuplies();
});

// Обработка отмены
cancelBtn.addEventListener('touchend', function(e) {
    e.preventDefault();
    modal.style.display = 'none';
    alert('Покупка отменена!');
});

}



//ФУНКЦИИ ДЛЯ УДОБСТВА
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
    txtPointer.textContent ="RIP: " + formatNumber(counter);
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
    const savedID = localStorage.getItem('metroStationID1');
    if (savedID) {
        ID = savedID;
    } else {
        do{
        ID = prompt("Введите ваш игровой ID", "");
        localStorage.setItem('metroStationID1', ID);
        } while(!ID)
    }
}

// Сохранение игры
function saveGame() {
    const gameData = {
        counter: counter,
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
            updateDisplay();
            console.log('Игра загружена');
        } catch(e) {
            console.error('Ошибка загрузки:', e);
        }
    }
}

function navigateToShop() {
    window.location.href = 'shop.html';
}

function navigateToMain() {
    window.location.href = 'main.html';
}

function BuySuplies() {
    if (counter >= confirm) {
        counter -= confirm;
        saveGame();
        updateDisplay();
        alert('Покупка успешна! Ваша заявка отправлна на выдачу. Выдача происходит каждый день в 18:00 по МСК');
    } else {
        alert('Недостаточно RIP для покупки!');
    }
    confirm = 0; // Сбрасываем значение
}

function isScroll(e) {
    const touchY = e.changedTouches[0].clientY;
    return Math.abs(touchY - touchStartY) > 10;
}

function handleTouchStart(e) {
    touchStartY = e.touches[0].clientY;
    this.style.transform = 'scale(0.92)';
}
