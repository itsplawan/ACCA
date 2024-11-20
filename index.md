---
layout: default
title: Home
---

# Welcome to the GitHub Pages PDF Viewer

This site allows you to view PDF files stored in a GitHub repository directly in the browser.

Click on any PDF file from the list below to view it.

{% for file in site.data.pdfs %}
  - [{{ file.name }}]({{ file.url }})
{% endfor %}
