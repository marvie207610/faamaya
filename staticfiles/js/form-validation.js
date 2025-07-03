/**
 * Form Validation
 * Custom form validation for Zooniverse forms
 */

class FormValidator {
  constructor(form) {
    this.form = form
    this.submitButton = form.querySelector('button[type="submit"]')
    this.fields = Array.from(form.querySelectorAll("input, textarea, select")).filter(
      (field) => field.getAttribute("data-validate") !== null,
    )
    this.init()
  }

  init() {
    // Add form submit handler
    this.form.addEventListener("submit", (e) => {
      if (!this.validateAll()) {
        e.preventDefault()
      }
    })

    // Add input validation on blur
    this.fields.forEach((field) => {
      field.addEventListener("blur", () => {
        this.validateField(field)
      })

      // Add input validation on input for immediate feedback
      field.addEventListener("input", () => {
        if (field.dataset.validated === "false") {
          this.validateField(field)
        }
      })
    })
  }

  validateAll() {
    let isValid = true

    this.fields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false
      }
    })

    return isValid
  }

  validateField(field) {
    const value = field.value.trim()
    const validationType = field.getAttribute("data-validate")
    const errorElement = this.getErrorElement(field)
    let isValid = true
    let errorMessage = ""

    // Required field validation
    if (field.hasAttribute("required") && value === "") {
      isValid = false
      errorMessage = "This field is required"
    }
    // Email validation
    else if (validationType === "email" && value !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        isValid = false
        errorMessage = "Please enter a valid email address"
      }
    }
    // Password validation
    else if (validationType === "password" && value !== "") {
      if (value.length < 8) {
        isValid = false
        errorMessage = "Password must be at least 8 characters long"
      } else if (!/[A-Z]/.test(value)) {
        isValid = false
        errorMessage = "Password must contain at least one uppercase letter"
      } else if (!/[a-z]/.test(value)) {
        isValid = false
        errorMessage = "Password must contain at least one lowercase letter"
      } else if (!/[0-9]/.test(value)) {
        isValid = false
        errorMessage = "Password must contain at least one number"
      }
    }
    // Password confirmation validation
    else if (validationType === "password-confirm") {
      const passwordField = this.form.querySelector('input[data-validate="password"]')
      if (passwordField && value !== passwordField.value) {
        isValid = false
        errorMessage = "Passwords do not match"
      }
    }
    // URL validation
    else if (validationType === "url" && value !== "") {
      try {
        new URL(value)
      } catch (_) {
        isValid = false
        errorMessage = "Please enter a valid URL"
      }
    }
    // Number validation
    else if (validationType === "number" && value !== "") {
      if (isNaN(Number(value))) {
        isValid = false
        errorMessage = "Please enter a valid number"
      }
    }
    // Custom regex validation
    else if (validationType === "regex" && value !== "") {
      const pattern = field.getAttribute("data-pattern")
      if (pattern) {
        const regex = new RegExp(pattern)
        if (!regex.test(value)) {
          isValid = false
          errorMessage = field.getAttribute("data-error-message") || "Invalid format"
        }
      }
    }

    // Update field status
    if (isValid) {
      field.classList.remove("invalid")
      field.classList.add("valid")
      field.setAttribute("aria-invalid", "false")
      field.dataset.validated = "true"

      if (errorElement) {
        errorElement.textContent = ""
        errorElement.style.display = "none"
      }
    } else {
      field.classList.remove("valid")
      field.classList.add("invalid")
      field.setAttribute("aria-invalid", "true")
      field.dataset.validated = "false"

      if (errorElement) {
        errorElement.textContent = errorMessage
        errorElement.style.display = "block"
      }
    }

    return isValid
  }

  getErrorElement(field) {
    // Check for existing error element
    let errorElement = field.nextElementSibling
    if (errorElement && errorElement.classList.contains("form-error")) {
      return errorElement
    }

    // Create new error element
    errorElement = document.createElement("div")
    errorElement.className = "form-error"
    errorElement.setAttribute("aria-live", "polite")

    // Insert after field
    field.parentNode.insertBefore(errorElement, field.nextSibling)

    return errorElement
  }
}

// Initialize form validation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form[data-validate]").forEach((form) => {
    new FormValidator(form)
  })
})
