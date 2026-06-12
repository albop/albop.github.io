---
layout: page
title: "Research"
subtitle: "Economic dynamics, computation, and inequality."
permalink: /research/
---

<h2 style="font-family:var(--f-serif);font-weight:400;font-size:1.3rem;color:var(--text);margin-bottom:1.2rem;">Published Papers</h2>

<ul class="paper-list">
{% for paper in site.data.papers %}
<li class="paper-item" data-item-id="{{ paper.id }}">
  <div class="paper-title">{{ paper.title }}</div>
  <div class="paper-meta">
    {% if paper.coauthors %}<span>With {{ paper.coauthors }}. </span>{% endif %}
    <span class="paper-journal">{{ paper.journal }}, </span>
    <span class="paper-year">{{ paper.year }}</span>
  </div>
  {% if paper.url and paper.url != '#' %}
  <a href="{{ paper.url }}" target="_blank" rel="noopener" class="card-download" onclick="event.stopPropagation()">
    Download PDF ↗
  </a>
  {% endif %}
</li>
{% endfor %}
</ul>

<h2 style="font-family:var(--f-serif);font-weight:400;font-size:1.3rem;color:var(--text);margin:2rem 0 1.2rem;">Research Interests</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.75rem;">
  {% assign interests = "Macro-finance,International macroeconomics,Inequalities,Heterogeneous agents,Computational economics,Perturbation methods" | split: "," %}
  {% for interest in interests %}
  <div style="background:var(--card-bg);border:1px solid var(--border);border-radius:var(--radius);padding:.75rem 1rem;font-size:.82rem;color:var(--text-muted);">
    {{ interest }}
  </div>
  {% endfor %}
</div>
