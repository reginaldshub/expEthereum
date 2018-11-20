import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  dbpush(newAccounts){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/addAccount', newAccounts, {headers: headers})
    .map(res => res.json());
  }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
    .map(res => res.json());
  }

  getBalance(useraccount){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/balance', useraccount, {headers: headers})
    .map(res => res.json());
  }

  getTransaction(useraccount){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/transaction', useraccount, {headers: headers})
    .map(res => res.json());
  }

  createAccount(data){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/createAccount', data, {headers: headers})
    .map(res => res.json());
  }

  checkConnection(){
    let headers = new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken);
  headers.append('Content-Type', 'application/json');
  return this.http.get('http://localhost:3000/users/isConnected', {headers: headers})
  .map(res => res.json());
  }

 getAccount(){
  let headers = new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken);
  headers.append('Content-Type', 'application/json');
  return this.http.get('http://localhost:3000/users/getAccounts', {headers: headers})
  .map(res => res.json());
 }

 getLocalBalance(address){
  let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/localbalance', address, {headers: headers})
    .map(res => res.json());
 }

 sendTransaction(transaction){
  let headers = new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken);
  headers.append('Content-Type', 'application/json');
  return this.http.post('http://localhost:3000/users/localtransaction', transaction, {headers: headers})
  .map(res => res.json());
 }

 pendingTransaction(){
  let headers = new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken);
  headers.append('Content-Type', 'application/json');
  return this.http.get('http://localhost:3000/users/pendingTransaction', {headers: headers})
  .map(res => res.json());
 }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
    .map(res => res.json());
  }

  localTransactionList(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/localTransactionList', {headers: headers})
    .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  storeUserData(token, user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}