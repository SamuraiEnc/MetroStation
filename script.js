//ИНИЦИАЛИЗАЦИЯ КНОПОК
const clickButton = document.querySelector('.bt-click');
const BtShop = document.querySelector('.bt-shop');
const BtChangeID = document.querySelector('.bt-change-id');
const BtBack = document.querySelector('.bt-back');
//КНОПКИ ДЛЯ ПОКУПКИ ВЕЩЕЙ
const BtBuyHelmet = document.querySelector('#helmet');
const BtBuyArmor = document.querySelector('#armor');
const BtBuyBackPack = document.querySelector('#backpack');
const BtBuyMk = document.querySelector('#mk');
//КНОПКИ ДЛЯ ПОКУПКИ КЕЙСОВ
const BtBuyHelmetCase = document.querySelector('#helmetCase');
const BtBuyArmorCase = document.querySelector('#armorCase');
const BtBuyBackPackCase = document.querySelector('#backpackCase');
const BtBuyMkCase = document.querySelector('#mkCase');

const modalCase = document.getElementById('purchaseModalCase');
const confirmBtnCase = document.getElementById('confirmBtnCase');
const cancelBtnCase = document.getElementById('cancelBtnCase');

const TxtInfoFirst = document.querySelector('#FirstSP');
const TxtInfoSecond = document.querySelector('#SecondSP');
const TxtInfoThird = document.querySelector('#ThirdSP');
const TxtInfoForth = document.querySelector('#ForthSP');

const modalCaseConf = document.getElementById('purchaseModalCaseConf');
const TxtInfoConf = document.querySelector('#confirm-txtCaseConf1');
const confirmBtnCaseConf = document.getElementById('confirmBtnCaseConf');
const cancelBtnCaseConf = document.getElementById('cancelBtnCaseConf');

const modal = document.getElementById('purchaseModal');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');




//ЦЕНЫ
const CostHelmet = 50000;
const CostArmor = 100000;
const CostBackPack = 75000;
const CostMk = 75000;

//ЦЕНА ПРОДАЖИ
const sellHm1 = 1000;
const sellHm2 = 5000;
const sellHm3 = 15000;
const sellHm4 = 50000;

const sellAr1 = 5000;
const sellAr2 = 10000;
const sellAr3 = 20000;
const sellAr4 = 100000;

const sellBp1 = 2000;
const sellBp2 = 7000;
const sellBp3 = 20000;
const sellBp4 = 75000;

const sellMk1 = 2000;
const sellMk2 = 7000;
const sellMk3 = 20000;
const sellMk4 = 75000;


//ШАНСЫ
const CaseArmorInfo1 = "Броня ур.3 - 40%";
const CaseArmorInfo2 = "Броня ур.4 - 30%";
const CaseArmorInfo3 = "Броня ур.5 - 20%";
const CaseArmorInfo4 = "Броня ур.6 - 10%";

let CaseHelmetInfo1 = "Шлем ур.3 - 40%";
let CaseHelmetInfo2 = "Шлем ур.4 - 30%";
let CaseHelmetInfo3 = "Шлем ур.5 - 20%";
let CaseHelmetInfo4 = "Шлем ур.6 - 10%";

const CaseBackPackInfo1 = "Рюкзак ур.3 - 40%";
const CaseBackPackInfo2 = "Рюкзак ур.4 - 30%";
const CaseBackPackInfo3 = "Рюкзак ур.5 - 20%";
const CaseBackPackInfo4 = "Рюкзак ур.6 - 10%";

const CaseMkInfo1 = "Mk14 отремонт. - 40%";
const CaseMkInfo2 = "Mk14 целая - 30%";
const CaseMkInfo3 = "Mk14 улучшен. - 20%";
const CaseMkInfo4 = "Mk14 высш.кач - 10%";

const CostHelmetCase = 20000;
const CostArmorCase = 50000;
const CostBackPackCase = 30000;
const CostMkCase = 30000;

//ПРОЧЕЕ
const txtPointer = document.querySelector('.pointer');
let counter = 0;
let click = 10000;
let lastTapTime = 0;
let ID = null;
let touchStartY = 0;
let confirm;

