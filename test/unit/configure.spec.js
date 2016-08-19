import {configure} from '../../src/aurelia-charts';
import {Config} from '../../src/config';

class ConfigStub {

  container = {
    get: () => {
      return new Config();
    }
  }

  globalResources(...resources) {
    this.resources = resources;
  }

}

describe('configure function', () => {
  let mockedConfiguration;

  beforeEach(() => {
    mockedConfiguration = new ConfigStub();
    configure(mockedConfiguration);
  });

  it('should register a global resource', () => {
    expect(mockedConfiguration.resources).toContain('./component/chart-element');
  });
});
