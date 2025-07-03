/**
 * Stats Section Animation and Sticky Behavior
 */

document.addEventListener("DOMContentLoaded", () => {
  initStatsSection()
})

function initStatsSection() {
  const statsSection = document.getElementById("stats-section")
  const statItems = document.querySelectorAll(".stat-item")
  const statNumbers = document.querySelectorAll(".stat-number")

  if (!statsSection) return

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animate stat items
        statItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("in-view")
          }, index * 100)
        })

        // Start number counting animation
        setTimeout(() => {
          animateNumbers()
        }, 500)

        // Only animate once
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  observer.observe(statsSection)

  // Sticky behavior enhancement
  initStickyBehavior()
}

function animateNumbers() {
  const statNumbers = document.querySelectorAll(".stat-number")

  statNumbers.forEach((numberElement) => {
    const target = Number.parseFloat(numberElement.getAttribute("data-target"))
    const suffix = numberElement.closest(".stat-item").getAttribute("data-suffix") || ""

    animateValue(numberElement, 0, target, 2000, suffix)
  })
}

function animateValue(element, start, end, duration, suffix = "") {
  let startTimestamp = null
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const current = start + (end - start) * easeOutQuart

    // Format the number based on its value
    let displayValue
    if (end >= 1000000) {
      displayValue = (current / 1000000).toFixed(1) + "M"
    } else if (end >= 1000) {
      displayValue = (current / 1000).toFixed(1) + "K"
    } else {
      displayValue = Math.floor(current).toString()
    }

    // Add suffix if provided
    if (suffix && !displayValue.includes("M") && !displayValue.includes("K")) {
      displayValue += suffix
    }

    element.textContent = displayValue

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      // Ensure final value is correct
      let finalValue
      if (end >= 1000000) {
        finalValue = (end / 1000000).toFixed(1) + "M"
      } else if (end >= 1000) {
        finalValue = (end / 1000).toFixed(1) + "K"
      } else {
        finalValue = end.toString() + suffix
      }
      element.textContent = finalValue
    }
  }
  requestAnimationFrame(step)
}

function initStickyBehavior() {
  const statsSection = document.getElementById("stats-section")
  if (!statsSection) return

  let isSticky = false

  const checkSticky = () => {
    const rect = statsSection.getBoundingClientRect()
    const shouldBeSticky = rect.top <= 70 // Header height

    if (shouldBeSticky && !isSticky) {
      statsSection.classList.add("sticky-active")
      isSticky = true
    } else if (!shouldBeSticky && isSticky) {
      statsSection.classList.remove("sticky-active")
      isSticky = false
    }
  }

  // Throttled scroll listener
  let ticking = false
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkSticky()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener("scroll", handleScroll)

  // Initial check
  checkSticky()
}

// Utility function for smooth scrolling to stats section
function scrollToStats() {
  const statsSection = document.getElementById("stats-section")
  if (statsSection) {
    const headerHeight = 70
    const targetPosition = statsSection.offsetTop - headerHeight

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })
  }
}

// Export for use in other scripts
window.scrollToStats = scrollToStats
