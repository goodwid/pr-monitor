const { toXML } = require('jstoxml');

module.exports = {

    dataHandler: results => {

      console.log(toXML(results));
    },
    errorHandler: err => {
      console.log('xml error: ', err);
    }
  };
