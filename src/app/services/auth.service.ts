import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

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
  private authListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
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
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        user
      )

  }

  login(email: string, password: string) {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

    this.http.post<any>(url, authData).subscribe(
      response => {
        this.loginHandler(response);
      },
      error => {
        this.authListener.next(false);
      }
    );
  }

  loginHandler(response) {
    const token = response.data.idToken;
    const expiresInDuration = response.data.expiresIn;
    this.setAuthTimer(expiresInDuration);
    this.token = token;
    if (token) {
      this.isAuthenticated = true;
      const now = new Date();
      this.userId = response.data.localId;
      /* Soma-se a expiração à data atual, em milisegundos */
      const expirationDate = new Date(
        now.getTime() + expiresInDuration * 1000
      );

      this.authListener.next(true);
      this.saveAuthData(token, expirationDate, this.userId);

    }
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/auth"]);
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
      this.setAuthTimer(
        expiresIn / 1000
      ); /* divide por 1000 pois depois ele multiplica, e já está em ms */
      this.authListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer:", duration);

    this.tokenTimer = setTimeout(() => {
      // Ao inves do logout, fazer uma nova requisicao com o refreshtoken
    }, duration * 1000);
  }

  /* Aqui é interessante passar um Date e não um número,
  que é um número relativo e não teremos uma ideia clara
  da data quando voltarmos no futuro */
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      userId: userId,
      expirationDate: new Date(expirationDate)
    };
  }
}
