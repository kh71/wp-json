"use strict";

import { get, post } from "request-promise";
import * as queryString from "query-string";

export default class WPAPI {
  private domain: string = "";
  private page: number = 1;
  private per_page: number = 10;
  private api: string;
  private _api: string;
  constructor(domain: string, per_page: number = 10, api: string = "wp-json") {
    this.domain = domain;
    this.per_page = per_page || 10;
    switch (api) {
      case "?rest_route=":
      case "index.php?rest_route=":
      case "index.php/?rest_route=":
      case "query":
        this.api = "index.php?rest_route=";
        break;
      default:
        this.api = "wp-json";
    }
    this._api = `https://${this.domain}/${this.api}/wp/v2/posts`;
  }

  async recent(page: number, per_page: number = this.per_page) {
    const query = {
      page: page || this.page,
      per_page: per_page || this.per_page
    };
    return await this._getRequest(query);
  }

  async category(id: number, page: number, per_page: number = this.per_page) {
    const query = {
      categories: id,
      page: page || this.page,
      per_page: per_page
    };
    return await this._getRequest(query);
  }

  async tags(id: number, page: number, per_page: number = this.per_page) {
    const query = {
      tags: id,
      page: page || this.page,
      per_page: per_page
    };
    return await this._getRequest(query);
  }

  async search(str: string, page: string, per_page: number = this.per_page) {
    const query = {
      search: str,
      page: page || this.page,
      per_page: per_page || this.per_page
    };
    return await this._getRequest(query);
  }

  async post(id: number) {
    return await this._getRequest(id);
  }

  async _getRequest(action: any) {
    if (this.api === "wp-json")
      action = typeof action === "object" ? "?" + queryString.stringify(action) : action;
    else
      action = typeof action === "object" ? "&" + queryString.stringify(action) : action;
    const api = `${this._api}/${action}`;
    const options = {
      uri: api,
      json: true // Automatically parses the JSON string in the response
    };
    return await get(options)
      .then((res: any) => {
        // if (res.statusCode != 200) throw new WPError(res.statusCode);
        return { status: true, data: res };
      })
      .catch((err: any) => {
        return { status: false, data: err };
      });
  }

  async counter(id: number) {
    const option = {
      uri: `https://${this.domain}/wp-admin/admin-ajax.php`,
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
    };
    return await post(option)
      .then((res: any) => true)
      .catch((err: any) => false);
  }
}