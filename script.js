// ===== GLOBAL VARIABLES =====
let currentImageIndex = 0;

// Gallery images for gallery page
const galleryImages = [
    {
        url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Modern Construction',
        category: 'construction'
    },
    {
        url: 'https://images.unsplash.com/photo-1503387769-00a112127ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Architectural Design',
        category: 'design'
    },
    {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Construction Team',
        category: 'team'
    },
    {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Building Materials',
        category: 'materials'
    },
    {
        url: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Construction Site',
        category: 'construction'
    },
    {
        url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Completed Project',
        category: 'completed'
    },
    {
        url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'ISSB Blocks',
        category: 'materials'
    },
    {
        url: 'https://images.unsplash.com/photo-1503387769-00a112127ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'House Design',
        category: 'design'
    },
    {
        url: 'https://images.unsplash.com/photo-1600585154340-043788447ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Modern Architecture',
        category: 'design'
    },
    {
        url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Interior Design',
        category: 'design'
    },
    {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Luxury Home',
        category: 'completed'
    },
    {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Construction Workers',
        category: 'team'
    }
];

// Home page gallery images (only 3)
const homeGalleryImages = [
    {
        url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Modern Construction Project'
    },
    {
        url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Completed Luxury Home'
    },
    {
        url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'ISSB Block Production'
    }
];

// ===== DOM ELEMENTS =====
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileServicesToggle = document.getElementById('mobileServicesToggle');
const mobileServicesContent = document.getElementById('mobileServicesContent');
const whatsappButton = document.getElementById('whatsappButton');
const whatsappPopup = document.getElementById('whatsappPopup');
const popupClose = document.getElementById('popupClose');
const whatsappCancel = document.getElementById('whatsappCancel');
const accordionToggles = document.querySelectorAll('.accordion-toggle');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxImage = document.getElementById('lightboxImage');
const galleryGrid = document.getElementById('galleryGrid');
const contactForm = document.getElementById('contactForm');
const categoryButtons = document.querySelectorAll('.category-btn');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize based on current page
    const currentPage = getCurrentPage();
    
    if (currentPage === 'gallery') {
        initializeGallery();
        setupGalleryFilter();
    } else if (currentPage === 'home') {
        initializeHomeGallery();
    }
    
    setupEventListeners();
    
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize stats animation on home page
    if (currentPage === 'home') {
        initStatsAnimation();
    }
});

// ===== FUNCTIONS =====
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('about.html')) return 'about';
    if (path.includes('services.html')) return 'services';
    if (path.includes('gallery.html')) return 'gallery';
    if (path.includes('contact.html')) return 'contact';
    return 'home'; // Default to home
}

function setActiveNavLink() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        
        if ((currentPage === 'home' && (linkPage === 'index.html' || linkPage === './')) ||
            (currentPage !== 'home' && linkPage.includes(currentPage + '.html'))) {
            link.classList.add('active');
        }
    });
}

function initializeGallery() {
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${image.category}`;
        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.title}" data-index="${index}">
            <div class="gallery-overlay">
                <h4>${image.title}</h4>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
        
        // Add click event to each gallery item
        galleryItem.addEventListener('click', () => openLightbox(index));
    });
}

function initializeHomeGallery() {
    const homeGallery = document.getElementById('homeGallery');
    if (!homeGallery) return;
    
    homeGallery.innerHTML = '';
    
    homeGalleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-preview-item';
        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.title}">
            <div class="gallery-overlay">
                <h4>${image.title}</h4>
            </div>
        `;
        homeGallery.appendChild(galleryItem);
        
        // Add click event to redirect to gallery page
        galleryItem.addEventListener('click', () => {
            window.location.href = 'gallery.html';
        });
    });
}

function setupGalleryFilter() {
    if (!categoryButtons.length) return;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterGallery(category);
        });
    });
}

function filterGallery(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            // Add fade in animation
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

function setupEventListeners() {
    // Mobile navigation toggle
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Mobile services dropdown toggle
    if (mobileServicesToggle) {
        mobileServicesToggle.addEventListener('click', () => {
            mobileServicesContent.classList.toggle('active');
            const icon = mobileServicesToggle.querySelector('i');
            if (mobileServicesContent.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    }
    
    // WhatsApp widget
    if (whatsappButton) {
        whatsappButton.addEventListener('click', () => {
            whatsappPopup.classList.toggle('active');
        });
    }
    
    if (popupClose) {
        popupClose.addEventListener('click', () => {
            whatsappPopup.classList.remove('active');
        });
    }
    
    if (whatsappCancel) {
        whatsappCancel.addEventListener('click', () => {
            whatsappPopup.classList.remove('active');
        });
    }
    
    // Close WhatsApp popup when clicking outside
    document.addEventListener('click', (e) => {
        if (whatsappPopup && whatsappButton && !whatsappPopup.contains(e.target) && !whatsappButton.contains(e.target)) {
            whatsappPopup.classList.remove('active');
        }
    });
    
    // Services accordion
    if (accordionToggles.length > 0) {
        accordionToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const accordionItem = toggle.closest('.accordion-item');
                const accordionContent = accordionItem.querySelector('.accordion-content');
                const icon = toggle.querySelector('i');
                
                // Toggle active class
                accordionContent.classList.toggle('active');
                
                // Change icon
                if (accordionContent.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        });
    }
    
    // Lightbox functionality
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxImage();
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateLightboxImage();
        });
    }
    
    // Close lightbox when clicking outside the image
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close lightbox with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                lightboxModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Form validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll show a success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been sent. We will contact you at ${email} or ${phone} shortly.`);
                
                // Reset the form
                contactForm.reset();
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Sticky header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateLightboxImage() {
    const image = galleryImages[currentImageIndex];
    lightboxImage.src = image.url;
    lightboxImage.alt = image.title;
}

function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const targetValue = parseInt(statNumber.textContent);
                let currentValue = 0;
                const increment = targetValue / 50;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        statNumber.textContent = targetValue + '+';
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(currentValue);
                    }
                }, 30);
                
                // Stop observing after animation
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// ===== SCROLL ANIMATIONS =====
// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .value-item, .benefit-item, .process-step, .team-member');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize scroll animations when page loads
window.addEventListener('load', () => {
    animateOnScroll();
});
