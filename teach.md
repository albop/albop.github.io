---
layout: page
title: "Teach"
subtitle: "Economics through code, models, and real applications."
permalink: /teach/
---

<style>
  .sabbatical-card {
    border: 1px solid rgba(110, 160, 210, 0.15);
    background: rgba(20, 32, 48, 0.4);
    border-radius: var(--radius);
    padding: 1.5rem 2rem;
    display: flex;
    gap: 2.5rem;
    align-items: center;
    margin-bottom: 2.5rem;
  }
  .sabbatical-img {
    flex-shrink: 0;
    width: 170px;
    height: auto;
    display: block;
  }
  .sabbatical-content {
    font-size: 0.84rem;
    line-height: 1.65;
    color: var(--text-muted);
  }
  .sabbatical-content p {
    margin: 0 0 0.85rem;
  }
  .sabbatical-content p:last-child {
    margin-bottom: 0;
  }
  .sabbatical-heading {
    color: #79a3d2;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }
  .sabbatical-highlight {
    color: #79a3d2;
    font-weight: 600;
  }
  
  [data-theme="light"] .sabbatical-card {
    background: #f4f7fa;
    border-color: rgba(30, 80, 140, 0.12);
  }
  [data-theme="light"] .sabbatical-img {
    filter: invert(0.92) hue-rotate(180deg);
  }
  [data-theme="light"] .sabbatical-heading,
  [data-theme="light"] .sabbatical-highlight {
    color: #1a5a9a;
  }

  @media (max-width: 768px) {
    .sabbatical-card {
      flex-direction: column;
      padding: 1.5rem;
      gap: 1.2rem;
    }
    .sabbatical-img {
      width: 140px;
    }
  }
</style>

<div class="sabbatical-card">
  <img src="/files/sabbatical_illustration.png" alt="Sabbatical illustration" class="sabbatical-img" />
  <div class="sabbatical-content">
    <div class="sabbatical-heading">Dear students,</div>
    <p>I'll be on sabbatical for a while, giving my research questions some room to run around unsupervised. 😄</p>
    <p>During this time, I won't be teaching regular courses, but the materials here will remain available. Feel free to explore the notebooks, break a few models, and blame the calibration when necessary. 😉</p>
    <p>I'll return to teaching activities in <span class="sabbatical-highlight">September 2027</span>.</p>
    <p style="margin-top: 2rem; line-height: 1.45;">
      See you back in class then,<br>
      <strong class="sabbatical-highlight">Pablo</strong>
    </p>
  </div>
</div>

<div class="course-grid">
{% for course in site.data.courses %}
<article class="course-card" data-item-id="{{ course.id }}">
  <div class="course-code">{{ course.code }}</div>
  <div class="course-title">{{ course.title }}</div>
  <p class="course-desc">{{ course.description }}</p>
  <a href="{{ course.url }}" target="_blank" rel="noopener" class="course-link" onclick="event.stopPropagation()">
    Open course &rarr;
  </a>
</article>
{% endfor %}
</div>
