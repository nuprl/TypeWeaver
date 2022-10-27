import EventTarget from './events';

const config: any = {
  instrument: false
};

EventTarget['mixin'](config);

function configure(name: string, value: any): void {
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
