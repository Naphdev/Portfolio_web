// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.classList.remove('scrolled');
        header.style.background = 'rgba(255, 255, 255, 0.1)';
        header.style.backdropFilter = 'blur(20px)';
    }
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Parallax Effect for Floating Cards
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-card');
    
    parallax.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }, 2000);
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to buttons
document.querySelectorAll('.cta-button, .project-link').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations
}, 16)); // ~60fps

// Demo Modal Functionality
function showDemoModal(projectType) {
    const modal = document.getElementById('demoModal');
    const modalTitle = document.getElementById('demoModalTitle');
    const featuresList = document.getElementById('demoFeaturesList');
    
    // Set content based on project type
    if (projectType === 'delivery') {
        modalTitle.textContent = 'ฟีเจอร์หลัก - แอปสั่งอาหารออนไลน์';
        featuresList.innerHTML = `
            <li>สั่งอาหารออนไลน์</li>
            <li>ระบบติดตามการจัดส่งแบบ Real-time</li>
            <li>ระบบชำระเงิน</li>
            <li>ประวัติการสั่งซื้อ</li>
            <li>ระบบแจ้งเตือน</li>
            <li>รีวิวและให้คะแนน</li>
        `;
    } else if (projectType === 'facemash') {
        modalTitle.textContent = 'ฟีเจอร์หลัก - แอป FaceMash';
        featuresList.innerHTML = `
            <li>ระบบเปรียบเทียบรูปภาพ</li>
            <li>ระบบ Voting และ ELO Rating</li>
            <li>แสดงผลการจัดอันดับแบบ Real-time</li>
            <li>อัปโหลดรูปภาพ</li>
            <li>สถิติการแข่งขัน</li>
            <li>ระบบผู้ใช้และ Authentication</li>
        `;
    } else if (projectType === 'lottery') {
        modalTitle.textContent = 'ฟีเจอร์หลัก - แอปซื้อ-ขายลอตเตอรี่ออนไลน์';
        featuresList.innerHTML = `
            <li>ระบบซื้อ-ขายลอตเตอรี่</li>
            <li>ระบบตรวจรางวัล</li>
            <li>ระบบจัดการกระเป๋าเงิน (Wallet)</li>
            <li>ระบบจัดการข้อมูลผู้ใช้</li>
            <li>ระบบ Authentication ด้วย JWT</li>
            <li>ระบบประวัติการซื้อ-ขาย</li>
        `;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal when clicking the X button
document.querySelector('.demo-modal-close').addEventListener('click', function() {
    const modal = document.getElementById('demoModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close modal when clicking outside the modal content
document.getElementById('demoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('demoModal');
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Resume Modal Functions
function viewResume() {
    const modal = document.getElementById('resumeModal');
    const iframe = document.getElementById('resumeIframe');
    const loading = document.getElementById('resumeLoading');
    
    // Show modal
    modal.style.display = 'block';
    
    // Show loading
    loading.style.display = 'flex';
    iframe.style.display = 'none';
    
    // Set iframe src (replace with your resume PDF URL)
    iframe.src = 'flie/Resume.pdf'; // Ensure this path is correct
    
    // Handle iframe load
    iframe.onload = function() {
        loading.style.display = 'none';
        iframe.style.display = 'block';
    };
}

function closeResumeModal() {
    const modal = document.getElementById('resumeModal');
    const iframe = document.getElementById('resumeIframe');
    
    modal.style.display = 'none';
    iframe.src = ''; // Clear iframe to stop loading
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('resumeModal');
    if (event.target === modal) {
        closeResumeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('resumeModal');
        if (modal.style.display === 'block') {
            closeResumeModal();
        }
    }
});