let hm3 = "Шлем ур.3";
let hm4 = "Шлем ур.4";
let hm5 = "Шлем ур.5";
let hm6 = "Шлем ур.6";

let ar3 = "Броня ур.3";
let ar4 = "Броня ур.4";
let ar5 = "Броня ур.5";
let ar6 = "Броня ур.6";

let bp3 = "Рюкзак ур.3";
let bp4 = "Рюкзак ур.4";
let bp5 = "Рюкзак ур.5";
let bp6 = "Рюкзак ур.6";

let mk3 = "Mk14 отремонт";
let mk4 = "Mk14 целая";
let mk5 = "Mk14 улучшен.";
let mk6 = "Mk14 высш.кач";

let sell;


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

    BtChangeID.addEventListener('click', function() {
       ChangeID();
       alert("Ваш игровой ID " + ID)
    });
}

//ДЛЯ SHOP.HTML
if(BtBack){
    //КНОПКА НАЗАД В MAIN.HTML
    BtBack.addEventListener('click', function() {
        navigateToMain();
    });

    //ПОКУПКИ
    //ПОКУПКА ШЛЕМА НАЧАЛО
    BtBuyHelmet.addEventListener('click', function(){
        modal.style.display = 'flex';
        confirm = CostHelmet;
    });

   
    //ПОКУПКА ШЛЕМА КОНЕЦ

    //ПОКУПКА БРОНИ НАЧАЛО
     BtBuyArmor.addEventListener('click', function(){
        modal.style.display = 'flex';
       confirm = CostArmor;
    });
    //ПОКУПКА БРОНИ КОНЕЦ

    //ПОКУПКА РЮКЗАКА НАЧАЛО
     BtBuyBackPack.addEventListener('click', function(){
        modal.style.display = 'flex';
        confirm = CostBackPack;
    });
    //ПОКУПКА РЮКЗАКА КОНЕЦ

    //ПОКУПКА МК НАЧАЛО
     BtBuyMk.addEventListener('click', function(){
        modal.style.display = 'flex';
        confirm = CostMk;
    });
    //ПОКУПКА МК КОНЕЦ

//СИСТЕМА КЕЙСОВ НАЧАЛО
//ПОКУПКА КЕЙСА ШЛЕМОВ НАЧАЛО 
BtBuyHelmetCase.addEventListener('click', function(){
        sp1 = hm3;
        sp2 = hm4;
        sp3 = hm5;
        sp4 = hm6;
        sellSup1 = sellHm1;
        sellSup2 = sellHm2;
        sellSup3 = sellHm3;
        sellSup4 = sellHm4;
        confirm = CostHelmetCase;
        modalCase.style.display = 'flex';
        TxtInfoFirst.textContent = CaseHelmetInfo1;
        TxtInfoSecond.textContent = CaseHelmetInfo2;
        TxtInfoThird.textContent = CaseHelmetInfo3;
        TxtInfoForth.textContent = CaseHelmetInfo4;
    });
//ПОКУПКА КЕЙСА ШЛЕМОВ КОНЕЦ    
//ПОКУПКА КЕЙСА БРОНИ НАЧАЛО 
BtBuyArmorCase.addEventListener('click', function(){
        sp1 = ar3;
        sp2 = ar4;
        sp3 = ar5;
        sp4 = ar6;
        sellSup1 = sellAr1;
        sellSup2 = sellAr2;
        sellSup3 = sellAr3;
        sellSup4 = sellAr4;
        confirm = CostArmorCase;
        modalCase.style.display = 'flex';
        TxtInfoFirst.textContent = CaseArmorInfo1;
        TxtInfoSecond.textContent = CaseArmorInfo2;
        TxtInfoThird.textContent = CaseArmorInfo3;
        TxtInfoForth.textContent = CaseArmorInfo4;
    });
//ПОКУПКА КЕЙСА БРОНИ КОНЕЦ   
//ПОКУПКА КЕЙСА РЮКЗАКОВ НАЧАЛО 
BtBuyBackPackCase.addEventListener('click', function(){
        sp1 = bp3;
        sp2 = bp4;
        sp3 = bp5;
        sp4 = bp6;
        sellSup1 = sellBp1;
        sellSup2 = sellBp2;
        sellSup3 = sellBp3;
        sellSup4 = sellBp4;
        confirm = CostBackPackCase;
        modalCase.style.display = 'flex';
        TxtInfoFirst.textContent = CaseBackPackInfo1;
        TxtInfoSecond.textContent = CaseBackPackInfo2;
        TxtInfoThird.textContent = CaseBackPackInfo3;
        TxtInfoForth.textContent = CaseBackPackInfo4;
    });
//ПОКУПКА КЕЙСА РЮКЗАКОВ КОНЕЦ  
//ПОКУПКА КЕЙСА MK НАЧАЛО 
BtBuyMkCase.addEventListener('click', function(){
        sp1 = mk3;
        sp2 = mk4;
        sp3 = mk5;
        sp4 = mk6;
        sellSup1 = sellMk1;
        sellSup2 = sellMk2;
        sellSup3 = sellMk3;
        sellSup4 = sellMk4;
        confirm = CostMkCase;
        modalCase.style.display = 'flex';
        TxtInfoFirst.textContent = CaseMkInfo1;
        TxtInfoSecond.textContent = CaseMkInfo2;
        TxtInfoThird.textContent = CaseMkInfo3;
        TxtInfoForth.textContent = CaseMkInfo4;
    });
//ПОКУПКА КЕЙСА MK КОНЕЦ  
//СИСТЕМА КЕЙСОВ КОНЕЦ

    confirmBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    BuySuplies();
});

