const stylesInDOM: any[] = [];

function getIndexByIdentifier(identifier: number): number {
  let result: number = -1;

  for (let i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list: any[], options: object): any[] {
  const idCountMap: Function = {};
  const identifiers: any[] = [];

  for (let i = 0; i < list.length; i++) {
    const item: object = list[i];
    const id: string = options.base ? item[0] + options.base : item[0];
    const count: number = idCountMap[id] || 0;
    const identifier: string = `${id} ${count}`;

    idCountMap[id] = count + 1;

    const indexByIdentifier: number = getIndexByIdentifier(identifier);
    const obj: object = {
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
      const updater: object = addElementStyle(obj, options);

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

function addElementStyle(obj: object, options: object): Function {
  const api: object = options.domAPI(options);

  api.update(obj);

  const updater: Function = (newObj: object) => {
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

export default (list: object, options: any[]) => {
  options = options || {};

  list = list || [];

  let lastIdentifiers: any[] = modulesToDom(list, options);

  return function update(newList: any[]): void {
    newList = newList || [];

    for (let i = 0; i < lastIdentifiers.length; i++) {
      const identifier: string = lastIdentifiers[i];
      const index: string = getIndexByIdentifier(identifier);

      stylesInDOM[index].references--;
    }

    const newLastIdentifiers: any[] = modulesToDom(newList, options);

    for (let i = 0; i < lastIdentifiers.length; i++) {
      const identifier: string = lastIdentifiers[i];
      const index: string = getIndexByIdentifier(identifier);

      if (stylesInDOM[index].references === 0) {
        stylesInDOM[index].updater();
        stylesInDOM.splice(index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};
