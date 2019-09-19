const got = require('got');

class WPAPI {
  constructor(domain, per_page = 10) {
    this.domain = domain;
    this.per_page = per_page;
    this.api = `https://${domain}/wp-json/wp/v2/posts`
  }

  async recent(page, per_page) {
    page = page || 1;
    per_page = per_page || this.per_page;
    let api = `${this.api}?posts&page=${page}&per_page=${per_page}`;
    return await this.getRequest(api);
  }

  async category(id, page, per_page) {
    page = page || 1;
    per_page = per_page || this.per_page;
    let api = `${this.api}?posts&categories=${id}&page=${page}&per_page=${per_page}`;
    return await this.getRequest(api);
  }

  async post(id) {
    return await this.getRequest(`${this.api}?posts/${id}`);
  }

  async tags(id, page, per_page) {
    page = page || 1;
    per_page = per_page || this.per_page;
    let api = `${this.api}?posts&tags=${id}&page=${page}&per_page=${per_page}`;
    return await this.getRequest(api);
  }

  async getRequest(url, cb) {
    return got(url, { responseType: "json" })
      .then((res) => {
        if (res.statusCode != 200) throw new WPError(body);
        return { status: true, data: JSON.parse(res.body) };
      })
      .catch(err => {
        return { status: false, data: err };
      });
  }

  async counter(id) {
    return got.post(`https://${this.domain}/wp-admin/admin-ajax.php`,
      {
        credentials: "include",
        headers:
        {
          "accept": "*/*", "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-fetch-mode": "cors", "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest"
        },
        referrerPolicy: "unsafe-url",
        body: `action=td_ajax_update_views& td_post_ids=%5B${id}%5D`
      })
      .then(res => true)
      .catch(err => false);
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