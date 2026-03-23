<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<title>EduPortal – India's #1 College Discovery Platform</title>
	<meta name="description" content="Explore 10,000+ colleges, compare fees & rankings, check cutoffs and get expert counselling — all in one place."/>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet"/>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet"/>
	<link rel="stylesheet" href="css/shared.css"/>
	<style>
		/* ── Hero search ── */
		.hero-search{display:flex;max-width:480px;background:var(--white);border:1.5px solid var(--gray-200);border-radius:var(--radius-sm);overflow:hidden;box-shadow:var(--shadow-sm);transition:var(--transition);}
		.hero-search:focus-within{border-color:var(--emerald);box-shadow:var(--input-focus-glow);}
		.hero-search input{flex:1;border:none;padding:13px 16px;font-size:.9rem;font-family:var(--font-body);color:var(--text);outline:none;background:transparent;}
		.hero-search input::placeholder{color:var(--gray-400);}
		.hero-search button{background:var(--emerald);border:none;color:#fff;padding:0 22px;font-size:.95rem;cursor:pointer;transition:var(--transition);}
		.hero-search button:hover{background:var(--emerald-dark);}
		/* ── Quick tags ── */
		.quick-tags{display:flex;gap:8px;margin-top:16px;flex-wrap:wrap;}
		.quick-tag{background:var(--off-white);border:1px solid var(--gray-100);padding:6px 14px;border-radius:20px;font-size:.78rem;font-weight:500;color:var(--gray-500);cursor:pointer;transition:var(--transition);}
		.quick-tag:hover{background:var(--emerald-light);color:var(--emerald);border-color:rgba(15,157,138,.2);}
		/* ── Services ── */
		.services-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;margin-top:40px;}
		.service-card{background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:32px 28px;transition:var(--transition);text-decoration:none;display:block;}
		.service-card:hover{box-shadow:var(--shadow-lg);transform:translateY(-5px);border-color:rgba(15,157,138,.15);}
		.service-icon{width:52px;height:52px;border-radius:var(--radius-md);background:var(--emerald-light);display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:18px;transition:var(--transition);}
		.service-card:hover .service-icon{background:var(--emerald);color:#fff;transform:scale(1.05);}
		.service-title{font-family:var(--font-head);font-size:1.05rem;font-weight:700;color:var(--gray-900);margin-bottom:8px;}
		.service-desc{font-size:.84rem;color:var(--gray-500);line-height:1.7;}
		.service-arrow{display:inline-flex;align-items:center;gap:5px;font-size:.82rem;font-weight:600;color:var(--emerald);margin-top:14px;transition:var(--transition);}
		.service-card:hover .service-arrow{gap:10px;}
		/* ── College preview ── */
		.colleges-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:24px;margin-top:36px;}
		.college-card{background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);overflow:hidden;transition:var(--transition);}
		.college-card:hover{box-shadow:var(--shadow-lg);transform:translateY(-5px);}
		.college-card img{width:100%;height:180px;object-fit:cover;transition:transform .5s ease;}
		.college-card:hover img{transform:scale(1.05);}
		.college-body{padding:18px 20px 20px;}
		.college-rank{display:inline-flex;align-items:center;gap:4px;background:var(--gold);color:#fff;font-size:.68rem;font-weight:700;padding:3px 10px;border-radius:20px;margin-bottom:8px;}
		.college-name{font-family:var(--font-head);font-size:1rem;font-weight:700;color:var(--gray-900);margin-bottom:4px;}
		.college-loc{font-size:.8rem;color:var(--gray-500);display:flex;align-items:center;gap:4px;margin-bottom:12px;}
		.college-footer{display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid var(--gray-100);}
		.college-fees{font-size:.78rem;color:var(--gray-500);}
		.college-fees strong{color:var(--gray-900);font-size:.88rem;}
		/* ── How it works ── */
		.steps-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:24px;margin-top:40px;}
		.step-card{background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:30px 24px;text-align:center;transition:var(--transition);}
		.step-card:hover{box-shadow:var(--shadow-md);transform:translateY(-4px);}
		.step-num{width:46px;height:46px;border-radius:50%;background:var(--emerald);color:#fff;font-family:var(--font-head);font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:var(--shadow-emerald);transition:var(--transition);}
		.step-card:hover .step-num{transform:scale(1.1);}
		.step-title{font-family:var(--font-head);font-size:1rem;font-weight:700;color:var(--gray-900);margin-bottom:8px;}
		.step-desc{font-size:.84rem;color:var(--gray-500);line-height:1.7;}
		/* ── Testimonials ── */
		.testi-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:24px;margin-top:40px;}
		.testi-card{background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:28px;transition:var(--transition);}
		.testi-card:hover{box-shadow:var(--shadow-md);transform:translateY(-3px);}
		.testi-stars{color:var(--gold);font-size:.9rem;margin-bottom:14px;}
		.testi-text{font-size:.9rem;color:var(--gray-700);line-height:1.8;margin-bottom:18px;}
		.testi-author{display:flex;align-items:center;gap:12px;}
		.testi-avatar{width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid var(--emerald-light);}
		.testi-name{font-weight:700;font-size:.88rem;color:var(--gray-900);}
		.testi-meta{font-size:.78rem;color:var(--gray-500);}
		/* ── Blog preview ── */
		.blog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;margin-top:36px;}
		.blog-card{background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);overflow:hidden;transition:var(--transition);text-decoration:none;display:block;}
		.blog-card:hover{box-shadow:var(--shadow-lg);transform:translateY(-5px);}
		.blog-card img{width:100%;height:180px;object-fit:cover;}
		.blog-card-body{padding:20px;}
		.blog-tag{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--emerald);margin-bottom:8px;}
		.blog-title{font-family:var(--font-head);font-size:1rem;font-weight:700;color:var(--gray-900);line-height:1.4;margin-bottom:8px;}
		.blog-excerpt{font-size:.82rem;color:var(--gray-500);line-height:1.65;}
		.blog-date{font-size:.75rem;color:var(--gray-400);margin-top:12px;}
		@media(max-width:1024px){.hero-search{max-width:100%;}}
		@media(max-width:768px){.colleges-grid,.testi-grid,.blog-grid{grid-template-columns:1fr;}.steps-grid{grid-template-columns:repeat(2,1fr);}}
		@media(max-width:480px){.services-grid,.steps-grid{grid-template-columns:1fr;}.hero-search{flex-direction:column;}.hero-search button{padding:12px;}}
	</style>
