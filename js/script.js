// =========================================================
// GraciEvents Uganda - Interactive Website
// IMPORTANT: Replace this demonstration number with the
// official GraciEvents WhatsApp number in international format.
// Example: 256772123456 (no +, spaces, or dashes).
// =========================================================

const GRACIEVENTS_WHATSAPP = "256752651076";

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  $("#year").textContent = new Date().getFullYear();

  // Loader
  window.addEventListener("load", () => {
    setTimeout(() => $("#pageLoader").classList.add("hidden"), 250);
  });

  // Sticky header
  const header = $("#siteHeader");
  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 25);
  updateHeader();
  window.addEventListener("scroll", updateHeader);

  // Mobile navigation
  const navToggle = $("#navToggle");
  const mainNav = $("#mainNav");

  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("no-scroll", open);
  });

  $$("#mainNav a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    });
  });

  // Reveal on scroll
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$(".reveal").forEach(el => revealObserver.observe(el));

  // Gallery filter
  const filterButtons = $$(".filter-btn");
  const galleryItems = $$(".gallery-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("is-hidden", !show);
      });
    });
  });

  // Gallery lightbox
  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxClose = $("#lightboxClose");

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      lightboxImage.src = item.dataset.full;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.classList.remove("no-scroll");
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Service modal
  const serviceModal = $("#serviceModal");
  const modalTitle = $("#modalTitle");
  const modalText = $("#modalText");
  const modalClose = $("#modalClose");
  const modalQuoteBtn = $("#modalQuoteBtn");

  const serviceDescriptions = {
    "Wedding Planning": "From planning and décor to supplier coordination and reception management, GraciEvents helps couples create a wedding day that feels elegant, organized and personal.",
    "Kwanjula & Kukyaala": "We support culturally meaningful introductions and traditional ceremonies with décor, seating plans, family coordination, guest flow and thoughtful presentation.",
    "Birthdays & Parties": "We style and coordinate birthdays, showers, anniversaries and private celebrations with themes, décor, guest setup and practical event support.",
    "House Warming": "Celebrate a new home with a welcoming setup for family and friends, including tents, seating, décor, service areas and guest coordination.",
    "Corporate Event": "Professional event support for conferences, launches, dinners, meetings and staff functions, including stage layout, branding, seating and logistics.",
    "Décor & Equipment Hire": "Select décor and equipment support may include tents, chairs, tables, linens, backdrops, lighting and styling according to your event requirements."
  };

  $$(".service-open").forEach(button => {
    button.addEventListener("click", () => {
      const service = button.dataset.service;
      modalTitle.textContent = service;
      modalText.textContent = serviceDescriptions[service] || "Contact GraciEvents for a customized event solution.";
      serviceModal.classList.add("open");
      serviceModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
    });
  });

  function closeModal() {
    serviceModal.classList.remove("open");
    serviceModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  modalClose.addEventListener("click", closeModal);
  serviceModal.addEventListener("click", e => {
    if (e.target === serviceModal) closeModal();
  });
  modalQuoteBtn.addEventListener("click", closeModal);

  // Package selection
  $$(".package-select").forEach(button => {
    button.addEventListener("click", () => {
      $("#packageName").value = button.dataset.package || "";
    });
  });

  // Testimonial slider
  const testimonials = $$(".testimonial");
  const dotsWrap = $("#sliderDots");
  let currentSlide = 0;

  testimonials.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot" + (index === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Show testimonial ${index + 1}`);
    dot.addEventListener("click", () => showTestimonial(index));
    dotsWrap.appendChild(dot);
  });

  function showTestimonial(index) {
    testimonials.forEach((item, i) => item.classList.toggle("active", i === index));
    $$(".slider-dot", dotsWrap).forEach((dot, i) => dot.classList.toggle("active", i === index));
    currentSlide = index;
  }

  setInterval(() => {
    if (testimonials.length > 1) showTestimonial((currentSlide + 1) % testimonials.length);
  }, 6500);

  // WhatsApp helper
  function openWhatsApp(message) {
    const url = `https://wa.me/${GRACIEVENTS_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  $("#whatsappFloat").addEventListener("click", () => {
    openWhatsApp("Hello GraciEvents, I would like to inquire about planning an event.");
  });

  $("#contactWhatsApp").addEventListener("click", () => {
    openWhatsApp("Hello GraciEvents, I would like to discuss an upcoming event.");
  });

  // Quote form -> WhatsApp
  $("#quoteForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = $("#clientName").value.trim();
    const phone = $("#clientPhone").value.trim();
    const eventType = $("#eventType").value;
    const eventDate = $("#eventDate").value || "Not yet decided";
    const guests = $("#guestCount").value || "Not yet decided";
    const location = $("#eventLocation").value.trim() || "Not yet decided";
    const packageName = $("#packageName").value.trim() || "Please advise";
    const details = $("#eventDetails").value.trim() || "No additional details yet";

    const message =
`Hello GraciEvents,

I would like to request a quotation.

Name: ${name}
Phone: ${phone}
Event: ${eventType}
Preferred Date: ${eventDate}
Estimated Guests: ${guests}
Location / Venue: ${location}
Package / Service: ${packageName}

Event Details:
${details}

Please contact me with the next steps.`;

    openWhatsApp(message);
  });

  // Escape key handling
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeLightbox();
      closeModal();
      mainNav.classList.remove("open");
      document.body.classList.remove("no-scroll");
    }
  });
});
