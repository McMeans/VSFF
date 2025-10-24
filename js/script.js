// Smooth scrolling function - make it globally available
window.scrollToSection = function(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Handle navigation clicks
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Get target section
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Smooth scroll to target section
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Handle form submission
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name') || document.getElementById('name').value;
      const email = formData.get('email') || document.getElementById('email').value;
      const subject = formData.get('subject') || document.getElementById('subject').value;
      const message = formData.get('message') || document.getElementById('message').value;
      
      // Basic validation
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
      
      // Simulate form submission
      alert('Thank you for your message! We\'ll get back to you soon.');
      this.reset();
    });
  }

  // Header is now always visible - no scroll hiding

  // Add intersection observer for active navigation
  const sections = document.querySelectorAll('section[id]');
  
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });

  // Add hover effects to cards
  const cards = document.querySelectorAll('.bio, .date-card, .award-card, .stat');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Add click handlers for submission buttons
  const submissionButtons = document.querySelectorAll('.btn-primary');
  
  submissionButtons.forEach(button => {
    if (button.textContent.includes('Submit') || button.textContent.includes('Submission')) {
      button.addEventListener('click', function() {
        // Scroll to submissions section
        const submissionsSection = document.getElementById('submissions');
        if (submissionsSection) {
          submissionsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    }
  });

  // Add animation on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.feature, .bio, .stat, .date-card, .award-card');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Initialize animation styles
  const animatedElements = document.querySelectorAll('.feature, .bio, .stat, .date-card, .award-card');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Run animation on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Run animation on load
  animateOnScroll();
});