// Обработка отмены
cancelBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Обработка отмены

    confirmBtnCase.addEventListener('click', function() {
    modalCase.style.display = 'none';
    BuyCase(sp1, sp2, sp3, sp4, sellSup1, sellSup2, sellSup3, sellSup4);
});

// Обработка отмены
cancelBtnCase.addEventListener('click', function() {
    modalCase.style.display = 'none';
});

confirmBtnCaseConf.addEventListener('click' , function(){
    modalCaseConf.style.display = 'none';
    alert('Покупка успешна! Ваша заявка отправлна на выдачу. Выдача происходит каждый день в 18:00 по МСК')
});

cancelBtnCaseConf.addEventListener('click' , function(){
    modalCaseConf.style.display = 'none';
    sellSup();
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

function ChangeID() {
            do{
            ID = prompt("Введите ваш игровой ID", "");
            localStorage.setItem('metroStationID1', ID);
            } while(!ID)      
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

function BuyCase(sp1, sp2, sp3, sp4, sellSup1, sellSup2, sellSup3, sellSup4) {
    if (counter >= confirm) {
        counter -= confirm;
        saveGame();
        updateDisplay();
        CaseSystem(sp1, sp2, sp3, sp4, sellSup1, sellSup2, sellSup3, sellSup4);
        modalCaseConf.style.display = 'flex';
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

//ФУНКЦИЯ КЕЙСОВ
function CaseSystem(firstSup, secondSup, thirdSup, forthSup, sellSup1, sellSup2, sellSup3, sellSup4){
    let result = Math.floor(Math.random() * 10) + 1;

    if(result >=1 && result <= 4){
        TxtInfoConf.textContent = firstSup + " (" + sellSup1 + " RIP)";
        sell = sellSup1;
    } else if(result >=5 && result <= 7){
        TxtInfoConf.textContent = secondSup + " (" + sellSup2 + " RIP)";
        sell = sellSup2;
    } else if(result >=8 && result <= 9){
        TxtInfoConf.textContent = thirdSup + " (" + sellSup3 + " RIP)";
        sell = sellSup3;
    } else if(result == 10){
        TxtInfoConf.textContent = forthSup + " (" + sellSup4 + " RIP)";
        sell = sellSup4;
    }
}

function sellSup(){
    counter += sell;
    saveGame();
    updateDisplay();
    sell == 0;
<<<<<<< HEAD
}
=======
}
>>>>>>> 297397eee37492b7bce09f932f8402fca7b6574b
