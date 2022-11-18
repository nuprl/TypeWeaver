// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.


export default {

  newInvalidAsn1Error: function (msg: string) {
    var e: Error = new Error();
    e.name = 'InvalidAsn1Error';
    e.message = msg || '';
    return e;
  }

};