</head>
<body>
<nav class="site-navbar">
	<div class="navbar-inner">
		<a class="brand" href="index.html"><div class="brand-icon">🎓</div><span class="brand-text">Edu<span>Portal</span></span></a>
		<ul class="nav-links">
			<li><a href="index.html"><i class="bi bi-house"></i> Home</a></li>
			<li><a href="colleges_section.html"><i class="bi bi-buildings"></i> Colleges</a></li>
			<li><a href="cutoff.html"><i class="bi bi-bar-chart"></i> Cutoffs</a></li>
			<li><a href="courses.html"><i class="bi bi-book"></i> Courses</a></li>
			<li><a href="admission.html"><i class="bi bi-file-earmark-text"></i> Admission</a></li>
			<li><a href="counselling.html"><i class="bi bi-calendar2-check"></i> Counselling</a></li>
			<li><a href="blog.html"><i class="bi bi-newspaper"></i> Blog</a></li>
			<li><a href="about.html"><i class="bi bi-info-circle"></i> About</a></li>
			<li><a href="contact.html"><i class="bi bi-telephone"></i> Contact</a></li>
		</ul>
		<div class="nav-actions">
			<button class="theme-toggle" aria-label="Toggle Dark Mode" title="Toggle Dark Mode"><i class="bi bi-moon-fill"></i></button>
			<a href="auth.html" class="btn-login">Login</a>
			<a href="auth.html#register" class="btn-register">Get Started</a>
		</div>
		<button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
	</div>
	<div class="mobile-menu">
		<a href="index.html"><i class="bi bi-house me-2"></i>Home</a>
		<a href="colleges_section.html"><i class="bi bi-buildings me-2"></i>Colleges</a>
		<a href="cutoff.html"><i class="bi bi-bar-chart me-2"></i>Cutoffs</a>
		<a href="courses.html"><i class="bi bi-book me-2"></i>Courses</a>
		<a href="admission.html"><i class="bi bi-file-earmark-text me-2"></i>Admission</a>
		<a href="counselling.html"><i class="bi bi-calendar2-check me-2"></i>Counselling</a>
		<a href="blog.html"><i class="bi bi-newspaper me-2"></i>Blog</a>
		<a href="about.html"><i class="bi bi-info-circle me-2"></i>About</a>
		<a href="contact.html"><i class="bi bi-telephone me-2"></i>Contact</a>
		<div class="mob-actions">
			<a href="auth.html" class="btn-login" style="flex:1;text-align:center;">Login</a>
			<a href="auth.html#register" class="btn-register" style="flex:1;text-align:center;">Get Started</a>
		</div>
	</div>
