import {Config} from '../../src/config';
import {quan, qual} from '../../src/aurelia-charts';

describe('Config', () => {
  let config;
  let target;

  beforeEach(() => {
    target = function Constructor() {};
    config = new Config();
    config.configure({
      defaults: {
        library: 'NeoPlot',
        type: 'line'
      }
    });
    config.registerChart('NeoPlot', 'bar', target);
  });

  it('registered the defaults', () => {
    expect(config.defaults).toEqual({
      library: 'NeoPlot',
      type: 'line',
      libraries: {}
    });
  });

  it('registers charts', () => {
    expect(config.registerChart('NeoPlot', 'line', target)).toBe(config);
    expect(config.charts.NeoPlot.line).toEqual(target);
  });

  it('registers scales', () => {
    let scales = [[quan, quan], [quan, qual]];
    expect(config.registerScales(target, ...scales)).toBe(config);
    expect(config.scales[0].scales).toEqual(scales);
    expect(config.scales[0].constructor).toEqual(target);
  });

  it('gets a chart of a library that is not defined', () => {
    expect(config.chart('line')).toBe(undefined);
  });

  it('gets a chart using a string and using the default library', () => {
    expect(config.chart('bar')).toBe(target);
  });

  it('gets a chart using an object', () => {
    expect(config.chart({
      library: 'NeoPlot',
      type: 'bar'
    })).toBe(target);
  });

  it('gets a chart using an object where library is undefined', () => {
    expect(config.chart({
      library: null,
      type: 'bar'
    })).toBe(target);
  });

  it('gets a chart using an object that does not exist', () => {
    expect(config.chart({
      library: 'Nada',
      type: 'bar'
    })).toBe(undefined);
  });

  it('get the charts that match the scale fingerprint', () => {
    /* register some scales */
    expect(config.registerScales(target, [quan, quan], [quan, qual])).toBe(config);
    config.registerScales('b', [quan, qual]);
    config.registerScales('c', [quan, qual]);

    expect(
      config.chartsByScale(quan, quan)
    ).toEqual([target]);
  });
});
