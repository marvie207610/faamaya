/**
 * Zooniverse UI Components
 * Custom JavaScript components for the Zooniverse website
 */

// Modal Component
class Modal {
  constructor(id) {
    this.modal = document.getElementById(id)
    this.overlay = document.createElement("div")
    this.overlay.className = "modal-overlay"
    this.isOpen = false
    this.init()
  }

  init() {
    // Create close button if it doesn't exist
    if (!this.modal.querySelector(".modal-close")) {
      const closeBtn = document.createElement("button")
      closeBtn.className = "modal-close"
      closeBtn.innerHTML = "&times;"
      closeBtn.setAttribute("aria-label", "Close modal")
      this.modal.appendChild(closeBtn)
    }

    // Add event listeners
    this.modal.querySelector(".modal-close").addEventListener("click", () => this.close())
    this.overlay.addEventListener("click", () => this.close())

    // Add keyboard event listener
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close()
      }
    })
  }

  open() {
    document.body.appendChild(this.overlay)
    this.modal.classList.add("active")
    this.overlay.classList.add("active")
    document.body.style.overflow = "hidden"
    this.isOpen = true

    // Focus trap
    this.modal.setAttribute("aria-hidden", "false")
    this.modal.focus()
  }

  close() {
    this.modal.classList.remove("active")
    this.overlay.classList.remove("active")
    document.body.style.overflow = ""
    this.isOpen = false

    // Remove overlay from DOM
    if (this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay)
    }

    this.modal.setAttribute("aria-hidden", "true")
  }
}

// Tabs Component
class Tabs {
  constructor(container) {
    this.container = container
    this.tabs = container.querySelectorAll(".tab-button")
    this.panels = container.querySelectorAll(".tab-panel")
    this.init()
  }

  init() {
    this.tabs.forEach((tab, index) => {
      tab.setAttribute("role", "tab")
      tab.setAttribute("aria-selected", index === 0 ? "true" : "false")
      tab.setAttribute("tabindex", index === 0 ? "0" : "-1")

      tab.addEventListener("click", (e) => {
        e.preventDefault()
        this.switchTab(tab)
      })

      // Keyboard navigation
      tab.addEventListener("keydown", (e) => {
        const tabsArray = Array.from(this.tabs)
        const index = tabsArray.indexOf(tab)

        if (e.key === "ArrowRight") {
          const nextTab = tabsArray[(index + 1) % tabsArray.length]
          this.switchTab(nextTab)
          nextTab.focus()
        } else if (e.key === "ArrowLeft") {
          const prevTab = tabsArray[(index - 1 + tabsArray.length) % tabsArray.length]
          this.switchTab(prevTab)
          prevTab.focus()
        }
      })
    })

    this.panels.forEach((panel, index) => {
      panel.setAttribute("role", "tabpanel")
      panel.setAttribute("aria-hidden", index === 0 ? "false" : "true")
      panel.setAttribute("tabindex", "0")
    })
  }

  switchTab(tab) {
    // Update tab states
    this.tabs.forEach((t) => {
      t.setAttribute("aria-selected", "false")
      t.setAttribute("tabindex", "-1")
      t.classList.remove("active")
    })

    tab.setAttribute("aria-selected", "true")
    tab.setAttribute("tabindex", "0")
    tab.classList.add("active")

    // Update panel states
    const targetId = tab.getAttribute("aria-controls")
    const targetPanel = this.container.querySelector(`#${targetId}`)

    this.panels.forEach((panel) => {
      panel.setAttribute("aria-hidden", "true")
      panel.classList.remove("active")
    })

    targetPanel.setAttribute("aria-hidden", "false")
    targetPanel.classList.add("active")
  }
}

// Dropdown Component
class Dropdown {
  constructor(container) {
    this.container = container
    this.button = container.querySelector(".dropdown-button")
    this.menu = container.querySelector(".dropdown-menu")
    this.isOpen = false
    this.init()
  }

  init() {
    this.button.setAttribute("aria-expanded", "false")
    this.menu.setAttribute("aria-hidden", "true")

    this.button.addEventListener("click", () => this.toggle())

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (this.isOpen && !this.container.contains(e.target)) {
        this.close()
      }
    })

    // Keyboard navigation
    this.button.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close()
      } else if (e.key === "ArrowDown" && !this.isOpen) {
        e.preventDefault()
        this.open()
      }
    })
  }

  open() {
    this.menu.classList.add("active")
    this.button.setAttribute("aria-expanded", "true")
    this.menu.setAttribute("aria-hidden", "false")
    this.isOpen = true
  }

  close() {
    this.menu.classList.remove("active")
    this.button.setAttribute("aria-expanded", "false")
    this.menu.setAttribute("aria-hidden", "true")
    this.isOpen = false
  }

  toggle() {
    if (this.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }
}

// Tooltip Component
class Tooltip {
  constructor(element) {
    this.element = element
    this.tooltip = null
    this.text = element.getAttribute("data-tooltip")
    this.position = element.getAttribute("data-tooltip-position") || "top"
    this.init()
  }

  init() {
    this.element.addEventListener("mouseenter", () => this.show())
    this.element.addEventListener("mouseleave", () => this.hide())
    this.element.addEventListener("focus", () => this.show())
    this.element.addEventListener("blur", () => this.hide())
  }

  show() {
    // Create tooltip element
    this.tooltip = document.createElement("div")
    this.tooltip.className = `tooltip tooltip-${this.position}`
    this.tooltip.textContent = this.text
    document.body.appendChild(this.tooltip)

    // Position the tooltip
    const rect = this.element.getBoundingClientRect()
    const tooltipRect = this.tooltip.getBoundingClientRect()

    let top, left

    switch (this.position) {
      case "top":
        top = rect.top - tooltipRect.height - 10
        left = rect.left + rect.width / 2 - tooltipRect.width / 2
        break
      case "bottom":
        top = rect.bottom + 10
        left = rect.left + rect.width / 2 - tooltipRect.width / 2
        break
      case "left":
        top = rect.top + rect.height / 2 - tooltipRect.height / 2
        left = rect.left - tooltipRect.width - 10
        break
      case "right":
        top = rect.top + rect.height / 2 - tooltipRect.height / 2
        left = rect.right + 10
        break
    }

    // Adjust position to keep tooltip in viewport
    if (left < 10) left = 10
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10
    }
    if (top < 10) top = 10
    if (top + tooltipRect.height > window.innerHeight - 10) {
      top = window.innerHeight - tooltipRect.height - 10
    }

    this.tooltip.style.top = `${top + window.scrollY}px`
    this.tooltip.style.left = `${left + window.scrollX}px`

    // Add active class for animation
    setTimeout(() => {
      this.tooltip.classList.add("active")
    }, 10)
  }

  hide() {
    if (this.tooltip) {
      this.tooltip.classList.remove("active")

      // Remove from DOM after animation
      setTimeout(() => {
        if (this.tooltip && this.tooltip.parentNode) {
          this.tooltip.parentNode.removeChild(this.tooltip)
          this.tooltip = null
        }
      }, 300)
    }
  }
}

// Initialize components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize modals
  document.querySelectorAll(".modal").forEach((modal) => {
    new Modal(modal.id)
  })

  // Initialize tabs
  document.querySelectorAll(".tabs-container").forEach((container) => {
    new Tabs(container)
  })

  // Initialize dropdowns
  document.querySelectorAll(".dropdown").forEach((container) => {
    new Dropdown(container)
  })

  // Initialize tooltips
  document.querySelectorAll("[data-tooltip]").forEach((element) => {
    new Tooltip(element)
  })
})
