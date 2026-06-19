---
layout: page
title: "Research"
subtitle: "Economic dynamics, computation, and inequality."
permalink: /research/
---

<h2 style="font-family:var(--f-serif);font-weight:400;font-size:1.3rem;color:var(--text);margin-bottom:1.2rem;">Working Papers</h2>

<ul class="paper-list">
{% for paper in site.data.papers %}
  {% if paper.type == "Working Paper" %}
  <li class="paper-item" data-item-id="{{ paper.id }}">
    <div class="paper-title">{{ paper.title }}</div>
    <div class="paper-meta">
      {% if paper.coauthors %}<span>With {{ paper.coauthors }}. </span>{% endif %}
      {% if paper.journal %}<span class="paper-journal">{{ paper.journal }}, </span>{% endif %}
      <span class="paper-year">{{ paper.year }}</span>
    </div>
  <div class="paper-downloads" style="display: flex; gap: 1rem; margin-top: .35rem;">
    {% if paper.url and paper.url != '#' %}
    <a href="{{ paper.url }}" target="_blank" rel="noopener" class="card-download" style="margin-top: 0;" onclick="event.stopPropagation()">
      Download PDF ↗
    </a>
    {% endif %}
    {% if paper.presentations %}
    <div class="paper-presentations" style="margin-top: .5rem;">
      {% for pres in paper.presentations %}
        {% if pres.url %}
        <a href="{{ pres.url }}" target="_blank" rel="noopener" class="card-download" style="margin-top: 0;" onclick="event.stopPropagation()">
          {{ pres.name }} ↗
        </a>
        {% endif %}
      {% endfor %}
    </div>
    {% endif %}
  </div>
  </li>
  {% endif %}
{% endfor %}
</ul>

<h2 style="font-family:var(--f-serif);font-weight:400;font-size:1.3rem;color:var(--text);margin:2rem 0 1.2rem;">Published Papers</h2>

<ul class="paper-list">
{% for paper in site.data.papers %}
  {% if paper.type == "Paper" or paper.type == nil %}
  <li class="paper-item" data-item-id="{{ paper.id }}">
    <div class="paper-title">{{ paper.title }}</div>
    <div class="paper-meta">
      {% if paper.coauthors %}<span>With {{ paper.coauthors }}. </span>{% endif %}
      {% if paper.journal %}<span class="paper-journal">{{ paper.journal }}, </span>{% endif %}
      <span class="paper-year">{{ paper.year }}</span>
    </div>
    <div class="paper-downloads" style="display: flex; gap: 1rem; margin-top: .35rem;">
      {% if paper.url and paper.url != '#' %}
      <a href="{{ paper.url }}" target="_blank" rel="noopener" class="card-download" style="margin-top: 0;" onclick="event.stopPropagation()">
        Download PDF ↗
      </a>
      {% endif %}
      
    </div>
      {% if paper.presentations %}
        <div class="paper-presentations" style="margin-top: .5rem;">
          {% for pres in paper.presentations %}
            {% if pres.url %}
              <a href="{{ pres.url }}" target="_blank" rel="noopener" class="card-download" style="margin-top: 0;" onclick="event.stopPropagation()">
                {{ pres.name }} ↗
              </a>
            {% endif %}
          {% endfor %}
        </div>
      {% endif %}
  </li>
  {% endif %}
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
