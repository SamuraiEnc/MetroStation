// Получаем элементы DOM
const clickBtn = document.getElementById('clickBtn');
const pointsDisplay = document.getElementById('points');
const caseElement = document.querySelector('.case-card');
const rewardPopup = document.getElementById('rewardPopup');
const closePopupBtn = document.getElementById('closePopup');
const rewardImage = document.getElementById('rewardImage');
const rewardName = document.getElementById('rewardName');
const itemsContainer = document.getElementById('items');
const rifle = document.getElementById('rifle');
const muzzleFlash = document.getElementById('muzzleFlash');
const clickEffect = document.getElementById('clickEffect');
const clickRipple = document.getElementById('clickRipple');

// Аудио элементы
const shotSound = document.getElementById('shotSound');
const caseOpenSound = document.getElementById('caseOpenSound');
const rewardSound = document.getElementById('rewardSound');

// Игровые переменные
let points = 0;
const inventory = [];

// Предметы
const items = [
    { name: "MK14", img: "images/mk14.png", rarity: "rare" },
    { name: "Броня", img: "images/armor.png", rarity: "common" },
    { name: "Шлем", img: "images/helmet.png", rarity: "common" },
    { name: "Рюкзак", img: "images/backpack.png", rarity: "uncommon" }
];

// Загрузка сохранений
function loadGame() {
    const savedPoints = localStorage.getItem('clickerPoints');
    const savedInventory = localStorage.getItem('clickerInventory');
    
    if (savedPoints) points = parseInt(savedPoints);
    if (savedInventory) inventory = JSON.parse(savedInventory);
    
    updatePoints();
    updateInventory();
}

// Сохранение игры
function saveGame() {
    localStorage.setItem('clickerPoints', points);
    localStorage.setItem('clickerInventory', JSON.stringify(inventory));
}

// Обновление счета
function updatePoints() {
    pointsDisplay.textContent = points;
    saveGame();
}

// Обновление инвентаря
function updateInventory() {
    if (inventory.length === 0) {
        itemsContainer.innerHTML = `
            <div class="empty-inventory">
                <img src="images/empty-icon.png" alt="Пусто">
                <p>Open crates to get items</p>
            </div>
        `;
        return;
    }
    
    itemsContainer.innerHTML = inventory.map(item => `
        <div class="inventory-item">
            <img src="${item.img}" alt="${item.name}" class="item-image">
            <span class="item-name">${item.name}</span>
        </div>
    `).join('');
}

// Анимация выстрела
function playShotAnimation() {
    // Анимация отдачи
    rifle.style.animation = 'none';
    void rifle.offsetWidth; // Trigger reflow
    rifle.style.animation = 'shotRecoil 0.2s linear';
    
    // Вспышка дульного огня
    muzzleFlash.style.animation = 'none';
    void muzzleFlash.offsetWidth;
    muzzleFlash.style.animation = 'muzzleFlash 0.1s linear';
    
    // Эффект клика
    const rect = clickBtn.getBoundingClientRect();
    clickEffect.style.left = `${rect.left + rect.width/2 - 50}px`;
    clickEffect.style.top = `${rect.top + rect.height/2 - 50}px`;
    clickEffect.style.animation = 'none';
    void clickEffect.offsetWidth;
    clickEffect.style.opacity = '0.8';
    clickEffect.style.animation = 'clickRipple 0.5s linear forwards';
    
    // Звук выстрела
    shotSound.currentTime = 0;
    shotSound.play();
}

// Эффект пульсации при клике
document.addEventListener('click', (e) => {
    clickRipple.style.left = `${e.clientX - 50}px`;
    clickRipple.style.top = `${e.clientY - 50}px`;
    clickRipple.style.animation = 'none';
    void clickRipple.offsetWidth;
    clickRipple.style.animation = 'clickRipple 0.8s linear forwards';
});

// Клик по кнопке
clickBtn.addEventListener('click', () => {
    points++;
    updatePoints();
    playShotAnimation();
});

// Открытие кейса
caseElement.addEventListener('click', () => {
    const caseCost = 50;
    
    if (points >= caseCost) {
        points -= caseCost;
        updatePoints();
        
        // Анимация открытия кейса
        caseElement.style.transform = 'scale(0.95) rotate(5deg)';
        setTimeout(() => {
            caseElement.style.transform = 'scale(1.05) rotate(-5deg)';
            setTimeout(() => {
                caseElement.style.transform = 'scale(1) rotate(0)';
                
                // Выбор случайного предмета
                const randomItem = items[Math.floor(Math.random() * items.length)];
                inventory.push(randomItem);
                updateInventory();
                
                // Показ попапа с наградой
                showReward(randomItem);
                
                // Звуки
                caseOpenSound.play();
                setTimeout(() => rewardSound.play(), 500);
                
            }, 100);
        }, 100);
    } else {
        // Анимация "нет денег"
        caseElement.style.transform = 'translateX(5px)';
        setTimeout(() => {
            caseElement.style.transform = 'translateX(-5px)';
            setTimeout(() => {
                caseElement.style.transform = 'translateX(0)';
            }, 50);
        }, 50);
    }
});

// Показать награду
function showReward(item) {
    rewardImage.src = item.img;
    rewardName.textContent = item.name;
    
    // Установка редкости
    const rarityElement = document.querySelector('.rarity');
    rarityElement.className = 'rarity ' + item.rarity;
    rarityElement.textContent = item.rarity.toUpperCase();
    
    // Показать попап
    rewardPopup.classList.add('active');
    
    // Конфетти
    const confettiElement = document.querySelector('.confetti');
    confettiElement.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = Math.random() * 100 + '%';
        confetti.style.opacity = '0';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        confetti.style.animation = `confettiFall ${Math.random() * 2 + 1}s linear forwards`;
        confettiElement.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.opacity = '1';
        }, i * 20);
    }
    
    // Добавляем стили для анимации конфетти
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function getRandomColor() {
    const colors = ['#ff5e00', '#00a8ff', '#00ff9d', '#ff00aa', '#ffee00'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Закрыть попап
closePopupBtn.addEventListener('click', () => {
    rewardPopup.classList.remove('active');
});

// Загружаем игру при старте
loadGame();