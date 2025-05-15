/**
 * Accessibility enhancements for Snippix
 * This file contains functions to improve keyboard navigation and screen reader support
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize dropdown keyboard navigation
  initDropdownKeyboardNav();

  // Make hamburger menu accessible
  makeHamburgerAccessible();

  // Add focus management for modals and dialogs if they exist
  initFocusManagement();
});

/**
 * Initialize keyboard navigation for dropdown menus
 */
function initDropdownKeyboardNav() {
  const dropdownButtons = document.querySelectorAll('.dropdown-button');

  dropdownButtons.forEach(button => {
    // Add ARIA attributes
    button.setAttribute('aria-haspopup', 'true');
    button.setAttribute('aria-expanded', 'false');

    // Find the associated dropdown menu
    const dropdownMenu = button.nextElementSibling;
    if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
      // Set unique ID for the dropdown menu
      const menuId = 'dropdown-menu-' + Math.random().toString(36).substr(2, 9);
      dropdownMenu.id = menuId;

      // Connect button to menu with ARIA
      button.setAttribute('aria-controls', menuId);

      // Add keyboard event listeners
      button.addEventListener('keydown', function(e) {
        handleDropdownKeyDown(e, button, dropdownMenu);
      });

      // Add click event to toggle dropdown
      button.addEventListener('click', function(e) {
        e.preventDefault();
        toggleDropdown(button, dropdownMenu);
      });

      // Add keyboard navigation within the dropdown menu
      const menuItems = dropdownMenu.querySelectorAll('a');
      menuItems.forEach((item, index) => {
        item.setAttribute('tabindex', '-1'); // Initially not in tab order

        item.addEventListener('keydown', function(e) {
          handleMenuItemKeyDown(e, menuItems, index, button);
        });
      });
    }
  });
}

/**
 * Handle keydown events on dropdown buttons
 */
function handleDropdownKeyDown(e, button, menu) {
  switch (e.key) {
    case 'Enter':
    case ' ':
    case 'ArrowDown':
      e.preventDefault();
      openDropdown(button, menu);
      // Focus the first menu item
      const firstItem = menu.querySelector('a');
      if (firstItem) firstItem.focus();
      break;
    case 'Escape':
      closeDropdown(button, menu);
      break;
  }
}

/**
 * Handle keydown events on menu items
 */
function handleMenuItemKeyDown(e, menuItems, currentIndex, button) {
  const lastIndex = menuItems.length - 1;

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      // Move to next item or wrap to first
      const nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
      menuItems[nextIndex].focus();
      break;
    case 'ArrowUp':
      e.preventDefault();
      // Move to previous item or wrap to last
      const prevIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
      menuItems[prevIndex].focus();
      break;
    case 'Home':
      e.preventDefault();
      // Move to first item
      menuItems[0].focus();
      break;
    case 'End':
      e.preventDefault();
      // Move to last item
      menuItems[lastIndex].focus();
      break;
    case 'Escape':
      e.preventDefault();
      // Close dropdown and return focus to button
      closeDropdown(button, button.nextElementSibling);
      button.focus();
      break;
    case 'Tab':
      // Close dropdown when tabbing out
      closeDropdown(button, button.nextElementSibling);
      break;
  }
}

/**
 * Toggle dropdown menu visibility
 */
function toggleDropdown(button, menu) {
  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
    closeDropdown(button, menu);
  } else {
    openDropdown(button, menu);
  }
}

/**
 * Open dropdown menu
 */
function openDropdown(button, menu) {
  // Close any other open dropdowns first
  document.querySelectorAll('.dropdown-button[aria-expanded="true"]').forEach(btn => {
    if (btn !== button) {
      closeDropdown(btn, document.getElementById(btn.getAttribute('aria-controls')));
    }
  });

  button.setAttribute('aria-expanded', 'true');
  menu.style.display = 'block';

  // Add animation class after display is set
  setTimeout(() => {
    menu.classList.add('show');
  }, 10);

  // Make menu items tabbable
  menu.querySelectorAll('a').forEach(item => {
    item.setAttribute('tabindex', '0');
  });

  // Add click outside listener to close dropdown
  document.addEventListener('click', closeDropdownOnClickOutside);
}

/**
 * Close dropdown menu
 */
function closeDropdown(button, menu) {
  button.setAttribute('aria-expanded', 'false');
  menu.classList.remove('show');

  // Remove display after animation completes
  setTimeout(() => {
    if (button.getAttribute('aria-expanded') === 'false') {
      menu.style.display = '';
    }
  }, 200);

  // Make menu items not tabbable
  menu.querySelectorAll('a').forEach(item => {
    item.setAttribute('tabindex', '-1');
  });

  // Remove click outside listener
  document.removeEventListener('click', closeDropdownOnClickOutside);
}

/**
 * Close dropdown when clicking outside
 */
function closeDropdownOnClickOutside(event) {
  const openDropdowns = document.querySelectorAll('.dropdown-button[aria-expanded="true"]');

  openDropdowns.forEach(button => {
    const menu = document.getElementById(button.getAttribute('aria-controls'));

    // Check if click is outside both the button and menu
    if (!button.contains(event.target) && !menu.contains(event.target)) {
      closeDropdown(button, menu);
    }
  });
}

/**
 * Make hamburger menu accessible
 */
function makeHamburgerAccessible() {
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    // Add ARIA attributes
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('aria-label', 'Menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'navbar');
    hamburger.setAttribute('tabindex', '0');

    // Add keyboard support
    hamburger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();

        // Update ARIA expanded state
        const isExpanded = document.getElementById('navbar').classList.contains('show');
        hamburger.setAttribute('aria-expanded', isExpanded.toString());
      }
    });

    // Update ARIA expanded state when clicked
    hamburger.addEventListener('click', function() {
      setTimeout(() => {
        const isExpanded = document.getElementById('navbar').classList.contains('show');
        hamburger.setAttribute('aria-expanded', isExpanded.toString());
      }, 100);
    });
  }
}

/**
 * Initialize focus management for modals and dialogs
 */
function initFocusManagement() {
  // This would handle focus trapping in modals if they exist
  // Currently not implemented as there are no modals in the codebase
}

// Override the existing toggleMenu function to make it more accessible
function toggleMenu() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('show');

    // Update ARIA attributes
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
      const isExpanded = navbar.classList.contains('show');
      hamburger.setAttribute('aria-expanded', isExpanded.toString());
    }
  }
}
