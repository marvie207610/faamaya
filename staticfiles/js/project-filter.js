/**
 * Project Filter
 * Filter projects by category, search term, etc.
 */

class ProjectFilter {
  constructor(container) {
    this.container = container
    this.projects = Array.from(container.querySelectorAll(".project-card"))
    this.filterForm = document.getElementById("project-filter-form")
    this.searchInput = document.getElementById("project-search")
    this.categoryFilters = document.querySelectorAll('input[name="category"]')
    this.sortSelect = document.getElementById("project-sort")
    this.resultsCount = document.getElementById("results-count")
    this.noResults = document.getElementById("no-results")
    this.init()
  }

  init() {
    // Initialize filter form
    if (this.filterForm) {
      this.filterForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.applyFilters()
      })
    }

    // Initialize search input
    if (this.searchInput) {
      this.searchInput.addEventListener("input", () => {
        this.applyFilters()
      })
    }

    // Initialize category filters
    if (this.categoryFilters) {
      this.categoryFilters.forEach((filter) => {
        filter.addEventListener("change", () => {
          this.applyFilters()
        })
      })
    }

    // Initialize sort select
    if (this.sortSelect) {
      this.sortSelect.addEventListener("change", () => {
        this.applyFilters()
      })
    }

    // Apply initial filters
    this.applyFilters()
  }

  applyFilters() {
    const searchTerm = this.searchInput ? this.searchInput.value.toLowerCase().trim() : ""
    const selectedCategories = Array.from(this.categoryFilters || [])
      .filter((filter) => filter.checked)
      .map((filter) => filter.value)

    let filteredProjects = this.projects

    // Filter by search term
    if (searchTerm) {
      filteredProjects = filteredProjects.filter((project) => {
        const title = project.querySelector(".project-title").textContent.toLowerCase()
        const description = project.querySelector(".project-description").textContent.toLowerCase()
        return title.includes(searchTerm) || description.includes(searchTerm)
      })
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      filteredProjects = filteredProjects.filter((project) => {
        const category = project.getAttribute("data-category")
        return selectedCategories.includes(category)
      })
    }

    // Apply sorting
    if (this.sortSelect) {
      const sortValue = this.sortSelect.value

      switch (sortValue) {
        case "name-asc":
          filteredProjects.sort((a, b) => {
            const titleA = a.querySelector(".project-title").textContent
            const titleB = b.querySelector(".project-title").textContent
            return titleA.localeCompare(titleB)
          })
          break
        case "name-desc":
          filteredProjects.sort((a, b) => {
            const titleA = a.querySelector(".project-title").textContent
            const titleB = b.querySelector(".project-title").textContent
            return titleB.localeCompare(titleA)
          })
          break
        case "newest":
          filteredProjects.sort((a, b) => {
            const dateA = new Date(a.getAttribute("data-created"))
            const dateB = new Date(b.getAttribute("data-created"))
            return dateB - dateA
          })
          break
        case "oldest":
          filteredProjects.sort((a, b) => {
            const dateA = new Date(a.getAttribute("data-created"))
            const dateB = new Date(b.getAttribute("data-created"))
            return dateA - dateB
          })
          break
        case "popular":
          filteredProjects.sort((a, b) => {
            const popularityA = Number.parseInt(a.getAttribute("data-popularity"), 10)
            const popularityB = Number.parseInt(b.getAttribute("data-popularity"), 10)
            return popularityB - popularityA
          })
          break
      }
    }

    // Update UI
    this.updateProjectsDisplay(filteredProjects)
  }

  updateProjectsDisplay(filteredProjects) {
    // Hide all projects
    this.projects.forEach((project) => {
      project.style.display = "none"
    })

    // Show filtered projects
    filteredProjects.forEach((project) => {
      project.style.display = "block"
    })

    // Update results count
    if (this.resultsCount) {
      this.resultsCount.textContent = filteredProjects.length
    }

    // Show/hide no results message
    if (this.noResults) {
      if (filteredProjects.length === 0) {
        this.noResults.style.display = "block"
      } else {
        this.noResults.style.display = "none"
      }
    }
  }
}

// Initialize project filter when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const projectContainer = document.querySelector(".projects-grid")
  if (projectContainer) {
    new ProjectFilter(projectContainer)
  }
})