</nav>

<!-- ═══ HERO ═══ -->
<section class="hero">
	<div class="hero-blob hero-blob-1"></div>
	<div class="hero-blob hero-blob-2"></div>
	<div class="hero-inner">
		<div class="hero-content">
			<div class="hero-badge"><i class="bi bi-star-fill"></i> India's #1 College Discovery Platform</div>
			<h1>Find Your Dream<br><span>College</span> & Shape<br>Your Future</h1>
			<p>Explore 10,000+ colleges, compare fees & rankings, check cutoffs and get expert counselling — all in one place.</p>
			<div class="hero-search">
				<input type="search" placeholder="Search colleges, courses, exams…"/>
				<button><i class="bi bi-search"></i></button>
			</div>
			<div class="quick-tags">
				<span class="quick-tag">⚙️ Engineering</span>
				<span class="quick-tag">💼 Management</span>
				<span class="quick-tag">🏥 Medical</span>
				<span class="quick-tag">⚖️ Law</span>
				<span class="quick-tag">🎨 Design</span>
			</div>
		</div>
		<div class="hero-visual reveal" style="position: relative; width: 100%; display: flex; justify-content: center;">
			<div style="width: 100%; max-width: 500px; aspect-ratio: 4/3; background: var(--card-bg); border-radius: var(--radius-xl); box-shadow: var(--shadow-xl); border: 1px solid var(--border); display: flex; flex-direction: column; overflow: hidden;">
				<div style="height: 60%; background: var(--emerald-light); display: flex; align-items: center; justify-content: center;">
					<i class="bi bi-mortarboard-fill" style="font-size: 5rem; color: var(--emerald);"></i>
				</div>
				<div style="padding: 24px;">
					<div style="height: 12px; width: 60%; background: var(--gray-200); border-radius: 6px; margin-bottom: 12px;"></div>
					<div style="height: 12px; width: 40%; background: var(--gray-200); border-radius: 6px; margin-bottom: 24px;"></div>
					<div style="display: flex; gap: 10px;">
						<div style="height: 36px; width: 100px; background: var(--emerald); border-radius: var(--radius-sm);"></div>
						<div style="height: 36px; width: 100px; background: var(--gray-100); border-radius: var(--radius-sm);"></div>
					</div>
				</div>
			</div>
			<!-- Floating stats card -->
			<div style="position: absolute; bottom: -20px; left: -20px; background: var(--card-bg); padding: 16px 20px; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); border: 1px solid var(--border); display: flex; align-items: center; gap: 16px; z-index: 10;">
				<div style="width: 48px; height: 48px; border-radius: 50%; background: var(--gold-bg); display: flex; align-items: center; justify-content: center; color: var(--gold); font-size: 1.5rem;"><i class="bi bi-star-fill"></i></div>
				<div>
					<div style="font-family: var(--font-head); font-weight: 800; font-size: 1.2rem; color: var(--heading);">4.9/5</div>
					<div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">Average Rating</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ═══ STATS ═══ -->
<section style="background:var(--off-white);">
	<div class="stats-bar reveal">
		<div class="stat-item"><div class="stat-num" data-count="10000" data-suffix="+">0</div><div class="stat-label">Colleges Listed</div></div>
		<div class="stat-item"><div class="stat-num" data-count="2" data-suffix="M+">0</div><div class="stat-label">Students Helped</div></div>
		<div class="stat-item"><div class="stat-num" data-count="200" data-suffix="+">0</div><div class="stat-label">Courses Covered</div></div>
		<div class="stat-item"><div class="stat-num" data-count="50" data-suffix="+">0</div><div class="stat-label">Expert Counsellors</div></div>
	</div>
</section>

