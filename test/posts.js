// import WPAPI from "../dist";
var WPAPI = require("../dist");
async function run1() {
  const wpJson = new WPAPI("postnews.com.kh");
  const res = await wpJson.recent(20).then(res => { return res; });
  console.log(res);
};

run1();