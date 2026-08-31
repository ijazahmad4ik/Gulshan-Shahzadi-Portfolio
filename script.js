// Reusable Navbar HTML
const navbarHTML = `
<nav class="navbar">
    <div class="nav-container">
        <a href="index.html" class="logo">Gulshan.</a>
        <div class="menu-toggle" id="mobile-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
        <ul class="nav-menu">
            <li><a href="index.html" class="nav-links">Home</a></li>
            <li><a href="about.html" class="nav-links">About</a></li>
            <li><a href="education.html" class="nav-links">Education</a></li>
            <li><a href="skills.html" class="nav-links">Skills</a></li>
            <li><a href="services.html" class="nav-links">Services</a></li>
            <li><a href="experience.html" class="nav-links">Experience</a></li>
            <li><a href="projects.html" class="nav-links">Projects</a></li>
            <li><a href="contact.html" class="nav-links">Contact</a></li>
        </ul>
    </div>
</nav>
`;

// Reusable Footer HTML
const footerHTML = `
<footer class="footer">
    <div class="footer-container">
        <p>&copy; 2026 Gulshan Shahzadi. All rights reserved.</p>
        <div class="social-icons">
            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="mailto:ijazahmad4ik@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
        </div>
    </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Navbar
    const headerContainer = document.getElementById('header-placeholder');
    if (headerContainer) {
        headerContainer.innerHTML = navbarHTML;
    }

    // 2. Inject Footer
    const footerContainer = document.getElementById('footer-placeholder');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }

    // 3. Mobile menu toggle functionality
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });
    }

    // 4. Highlight active link based on current URL
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    const navLinks = document.querySelectorAll('.nav-links');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active-link');
        }
    });

    // 5. Portfolio Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'flex';
                        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                    } else {
                        const categories = card.getAttribute('data-category').split(' ');
                        if (categories.includes(filterValue)) {
                            card.style.display = 'flex';
                            setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.9)';
                            setTimeout(() => { card.style.display = 'none'; }, 300);
                        }
                    }
                });
            });
        });
    }

    // 6. Portfolio Modal Logic
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.modal-close');
    const viewBtns = document.querySelectorAll('.view-project-btn');

    if (modal && viewBtns.length > 0) {
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.project-card');
                
                // Get data from the card
                const title = card.querySelector('h3').innerText;
                const desc = card.querySelector('.project-desc').innerText;
                const imgSrc = card.querySelector('.project-image-placeholder').getAttribute('data-img-src') || '';
                const tools = card.querySelector('.project-tools').innerHTML;

                // Set data to modal
                document.getElementById('modal-title').innerText = title;
                document.getElementById('modal-desc').innerText = desc;
                document.getElementById('modal-tools').innerHTML = tools;
                
                const modalImgContainer = document.getElementById('modal-img-container');
                if (imgSrc) {
                    modalImgContainer.innerHTML = `<img src="${imgSrc}" alt="${title}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px;">`;
                } else {
                    modalImgContainer.innerHTML = `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--neutral-light); border-radius: 8px; color: var(--neutral-dark);">[ Image Placeholder ]</div>`;
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        // Close modal functions
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close on clicking outside the modal content
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
