const WPAPI = require("../index.js");
async function run1() {
  const wpJson = new WPAPI("postnews.com.kh");
  let res = await wpJson.search("ទួលគោគ").then(res => { return res; });
  await wpJson.recent(1, 2).then(res => { return res; });
  console.log("Post 91246: ", res);
  // const count = await wpJson.counter(91246).then(res => { return res; });
  // console.log("Update Count:", count);
};

run1();