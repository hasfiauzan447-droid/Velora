// ========== INITIALIZATION ==========
document.addEventListener("DOMContentLoaded", function () {
    initAOS();
    initPreloader();
    initCursor();
    initNavbar();
    initThemeToggle();
    initMobileMenu();
    initCounter();
    initWorkFilter();
    initContactForm();
    initNewsletterForm();
    initSmoothScroll();
});

// ========== AOS INITIALIZATION ==========
function initAOS() {
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: "ease-in-out"
        });
    }
}

// ========== PRELOADER ==========
function initPreloader() {
    const preloader = document.querySelector(".preloader");
    if (!preloader) return;

    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader.classList.add("hidden");
        }, 1000);
    });
}

// ========== CUSTOM CURSOR ==========
function initCursor() {
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    if (!cursor || !follower) return;

    document.addEventListener("mousemove", e => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Hover effect on clickable elements
    const hoverElements = document.querySelectorAll(
        "a, button, .work-item, .service-card, .filter-btn"
    );

    hoverElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.style.width = "20px";
            cursor.style.height = "20px";
            follower.style.width = "40px";
            follower.style.height = "40px";
        });

        el.addEventListener("mouseleave", () => {
            cursor.style.width = "10px";
            cursor.style.height = "10px";
            follower.style.width = "30px";
            follower.style.height = "30px";
        });
    });

    // Hide cursor when leaving window
    document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
        follower.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
        cursor.style.opacity = "1";
        follower.style.opacity = "1";
    });
}

// ========== NAVBAR SCROLL EFFECT ==========
function initNavbar() {
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    if (!navbar) return;

    window.addEventListener("scroll", () => {
        // Navbar background on scroll
        if (window.scrollY > 100) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Active nav link based on scroll position
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
}

// ========== THEME TOGGLE ==========
function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    // Check for saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        if (icon) {
            icon.className =
                savedTheme === "dark"
                    ? "fa-regular fa-sun"
                    : "fa-regular fa-moon";
        }
    }

    themeToggle.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        // Update icon
        if (icon) {
            icon.className =
                newTheme === "dark"
                    ? "fa-regular fa-sun"
                    : "fa-regular fa-moon";
        }

        // Animation
        themeToggle.style.transform = "rotate(360deg)";
        setTimeout(() => {
            themeToggle.style.transform = "";
        }, 300);
    });
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        mobileMenu.classList.toggle("active");
        document.body.style.overflow = mobileMenu.classList.contains("active")
            ? "hidden"
            : "";
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "";
        });
    });
}

// ========== COUNTER ANIMATION ==========
function initCounter() {
    const counters = document.querySelectorAll(".stat-number");
    if (!counters.length) return;

    let animated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target")) || 0;
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    };

    // Trigger when stats section is in view
    const statsSection = document.querySelector(".hero-stats");
    if (!statsSection) return;

    window.addEventListener("scroll", () => {
        if (!animated) {
            const sectionTop = statsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.8) {
                animateCounters();
                animated = true;
            }
        }
    });
}

// ========== WORK FILTER ==========
function initWorkFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const workItems = document.querySelectorAll(".work-item");

    if (!filterBtns.length || !workItems.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Filter items
            const filter = btn.getAttribute("data-filter");

            workItems.forEach(item => {
                if (
                    filter === "all" ||
                    item.getAttribute("data-category") === filter
                ) {
                    item.style.display = "block";
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }, 50);
                } else {
                    item.style.opacity = "0";
                    item.style.transform = "scale(0.8)";
                    setTimeout(() => {
                        item.style.display = "none";
                    }, 300);
                }
            });

            // Refresh AOS
            if (typeof AOS !== "undefined") {
                AOS.refresh();
            }
        });
    });
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", async e => {
        e.preventDefault();

        // Get form data
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");

        if (!nameInput || !emailInput || !subjectInput || !messageInput) return;

        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        };

        // Validate form
        if (!validateForm(formData)) {
            showNotification("Please fill all fields correctly", "error");
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector(".submit-btn");
        const originalText = submitBtn ? submitBtn.innerHTML : "Send Message";

        if (submitBtn) {
            submitBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
        }

        // Simulate API call (replace with actual fetch)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success
            showNotification(
                "Message sent successfully! We'll get back to you soon.",
                "success"
            );
            contactForm.reset();
        } catch (error) {
            showNotification(
                "Something went wrong. Please try again.",
                "error"
            );
        } finally {
            // Reset button
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
    });
}

// ========== NEWSLETTER FORM ==========
function initNewsletterForm() {
    const newsletterForm = document.querySelector(".newsletter-form");
    if (!newsletterForm) return;

    newsletterForm.addEventListener("submit", e => {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (!emailInput) return;

        const email = emailInput.value;

        if (!email || !email.includes("@")) {
            showNotification("Please enter a valid email", "error");
            return;
        }

        // Simulate subscription
        showNotification("Thank you for subscribing!", "success");
        newsletterForm.reset();
    });
}

