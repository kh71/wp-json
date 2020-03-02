# wp-json
Wordpress wp-json v2

អ្វីដែលបានរៀបចំ និងធ្វើឡើង
- Constructor [domain, obj]. obj មានទិន្ន័យដូចជា
per_page ត្រូវបានកំណត់ចំនួនស្រាប់ 10
ប្រសិនបើ per_page ធំជាង 100 គឺយកតម្លៃត្រឹម 100 ប៉ុណ្ណោះ
api default wp-json. យើងក៏អាចផ្លាស់ប្ដូរប្រើ ?rest_route=

- Recent Post [recent] (page, per_page). ដើម្បីទាញយកព័ត៌មានដែលបាន Post ចុងក្រោយ
page ត្រូវបានកំណត់ចំនួនស្រាប់ 1
per_page ធ្វើការយកពី obj Constructor ឬចំនួនស្រាប់ 10
return {status: true, data: []}

- Category [categories] (page, per_page). ដើម្បីទាញយកព័ត៌មានដែលបាន Categories ទាំងអស់

- Category [category] (id, page, per_page). ដើម្បីទាញយកព័ត៌មានដែលបាន Post ពី Category
id គឺជា id របស់ Category ដែលត្រូវធ្វើការទាញយក
page ត្រូវបានកំណត់ចំនួនស្រាប់ 1
per_page ធ្វើការយកពី obj Constructor ឬចំនួនស្រាប់ 10
return {status: true, data: []}

- Post (id). ដើម្បីទាញយកព័ត៌មានណាមួយតាមរយៈ id Post
return {status: true, data: {}}

- tags [tags] (page, per_page). ដើម្បីទាញយកព័ត៌មានដែលបាន tags ទាំងអស់

- tag [tag] (id, page, per_page). ដើម្បីទាញយកព័ត៌មានដែលបាន Post ពី tag
id គឺជា id របស់ Tag ដែលត្រូវធ្វើការទាញយក អ្នកអាចធ្វើការជ្រើសរើសបានច្រើនក្នុងពេលតែមានតាមរយៈ [,]. ex. 7,1
page ត្រូវបានកំណត់ចំនួនស្រាប់ 1
per_page ធ្វើការយកពី obj Constructor ឬចំនួនស្រាប់ 10
return {status: true, data: []}

- counter (id) ស្រាប់បង្កើតចំនួនអ្នកបានអានរួច View ទៅលើ Custom Field: post_views_count
ប៉ុន្តែការប្រើប្រាស់អាចប្រើបានជាមួយ td_ajax_update_views របស់ WP Theme Newspaper ប៉ុណ្ណោះ

## Installation

Go to your app's main directory and run:

```
npm install wp-json -S
```

# ES6

Get Recent Post
```javascript
import WPAPI from "wp-json";
async function run1() {
  const wpJson = new WPAPI("postnews.com.kh");
  const res = await wpJson.recent(1, 20).then(res => { return res; });
};

run1();
```

Get Category
```javascript
import WPAPI from "wp-json";
async function run1() {
  const wpJson = new WPAPI("postnews.com.kh");
  const res = await wpJson.category(8, 1, 20).then(res => { return res; });
};

run1();
```

Get Post ID
```javascript
import WPAPI from "wp-json";
async function run1() {
  const wpJson = new WPAPI("postnews.com.kh");
  const res = await wpJson.post(359619).then(res => { return res; });
};

run1();
```

Get Post by Tag
```javascript
import WPAPI from "wp-json";
async function run1() {
  const wpJson = new WPAPI("postnews.com.kh");
  const res = await wpJson.tag("429", 1, 20).then(res => { return res; });
};

run1();
```

Get Post by multi tags
```javascript
import WPAPI from "wp-json";
async function run1() {
  const wpJson = new WPAPI("postnews.com.kh");
  const res = await wpJson.tags([429,618], 1, 20).then(res => { return res; });
};

run1();
```

Get Search
```javascript
import WPAPI from "wp-json";
async function run1() {
  const wpJson = new WPAPI("postnews.com.kh");
  const res = await wpJson.search("search text", 1, 20).then(res => { return res; });
};

run1();
```

## គោលបំណង
ការងារមួយនេះគឺខ្ញុំចង់ចែករំលែកការងារដែលធ្លាប់បានធ្វើហើយ និងសាកបង្កើតជា dependency មួយឡើង និងប្រើប្រាស់ github។ 

ការប្រើប្រាស់នៅក្នុង github ខ្ញុំមិនទាន់ចេះប្រើទេ ហើយក៏ចេះតែ commit ទៅតាមចិត្តចង់ ឬពេលវេលា។ ហេតុនេះហើយបើខ្ញុំសរសេរមានបញ្ហា បើមាននោះសូមជួយកែសម្រួលផង