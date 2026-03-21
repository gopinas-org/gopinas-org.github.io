---
layout: page
title: Events
permalink: /events/
---
{% assign events_sorted = site.events | sort: 'event_date' | reverse %}
{% if events_sorted.size == 0 %}
  <p>No events listed yet.</p>
{% else %}
  <ul class="list-unstyled mb-0">
    {% for e in events_sorted %}
      <li class="mb-4">
        <a class="fw-semibold" href="{{ e.url | relative_url }}">{{ e.title }}</a>
        <span class="text-secondary small"> — {{ e.event_date | date: '%B %-d, %Y' }}{% if e.location %} · {{ e.location }}{% endif %}</span>
      </li>
    {% endfor %}
  </ul>
{% endif %}
