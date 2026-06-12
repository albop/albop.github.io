---
layout: page
title: "Build"
subtitle: "Open-source tools for computational economics."
permalink: /build/
---

<p style="font-size:.88rem;color:var(--text-muted);margin-bottom:2rem;max-width:520px;">
  Code is part of the argument, not an afterthought.
  I build tools that make economic models reproducible, shareable, and composable.
</p>

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem;">
{% for tool in site.data.software %}
<article class="panel-card" data-item-id="{{ tool.id }}" style="cursor:pointer;">
  <div style="display:flex;align-items:baseline;gap:.5rem;margin-bottom:.4rem;">
    <span style="font-family:var(--f-serif);font-size:1.3rem;color:var(--blue);font-weight:400;">{{ tool.name }}</span>
    <span style="font-size:.65rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--text-light);">{{ tool.tagline }}</span>
  </div>
  <p style="font-size:.78rem;color:var(--text-muted);line-height:1.6;margin-bottom:.85rem;">{{ tool.description }}</p>
  <a href="{{ tool.url }}" target="_blank" rel="noopener"
     style="font-size:.75rem;font-weight:500;color:var(--orange);display:inline-flex;align-items:center;gap:.25rem;"
     onclick="event.stopPropagation()">
    GitHub &rarr;
  </a>
  {% if tool.docs %}
  &nbsp;
  <a href="{{ tool.docs }}" target="_blank" rel="noopener"
     style="font-size:.75rem;font-weight:500;color:var(--text-muted);display:inline-flex;align-items:center;gap:.25rem;"
     onclick="event.stopPropagation()">
    Docs &rarr;
  </a>
  {% endif %}
</article>
{% endfor %}
</div>

<!-- 
<div style="margin-top:2rem;">
  <h2 style="font-family:var(--f-serif);font-weight:400;font-size:1.15rem;color:var(--text);margin-bottom:.8rem;">A typical session</h2>
  <div class="code-block" style="font-size:.78rem;max-width:440px;">
<span class="code-kw">import</span> dolo<br><br>
<span class="code-kw">m</span>  = <span class="code-fn">dolo.yaml_import</span>(<span class="code-str">"rbc.yaml"</span>)<br>
<span class="code-kw">dr</span> = <span class="code-fn">dolo.time_iteration</span>(<span class="code-kw">m</span>)<br>
<span class="code-kw">sim</span> = <span class="code-fn">dolo.simulate</span>(<span class="code-kw">m</span>, <span class="code-kw">dr</span>, T=<span class="code-str">200</span>)<br><br>
<span class="code-fn">sim</span>.plot()
  </div>
</div>  -->