/**
 * KEVIN & BLESSY — WEDDING INVITATION INTERACTIVE LOGIC
 */

// Guarantee scroll position always starts strictly at the top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  // Enforce top position on DOM ready
  window.scrollTo(0, 0);

  // Global reference for timeline flower updater (safe from TDZ)
  let updateTimelineFlower = () => {};

  // DOM Elements
  const envelopeOverlay = document.getElementById('envelope-overlay');
  const waxSealBtn = document.getElementById('wax-seal-btn');
  const bgVideo = document.getElementById('bgVideo');

  // Petals Canvas
  const petalsCanvas = document.getElementById('petals-canvas');
  let petalsActive = true;

  // Track if envelope is actively blocking interaction
  let isEnvelopeActive = true;

  // Intercept and prevent any scrolling (wheel, touch dragging, keyboard) while envelope is active
  function blockScroll(e) {
    if (isEnvelopeActive) {
      e.preventDefault();
    }
  }

  window.addEventListener('wheel', blockScroll, { passive: false });
  window.addEventListener('touchmove', blockScroll, { passive: false });
  window.addEventListener('keydown', (e) => {
    if (isEnvelopeActive) {
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ', 'Spacebar'];
      if (scrollKeys.includes(e.key)) {
        // Allow Space/Enter only on wax seal button
        if (e.target && e.target.id === 'wax-seal-btn' && (e.key === ' ' || e.key === 'Enter')) {
          return;
        }
        e.preventDefault();
      }
    }
  });

  window.addEventListener('pageshow', () => {
    if (isEnvelopeActive) {
      window.scrollTo(0, 0);
    }
  });

  // ==========================================================================
  // 1. ENVELOPE OPENING MECHANICS
  // ==========================================================================
  function openEnvelope() {
    if (!envelopeOverlay || envelopeOverlay.classList.contains('is-opened')) return;

    // Anchor strictly to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Trigger Flap & Seal Unfolding
    envelopeOverlay.classList.add('is-opened');

    // Unlock scrolling once envelope begins unfolding
    setTimeout(() => {
      isEnvelopeActive = false;
      document.documentElement.classList.remove('envelope-locked');
      document.body.classList.remove('envelope-locked');
      window.scrollTo(0, 0);
    }, 500);

    // Ensure Video Plays smoothly
    if (bgVideo) {
      bgVideo.muted = true;
      bgVideo.play().catch(err => console.log('Video autoplay:', err));
    }

    // After animation finishes, hide overlay completely & trigger initial flower update
    setTimeout(() => {
      envelopeOverlay.style.display = 'none';
      updateTimelineFlower();
    }, 1800);
  }

  if (waxSealBtn) {
    waxSealBtn.addEventListener('click', () => {
      waxSealBtn.blur();
      openEnvelope();
    });
    waxSealBtn.addEventListener('mousedown', (e) => {
      // Prevents default focus ring and outline indicator on mouse click
      e.preventDefault();
    });
    waxSealBtn.addEventListener('touchstart', () => {
      waxSealBtn.blur();
    }, { passive: true });
    waxSealBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  // Handle first touch anywhere for mobile video playback unlock
  document.addEventListener('touchstart', () => {
    if (bgVideo && bgVideo.paused) {
      bgVideo.play().catch(() => {});
    }
  }, { once: true });

  // ==========================================================================
  // 2. LIVE COUNTDOWN TIMER
  // ==========================================================================
  // Wedding Target: January 16, 2027, 17:00:00 IST (5:00 PM)
  const weddingDate = new Date(2027, 0, 16, 17, 0, 0); // Month is 0-indexed: 0 = January

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate.getTime() - now;

    if (distance < 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================================================
  // 3. DRIFTING ROSE PETALS CANVAS ENGINE
  // ==========================================================================
  if (petalsCanvas) {
    const ctx = petalsCanvas.getContext('2d');
    let width = petalsCanvas.width = petalsCanvas.parentElement.offsetWidth || window.innerWidth;
    let height = petalsCanvas.height = petalsCanvas.parentElement.offsetHeight || 3000;

    const petals = [];
    const petalColors = [
      'rgba(180, 20, 50, 0.65)',
      'rgba(140, 10, 35, 0.75)',
      'rgba(210, 70, 95, 0.55)',
      'rgba(255, 235, 235, 0.6)',
      'rgba(197, 160, 89, 0.45)'
    ];

    for (let i = 0; i < 32; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 8 + 6,
        d: Math.random() * 20,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: (Math.random() * 0.07) + 0.03,
        tiltAngle: 0,
        speed: (Math.random() * 1.2) + 0.6
      });
    }

    function renderPetals() {
      if (!petalsActive) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 3, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 3);
        ctx.stroke();

        // Update movement
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += p.speed;
        p.x += Math.sin(p.tiltAngle) * 0.8;
        p.tilt = Math.sin(p.tiltAngle) * 12;

        // Wrap around
        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
      }
      requestAnimationFrame(renderPetals);
    }

    renderPetals();

    window.addEventListener('resize', () => {
      width = petalsCanvas.width = petalsCanvas.parentElement.offsetWidth || window.innerWidth;
      height = petalsCanvas.height = petalsCanvas.parentElement.offsetHeight || 3000;
    });
  }

  // ==========================================================================
  // 4. TIMELINE CAMELLIA FLOWER SCROLL TRAVELER (17:00 -> 19:00 -> 20:00)
  // ==========================================================================
  const scheduleSection = document.getElementById('section-schedule');
  const timelineContainer = document.getElementById('timelineContainer');
  const flowerTraveler = document.getElementById('timelineFlowerTraveler');
  const timelineRows = Array.from(document.querySelectorAll('.timeline-row'));

  if (timelineContainer && flowerTraveler && timelineRows.length > 0) {
    let currentActiveIdx = -1;

    // Calculate exact pixel position of the diamond node in each row relative to timelineContainer
    function getMilestoneTops() {
      const containerRect = timelineContainer.getBoundingClientRect();
      return timelineRows.map(row => {
        const node = row.querySelector('.timeline-node');
        const nodeRect = node ? node.getBoundingClientRect() : row.getBoundingClientRect();
        return (nodeRect.top + nodeRect.height / 2) - containerRect.top;
      });
    }

    function setActivePoint(index) {
      if (index < 0 || index >= timelineRows.length) return;
      currentActiveIdx = index;

      const milestoneTops = getMilestoneTops();
      const targetTop = milestoneTops[index];

      // Smoothly shift flower to the target milestone with rotation
      flowerTraveler.style.top = `${targetTop}px`;
      flowerTraveler.style.transform = `translate(-50%, -50%) rotate(${index * 45}deg)`;

      // Highlight active row & hide its diamond dot so flower covers it seamlessly
      timelineRows.forEach((row, idx) => {
        if (idx === index) {
          row.classList.add('is-active');
        } else {
          row.classList.remove('is-active');
        }
      });
    }

    // Map scroll progress through the viewport smoothly into the timings
    updateTimelineFlower = function() {
      if (!scheduleSection || timelineRows.length === 0) return;

      const vh = window.innerHeight || 800;
      const focalY = vh * 0.48;

      let closestIdx = 0;
      let minDistance = Infinity;

      for (let i = 0; i < timelineRows.length; i++) {
        const rect = timelineRows[i].getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const distance = Math.abs(rowCenter - focalY);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = i;
        }
      }

      if (closestIdx !== currentActiveIdx) {
        setActivePoint(closestIdx);
      }
    };

    function onScroll() {
      updateTimelineFlower();
    }

    // Listen on window and document for maximum mobile browser compatibility
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });

    // Click/tap on each timing row to shift flower directly
    timelineRows.forEach((row, idx) => {
      row.addEventListener('click', () => {
        setActivePoint(idx);
      });
    });

    // Resize & orientation handler
    window.addEventListener('resize', () => {
      if (currentActiveIdx >= 0) {
        setActivePoint(currentActiveIdx);
      } else {
        updateTimelineFlower();
      }
    });

    // Initialize at first milestone (17:00, index 0)
    setActivePoint(0);
    setTimeout(updateTimelineFlower, 100);
  }

  // ==========================================================================
  // 5. COUPLE PORTRAIT PROTECTION (PREVENT DOWNLOAD / SAVE)
  // ==========================================================================
  const coupleWrapper = document.querySelector('.couple-portrait-wrapper');
  if (coupleWrapper) {
    coupleWrapper.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  }
});
