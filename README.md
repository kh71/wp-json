# wp-json
Wordpress wp-json v2


អ្វីដែលបានរៀបចំ និងធ្វើឡើង
- Constructor [domain, obj]. obj មានទិន្ន័យដូចជា
per_page ត្រូវបានកំណត់ចំនួនស្រាប់ 10
api default wp-json. យើងក៏អាចផ្លាស់ប្ដូរប្រើ ?rest_route=

- Recent Post [recent] (page, per_page). ដើម្បីទាញយកព័ត៌មានដែលបាន Post ចុងក្រោយ
page ត្រូវបានកំណត់ចំនួនស្រាប់ 1
per_page ធ្វើការយកពី obj Constructor ឬចំនួនស្រាប់ 10
return {status: true, data: []}

- Category [category] (id, page, per_page). ដើម្បីទាញយកព័ត៌មានដែលបាន Post ពី Category
id គឺជា id របស់ Category ដែលត្រូវធ្វើការទាញយក
page ត្រូវបានកំណត់ចំនួនស្រាប់ 1
per_page ធ្វើការយកពី obj Constructor ឬចំនួនស្រាប់ 10
return {status: true, data: []}

- Post (id). ដើម្បីទាញយកព័ត៌មានណាមួយតាមរយៈ id Post
return {status: true, data: {}}

- tags [tag] (id, page, per_page). ដើម្បីទាញយកព័ត៌មានដែលបាន Post ពី tag
id គឺជា id របស់ Tag ដែលត្រូវធ្វើការទាញយក អ្នកអាចធ្វើការជ្រើសរើសបានច្រើនក្នុងពេលតែមានតាមរយៈ [,]. ex. 7,1
page ត្រូវបានកំណត់ចំនួនស្រាប់ 1
per_page ធ្វើការយកពី obj Constructor ឬចំនួនស្រាប់ 10
return {status: true, data: []}

- counter (id) ស្រាប់បង្កើតចំនួនអ្នកបានអានរួច View ទៅលើ Custom Field: post_views_count
ប៉ុន្តែការប្រើប្រាស់អាចប្រើបានជាមួយ td_ajax_update_views របស់ WP Theme Newspaper ប៉ុណ្ណោះ