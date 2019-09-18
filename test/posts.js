const WPAPI = require("../index.js");
async function run1() {
  const wpJson = new WPAPI("postnews.com.kh");
  const res = await wpJson.tags("815,576", 1, 1).then(res => { return res; });
  console.log(res);
};

run1();