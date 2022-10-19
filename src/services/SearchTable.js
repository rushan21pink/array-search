import {IndexedDB} from './IndexDB.js';

export class State {
  static dbName = 'stateDB';
  static dbVersion = 1;
  static storeName = 'state';
  static DB = null;
  static target = new EventTarget();
  static objectKey = 'arraySearch';
  static CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";


  constructor(observed, updateCallback) {
    this.updateCallback = updateCallback;
    this.observed = new Set(observed);
    this.arr = [];
    this.indexKey = 0;

    State.target.addEventListener('set', e => {
      if (this.updateCallback && this.observed.has(e.detail.name))
        this.updateCallback(e.detail.name, e.detail.value);
    });
  }


  async dbConnect() {
    State.DB = State.DB || await new IndexedDB(
      State.dbName,
      State.dbVersion,
      (db, oldVersion, newVersion) => {
        switch (oldVersion) {
          case 0: {
            db.createObjectStore(State.storeName);
          }
        }
      });
    return State.DB;
  }

  async set() {
    const value = this.arr.sort()
    this.arr = [];
    const name = State.objectKey + this.indexKey
    this.indexKey++

    this.observed.add(name);

    const db = await this.dbConnect();
    await db.set(State.storeName, name, value);

    const event = new CustomEvent('set', {detail: {name, value}});
    State.target.dispatchEvent(event);
  }


  async get(index) {
    this.observed.add(State.objectKey + index);
    const db = await this.dbConnect();

    return await db.get(State.storeName, State.objectKey + index);
  }

  async SetArr() {
    for (let i = 0; i < 1000; i++) {
      for (let j = 0; j < 10000; j++) {
        this.pushEl()
      }
      await this.set()
    }

  }

  pushEl() {
    this.arr.push(this.getRandomWord())
  }

  getRandomWord() {
    let text = ''
    for (let i = 0; i < 100; i++)
      text += State.CHARS.charAt(Math.floor(Math.random() * State.CHARS.length));
    return text;
  }

}
