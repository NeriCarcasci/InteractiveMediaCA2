// js/scripts.js

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
      new bootstrap.ScrollSpy(document.body, {
        target: '#mainNav',
        offset: 80
      });
    }


    initProjectFilter();

    initContactForm();


    initGalleryModal();
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }

    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  });

  function initProjectFilter() {
    const cardsContainer = document.getElementById('projectCards');
    const dropdownButton = document.getElementById('projectFilterDropdown');

    if (!cardsContainer || !dropdownButton) return;

    const projectCards = Array.from(cardsContainer.querySelectorAll('.col'));

    const filterItems = document.querySelectorAll(
      '#projectFilterDropdown + .dropdown-menu .dropdown-item'
    );

    if (!filterItems.length) return;

    function applyProjectFilter(filter) {
      projectCards.forEach(function (card) {
        const category = card.getAttribute('data-category') || 'all';
        if (filter === 'all' || category === filter) {
          card.classList.remove('d-none');
        } else {
          card.classList.add('d-none');
        }
      });
    }

    filterItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const filter = item.getAttribute('data-filter') || 'all';

        applyProjectFilter(filter);


        dropdownButton.textContent = item.textContent;

        filterItems.forEach(function (el) {
          el.classList.remove('active');
        });
        item.classList.add('active');
      });
    });

    // Initial state: show all projects
    applyProjectFilter('all');
  }

  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const toastElement = document.getElementById('contactToast');
    const contactToast = toastElement ? new bootstrap.Toast(toastElement) : null;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
      }

      const name = document.getElementById('contactName').value.trim();
      const fromEmail = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      const toEmail = 'nericarcasci@gmail.com';

      const mailSubject = subject || 'Portfolio enquiry';
      const mailBodyLines = [
        `Hi Neri,`,
        '',
        message,
        '',
        '---',
        `From: ${name || 'Anonymous'}`,
        `Email: ${fromEmail || 'not provided'}`
      ];

      const mailtoHref =
        'mailto:' +
        encodeURIComponent(toEmail) +
        '?subject=' +
        encodeURIComponent(mailSubject) +
        '&body=' +
        encodeURIComponent(mailBodyLines.join('\n'));

      if (contactToast) {
        contactToast.show();
      }

      window.location.href = mailtoHref;

      form.classList.remove('was-validated');
    }, false);
  }


  function initGalleryModal() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const modalImage = document.getElementById('galleryModalImage');
    if (!galleryImages.length || !modalImage) return;

    galleryImages.forEach(function (img) {
      img.addEventListener('click', function () {
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt') || 'Selected hobby image';
        modalImage.setAttribute('src', src);
        modalImage.setAttribute('alt', alt);
      });
    });
  }
})();