<!-- ═══ SERVICES ═══ -->
<section class="section">
	<div class="section-inner">
		<div class="reveal">
			<span class="section-label"><i class="bi bi-grid-fill"></i> What We Offer</span>
			<h2 class="section-title">Everything You Need for<br>Your College Journey</h2>
			<p class="section-sub">From discovering colleges to getting admitted — we guide you every step of the way.</p>
		</div>
		<div class="services-grid">
			<a href="colleges_section.html" class="service-card reveal">
				<div class="service-icon">🏛️</div>
				<div class="service-title">College Explorer</div>
				<p class="service-desc">Browse 10,000+ colleges across India with detailed profiles, rankings, facilities and alumni reviews.</p>
				<span class="service-arrow">Explore Colleges <i class="bi bi-arrow-right"></i></span>
			</a>
			<a href="cutoff.html" class="service-card reveal reveal-delay-1">
				<div class="service-icon">📊</div>
				<div class="service-title">Cutoff Finder</div>
				<p class="service-desc">Access year-wise cutoff data for JEE, MHT-CET, NEET, CAT and more. Filter by branch, category and college.</p>
				<span class="service-arrow">View Cutoffs <i class="bi bi-arrow-right"></i></span>
			</a>
			<a href="courses.html" class="service-card reveal reveal-delay-2">
				<div class="service-icon">📚</div>
				<div class="service-title">Course Guide</div>
				<p class="service-desc">Detailed info on 200+ courses — career scope, salary trends, top recruiters and skill requirements.</p>
				<span class="service-arrow">Browse Courses <i class="bi bi-arrow-right"></i></span>
			</a>
			<a href="admission.html" class="service-card reveal reveal-delay-1">
				<div class="service-icon">📋</div>
				<div class="service-title">Admission Guide</div>
				<p class="service-desc">Step-by-step admission process, required documents, important dates and application tips from experts.</p>
				<span class="service-arrow">Get Guide <i class="bi bi-arrow-right"></i></span>
			</a>
			<a href="counselling.html" class="service-card reveal reveal-delay-2">
				<div class="service-icon">🎯</div>
				<div class="service-title">Expert Counselling</div>
				<p class="service-desc">Book 1-on-1 sessions with certified admission counsellors who help you choose the right college and course.</p>
				<span class="service-arrow">Book Session <i class="bi bi-arrow-right"></i></span>
			</a>
			<a href="about.html#faq" class="service-card reveal reveal-delay-3">
				<div class="service-icon">💡</div>
				<div class="service-title">FAQ & Resources</div>
				<p class="service-desc">Answers to 100+ common admission questions, scholarship guides, hostel info and exam calendars.</p>
				<span class="service-arrow">Browse FAQs <i class="bi bi-arrow-right"></i></span>
			</a>
		</div>
	</div>
</section>

<!-- ═══ FEATURED COLLEGES ═══ -->
<section class="section" style="background:var(--off-white);">
	<div class="section-inner">
		<div class="section-header-row reveal">
			<div>
				<span class="section-label"><i class="bi bi-trophy-fill"></i> Top Colleges</span>
				<h2 class="section-title">Featured Colleges</h2>
				<p class="section-sub">Fast access to the most in-demand colleges this admission season.</p>
			</div>
			<a href="colleges_section.html" class="btn-ep-outline" style="white-space:nowrap;"><i class="bi bi-arrow-right"></i> View All</a>
		</div>
		<div class="colleges-grid">
			<div class="college-card reveal">
				<div style="overflow:hidden;"><img src="https://images.unsplash.com/photo-1562774053-701939374585?w=500&q=75" alt="IIT Bombay"/></div>
				<div class="college-body">
					<span class="college-rank"><i class="bi bi-trophy-fill"></i> #1 Engineering</span>
					<div class="college-name">IIT Bombay</div>
					<div class="college-loc"><i class="bi bi-geo-alt"></i> Mumbai, Maharashtra</div>
					<div class="college-footer">
						<div class="college-fees">Fees <strong>₹2.2L / yr</strong></div>
						<a href="#" class="btn-ep" style="padding:7px 16px;font-size:.8rem;">View Details</a>
					</div>
				</div>
			</div>
			<div class="college-card reveal reveal-delay-1">
				<div style="overflow:hidden;"><img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=75" alt="IIT Delhi"/></div>
				<div class="college-body">
					<span class="college-rank"><i class="bi bi-trophy-fill"></i> #2 Engineering</span>
					<div class="college-name">IIT Delhi</div>
					<div class="college-loc"><i class="bi bi-geo-alt"></i> New Delhi</div>
					<div class="college-footer">
						<div class="college-fees">Fees <strong>₹2.4L / yr</strong></div>
						<a href="#" class="btn-ep" style="padding:7px 16px;font-size:.8rem;">View Details</a>
					</div>
				</div>
			</div>
			<div class="college-card reveal reveal-delay-2">
				<div style="overflow:hidden;"><img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&q=75" alt="NIT Trichy"/></div>
				<div class="college-body">
					<span class="college-rank"><i class="bi bi-trophy-fill"></i> #1 NIT</span>
					<div class="college-name">NIT Tiruchirappalli</div>
					<div class="college-loc"><i class="bi bi-geo-alt"></i> Trichy, Tamil Nadu</div>
					<div class="college-footer">
						<div class="college-fees">Fees <strong>₹1.5L / yr</strong></div>
						<a href="#" class="btn-ep" style="padding:7px 16px;font-size:.8rem;">View Details</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ═══ HOW IT WORKS ═══ -->