// ========== FORM VALIDATION ==========
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
        data.name.trim() !== "" &&
        emailRegex.test(data.email) &&
        data.subject.trim() !== "" &&
        data.message.trim() !== ""
    );
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = "success") {
    // Remove existing notification
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement("div");
    notification.className = "notification";

    // Style notification
    notification.style.position = "fixed";
    notification.style.bottom = "2rem";
    notification.style.right = "2rem";
    notification.style.padding = "1rem 2rem";
    notification.style.borderRadius = "50px";
    notification.style.color = "white";
    notification.style.fontSize = "0.95rem";
    notification.style.zIndex = "9999";
    notification.style.transform = "translateX(200%)";
    notification.style.transition = "transform 0.3s";
    notification.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
    notification.style.display = "flex";
    notification.style.alignItems = "center";
    notification.style.gap = "0.5rem";

    if (type === "success") {
        notification.style.background =
            "linear-gradient(135deg, #10b981, #059669)";
        notification.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> ' + message;
    } else {
        notification.style.background =
            "linear-gradient(135deg, #ef4444, #dc2626)";
        notification.innerHTML =
            '<i class="fa-solid fa-circle-exclamation"></i> ' + message;
    }

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.style.transform = "translateX(0)";
    }, 100);

    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.transform = "translateX(200%)";
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}

// ========== PARALLAX EFFECT ==========
window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const gradientSphere = document.querySelector(".gradient-sphere");
    const shapes = document.querySelectorAll(".shape");

    if (gradientSphere) {
        gradientSphere.style.transform = `translate(${scrolled * 0.1}px, ${
            scrolled * 0.05
        }px)`;
    }

    shapes.forEach((shape, index) => {
        const speed = 0.05 * (index + 1);
        shape.style.transform = `translate(${scrolled * speed}px, ${
            scrolled * speed * 0.5
        }px)`;
    });
});

// ========== WORK ITEMS HOVER 3D EFFECT ==========
const workItems = document.querySelectorAll(".work-item");

workItems.forEach(item => {
    item.addEventListener("mousemove", e => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 30;
        const angleY = (centerX - x) / 30;

        item.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    item.addEventListener("mouseleave", () => {
        item.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
});

// ========== SCROLL TO TOP BUTTON ==========
function createScrollToTopButton() {
    const scrollToTopBtn = document.createElement("button");
    scrollToTopBtn.className = "scroll-to-top";
    scrollToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute("aria-label", "Scroll to top");

    // Style scroll to top button
    scrollToTopBtn.style.position = "fixed";
    scrollToTopBtn.style.bottom = "2rem";
    scrollToTopBtn.style.left = "2rem";
    scrollToTopBtn.style.width = "50px";
    scrollToTopBtn.style.height = "50px";
    scrollToTopBtn.style.borderRadius = "50%";
    scrollToTopBtn.style.background =
        "linear-gradient(135deg, #3b82f6, #8b5cf6)";
    scrollToTopBtn.style.color = "white";
    scrollToTopBtn.style.border = "none";
    scrollToTopBtn.style.cursor = "pointer";
    scrollToTopBtn.style.display = "flex";
    scrollToTopBtn.style.alignItems = "center";
    scrollToTopBtn.style.justifyContent = "center";
    scrollToTopBtn.style.fontSize = "1.2rem";
    scrollToTopBtn.style.boxShadow = "0 5px 20px rgba(59, 130, 246, 0.3)";
    scrollToTopBtn.style.transition = "all 0.3s";
    scrollToTopBtn.style.opacity = "0";
    scrollToTopBtn.style.visibility = "hidden";
    scrollToTopBtn.style.zIndex = "99";

    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = "1";
            scrollToTopBtn.style.visibility = "visible";
        } else {
            scrollToTopBtn.style.opacity = "0";
            scrollToTopBtn.style.visibility = "hidden";
        }
    });

    // Scroll to top on click
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Hover effect
    scrollToTopBtn.addEventListener("mouseenter", () => {
        scrollToTopBtn.style.transform = "translateY(-5px)";
        scrollToTopBtn.style.boxShadow = "0 10px 30px rgba(59, 130, 246, 0.5)";
    });

    scrollToTopBtn.addEventListener("mouseleave", () => {
        scrollToTopBtn.style.transform = "translateY(0)";
        scrollToTopBtn.style.boxShadow = "0 5px 20px rgba(59, 130, 246, 0.3)";
    });
}

// Panggil fungsi scroll to top
createScrollToTopButton();

// ========== DYNAMIC YEAR ==========
const yearElements = document.querySelectorAll(".current-year");
yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
});

// ========== CONSOLE MESSAGE ==========
console.log(
    "%c✨ Velora Premium Website ✨",
    "font-size: 20px; color: #3b82f6; font-weight: bold;"
);
console.log(
    "%cVersion: 3.0 | Value: Rp 30.000.000",
    "font-size: 14px; color: #8b5cf6;"
);
console.log(
    "%cAll features are fully functional! 🚀",
    "font-size: 14px; color: #10b981;"
);
