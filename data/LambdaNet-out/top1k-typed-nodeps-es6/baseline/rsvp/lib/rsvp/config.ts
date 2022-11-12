import EventTarget from './events';

const config: Object = {
  instrument: false
};

EventTarget['mixin'](config);

function configure(name: String, value: String): String {
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
