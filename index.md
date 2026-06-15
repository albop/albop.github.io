---
layout: default
title: "Pablo Winant — Computational Economist"
description: "Computational economist studying economic dynamics through models, building tools for economic modeling, and teaching computational methods."
---

<div class="main-content">

  <!-- ── HERO ───────────────────────────────────────── -->
  <section class="hero">
    <div>
      <h1 class="hero-title">
        I work on macroeconomic dynamics, numerical methods, and the tools economists use to connect them.
      </h1>
    </div>
    <svg class="hero-diagram" width="180" height="160" viewBox="0 0 180 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="20" y1="140" x2="20" y2="15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>
      <line x1="20" y1="140" x2="165" y2="140" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>
      <polyline points="16,22 20,12 24,22" fill="none" stroke="currentColor" stroke-width="1" opacity=".5"/>
      <polyline points="157,136 165,140 157,144" fill="none" stroke="currentColor" stroke-width="1" opacity=".5"/>
      <line x1="20" y1="140" x2="140" y2="20" stroke="currentColor" stroke-width="1" stroke-dasharray="4,3" opacity=".3"/>
      <text x="138" y="17" font-size="9" fill="currentColor" opacity=".4" font-family="Inter,sans-serif">45°</text>
      <path d="M20,140 Q55,60 140,28" fill="none" stroke="#E07820" stroke-width="2" stroke-linecap="round"/>
      <text x="12" y="13" font-size="8" fill="currentColor" opacity=".5" font-family="Inter,sans-serif" text-anchor="middle">k<tspan dy="3" font-size="6">t+1</tspan></text>
      <text x="168" y="143" font-size="8" fill="currentColor" opacity=".5" font-family="Inter,sans-serif">k<tspan dy="3" font-size="6">t</tspan></text>
      <text x="62" y="55" font-size="7.5" fill="#1A3050" opacity=".55" font-family="Caveat,cursive" transform="rotate(-8,62,55)">What drives fluctuations,</text>
      <text x="60" y="67" font-size="7.5" fill="#1A3050" opacity=".55" font-family="Caveat,cursive" transform="rotate(-8,60,67)">inequality, and growth?</text>
    </svg>
  </section>

  <!-- ── CURRENT QUESTIONS ──────────────────────────── -->
  <section class="questions-section">
    <div class="section-header">
      <span class="section-label">Current Questions</span>
    </div>
    <div class="question-list">
      {% for q in site.data.questions %}
      <div class="question-item" data-item-id="{{ q.id }}" data-item-type="Question">
        <span class="question-text">{{ q.question }}</span>
        <span class="question-arrow">→</span>
      </div>
      {% endfor %}
    </div>
  </section>

  <!-- ── CORE THEMES ───────────────────────── -->
  <section class="projects-section">
    <div class="section-header">
      <span class="section-label">Core Themes</span>
      <a href="/research" class="section-link">View all research &rarr;</a>
    </div>
    <div class="projects-grid">
      {% for theme in site.data.themes %}
      <article class="project-card" data-item-id="{{ theme.id }}" data-item-type="Theme">
        <div class="project-number">{{ theme.number }}</div>
        <div class="project-thumb">
          {% if theme.visualType == "network" %}
          <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
            <path d="M5,50 Q30,30 60,20 T115,10" fill="none" stroke="#E07820" stroke-width="1.5" opacity=".7"/>
            <circle cx="30" cy="38" r="1.5" fill="#1A3050" opacity=".4"/>
            <circle cx="55" cy="28" r="1.5" fill="#1A3050" opacity=".4"/>
            <circle cx="80" cy="18" r="1.5" fill="#1A3050" opacity=".4"/>
            <circle cx="105" cy="12" r="1.5" fill="#1A3050" opacity=".4"/>
          </svg>
          {% elsif theme.visualType == "iteration" %}
          <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="50" x2="110" y2="50" stroke="#2E7D72" stroke-width=".8" opacity=".3"/>
            <line x1="10" y1="35" x2="110" y2="35" stroke="#2E7D72" stroke-width=".8" opacity=".3"/>
            <line x1="10" y1="20" x2="110" y2="20" stroke="#2E7D72" stroke-width=".8" opacity=".3"/>
            <line x1="20" y1="10" x2="20" y2="55" stroke="#2E7D72" stroke-width=".8" opacity=".3"/>
            <line x1="45" y1="10" x2="45" y2="55" stroke="#2E7D72" stroke-width=".8" opacity=".3"/>
            <line x1="70" y1="10" x2="70" y2="55" stroke="#2E7D72" stroke-width=".8" opacity=".3"/>
            <line x1="95" y1="10" x2="95" y2="55" stroke="#2E7D72" stroke-width=".8" opacity=".3"/>
            <path d="M10,48 L20,42 L45,30 L70,22 L95,15 L110,12" fill="none" stroke="#E07820" stroke-width="1.5"/>
          </svg>
          {% elsif theme.visualType == "notebook" %}
          <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="60" cy="30" rx="50" ry="22" fill="none" stroke="#1A3050" stroke-width="1" opacity=".2"/>
            <ellipse cx="60" cy="30" rx="35" ry="15" fill="none" stroke="#1A3050" stroke-width="1" opacity=".3"/>
            <ellipse cx="60" cy="30" rx="20" ry="8"  fill="none" stroke="#E07820" stroke-width="1.5" opacity=".6"/>
            <circle cx="60" cy="30" r="3" fill="#E07820" opacity=".8"/>
          </svg>
          {% endif %}
        </div>
        <div class="project-title">{{ theme.title }}</div>
        <div class="project-desc">{{ theme.description }}</div>
        <a href="#workspace" class="project-explore" onclick="event.stopPropagation()">Explore &rarr;</a>
      </article>
      {% endfor %}
    </div>
  </section>

  {% comment %}
  <!-- ── RECENT ACTIVITY ────────────────────────────── -->
  <section class="activity-section">
    <div class="section-header">
      <span class="section-label">Recent Activity</span>
    </div>
    <div class="activity-list">
      {% for item in site.data.activity %}
      <article class="activity-item" data-item-id="{{ item.itemId }}" data-item-type="{{ item.type }}">
        <div class="activity-content">
          <div class="activity-title">{{ item.title }}</div>
          {% if item.authors %}<div class="activity-subtitle">{{ item.authors }}</div>{% endif %}
        </div>
        <span class="activity-badge badge-{{ item.type | downcase }}">{{ item.type }}</span>
        {% if item.date %}<span class="activity-date">{{ item.date }}</span>{% endif %}
      </article>
      {% endfor %}
    </div>
    <div class="activity-view-all">
      <a href="/research">View all activity &rarr;</a>
    </div>
  </section>
  {% endcomment %}

  <!-- ── RECENT EVENT ─────────────────────────────────── -->
  <section class="activity-section">
    <div class="section-header">
      <span class="section-label">Recent Event</span>
    </div>
    <div class="news-callout" style="border: 1px solid var(--border); padding: 1.5rem; border-radius: var(--radius); display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1.5rem; background-color: var(--bg-card);">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <h3 style="margin:0; font-family: 'Instrument Serif', Georgia, serif; font-size: 1.4rem; font-weight: 400; color: var(--text);">T2M 2026 Conference</h3>
        <span class="activity-badge badge-talk" style="margin:0; background: var(--bg); border: 1px solid var(--border);">Conference</span>
      </div>
      <p style="margin:0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
        The Theories and Methods in Macroeconomics (T2M) conference recently concluded in Montreal, hosted by HEC Montreal.
      </p>
      <a href="http://t2m.network" target="_blank" rel="noopener" style="font-size: 0.8rem; font-weight: 500; color: var(--orange); text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem; margin-top: 0.5rem;">
        Visit t2m.network <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
      </a>
    </div>
  </section>



</div>
