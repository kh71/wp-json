const got = require('got');
const queryString = require('query-string');

class WPAPI {
  constructor(domain, obj = { per_page: 10, api: "wp-json" }) {
    this.domain = domain;
    this.page = 1;
    this.per_page = obj.per_page || 10;
    switch (obj.api) {
      case "?rest_route=":
      case "query":
        obj.api = "?rest_route=";
        this.api = "?rest_route=";
        break;
      default:
        obj.api = "wp-json";
        this.api = "wp-json";
    }
    this._api = `https://${domain}/${obj.api}/wp/v2/posts`
  }

  async recent(page, per_page) {
    const query = {
      page: page || this.page,
      per_page: per_page || this.per_page
    };
    return await this._getRequest(query);
  }

  async category(id, page, per_page) {
    const query = {
      categories: id,
      page: page || this.page,
      per_page: per_page || this.per_page
    };
    return await this._getRequest(query);
  }

  async tags(id, page, per_page) {
    const query = {
      tags: id,
      page: page || this.page,
      per_page: per_page || this.per_page
    };
    return await this._getRequest(query);
  }

  async search(str, page, per_page) {
    const query = {
      search: str,
      page: page || this.page,
      per_page: per_page || this.per_page
    };
    return await this._getRequest(query);
  }

  async post(id) {
    return await this._getRequest(id);
  }

  async _getRequest(action, cb) {
    if (this.api === "wp-json")
      action = typeof action === "object" ? "?" + queryString.stringify(action) : action;
    else
      action = typeof action === "object" ? "&" + queryString.stringify(action) : action;
    const api = `${this._api}/${action}`;
    return got(api, { json: true })
      .then((res) => {
        if (res.statusCode != 200) throw new WPError(res.statusCode);
        return { status: true, data: res.body };
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