---
layout: page
title: "Teach"
subtitle: "Economics through code, models, and real applications."
permalink: /teach/
---

<p style="font-size:.88rem;color:var(--text-muted);margin-bottom:2rem;max-width:520px;">
  Economics becomes clearer when students can build and break models themselves.
  All courses include Jupyter notebooks, code examples, and interactive exercises.
</p>

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
