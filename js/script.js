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

  // Handle form submission - Netlify Forms version
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Hide previous messages
      formMessage.style.display = 'none';
      
      // Send to Netlify Forms
      const formData = new FormData(this);
      
      fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(async response => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();

        formMessage.textContent = result.message || 'Thank you for your message! We\'ll get back to you soon.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        
        // Reset form
        this.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
      })
      .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
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
  const cards = document.querySelectorAll('.date-card, .award-card');
  
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
        // Check if this is the main submission button in the submissions section
        const submissionsSection = document.getElementById('submissions');
        const isMainSubmissionButton = submissionsSection && submissionsSection.contains(this);
        
        if (isMainSubmissionButton) {
          // Navigate to FilmFreeway
          window.open('https://filmfreeway.com/VirginiaStudentFilmFestival', '_blank');
        } else {
          // Scroll to submissions section for other buttons
          if (submissionsSection) {
            submissionsSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    }
  });

  // Add animation on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.feature, .date-card, .award-card');
    
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
  const animatedElements = document.querySelectorAll('.feature, .date-card, .award-card');
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