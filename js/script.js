// ===== Обновленные функции для корзины =====
function addToCart(productName, price, productId) {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Проверяем, есть ли уже такой товар в корзине
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: price,
                quantity: 1,
                date: new Date().toISOString()
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        showAlert(`${productName} добавлен в корзину!`);
        updateCartCounter();
    } catch (error) {
        console.error('Ошибка при добавлении в корзину:', error);
        showAlert('Произошла ошибка при добавлении в корзину', 'error');
    }
}

function buyNow(productName, price, productId) {
    try {
        // Создаем временный заказ с одним товаром
        const order = {
            items: [{
                id: productId,
                name: productName,
                price: price,
                quantity: 1
            }],
            total: price,
            date: new Date().toISOString()
        };
        
        localStorage.setItem('currentOrder', JSON.stringify(order));
        window.location.href = 'paymentdelivery.html';
    } catch (error) {
        console.error('Ошибка при оформлении заказа:', error);
        showAlert('Произошла ошибка при оформлении заказа', 'error');
    }
}

function updateCartCounter() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        document.querySelectorAll('.cart-counter').forEach(el => {
            el.textContent = totalItems;
            el.style.display = totalItems > 0 ? 'block' : 'none';
        });
    } catch (error) {
        console.error('Ошибка при обновлении счетчика:', error);
    }
}

// ===== Инициализация кнопок =====
function initButtons() {
    // Кнопки "В корзину"
    document.querySelectorAll('.btn-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-product');
            const price = parseInt(this.getAttribute('data-price'));
            addToCart(productName, price, productId);
        });
    });

    // Кнопки "Купить"
    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-product');
            const price = parseInt(this.getAttribute('data-price'));
            buyNow(productName, price, productId);
        });
    });
}

// Вызов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initButtons();
    updateCartCounter();
    
    // Ваш существующий код...
});


document.addEventListener("DOMContentLoaded", function() {
    // Элементы модального окна
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalImg = document.getElementById("modal-img");
    const modalText = document.getElementById("modal-text");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    // Данные для модального окна
    let currentData = {
        images: [],
        texts: [],
        currentIndex: 0,
        title: "",
        info: ""
    };

    // Обработчики для всех кнопок категорий
    document.querySelectorAll('.content__button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Получаем данные из атрибутов кнопки
            currentData = {
                images: this.getAttribute('data-images').split(','),
                texts: this.getAttribute('data-texts').split(','),
                currentIndex: 0,
                title: this.getAttribute('data-title'),
                info: this.getAttribute('data-info')
            };

            updateModalContent();
            modal.style.display = "flex";
        });
    });

    // Обновление содержимого модального окна
    function updateModalContent() {
        modalTitle.textContent = currentData.title;
        modalImg.src = currentData.images[currentData.currentIndex].trim();
        modalText.textContent = currentData.texts[currentData.currentIndex].trim();
    }

    // Кнопка "Назад"
    prevBtn.addEventListener('click', function() {
        if (currentData.currentIndex > 0) {
            currentData.currentIndex--;
            updateModalContent();
        }
    });

    // Кнопка "Вперед"
    nextBtn.addEventListener('click', function() {
        if (currentData.currentIndex < currentData.images.length - 1) {
            currentData.currentIndex++;
            updateModalContent();
        }
    });

    // Закрытие модального окна
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Закрытие при клике вне окна
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
// В cart.html при переходе на страницу оформления
localStorage.setItem('currentOrder', JSON.stringify({
    items: cartItems, // ваш массив товаров
    // другие данные если нужно
}));
window.location.href = 'payment.html';