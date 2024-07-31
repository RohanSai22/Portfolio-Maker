document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const popup = document.getElementById('project-popup');
    const closePopup = document.querySelector('.close');
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    // Theme toggle functionality
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference or set based on user's system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
        themeSwitch.checked = true;
    } else {
        body.classList.add('light-mode');
        themeSwitch.checked = false;
    }

    // Mobile menu toggle
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });

    // Project filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Project details popup
    const projectDetails = {
        'Personalized Learning': {
            description: 'Personalized learning project is designed to tailor educational content to individual user needs, enhancing the overall learning experience. It leverages advanced AI techniques, specifically the Gemini API and Flan T5 base model, to provide interactive and customized learning materials. The platform initially focuses on coding languages and professional courses, incorporating a document Q&A model for deeper engagement. Developed using React and Streamlit, the project emphasizes a user-friendly interface and efficient content delivery. By merging cutting-edge AI with practical applications, this project aims to revolutionize how users engage with and absorb educational content.',
            technologies: 'Gemini API, Flan T5 base model, React, Streamlit',
            link: 'https://youtu.be/e4zGTQ9kQBg?feature=shared'
        },
        'MERN Stack Real Estate Marketplace': {
            description: 'MERN stack real estate marketplace project is a comprehensive web application designed to facilitate property management and user interactions. The platform features secure user authentication using JWT and Firebase, ensuring that user data is protected. It allows users to manage property listings, including adding, editing, and deleting properties, with a responsive UI designed using Tailwind CSS. The application incorporates advanced search functionality and state management through Redux Toolkit, providing a seamless and efficient user experience. By leveraging the strengths of MongoDB, Express.js, React.js, and Node.js, this project aims to streamline the process of real estate transactions and enhance user engagement.',
            technologies: 'MongoDB, Express, React, Node.js, JWT, Redux Toolkit, Tailwind CSS',
            link: 'https://github.com/RohanSai22/food_store'
        },
        'ChatGPT-like System for Low-end CPUs': {
            description: 'This project aims to create a conversational AI system that can run efficiently on low-end CPUs, making advanced AI accessible without the need for high-end hardware. This system is designed to operate with minimal RAM usage, specifically targeting a range of 100MB to 8GB, to ensure compatibility with most consumer-grade computers. Utilizing modules such as Scrapy, BeautifulSoup (BS4), and the t5-small model, the project focuses on optimizing performance while maintaining conversational capabilities. The interface is built using Streamlit, providing a user-friendly platform for interaction. By applying techniques like model quantization and efficient data handling, this project demonstrates that powerful AI tools can be made available on modest hardware setups, broadening the reach and usability of conversational AI.',
            technologies: 'Scrapy, BeautifulSoup, transformers, t5-small model, Streamlit',
            link: 'https://github.com/RohanSai22/rnag'
        },
        'Reducing GPU Dependency in Large Language Models through Weight Prediction and CPU Optimization': {
            description: 'This project aims to reduce the dependency on GPUs for Large Language Models (LLMs) by leveraging individual Deep Learning (DL) models for each layer. By utilizing these individual DL models, we can unlock potential applications such as chain-of-thought reasoning and AI agent chains. This approach also enables the sequential utilization of CPUs instead of GPUs, making advanced AI technologies more accessible and deployable in resource-constrained environments. The methodology involves training lightweight neural networks to predict the weights of a pre-trained LLM, allowing efficient CPU-based inference without significant performance loss. This innovation demonstrates that powerful AI tools can be made available on modest hardware setups, broadening the reach and usability of conversational AI.',
            technologies: 'Weight Prediction Techniques,CPU Optimization,Individual Deep Learning Models,Sequential CPU Utilization,PyTorch,Hugging Face Transformers',
            link: 'https://www.youtube.com/watch?v=ZZTyjLwovhE'
        },
    };
    
    projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectTitle = card.querySelector('h3').textContent;
                const details = projectDetails[projectTitle];
                
                document.getElementById('popup-title').textContent = projectTitle;
                document.getElementById('popup-description').textContent = details.description;
                document.getElementById('popup-technologies').textContent = `Technologies: ${details.technologies}`;
                
                const popupLink = document.getElementById('popup-link');
                popupLink.href = details.link;
                popupLink.target = '_blank';
                popupLink.rel = 'noopener noreferrer';
                
                popup.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
            });
        });

        function addNewProject(project) {
            const projectGrid = document.querySelector('.project-grid');
            const newCard = document.createElement('div');
            newCard.className = 'project-card';
            newCard.setAttribute('data-category', project.category);
            newCard.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.shortDescription}</p>
                <div class="project-buttons">
                    <button class="btn view-project">View Project</button>
                </div>
            `;
            projectGrid.appendChild(newCard);
            projectDetails[project.title] = {
                description: project.fullDescription,
                technologies: project.technologies,
                link: project.link
            };
        
            // Add click event listener to the new card
            newCard.addEventListener('click', () =>
                {
                    const projectTitle = card.querySelector('h3').textContent;
                    const details = projectDetails[projectTitle];
                    
                    document.getElementById('popup-title').textContent = projectTitle;
                    document.getElementById('popup-description').textContent = details.description;
                    document.getElementById('popup-technologies').textContent = `Technologies: ${details.technologies}`;
                    
                    const popupLink = document.getElementById('popup-link');
                    popupLink.href = details.link;
                    popupLink.target = '_blank';
                    popupLink.rel = 'noopener noreferrer';
                    
                    popup.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
                }
           );
        }
        
    

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });


    // Skills progress bar animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
        });
    };

    // Intersection Observer for skill bars animation
    const skillsSection = document.querySelector('#skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillsObserver.observe(skillsSection);


    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }, 100);
    }

    // Scroll-based animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load

    // Parallax effect for star background
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        document.getElementById('stars').style.transform = `translateY(${scrollPosition * 0.1}px)`;
        document.getElementById('stars2').style.transform = `translateY(${scrollPosition * 0.2}px)`;
        document.getElementById('stars3').style.transform = `translateY(${scrollPosition * 0.3}px)`;
    });

    // Dynamic typing effect for the introduction
    const introText = "Passion towards Generative Artificial Intelligence and AGI";
    const introElement = document.querySelector('#home p');
    let i = 0;
    const typingEffect = () => {
        if (i < introText.length) {
            introElement.innerHTML += introText.charAt(i);
            i++;
            setTimeout(typingEffect, 50);
        }
    };
    typingEffect();

    // Lazy loading for images (if any)
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoad = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.disconnect();
                }
            });
        });
        io.observe(target);
    };
    lazyImages.forEach(lazyLoad);

    // Add hover effect to social media icons
    const socialIcons = document.querySelectorAll('.social-links a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
        });
    });

    // Add smooth reveal animation to sections
    const revealSections = document.querySelectorAll('.section');
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    };
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });
    revealSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Update active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Redirect to home on reload
    if (performance.navigation.type === 1) {
        window.location.hash = '#home';
    }
});


