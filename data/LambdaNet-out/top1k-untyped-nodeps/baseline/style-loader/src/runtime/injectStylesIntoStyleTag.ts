const stylesInDOM: Array = [];

function getIndexByIdentifier(identifier: Number): Number {
  let result: Number = -1;

  for (let i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list: Array, options: Object): Array {
  const idCountMap: Function = {};
  const identifiers: Array = [];

  for (let i = 0; i < list.length; i++) {
    const item: Object = list[i];
    const id: String = options.base ? item[0] + options.base : item[0];
    const count: Number = idCountMap[id] || 0;
    const identifier: String = `${id} ${count}`;

    idCountMap[id] = count + 1;

    const indexByIdentifier: Number = getIndexByIdentifier(identifier);
    const obj: Object = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5],
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      const updater: Object = addElementStyle(obj, options);

      options.byIndex = i;

      stylesInDOM.splice(i, 0, {
        identifier,
        updater,
        references: 1,
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj: Object, options: Object): Function {
  const api: Object = options.domAPI(options);

  api.update(obj);

  const updater: Function = (newObj: Object) => {
    if (newObj) {
      if (
        newObj.css === obj.css &&
        newObj.media === obj.media &&
        newObj.sourceMap === obj.sourceMap &&
        newObj.supports === obj.supports &&
        newObj.layer === obj.layer
      ) {
        return;
      }

      api.update((obj = newObj));
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = (list: Array, options: String) => {
  options = options || {};

  list = list || [];

  let lastIdentifiers: Array = modulesToDom(list, options);

  return function update(newList: Array): Void {
    newList = newList || [];

    for (let i = 0; i < lastIdentifiers.length; i++) {
      const identifier: String = lastIdentifiers[i];
      const index: String = getIndexByIdentifier(identifier);

      stylesInDOM[index].references--;
    }

    const newLastIdentifiers: Array = modulesToDom(newList, options);

    for (let i = 0; i < lastIdentifiers.length; i++) {
      const identifier: String = lastIdentifiers[i];
      const index: String = getIndexByIdentifier(identifier);

      if (stylesInDOM[index].references === 0) {
        stylesInDOM[index].updater();
        stylesInDOM.splice(index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};
