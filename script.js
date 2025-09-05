// DOM 元素选择
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const backToTopBtn = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

// 移动端菜单切换
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    // 切换图标
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// 点击移动菜单链接后关闭菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// 平滑滚动到锚点
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // 减去导航栏高度
                behavior: 'smooth'
            });
        }
    });
});

// 返回顶部按钮显示/隐藏
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// 返回顶部功能
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

// 工具卡片动画效果
const toolCards = document.querySelectorAll('.tool-card');

// 添加滚动动画
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// 初始设置
toolCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// 为每个工具图标设置不同的颜色
const toolIcons = document.querySelectorAll('.tool-icon');
const colors = [
    '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', 
    '#f97316', '#ec4899', '#06b6d4', '#84cc16', 
    '#f59e0b', '#14b8a6', '#6366f1', '#d946ef',
    '#2563eb', '#16a34a', '#7c3aed', '#dc2626'
];

toolIcons.forEach((icon, index) => {
    icon.style.backgroundColor = colors[index % colors.length];
});