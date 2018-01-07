const fetchPolifill = require('whatwg-fetch');
global.fetch = fetchPolifill.fetch;
global.Request = fetchPolifill.Request;
global.Headers = fetchPolifill.Headers;
global.Response = fetchPolifill.Response;

// needed in react-instantsearch
//class XMLHttpRequest {}
//global.XMLHttpRequest = XMLHttpRequest;

const XMLHttpRequest = require('xhr2');

global.XMLHttpRequest = XMLHttpRequest;