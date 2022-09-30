const stylesInDOM: any[] = [];

function getIndexByIdentifier(identifier: any): number {
  let result: number = -1;

  for (let i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  const idCountMap: {} = {};
  const identifiers: any[] = [];

  for (let i = 0; i < list.length; i++) {
    const item: any = list[i];
    const id: any = options.base ? item[0] + options.base : item[0];
    const count: number = idCountMap[id] || 0;
    const identifier: string = `${id} ${count}`;

    idCountMap[id] = count + 1;

    const indexByIdentifier: any = getIndexByIdentifier(identifier);
    const obj: any = {
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
      const updater: any = addElementStyle(obj, options);

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

function addElementStyle(obj: any, options: any): void {
  const api: any = options.domAPI(options);

  api.update(obj);

  const updater: void = (newObj: any) => {
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

module.exports = (list: any, options: any) => {
  options = options || {};

  list = list || [];

  let lastIdentifiers: any = modulesToDom(list, options);

  return function update(newList: any): any {
    newList = newList || [];

    for (let i = 0; i < lastIdentifiers.length; i++) {
      const identifier: any = lastIdentifiers[i];
      const index: number = getIndexByIdentifier(identifier);

      stylesInDOM[index].references--;
    }

    const newLastIdentifiers: any = modulesToDom(newList, options);

    for (let i = 0; i < lastIdentifiers.length; i++) {
      const identifier: any = lastIdentifiers[i];
      const index: number = getIndexByIdentifier(identifier);

      if (stylesInDOM[index].references === 0) {
        stylesInDOM[index].updater();
        stylesInDOM.splice(index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};
