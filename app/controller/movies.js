const axios = require('../json-server-lib/node_modules/axios');

axios.get('http://localhost:3000/movies')
.then(resp => {
    data = resp.data;
data.forEach(e => {
    console.log(`${e.title}`);
});
})
.catch(error => {
    console.log(error);
});