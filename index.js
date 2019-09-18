const got = require('got');

class WPAPI {
  constructor(domain) {
    this.api = `https://${domain}/wp-json/wp/v2/posts`
  }

  async recent(id, page, per_page) {
    page = page || 1;
    per_page = per_page || 10;
    let api = `${this.api}?posts&page=${page}&per_page=${per_page}`;
    if (id > 0) {
      api = `${this.api}?posts&categories=${id}&page=${page}&per_page=${per_page}`;
    }
    return await this.getRequest(api);
  }

  async tags(id, page, per_page) {
    page = page || 1;
    per_page = per_page || 10;
    if (id === undefined) {
      return { status: false };
    }
    let api = `${this.api}?posts&tags=${id}&page=${page}&per_page=${per_page}`;
    return await this.getRequest(api);
  }

  async getRequest(url, cb) {
    return got(url, { responseType: "json" })
      .then((res) => {
        if (res.statusCode != 200) throw new WPError(body);
        return JSON.parse(res.body);
      })
      .catch(err => {
        throw err;
      });
  }

  async counter(id) {
    const themes_name = "Newsmag";
    const themes_version = "4.9";
    got(`https://${this.domain}/wp-admin/admin-ajax.php?td_theme_name=${themes_name}&v=${themes_version}`,
      {
        "credentials": "include",
        "headers":
        {
          "accept": "*/*", "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-fetch-mode": "cors", "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest"
        },
        "referrerPolicy": "unsafe-url",
        "body": `action=td_ajax_update_views&td_post_ids=%5B${id}%5D`,
        "method": "POST"
      });
  }
}

module.exports = WPAPI;

class WPError extends Error {
  constructor(err) {
    super();
    this.name = `WP-Error: ${err.code}`;
    this.message = err.message;
  }
}