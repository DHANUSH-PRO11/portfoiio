/**
 * DHANUSH G — PERSONAL DEVELOPER PORTFOLIO
 * Electric Red & Acid Green Awwwards Design System
 * Interactive Canvas, Neural Terminal, Scroll-Driven Circular Mask & Simulator
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. WEB AUDIO API SYNTHESIZER (Futuristic Telemetry Tones)
  // =========================================================================
  let soundEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playUiTone(freq = 640, type = 'sine', duration = 0.08, volume = 0.04) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy handled
    }
  }

  // Sound toggle button
  const soundToggleBtn = document.getElementById('sound-toggle');
  const soundIconOn = document.getElementById('sound-icon-on');
  const soundIconOff = document.getElementById('sound-icon-off');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        soundIconOn.style.display = 'block';
        soundIconOff.style.display = 'none';
        playUiTone(880, 'sine', 0.12, 0.06);
        showToast('Synthesizer Telemetry Enabled 🔊');
      } else {
        soundIconOn.style.display = 'none';
        soundIconOff.style.display = 'block';
        showToast('Telemetry Sound Muted 🔇');
      }
    });
  }

  // Attach sound to interactive elements
  document.querySelectorAll('.btn, .nav-link, .chip-btn, .sim-tab-nav-btn, .sim-toggle-pill, .social-icon-btn, .endpoint-item, .capability-item').forEach(elem => {
    elem.addEventListener('click', () => {
      playUiTone(740, 'sine', 0.05, 0.025);
    });
  });

  // =========================================================================
  // 2. CURSOR SPOTLIGHT TRACKING
  // =========================================================================
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // =========================================================================
  // 3. ELECTRIC RED & ACID GREEN SYNAPSE CANVAS
  // =========================================================================
  const canvas = document.getElementById('neural-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 50;
    const maxDistance = 140;

    const mouse = {
      x: null,
      y: null,
      radius: 170
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.55;
        this.vy = (Math.random() - 0.5) * 0.55;
        this.radius = Math.random() * 1.6 + 1;
        // Electric Red (240, 39, 61) dominant with subtle Acid Green (183, 255, 56) highlights
        this.isRed = Math.random() > 0.22;
        this.color = this.isRed ? '240, 39, 61' : '183, 255, 56';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 2.2;
            this.y -= (dy / dist) * force * 2.2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, 0.75)`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = 1 - dist / maxDistance;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(240, 39, 61, ${alpha * 0.14})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connection line to mouse
        if (mouse.x !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(240, 39, 61, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }

  // =========================================================================
  // 4. TYPEWRITER EFFECT
  // =========================================================================
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      'Computer Science Engineering Scholar',
      'Full-Stack Developer (React 19 & FastAPI)',
      '500+ LeetCode Algorithms Solved',
      'Predictive ML Modeling & Graph Solvers'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 75;

    function typeRole() {
      const current = roles[roleIndex];
      if (isDeleting) {
        typingElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 35;
      } else {
        typingElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        typeSpeed = 1600;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 350;
      }

      setTimeout(typeRole, typeSpeed);
    }
    typeRole();
  }

  // =========================================================================
  // 5. ANIMATED NUMERICAL COUNTERS
  // =========================================================================
  const counterElements = document.querySelectorAll('.metric-val[data-target]');
  let countersAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counterElements.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const increment = Math.ceil(target / 25);

          const updateCount = () => {
            count += increment;
            if (count < target) {
              counter.textContent = count + (target === 500 ? '+' : '');
              setTimeout(updateCount, 16);
            } else {
              counter.textContent = target + (target === 500 ? '+' : '');
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-bar-section');
  if (metricsSection) {
    observer.observe(metricsSection);
  }

  // Set current year in footer
  const currentYearElem = document.getElementById('current-year');
  if (currentYearElem) {
    currentYearElem.textContent = new Date().getFullYear();
  }

  // =========================================================================
  // 6. NAVBAR SCROLL & MOBILE DRAWER
  // =========================================================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // =========================================================================
  // 7. INTERACTIVE CYBER TERMINAL CLI
  // =========================================================================
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const termClearBtn = document.getElementById('term-clear-btn');
  const chipButtons = document.querySelectorAll('.chip-btn');

  const cliResponses = {
    help: `Available Console Commands:
• about       : Bio, academic background & credentials
• projects    : Highlighted software & algorithm deployments
• skills      : Core technical capabilities & technologies
• leetcode    : Competitive problem solving & contest rating
• benchmark   : Run simulated GBDT model inference test
• contact     : Direct communication endpoints
• clear       : Clear terminal viewport
• sudo hire   : Elevated recruitment protocol`,

    about: `DHANUSH G — Computer Science Engineer & Software Developer
Education : B.E. Computer Science & Engineering (2024–2028)
Institute : Sri Shakthi Institute of Engineering and Technology (CGPA: 7.9)
HighSchool: KG Matric School (Class XII: 85%)
Focus     : Algorithmic problem-solving, high-throughput backend services,
            continuous predictive regression, and responsive React 19 apps.`,

    projects: `Featured Systems & Platforms:
1. [AI Traffic Prediction & Dynamic Route Optimization]
   - Stack: React 19, Python, FastAPI, GBDT, A* & Dijkstra, Docker, Leaflet
   - Specs: Continuous travel-time regression, < 18ms real-time path rerouting.

2. [Smart Railway Crowd Prediction & Risk Engine]
   - Stack: Python, XGBoost, Scikit-learn, FastAPI, MLOps, Docker CI/CD
   - Specs: 0.957 R² score, 29.5 MAE, 53%+ outperformance over baseline heuristics.

3. [AgroNex – Automated Smart Agriculture Platform]
   - Stack: React 19, Python, FastAPI, PostgreSQL, Supabase
   - Specs: Automated pathology diagnostics with sub-second bilingual voice streaming.`,

    skills: `Technical Competencies:
• Languages   : Python (Advanced), C++, Java, JavaScript (ES6+), SQL
• AI & ML     : Scikit-learn, XGBoost, GBDT Regressors, Time-Series Forecasting, A* & Dijkstra
• Web/Systems : React 19, FastAPI, Node.js, HTML5, Modern CSS, Leaflet Geospatial
• Databases   : PostgreSQL, Supabase, MongoDB
• DevOps/MLOps: Docker Containerization, Git, GitHub Actions, Champion-Challenger validation`,

    leetcode: `LeetCode Competitive Programming:
• Problems Solved: 500+
• Contest Rating : 1554
• Profile URL    : https://leetcode.com/u/dev_coder_11/
• Core Strengths : Dynamic Programming, Graph Traversals, Binary Trees, Heaps, Greedy Algorithms`,

    benchmark: `Executing model benchmark test...
------------------------------------------------------
Model Under Test : XGBoost Regressor (Multi-horizon)
Test Set Size    : 14,850 samples (Chronological Split)
------------------------------------------------------
[1/3] Calculating Mean Absolute Error... MAE: 29.52
[2/3] Computing Coefficient of Determination... R²: 0.9572
[3/3] Comparing to Persistence Baseline... +53.4% Outperformance
STATUS: [PASS] Model meets Champion production deployment criteria!`,

    contact: `Direct Communication Endpoints:
• Email    : dhanushg1020@gmail.com
• Phone    : +91 9487923398
• LinkedIn : https://linkedin.com/in/dhanush-g-332a40321
• GitHub   : https://github.com/DHANUSH-PRO11
• LeetCode : https://leetcode.com/u/dev_coder_11/`
  };

  function executeCliCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    playUiTone(920, 'sine', 0.08, 0.05);

    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-line';
    cmdLine.innerHTML = `<span class="prompt-user">dhanush@dev-core:~$</span> <span style="color:#fff;">${escapeHtml(cmdRaw)}</span>`;
    terminalBody.insertBefore(cmdLine, terminalBody.querySelector('.terminal-prompt-line'));

    let outputText = '';
    if (cmd === 'clear') {
      const promptLine = terminalBody.querySelector('.terminal-prompt-line');
      terminalBody.innerHTML = '';
      terminalBody.appendChild(promptLine);
      terminalInput.value = '';
      return;
    } else if (cmd === 'sudo hire' || cmd.startsWith('sudo hire') || cmd === 'hire') {
      outputText = `[ACCESS_GRANTED] Dhanush is available for software engineering internships and junior roles!\nDirect channels: Email 'dhanushg1020@gmail.com' or Phone '+91 9487923398'.`;
    } else if (cliResponses[cmd]) {
      outputText = cliResponses[cmd];
    } else {
      outputText = `command not found: "${cmd}". Type 'help' for available commands.`;
    }

    const responseLine = document.createElement('div');
    responseLine.className = 'terminal-line output';
    responseLine.textContent = outputText;
    terminalBody.insertBefore(responseLine, terminalBody.querySelector('.terminal-prompt-line'));

    terminalBody.scrollTop = terminalBody.scrollHeight;
    terminalInput.value = '';
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCliCommand(terminalInput.value);
      }
    });
  }

  if (termClearBtn) {
    termClearBtn.addEventListener('click', () => {
      executeCliCommand('clear');
    });
  }

  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (terminalInput) {
        terminalInput.value = cmd;
        executeCliCommand(cmd);
      }
    });
  });

  function escapeHtml(string) {
    return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // =========================================================================
  // 8. SCROLL-DRIVEN CIRCULAR MASK TRANSITION (AWWWARDS INSPIRED)
  // =========================================================================
  function initCircularMaskShowcase() {
    const maskTrack = document.getElementById('mask-track');
    const maskCard = document.getElementById('mask-card');
    const slide0 = document.getElementById('slide-0');
    const slide1 = document.getElementById('slide-1');
    const slide2 = document.getElementById('slide-2');
    const portalIndexText = document.getElementById('portal-index-text');
    const portalProgressFill = document.getElementById('portal-progress-fill');
    const tabDots = document.querySelectorAll('.mask-tab-dot');

    if (!maskTrack || !maskCard) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dynamically calculate maximum radius needed so circle covers entire card from bottom-center (50% 100%)
    function calculateMaxRadius() {
      const rect = maskCard.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      // Distance from (w/2, h) to corner (0,0) = hypot(w/2, h)
      return Math.ceil(Math.hypot(w / 2, h) * 1.08);
    }

    let maxRadius = calculateMaxRadius();

    function updateCircularMasks() {
      if (prefersReducedMotion) return;

      const trackRect = maskTrack.getBoundingClientRect();
      const trackHeight = maskTrack.offsetHeight;
      const viewportHeight = window.innerHeight;
      const totalScrollable = trackHeight - viewportHeight;

      if (totalScrollable <= 0) return;

      // Scrolled progress through track [0.0 to 1.0]
      const scrolled = -trackRect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      // Update bottom telemetry progress bar fill
      if (portalProgressFill) {
        portalProgressFill.style.width = `${(progress * 100).toFixed(1)}%`;
      }

      // =====================================================================
      // STAGE 1: Slide 1 circular expansion over Slide 0 (progress 0.0 -> 0.46)
      // =====================================================================
      const t1Progress = Math.max(0, Math.min(1, progress / 0.46));
      const r1 = Math.round(t1Progress * maxRadius);

      if (slide1) {
        slide1.style.clipPath = `circle(${r1}px at 50% 100%)`;
        slide1.style.webkitClipPath = `circle(${r1}px at 50% 100%)`;

        // Parallax image subtle zoom
        const s1Img = slide1.querySelector('.slide-bg-img');
        const s1Content = slide1.querySelector('.slide-content-wrap');
        if (s1Img) {
          s1Img.style.transform = `scale(${1.14 - t1Progress * 0.09})`;
        }
        if (s1Content) {
          const contentOpacity1 = Math.max(0, Math.min(1, (t1Progress - 0.22) / 0.65));
          const contentY1 = (1 - contentOpacity1) * 22;
          s1Content.style.opacity = contentOpacity1;
          s1Content.style.transform = `translateY(${contentY1}px)`;
        }
      }

      if (slide0) {
        const s0Content = slide0.querySelector('.slide-content-wrap');
        const s0Img = slide0.querySelector('.slide-bg-img');
        if (s0Content) {
          const s0Opacity = Math.max(0, 1 - t1Progress * 1.8);
          s0Content.style.opacity = s0Opacity;
          s0Content.style.transform = `translateY(-${(1 - s0Opacity) * 22}px)`;
        }
        if (s0Img) {
          s0Img.style.transform = `scale(${1.05 + t1Progress * 0.05})`;
        }
      }

      // =====================================================================
      // STAGE 2: Slide 2 circular expansion over Slide 1 (progress 0.52 -> 0.98)
      // =====================================================================
      const t2Progress = Math.max(0, Math.min(1, (progress - 0.52) / 0.44));
      const r2 = Math.round(t2Progress * maxRadius);

      if (slide2) {
        slide2.style.clipPath = `circle(${r2}px at 50% 100%)`;
        slide2.style.webkitClipPath = `circle(${r2}px at 50% 100%)`;

        const s2Img = slide2.querySelector('.slide-bg-img');
        const s2Content = slide2.querySelector('.slide-content-wrap');
        if (s2Img) {
          s2Img.style.transform = `scale(${1.14 - t2Progress * 0.09})`;
        }
        if (s2Content) {
          const contentOpacity2 = Math.max(0, Math.min(1, (t2Progress - 0.22) / 0.65));
          const contentY2 = (1 - contentOpacity2) * 22;
          s2Content.style.opacity = contentOpacity2;
          s2Content.style.transform = `translateY(${contentY2}px)`;
        }
      }

      // Active Project Index Detection
      let activeProjectIndex = 0;
      if (progress < 0.46) {
        activeProjectIndex = 0;
      } else if (progress < 0.86) {
        activeProjectIndex = 1;
      } else {
        activeProjectIndex = 2;
      }

      if (portalIndexText) {
        portalIndexText.textContent = `PROJECT 0${activeProjectIndex + 1} / 03`;
      }

      tabDots.forEach((dot, idx) => {
        if (idx === activeProjectIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    // Scroll RAF Loop
    let isTicking = false;
    window.addEventListener('scroll', () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          updateCircularMasks();
          isTicking = false;
        });
        isTicking = true;
      }
    }, { passive: true });

    // Handle Window Resize
    window.addEventListener('resize', () => {
      maxRadius = calculateMaxRadius();
      updateCircularMasks();
    });

    // Interactive Tab Dots Clicking
    tabDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetIdx = +dot.getAttribute('data-target-index');
        const trackTop = maskTrack.getBoundingClientRect().top + window.scrollY;
        const totalScrollable = maskTrack.offsetHeight - window.innerHeight;
        
        let targetProgress = 0.01;
        if (targetIdx === 1) targetProgress = 0.50;
        else if (targetIdx === 2) targetProgress = 0.98;

        window.scrollTo({
          top: trackTop + targetProgress * totalScrollable,
          behavior: 'smooth'
        });
        playUiTone(880, 'sine', 0.08, 0.05);
      });
    });

    // Initial pass
    maxRadius = calculateMaxRadius();
    updateCircularMasks();
  }

  initCircularMaskShowcase();

  // =========================================================================
  // 9. LIVE IN-BROWSER ML MODEL SIMULATOR
  // =========================================================================
  const simTabButtons = document.querySelectorAll('.sim-tab-nav-btn');
  const simCrowdContent = document.getElementById('sim-crowd-content');
  const simTrafficContent = document.getElementById('sim-traffic-content');

  simTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      simTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.getAttribute('data-tab');
      if (tab === 'crowd-sim') {
        simCrowdContent.style.display = 'grid';
        simTrafficContent.style.display = 'none';
      } else {
        simCrowdContent.style.display = 'none';
        simTrafficContent.style.display = 'grid';
      }
      playUiTone(680, 'sine', 0.06, 0.04);
    });
  });

  // Simulator 1: Railway Crowd Engine
  const sliderCapacity = document.getElementById('slider-capacity');
  const sliderTrains = document.getElementById('slider-trains');
  const valCapacity = document.getElementById('val-capacity');
  const valTrains = document.getElementById('val-trains');
  const predDensity = document.getElementById('pred-density');
  const riskBadge = document.getElementById('risk-badge');
  const horizonBtns = document.querySelectorAll('.horizon-btn');
  const profileBtns = document.querySelectorAll('.profile-btn');

  let activeHorizon = 15;
  let activeProfileMultiplier = 1.25;

  function runCrowdInference() {
    if (!sliderCapacity || !sliderTrains) return;

    const baseCap = +sliderCapacity.value;
    const trains = +sliderTrains.value;

    valCapacity.textContent = `${baseCap.toLocaleString()} people`;
    valTrains.textContent = `${trains} Trains`;

    const horizonWeight = activeHorizon === 15 ? 1.0 : activeHorizon === 30 ? 1.18 : 1.35;
    const predicted = Math.round((baseCap * 0.75 + trains * 115) * activeProfileMultiplier * horizonWeight);

    if (predDensity) {
      predDensity.textContent = predicted.toLocaleString();
    }

    if (riskBadge) {
      if (predicted < 1400) {
        riskBadge.textContent = 'LOW RISK';
        riskBadge.className = 'status-risk-badge badge-low';
      } else if (predicted < 2400) {
        riskBadge.textContent = 'MODERATE RISK';
        riskBadge.className = 'status-risk-badge badge-med';
      } else {
        riskBadge.textContent = 'CRITICAL SURGE';
        riskBadge.className = 'status-risk-badge badge-high';
      }
    }
  }

  if (sliderCapacity && sliderTrains) {
    sliderCapacity.addEventListener('input', runCrowdInference);
    sliderTrains.addEventListener('input', runCrowdInference);
  }

  horizonBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      horizonBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeHorizon = +btn.getAttribute('data-horizon');
      runCrowdInference();
      playUiTone(720, 'sine', 0.06, 0.03);
    });
  });

  profileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      profileBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const profile = btn.getAttribute('data-profile');
      if (profile === 'normal') activeProfileMultiplier = 0.9;
      else if (profile === 'rush') activeProfileMultiplier = 1.25;
      else if (profile === 'holiday') activeProfileMultiplier = 1.6;
      runCrowdInference();
      playUiTone(760, 'sine', 0.06, 0.03);
    });
  });

  // Simulator 2: Traffic A* Graph Solver
  const trafficScenarioBtns = document.querySelectorAll('.traffic-scenario-btn');
  const runRerouteBtn = document.getElementById('run-reroute-btn');
  const routeTime = document.getElementById('route-time');
  const routeBadge = document.getElementById('route-badge');
  const activePathText = document.getElementById('active-path-text');
  const timeSavedText = document.getElementById('time-saved-text');
  const incidentsAvoidedText = document.getElementById('incidents-avoided-text');

  let currentScenario = 'clear';

  trafficScenarioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      trafficScenarioBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentScenario = btn.getAttribute('data-scenario');
      playUiTone(820, 'sine', 0.06, 0.03);
    });
  });

  if (runRerouteBtn) {
    runRerouteBtn.addEventListener('click', () => {
      playUiTone(1100, 'sine', 0.12, 0.08);
      applyTrafficScenario();
      showToast('A* Solver Recomputed in 18ms 🚀');
    });
  }

  function applyTrafficScenario() {
    if (!routeTime || !routeBadge) return;
    if (currentScenario === 'clear') {
      routeTime.textContent = '14.2 min';
      routeBadge.textContent = 'OPTIMAL';
      routeBadge.className = 'status-risk-badge badge-low';
      activePathText.textContent = 'Node A → B → E → Goal (Expressway)';
      timeSavedText.textContent = 'Baseline (0 min)';
      incidentsAvoidedText.textContent = '0 Chokepoints';
    } else if (currentScenario === 'bottleneck') {
      routeTime.textContent = '17.8 min';
      routeBadge.textContent = 'REROUTED';
      routeBadge.className = 'status-risk-badge badge-med';
      activePathText.textContent = 'Node A → C → D → E → Goal (Arterial 2)';
      timeSavedText.textContent = '-11.4 min vs Congested';
      incidentsAvoidedText.textContent = '1 Expressway Bottleneck Avoided';
    } else if (currentScenario === 'accident') {
      routeTime.textContent = '19.4 min';
      routeBadge.textContent = 'EMERGENCY REROUTE';
      routeBadge.className = 'status-risk-badge badge-high';
      activePathText.textContent = 'Node A → F → G → Goal (Perimeter Ring)';
      timeSavedText.textContent = '-18.6 min vs Gridlock';
      incidentsAvoidedText.textContent = 'Accident at Junction 4 Bypassed';
    }
  }

  // =========================================================================
  // 10. CLIPBOARD COPY UTILITY & TOAST SYSTEM
  // =========================================================================
  const copyCards = document.querySelectorAll('.copy-card');

  copyCards.forEach(card => {
    card.addEventListener('click', () => {
      const textToCopy = card.getAttribute('data-copy');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: "${textToCopy}" ✅`);
          playUiTone(1200, 'sine', 0.1, 0.07);
        });
      } else {
        showToast(`Copied: "${textToCopy}"`);
      }
    });
  });

  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-primary)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // =========================================================================
  // 11. MODAL HANDLING (Architecture & Resume View)
  // =========================================================================
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const heroQuickResumeBtn = document.getElementById('hero-quick-resume-btn');
  const aboutOpenResumeBtn = document.getElementById('about-open-resume-btn');
  const resumeModal = document.getElementById('resume-modal');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        playUiTone(800, 'sine', 0.08, 0.05);
      }
    });
  });

  [openResumeBtn, heroQuickResumeBtn, aboutOpenResumeBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        if (resumeModal) {
          resumeModal.classList.add('active');
          playUiTone(800, 'sine', 0.08, 0.05);
        }
      });
    }
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    const closeBtn = overlay.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
      });
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
      });
    }
  });

  // =========================================================================
  // 12. FLOATING RED DEV CORE INTERACTION
  // =========================================================================
  const floatingAiCore = document.getElementById('floating-ai-core');
  if (floatingAiCore) {
    floatingAiCore.addEventListener('click', () => {
      playUiTone(1280, 'sine', 0.18, 0.09);
      showToast('Dev Core Operational: Dhanush.dev v5.0 ✨');
    });
  }

  // =========================================================================
  // 13. DISPATCH CONTACT FORM SUBMISSION
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const submitContactBtn = document.getElementById('submit-contact-btn');

  if (contactForm && submitContactBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();

      if (!name || !email) return;

      submitContactBtn.disabled = true;
      submitContactBtn.innerHTML = `<span>TRANSMITTING...</span>`;

      setTimeout(() => {
        submitContactBtn.disabled = false;
        submitContactBtn.innerHTML = `<span>SEND MESSAGE</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
        contactForm.reset();
        showToast(`Transmission received from ${name}! Direct dispatch sent.`);
        playUiTone(1080, 'sine', 0.15, 0.08);
      }, 1000);
    });
  }

});
