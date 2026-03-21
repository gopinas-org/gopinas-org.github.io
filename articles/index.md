---
layout: page
title: Articles
permalink: /articles/
---
<p class="small text-secondary mb-4">Long-form pieces (not linked from the main site navigation). Share direct URLs to these pages.</p>
{% assign articles_sorted = site.articles | sort: 'date' | reverse %}
{% if articles_sorted.size == 0 %}
  <p>No articles yet.</p>
{% else %}
  <ul class="list-unstyled mb-0">
    {% for a in articles_sorted %}
      <li class="mb-4">
        <a class="fw-semibold" href="{{ a.url | relative_url }}">{{ a.title }}</a>
        {% if a.date %}
          <span class="text-secondary small"> — {{ a.date | date: '%B %-d, %Y' }}</span>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
{% endif %}
