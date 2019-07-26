import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { User } from "../model/user.model";

// const BACKEND_URL = environment.apiUrl + "/user";
const API_KEY = "AIzaSyAjokjfh85JnNp4OyNIQ8RTgZDvIQ4BP7w";

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  private tokenTimer: any; //Nao reconheceu o NodeJs.Timer, por isso o any
  private isAuthenticated = false;
  private userId: string;
  private displayName: string;
  private authListener = new Subject<boolean>();
  private refreshToken: string;
  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  getDisplayName() {
    return this.displayName;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthListener() {
    return this.authListener.asObservable();
  }

  setAuthListener() {
    return this.authListener.next(false);
  }

  getUserId() {
    return this.userId;
  }

  createUser(user: User) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      user
    );
  }

  login(user: User) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

    return this.http.post(url, authData);
  }

  loginHandler(response) {
    const token = response.idToken;
    const expiresInDuration = response.expiresIn;

    this.setAuthTimer(expiresInDuration);
    this.token = token;
    if (token) {
      this.configUserData(token, response, expiresInDuration);
    }
  }

  configUserData(token, response, expiresInDuration) {
    this.isAuthenticated = true;
    const now = new Date();
    this.userId = response.localId;
    this.displayName = response.displayName;
    this.refreshToken = response.refreshToken;
    /* Soma-se a expiração à data atual, em milisegundos */
    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

    this.authListener.next(true);
    this.saveAuthData(
      token,
      expirationDate,
      this.userId,
      this.displayName,
      this.refreshToken
    );
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.refreshToken = null;
    this.authListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    /* Se o tempo de expiração for maior que zero, quer dizer que a data de expiração é maior
    que a data atual, logo é um token válido */
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.displayName = authInformation.displayName;
      this.refreshToken = authInformation.refreshToken;
      this.setAuthTimer(
        expiresIn / 1000
      ); /* divide por 1000 pois depois ele multiplica, e já está em ms */
      this.authListener.next(true);
    }
  }
  private setAuthTimer(duration: number) {
    console.log("Setting timer:", duration);

    this.tokenTimer = setTimeout(() => {
      const refreshData = {
        grant_type: "refresh_token",
        refresh_token: this.refreshToken
      };
      console.log("[refreshing]");

      const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
      this.http.post(url, refreshData).subscribe(response => {
        this.refreshTokenHandler(response);
      });
    }, (duration * 1000));
  }

  private refreshTokenHandler(response) {
    const formattedResp = JSON.parse(JSON.stringify(response));
    const authResponse = {
      accessToken: formattedResp.access_token,
      expiresIn: formattedResp.expires_in,
      idToken: formattedResp.id_token,
      refreshToken: formattedResp.refresh_token,
      localId: formattedResp.user_id,
      displayName: this.displayName
    };

    const token = authResponse.idToken;
    const expiresInDuration = authResponse.expiresIn;
    this.setAuthTimer(expiresInDuration);
    if (token) {
      this.configUserData(token, authResponse, expiresInDuration);
    }
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    displayName: string,
    refreshToken: string
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("displayName", displayName);
    localStorage.setItem("refreshToken", refreshToken);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("displayName");
    localStorage.removeItem("refreshToken");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const displayName = localStorage.getItem("displayName");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      userId: userId,
      expirationDate: new Date(expirationDate),
      displayName: displayName,
      refreshToken: refreshToken
    };
  }
}
