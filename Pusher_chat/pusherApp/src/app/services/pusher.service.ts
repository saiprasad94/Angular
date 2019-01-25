import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  private _pusher: any;

  constructor() {  
    this._pusher = new Pusher('f3ec9890bc8a661ffbfe', {
    cluster: 'us2',
    encrypted: true
  });
}

getPusher() {
  return this._pusher;
}
}
