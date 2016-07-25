# Utils

Aurelia-charts provides you with some functions which help you with your
charting adventures. These cover common use cases when wanting to plot stuff.

When using a d3 powered library it is adviced to look into the utilities d3
provides. They cover many data transformation usecases.


## Automatically calculate chart possibilities.

In some cases you want the user to have a choice between several chart types.
Some preffer bars and others lines. You could also have charts that render 3 or
4 dimensional data. Certain charts render categorical data. How would one know
what chart one can use to render the selected data. Aurelia-graphs has a tool
which spits out the library charts that are compatible with the data types you
have provided.

Aurelia-chart library implementers have the possibility of telling
aurelia-charts what `scales` their chart accepts. This is done by decorating the
chart class with the `@scales` decorator.

Imagine a fictional library named `NeoPlot`. It has a scatter plot which
enables users to visualize 4 dimensional data.

1. x coordinate
2. y coordinate
3. scatter circle radius
4. scatter circle color gradient

Providing only an `x` and `y` coordinate should be enough to render a scatter
plot. One could also provide data for the circle radius and/or color gradient.
Thus when asking aurelia-charts which charts are valid for two interval
scales the NeoPlot scatter chart should showup in that list. So how is that
done?

```js

import {qual, quan, scales, chart, Chart} from 'aurelia-charts';

@scales(
  [quan, quan],
  [quan, quan, quan],
  [quan, quan, quan, quan]
  [quan, quan, quan, quan]
)
@chart('NeoPlot', 'scatter')
class AwesomeChart extends Chart {
  create() {...}
  update() {...}
  destroy() {...}
}

```

What is this `quan` you might ask. Good question. When it comes to drawing
plots it is important to know if something is quantatative or qualatative data.
Quantatative data is described using numbers. You can clearly see if something
is greater or smaller then. Qualatative data can be considered labels. This
is often used to group/label data together.

> You can read more about these scales over at the
> [wikipedia](https://en.wikipedia.org/wiki/Level_of_measurement) page.

An example of quantatative data which might look like qualatative data are
scales often used in social studies. An example is the `Likert scale`. It
asks people for their input using 5 options to choose between. Questionairs
using this technique often have the following options.

- strongly disagree
- disagree
- ambivelant
- agree
- strongly agree

One could say that this is qualatative data, as it labels the question with an
agreement level. However, when it comes to plotting data, it is much more
usefull to consider this quantative, by rating the options with a number.

1. strongly disagree
2. disagree
3. ambivelant
4. agree
5. strongly agree

The level of agreement increases. `strongly agree` is greater then `agee`. We
can now plot this data as if it was quantative.

What really matters when plotting graphs is knowing if something is qualatative
or quantative. A pie chart for example cannot plot occurences(quantative) over
time(quantative). It can plot occerences(quantative) per category(qualatative).

By providing this data with your graph aurelia-charts is able to supply you
with the valid graphs to render the data you want.