<section class="section">
	<div class="section-inner section-center">
		<div class="reveal">
			<span class="section-label"><i class="bi bi-lightning-fill"></i> How It Works</span>
			<h2 class="section-title">Get Admitted in 4 Simple Steps</h2>
			<p class="section-sub" style="margin:0 auto;">From search to admission — we simplify the whole journey.</p>
		</div>
		<div class="steps-grid">
			<div class="step-card reveal">
				<div class="step-num">1</div>
				<div class="step-title">Explore Colleges</div>
				<p class="step-desc">Search and filter 10,000+ colleges by ranking, fees, location and courses.</p>
			</div>
			<div class="step-card reveal reveal-delay-1">
				<div class="step-num">2</div>
				<div class="step-title">Compare & Shortlist</div>
				<p class="step-desc">Compare your favourites side-by-side and save your shortlist to your dashboard.</p>
			</div>
			<div class="step-card reveal reveal-delay-2">
				<div class="step-num">3</div>
				<div class="step-title">Get Expert Help</div>
				<p class="step-desc">Book a free counselling session with an expert who knows the admission process inside out.</p>
			</div>
			<div class="step-card reveal reveal-delay-3">
				<div class="step-num">4</div>
				<div class="step-title">Get Admitted</div>
				<p class="step-desc">Follow your personalised roadmap and secure your seat at the perfect college.</p>
			</div>
		</div>
	</div>
</section>

<!-- ═══ TESTIMONIALS ═══ -->
<section class="section" style="background:var(--off-white);">
	<div class="section-inner section-center">
		<div class="reveal">
			<span class="section-label"><i class="bi bi-chat-quote-fill"></i> Testimonials</span>
			<h2 class="section-title">Trusted by 2 Million+ Students</h2>
		</div>
		<div class="testi-grid">
			<div class="testi-card reveal">
				<div class="testi-stars">★★★★★</div>
				<p class="testi-text">"EduPortal made my JEE counselling process so much easier. I got into NIT Trichy CSE thanks to their cutoff data and expert guidance!"</p>
				<div class="testi-author"><img src="https://randomuser.me/api/portraits/men/32.jpg" class="testi-avatar" alt=""/><div><div class="testi-name">Arjun Verma</div><div class="testi-meta">NIT Trichy, CSE · JEE 2025</div></div></div>
			</div>
			<div class="testi-card reveal reveal-delay-1">
				<div class="testi-stars">★★★★★</div>
				<p class="testi-text">"The counsellor helped me understand which colleges I could target with my NEET score. Saved me weeks of research and confusion."</p>
				<div class="testi-author"><img src="https://randomuser.me/api/portraits/women/44.jpg" class="testi-avatar" alt=""/><div><div class="testi-name">Priya Sharma</div><div class="testi-meta">AIIMS Delhi · NEET 2025</div></div></div>
			</div>
			<div class="testi-card reveal reveal-delay-2">
				<div class="testi-stars">★★★★★</div>
				<p class="testi-text">"Excellent platform! The college comparison tool and admission guides are better than anything else I've found online."</p>
				<div class="testi-author"><img src="https://randomuser.me/api/portraits/men/55.jpg" class="testi-avatar" alt=""/><div><div class="testi-name">Rohan Patel</div><div class="testi-meta">BITS Pilani · BITSAT 2025</div></div></div>
			</div>
		</div>
	</div>
</section>

