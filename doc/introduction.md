# Introduction

You are propably reading this because you want to implement charts in your
aurelia project. It is often the case that part of the service businesses
provide are statistics. Visualizing those statistics is often a requirement.

Aurelia-charts to the rescue, kind of. Aurelia charts is useless by itself.
What it does well is create a standardized way of registering charts and
telling aurelia where you want your charts to be rendered. The idea is to be
able to switch charting libraries, and support multiple charting libraries at
the same time without headaches.

For you I made a list of features.

- `<chart-element>` to tell aurelia-charts you want to render a chart somewhere in
  your template. See [component](./component.md) section.

- Standardized way of defining what data should be plotted on what
  dimension/axes.

- Ability to configure aurelia-charts to tell it what library to use by
  default, or tell it what library to use on a per chart type basis. See the
  [configuration](./configuration.md) section

- Although the libraries `aurelia-charts` supports do not ship with it, it is
  just an install away to extend aurelia-charts with other charts. Read more
  about the [libraries](./libraries.md) aurelia-charts supports.

- Extendible Chart class and chart decorator that helps you to define your own
  custom classes. This is for those that want to implement support for a chart
  library. *advanced*. See [extending](./extending.md) section.
