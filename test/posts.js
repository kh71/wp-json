const WPAPI = require("../index.js");
async function run1() {
  const wpJson = new WPAPI("postnews.com.kh");
  const count = await wpJson.counter(485979).then(res => { return res; });
  console.log("Post 485979: ", res);
  const res = await wpJson.post(485979).then(res => { return res; });
  console.log("Update Count:", count);
};

run1();