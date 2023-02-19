import EventTarget from './events';

const config: object = {
  instrument: false
};

EventTarget['mixin'](config);

function configure(name: string, value: string): string {
  if (arguments.length === 2) {
    config[name] = value;
  } else {
    return config[name];
  }
}

export {
  config,
  configure
};
