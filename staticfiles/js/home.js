// Home page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Initialize loading animation
  initLoadingAnimation()

  // Initialize stats counter animation
  initStatsAnimation()

  // Initialize project cards hover effects
  initProjectCards()
})

// Loading Animation
function initLoadingAnimation() {
  const loadingContainer = document.getElementById("loading-container")
  const heroContent = document.getElementById("hero-content")

  if (loadingContainer && heroContent) {
    // Show loading for 2 seconds, then show hero content
    setTimeout(() => {
      loadingContainer.style.opacity = "0"
      loadingContainer.style.transition = "opacity 0.5s ease"

      setTimeout(() => {
        loadingContainer.style.display = "none"
        heroContent.style.display = "block"
        heroContent.style.opacity = "0"

        // Fade in hero content
        setTimeout(() => {
          heroContent.style.transition = "opacity 0.8s ease"
          heroContent.style.opacity = "1"
        }, 50)
      }, 500)
    }, 2000)
  }
}

// Stats Counter Animation
function initStatsAnimation() {
  const statNumbers = document.querySelectorAll(".stat-number")

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStatNumber(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  statNumbers.forEach((stat) => {
    observer.observe(stat)
  })
}

function animateStatNumber(element) {
  const finalValue = element.textContent
  const numericValue = Number.parseFloat(finalValue.replace(/[^\d.]/g, ""))
  const suffix = finalValue.replace(/[\d.]/g, "")

  let currentValue = 0
  const increment = numericValue / 50 // 50 steps
  const duration = 2000 // 2 seconds
  const stepTime = duration / 50

  const timer = setInterval(() => {
    currentValue += increment

    if (currentValue >= numericValue) {
      currentValue = numericValue
      clearInterval(timer)
    }

    // Format the number
    let displayValue
    if (numericValue >= 1000000) {
      displayValue = (currentValue / 1000000).toFixed(1) + "M"
    } else if (numericValue >= 1000) {
      displayValue = (currentValue / 1000).toFixed(1) + "K"
    } else {
      displayValue = Math.floor(currentValue).toString()
    }

    // Add back any non-numeric suffix
    if (suffix && !displayValue.includes("M") && !displayValue.includes("K")) {
      displayValue += suffix
    }

    element.textContent = displayValue
  }, stepTime)
}

// Project Cards
function initProjectCards() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    // Add hover effect for better interactivity
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })

    // Add click handler for project cards
    const button = card.querySelector(".btn")
    if (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault()

        // Add loading state
        const originalText = this.textContent
        this.textContent = "Loading..."
        this.disabled = true

        // Simulate loading
        setTimeout(() => {
          this.textContent = originalText
          this.disabled = false

          // Here you would typically redirect to the project page
          console.log("Navigating to project...")
        }, 1000)
      })
    }
  })
}

// Parallax effect for hero section
function initParallaxEffect() {
  const heroSection = document.querySelector(".hero-section")

  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.5

      heroSection.style.transform = `translateY(${parallax}px)`
    })
  }
}

// Initialize parallax effect
document.addEventListener("DOMContentLoaded", () => {
  initParallaxEffect()
})

// Add some interactive elements
function addInteractiveElements() {
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
}

// Initialize interactive elements
document.addEventListener("DOMContentLoaded", () => {
  addInteractiveElements()
})
