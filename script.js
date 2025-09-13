// Product Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling navigation
    initializeSmoothScrolling();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize pricing card interactions
    initializePricingCards();
});

// Smooth scrolling navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation and enhancement
function initializeFormValidation() {
    const form = document.getElementById('form');
    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submit');
    
    // Real-time email validation
    emailInput.addEventListener('input', function() {
        const email = this.value;
        const isValid = validateEmail(email);
        
        if (email.length > 0) {
            if (isValid) {
                this.style.borderColor = '#27ae60';
                this.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.2)';
            } else {
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.2)';
            }
        } else {
            this.style.borderColor = '';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Form submission handling
    form.addEventListener('submit', function(e) {
        const email = emailInput.value;
        
        if (!validateEmail(email)) {
            e.preventDefault();
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;
        
        // Show success message (since we're using a mock URL)
        setTimeout(() => {
            showNotification('Thank you for your interest! We\'ll be in touch soon.', 'success');
            emailInput.value = '';
            submitBtn.innerHTML = 'Get Started';
            submitBtn.disabled = false;
        }, 1000);
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navBar = document.getElementById('nav-bar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navBar.classList.toggle('active');
        
        // Change hamburger to X when open
        if (navBar.classList.contains('active')) {
            this.innerHTML = 'X';
        } else {
            this.innerHTML = '☰';
        }
    });
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navBar.classList.remove('active');
            menuToggle.innerHTML = '☰';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navBar.contains(e.target) && !menuToggle.contains(e.target)) {
            navBar.classList.remove('active');
            menuToggle.innerHTML = '☰';
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navBar.classList.contains('active')) {
            navBar.classList.remove('active');
            menuToggle.innerHTML = '☰';
        }
    });
}

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 2000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #27ae60;' : 'background: #e74c3c;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll effects and animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(50px)';
        feature.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(feature);
    });
    
    // Observe pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Navbar background on scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(44, 62, 80, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)';
            header.style.backdropFilter = 'none';
        }
    });
}

// Pricing card interactions
function initializePricingCards() {
    const selectButtons = document.querySelectorAll('.select-btn');
    
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            const planName = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent;
            
            // Animate button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show selection feedback
            showNotification(`${planName} plan (${price}) selected! Scroll up to enter your email.`, 'success');
            
            // Scroll to email form
            setTimeout(() => {
                const emailInput = document.getElementById('email');
                emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                emailInput.focus();
            }, 1000);
        });
    });
}

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // Press 'E' to focus email input
    if (e.key.toLowerCase() === 'e' && !e.ctrlKey && !e.altKey) {
        const emailInput = document.getElementById('email');
        if (document.activeElement !== emailInput) {
            e.preventDefault();
            emailInput.focus();
            emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Video interaction enhancement
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const videoContainer = document.querySelector('.video-container');
    
    if (video && videoContainer) {
        // Add play button overlay for better UX
        const playOverlay = document.createElement('div');
        playOverlay.innerHTML = '▶️';
        playOverlay.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            color: white;
            cursor: pointer;
            z-index: 10;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 50%;
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        `;
        
        videoContainer.appendChild(playOverlay);
        
        playOverlay.addEventListener('click', function() {
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.display = 'none';
            }, 300);
        });
        
        playOverlay.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });
        
        playOverlay.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }
});