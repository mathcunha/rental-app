//https://github.com/zeit/next.js/issues/153
export default class AuthService {
  constructor(domain) {
    this.domain = domain || `${process.env.API_HOST}`;
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    // Get a token
    return this.fetch(`${this.domain}/login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        this.setToken(res.token);
        return this.fetch(`${this.domain}/user`, {
          method: "GET",
        });
      })
      .then((res) => {
        this.setProfile(res);
        return Promise.resolve(res);
      });
  }

  //Always calls login endpoint
  isTokenExpired(token) {
    return false;
  }

  onServer() {
    return typeof localStorage === "undefined";
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid

    if (this.onServer()) {
      return false;
    }

    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  setProfile(profile) {
    // Saves profile data to localStorage

    let isAdmin = false;
    let isRealtor = false;
    for (let index = 0; index < profile.authorities.length; index++) {
      const element = profile.authorities[index];
      if (element.authority === "ROLE_ADMIN") {
        isAdmin = true;
      }
      if (element.authority === "ROLE_REALTOR") {
        isRealtor = true;
      }
    }

    localStorage.setItem(
      "profile",
      JSON.stringify({ ...profile, isAdmin: isAdmin, isRealtor: isRealtor })
    );
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = !this.onServer() && localStorage.getItem("profile");
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  logout() {
    // Clear user token and profile data from localStorage
    if (!this.onServer()) {
      localStorage.removeItem("id_token");
      localStorage.removeItem("profile");
    }
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      error.status = response.status;
      throw error;
    }
  }

  delete(endpoint) {
    return this.fetch(endpoint, {
      method: "DELETE",
    });
  }

  save(resource, data) {
    const method = data.endpoint ? "PUT" : "POST";
    const url =
      data.endpoint && data.endpoint != ""
        ? data.endpoint
        : `${process.env.API_URL}/${resource}/`;

    return this.fetch(url, {
      method: method,
      body: JSON.stringify(data),
    });
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then((response) => {
        if (response.status === 204) return response;
        else return response.json();
      });
  }
}
