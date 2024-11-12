// "use client";

import {
  getCloudStorageItem,
  setCloudStorageItem,
} from "@telegram-apps/sdk-react";
import PouchDB from "pouchdb-core";
import { DataStore, Mapper } from "js-data";
import PouchDBIdbAdapter from "pouchdb-adapter-idb";

const databaseName = "neuropunk_v1";

PouchDB.plugin(PouchDBIdbAdapter);
const database = new PouchDB(databaseName, {
  adapter: "idb",
  revs_limit: 1,
  auto_compaction: true,
});

database.info().then(async (info) => {
  console.log("info database", info);
  //   await database.destroy();
});

export const DataLayer = {
  putUser: async (id: number, data: Record<string, any>) => {
    const key = `user_${id}`;
    let doc;
    try {
      doc = await database.get(key);
    } catch (err) {
      console.warn(err);
    }
    return database.put({
      ...data,
      _id: key,
      ...(doc && {
        _rev: doc._rev,
      }),
    });
  },
  getUser: (id: number) => {
    try {
      const key = `user_${id}`;
      return database.get(key);
    } catch (err) {
      console.error(err);
    }
    return null;
  },
};

const DatalayerAdapter = {
  find: async (definition: Mapper, id: any, options: any) => {
    console.log("findtest", definition, id, options);
    const answer = await TelegramCloudStorage.get(`${definition.name}_${id}`);
    // const instance = definition.createInstance({ ...answer });
    // console.log("instance", instance);
    return answer;
  },
  update: async (definition: Mapper, id: any, attrs: any, options: any) => {
    console.log("updatetest", definition, id, attrs, options);
    const key = `${definition.name}_${id}`;
    const prevValue = await definition.find(key);
    console.log("prevValue", prevValue);
    const answer = await TelegramCloudStorage.put(key, {
      ...prevValue.toJSON(),
      ...attrs,
    });

    return answer;
  },
  create: async (definition: Mapper, attrs: any, options: any) => {
    console.log("createtest", definition, attrs, options);
    const answer = await TelegramCloudStorage.put(
      `${definition.name}_${id}`,
      attrs
    );

    return answer;
  },
};

// MyCustomAdapter.prototype.create = function (definition, attrs, options) {
//   // Must return a promise that resolves with the created item
// };

// MyCustomAdapter.prototype.find = function (definition, id, options) {
//   // Must return a promise that resolves with the found item
// };

// MyCustomAdapter.prototype.findAll = function (definition, params, options) {
//   // Must return a promise that resolves with the found items
// };

// MyCustomAdapter.prototype.update = function (definition, id, attrs, options) {
//   // Must return a promise that resolves with the updated item
// };

// MyCustomAdapter.prototype.updateAll = function (
//   definition,
//   attrs,
//   params,
//   options
// ) {
//   // Must return a promise that resolves with the updated items
// };

// MyCustomAdapter.prototype.destroy = function (definition, id, options) {
//   // Must return a promise
// };

// MyCustomAdapter.prototype.destroyAll = function (definition, params, options) {
//   // Must return a promise
// };

// const store = new DataStore({ debug: true });
// // console.log("LocalStorageAdapter", adapter);
// // const adapter = new LocalStorageAdapter();
// store.registerAdapter("custom", DatalayerAdapter, {
//   default: true,
//   debug: true,
// });

// export const UserMapper = store.defineMapper("user", {
//   debug: true,
// });
// console.log("UserMapper", UserMapper);
// const localStorageAdapter = new DSLocalStorageAdapter();
// console.log("localStorageAdapter", DSLocalStorageAdapter);
// store.registerAdapter("localstorage", localStorageAdapter, { default: true });

// console.log("store", store);

export const TelegramCloudStorage = {
  // Method to set an item in cloud storage
  put: (key: string, value: any) => {
    console.debug("[TelegramCloudStorage] put", `key=${key}`, value);
    return setCloudStorageItem(key, JSON.stringify(value));
  },

  // // Method to get an item from cloud storage
  get: async (key: string) => {
    const json = await getCloudStorageItem(key);
    console.debug("[TelegramCloudStorage] get", `key=${key}`, json);
    if (!json) return null;
    return JSON.parse(json);
  },

  // // Method to get multiple items by their keys
  // //   getItems(keys: string[]) {
  // //     return new Promise((resolve, reject) => {
  // //       this.storage.getItem(keys, (error, values) => {
  // //         if (error) {
  // //           reject(error);
  // //         } else {
  // //           resolve(values);
  // //         }
  // //       });
  // //     });
  // //   }

  // // Method to remove an item from cloud storage
  // remove(key: string) {
  //   return deleteCloudStorageItem(key);
  // }

  // //   // Method to remove multiple items by their keys
  // //   removeItems(keys) {
  // //     return new Promise((resolve, reject) => {
  // //       this.storage.removeItems(keys, (error, success) => {
  // //         if (error) {
  // //           reject(error);
  // //         } else {
  // //           resolve(success);
  // //         }
  // //       });
  // //     });
  // //   }

  // // Method to get all keys in cloud storage
  // getKeys: () => {
  //   return getCloudStorageKeys();
  // },
};