<!-- ═══ BLOG PREVIEW ═══ -->
<section class="section">
	<div class="section-inner">
		<div class="section-header-row reveal">
			<div>
				<span class="section-label"><i class="bi bi-newspaper"></i> Latest Updates</span>
				<h2 class="section-title">From Our Blog</h2>
			</div>
			<a href="blog.html" class="btn-ep-outline" style="white-space:nowrap;"><i class="bi bi-arrow-right"></i> All Articles</a>
		</div>
		<div class="blog-grid">
			<a href="#" class="blog-card reveal">
				<img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=75" alt="JEE Main"/>
				<div class="blog-card-body">
					<div class="blog-tag">Exam News</div>
					<div class="blog-title">JEE Main Session 2: Paper Analysis, Expected Cutoff & What's Next</div>
					<p class="blog-excerpt">A comprehensive breakdown from our expert faculty — expected good attempts and score mapping.</p>
					<div class="blog-date"><i class="bi bi-calendar3 me-1"></i> May 28, 2026</div>
				</div>
			</a>
			<a href="#" class="blog-card reveal reveal-delay-1">
				<img src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&q=75" alt="Admissions"/>
				<div class="blog-card-body">
					<div class="blog-tag">Admission Tips</div>
					<div class="blog-title">JoSAA 2026 Choice Filling: Strategy to Lock Your Dream IIT/NIT</div>
					<p class="blog-excerpt">How to order choices optimally and understand the float vs freeze decision.</p>
					<div class="blog-date"><i class="bi bi-calendar3 me-1"></i> Jun 15, 2026</div>
				</div>
			</a>
			<a href="#" class="blog-card reveal reveal-delay-2">
				<img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=75" alt="Scholarships"/>
				<div class="blog-card-body">
					<div class="blog-tag">Scholarships</div>
					<div class="blog-title">Top 10 Government Scholarships for Engineering Students 2026-27</div>
					<p class="blog-excerpt">AICTE Pragati, PM Scholarship, Central Sector Scheme and more — full eligibility guide.</p>
					<div class="blog-date"><i class="bi bi-calendar3 me-1"></i> May 12, 2026</div>
				</div>
			</a>
		</div>
	</div>
</section>

<!-- ═══ CTA BANNER ═══ -->
<section class="section">
	<div class="section-inner">
		<div class="cta-banner reveal">
			<h2>Ready to Find Your <span>Dream College?</span></h2>
			<p>Join 2 million+ students who have used EduPortal to make smart, informed decisions about their future.</p>
			<div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1;">
				<a href="auth.html#register" class="btn-gold"><i class="bi bi-person-plus"></i> Get Started Free</a>
				<a href="counselling.html" class="btn-ep-outline" style="background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.3);color:#fff!important;"><i class="bi bi-calendar2-check"></i> Book Counselling</a>
			</div>
		</div>
	</div>
</section>

<!-- ═══ FOOTER ═══ -->
<footer class="site-footer">
	<div class="footer-inner">
		<div class="footer-grid">
			<div class="footer-brand"><a class="brand" href="index.html"><div class="brand-icon">🎓</div><span class="brand-text">Edu<span>Portal</span></span></a><p>India's most trusted platform for college discovery, admission guidance and career counselling since 2018.</p></div>
			<div class="footer-col"><h4>Explore</h4><ul><li><a href="colleges_section.html">Top Colleges</a></li><li><a href="cutoff.html">Cutoff Data</a></li><li><a href="courses.html">Courses & Branches</a></li><li><a href="admission.html">Admission Guide</a></li><li><a href="counselling.html">Book Counselling</a></li></ul></div>
			<div class="footer-col"><h4>Resources</h4><ul><li><a href="blog.html">Blog & News</a></li><li><a href="about.html#faq">FAQs</a></li><li><a href="#">Scholarship Info</a></li><li><a href="#">Exam Calendar</a></li><li><a href="#">Rank Predictor</a></li></ul></div>
			<div class="footer-col"><h4>Company</h4><ul><li><a href="about.html">About Us</a></li><li><a href="contact.html">Contact Us</a></li><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Use</a></li><li><a href="#">Advertise With Us</a></li></ul></div>
		</div>
		<div class="footer-bottom"><p>© 2026 EduPortal. All rights reserved.</p><div class="social-links"><a href="#" class="social-link" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a><a href="#" class="social-link" aria-label="Instagram"><i class="bi bi-instagram"></i></a><a href="#" class="social-link" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a><a href="#" class="social-link" aria-label="YouTube"><i class="bi bi-youtube"></i></a></div></div>
	</div>
</footer>
<button class="scroll-top" title="Back to top"><i class="bi bi-arrow-up"></i></button>
<script src="js/shared.js"></script>
</body>
</html>
