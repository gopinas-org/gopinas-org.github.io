---
layout: home
title: GoPinas! — News
---

<section id="news" class="news-section scroll-target mb-5" aria-labelledby="news-heading">
  <h2 id="news-heading" class="heading-rule fs-3 fw-bold mb-3">News</h2>
  {% assign news_sorted = site.news | sort: 'date' | reverse %}
  {% if news_sorted.size == 0 %}
    <p>Announcements and updates from GoPinas will appear here. Check back soon or reach out through <a class="content-link" href="{{ '/about.html' | relative_url }}#team">our contacts on About Us</a>.</p>
  {% else %}
    <ul class="list-unstyled mb-0">
      {% for n in news_sorted limit: 10 %}
        <li class="mb-3">
          <a href="{{ n.url | relative_url }}">{{ n.title }}</a>
          {% if n.date %}
            <span class="text-secondary small"> — {{ n.date | date: '%B %-d, %Y' }}</span>
          {% endif %}
        </li>
      {% endfor %}
    </ul>
    <p class="mt-3 mb-0"><a class="content-link" href="{{ '/news/' | relative_url }}">All news</a></p>
  {% endif %}
</section>

<section id="upcoming-events" class="upcoming-events-section scroll-target mb-5" aria-labelledby="upcoming-events-heading">
  <h2 id="upcoming-events-heading" class="heading-rule fs-3 fw-bold mb-3">Upcoming Events</h2>
  {% assign today = site.time | date: '%Y-%m-%d' %}
  {% assign events_sorted = site.events | sort: 'event_date' %}
  {% assign has_upcoming = false %}
  {% for e in events_sorted %}
    {% assign ed = e.event_date | date: '%Y-%m-%d' %}
    {% if ed >= today %}
      {% assign has_upcoming = true %}
    {% endif %}
  {% endfor %}
  {% unless has_upcoming %}
    <p>Upcoming dates, venues, and registration will be posted here. Check back soon or reach out through <a class="content-link" href="{{ '/about.html' | relative_url }}#team">our contacts on About Us</a> for the latest.</p>
  {% else %}
    <ul class="list-unstyled mb-0">
      {% for e in events_sorted %}
        {% assign ed = e.event_date | date: '%Y-%m-%d' %}
        {% if ed >= today %}
          <li class="mb-3">
            <a href="{{ e.url | relative_url }}">{{ e.title }}</a>
            <span class="text-secondary small"> — {{ e.event_date | date: '%B %-d, %Y' }}{% if e.location %} · {{ e.location }}{% endif %}</span>
          </li>
        {% endif %}
      {% endfor %}
    </ul>
    <p class="mt-3 mb-0"><a class="content-link" href="{{ '/events/' | relative_url }}">All events</a></p>
  {% endunless %}
</section>
