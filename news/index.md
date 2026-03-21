---
layout: page
title: News
permalink: /news/
---
{% assign news_sorted = site.news | sort: 'date' | reverse %}
{% if news_sorted.size == 0 %}
  <p>No news posts yet.</p>
{% else %}
  <ul class="list-unstyled mb-0">
    {% for n in news_sorted %}
      <li class="mb-4">
        <a class="fw-semibold" href="{{ n.url | relative_url }}">{{ n.title }}</a>
        {% if n.date %}
          <span class="text-secondary small"> — {{ n.date | date: '%B %-d, %Y' }}</span>
        {% endif %}
        {% if n.excerpt %}
          <p class="mb-0 mt-1">{{ n.excerpt | strip_html }}</p>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
{% endif %}
