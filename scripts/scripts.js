// Ждем полной загрузки страницы
window.addEventListener('load', function() {
    console.log('Page loaded, initializing mobile menu...');
    
    // Несколько попыток найти элементы с интервалом
    let attempts = 0;
    const maxAttempts = 10;
    
    function tryInit() {
        attempts++;
        console.log(`Attempt ${attempts} to initialize mobile menu`);
        
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        
        console.log('Elements found:', {
            hamburgerMenu: !!hamburgerMenu,
            mobileMenuOverlay: !!mobileMenuOverlay
        });
        
        if (hamburgerMenu && mobileMenuOverlay) {
            console.log('Elements found, adding event listeners...');
            
            // Функция открытия/закрытия мобильного меню
            function toggleMobileMenu() {
                console.log('Toggle mobile menu clicked');
                hamburgerMenu.classList.toggle('active');
                mobileMenuOverlay.classList.toggle('active');
                
                // Блокируем прокрутку body когда меню открыто
                if (mobileMenuOverlay.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
            
            // Обработчик клика на гамбургер-меню
            hamburgerMenu.addEventListener('click', function(e) {
                console.log('Hamburger menu clicked', e);
                e.preventDefault();
                toggleMobileMenu();
            });
            
            // Закрытие меню при клике на оверлей
            mobileMenuOverlay.addEventListener('click', function(e) {
                if (e.target === mobileMenuOverlay) {
                    toggleMobileMenu();
                }
            });
            
            // Закрытие меню при клике на ссылки
            const mobileNavItems = document.querySelectorAll('.mobile-nav-item, .mobile-dropdown-item');
            mobileNavItems.forEach(item => {
                item.addEventListener('click', function() {
                    toggleMobileMenu();
                });
            });
            
            // Закрытие меню при нажатии на Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
            
            console.log('Mobile menu initialized successfully');
        } else if (attempts < maxAttempts) {
            console.log('Elements not found, retrying...');
            setTimeout(tryInit, 200);
        } else {
            console.error('Could not initialize mobile menu after', maxAttempts, 'attempts');
        }
    }
    
    tryInit();
    
    // Инициализация поиска
    initializeSearch();
});

function initializeSearch() {
    // Находим все элементы поиска (десктопные и мобильные)
    const desktopSearchInput = document.querySelector('.search-input:not(.mobile-search-input)');
    const mobileSearchInput = document.querySelector('.mobile-search-input');
    const desktopSearchBox = document.querySelector('.search-container .search-box');
    const mobileSearchBox = document.querySelector('.mobile-search-container .search-box');
    
    if (!desktopSearchInput || !mobileSearchInput) {
        console.log('Search elements not found');
        return;
    }
    
    // Функция поиска
    function performSearch(query) {
        if (!query.trim()) return;
        
        console.log('Searching for:', query);
        
        // Здесь можно добавить логику поиска
        // Например, перенаправление на страницу поиска или фильтрация контента
        
        // Временно можно просто вывести в консоль или показать алерт
        // alert(`Поиск: ${query}`);
        
        // Или перенаправить на страницу с результатами поиска
        // window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
    
    // Функция настройки обработчиков для поля поиска
    function setupSearchListeners(input, box) {
        if (!input || !box) return;
        
        // Обработчик ввода с задержкой (debounce)
        let searchTimeout;
        input.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            const query = e.target.value;
            
            if (query.length > 2) {
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            }
        });
        
        // Обработчик нажатия Enter
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(e.target.value);
            }
        });
        
        // Эффект фокуса
        input.addEventListener('focus', function() {
            box.style.borderColor = '#7a8fff';
            box.style.boxShadow = '0 0 15px rgba(122, 143, 255, 0.4)';
        });
        
        input.addEventListener('blur', function() {
            box.style.borderColor = 'white';
            box.style.boxShadow = 'none';
        });
    }
    
    // Настраиваем обработчики для обоих полей поиска
    setupSearchListeners(desktopSearchInput, desktopSearchBox);
    setupSearchListeners(mobileSearchInput, mobileSearchBox);
    
    console.log('Search functionality initialized');
}