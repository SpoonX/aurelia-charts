# Extending

It might be the case that you want to create support for another chart library
or you want to register a chart you have in your project. This can be
done using decorators.

In aurelia charts world a chart is a class which is extended by the
`aurelia-charts` Chart class. This class takes care of getting access to the
element.

Let's have a look at the `base` class of c3 named `C3Chart`. Notice that it has
some methods defined. These are lifecycle methods.

```js

  import {logger, chart, Chart} from 'aurelia-charts';
  import c3 from 'c3';

  /* @todo: consider naming the Chart class of aurelia-charts an AureliaChart */

  /* graph adapter for a graph lib. In this case for C3 */
  /* the generic version of a graph does not have a type defined*/
  @chart('C3')
  export class C3Chart extends Chart {

    settings = {
      data: {
        columns: []
      }
    };

    create() {
      this.settings.bindto = this.element;
      this.instance        = c3.generate(this.settings);
      if (this.data && this.dimensions) {
        this.update();
      }
    }

    calculateSettings() {
      logger.error(`'calculateSettings' method is not defined for ${this.constructor.name}`);
    }

    update() {
      this.calculateSettings();
      this.instance.load(this.settings);
    }

    destroy() {
      this.instance.destroy();
    }

    typeChanged(type) {
      this.instance.transform(type);
    }

  }

```

The `create`, `update` and `destroy` methods are required lifecycle methods.
When not defined it will throw an show you an error message in the console.

- **create** is responsible for instantiating the chart. In the case of c3 it
             also calls the update lifecycle method

- **update** should be called when render options or data is updated

- **destroy** should remove the chart dom elements and the event listeners

> You can always checkout aurelia-graphs-c3 repositories for more information on
> how to implement support for your favorite chart library. The code is
> relatively simple.

