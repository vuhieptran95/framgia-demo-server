const firebase = require("firebase");
const { Storage } = require("@google-cloud/storage");
const admin = require("firebase-admin");

var config = {
  apiKey: "AIzaSyCyd57bKmEOsDvKMg7D1SszpbLjsbx62sk",
  authDomain: "my-demo-f85d3.firebaseapp.com",
  databaseURL: "https://my-demo-f85d3.firebaseio.com",
  projectId: "my-demo-f85d3",
  storageBucket: "my-demo-f85d3.appspot.com",
  messagingSenderId: "855936794155"
};

var cloudStorageConfig = {
  type: "service_account",
  project_id: "my-demo-f85d3",
  private_key_id: "04ff933e83e7fb5c5cf9a1dd6bd99adbe6216d2c",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCSEMJxCCV1YE1C\ndsB5S/NpIUgVT3EPS0xt+SjaRVqUiabeVXLwyrnY3DY1zpg3Yy3fzdG5qiuSuJQH\n+PQZx1RwS/JM23W7Sl/J1cFNEmF1nrav2IihiB+u99Gy2WOj0G7uS8LWKa50P+JK\nbreow1+H1zdTQcxNXPo79z2uMBymBlxV1nfI3YnXBYM7anV9BkdEeh9RGfOcJjeo\nomcCuXWk32UUL7CRlXoJGLHQGE9eMeylWHeyM4pORZ1HHJ54i2uYQlt3wVVrdgLn\n1ZQ+pdv2XKOghHD9n68g1zU68ZQmRNk5F3/b7jezs+nWQxPecSE4tY6Ybapyqwol\nnSm0YwT5AgMBAAECggEACARx+8zP64ur6fZFNdM4quBYCc1ovgdqzE2FE8gDQwx0\nM5d6neNuxIu/0P/ERKQFwFdWh+uihSTrAS4FzgVuKdTNWbEhGvTn4ZcBS3bzEQbz\nbZ8DzuP/IzY4lSnQCY2XDS7s5J74k6pvBBlkLNf+fiEOyRvfOC7ekFyPjuhWpjk1\nbVRAgT3ZOOVHbDlmKxlMUEyZKspwM4hayo+ZkFeDd1jWTzeYgaEOCNeICaCrI+7W\ntRB0GdFY30Qt4/xLUZ3yA5OuxW9qpsaSGui+wAmmYl0vCCIGlwmF0eHPCoDvXzXO\nFKOmvb6Ga5dsJfNGlku9kAt9hz/gngwiRec4m8oF5QKBgQDBcagLUtj1HMWuZpi2\nw7RxLC7TvCRsUJMkFHWaIghbUh7e9vwqjqFs3pi7u4mCX9SW1cZ6Br4l45MTZbsX\nrwn3Cgl0eTe12Ng7QcG3fgrIjd0Z2Qh3CkSAN3YS+E9NIUldsvR9OuEfxKY1yTOj\n4YwfTbqOTV3A+v354TxyqRopjQKBgQDBTNpfC/lW4pmeml6bX2L+UHMvlg3+AFSx\n1ssrkUiOfjZqiJjCHNFPn8aejaGWUEJ+7v8FvtrXySXsGEWgMxQixF19/8B3y5qj\nqIID341UIdgFp+H56Rmvg7FOpTMkwsATAO8fETBhPmV8lip+1qxVkgUVaYukg3Qt\n9VA4uYGQHQKBgEE0mYtvmrhMwYm/BZ0drNY1KXevxKtKIb8YsmeJLz3xGXzYzjle\nKKW1BtDJL1nmCZfqaWO6oB/PbUUtlnouQ3KlTHiZX6EJfiHDUZQThXkC8NOEp+jQ\najS5/S/5yWlbXgqahvUrgrUdqVUaBDEqlvv6THcpNwAU2sV/GcwgmjQFAoGBALrj\nViIdDpZdgc8hSyUHZUuidqtkdeTFZx2GIWrfDXqPNodrx92tRQWp4bu8DaWptZDJ\n+5EPhMCqvtp0YSTRHb+7gPToR6rLFJj0u7eI9TiJfDWDqm0YXPgf6Fa0TC1XiaMV\n/RtZYCA01qRM/4sgfQBCrF2WbSfC3JnumwAtAsJVAoGBAKaJVNMQrlVB3nQG0toJ\nNXHIYqf6R6Or4atcKBmeJK+gz3tFUQE4qFXPlozvr2VA/WaEqim0MtkLL3AAgW/0\nlRHAEJh4ETvfyVVRqy7aCRHZgxvi+OQCT6HGnNJAUBV5n8ASpxAa2ZYJr4bDQmo9\nF/QVJCw752GzLJjul12M4gUT\n-----END PRIVATE KEY-----\n",
  client_email: "nodejsserver@my-demo-f85d3.iam.gserviceaccount.com",
  client_id: "105573433804193948428",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/nodejsserver%40my-demo-f85d3.iam.gserviceaccount.com"
};

firebase.initializeApp(config);

const settings = { timestampsInSnapshots: true };
const Db = firebase.firestore();
Db.settings(settings);

admin.initializeApp({
  credential: admin.credential.cert(cloudStorageConfig),
  storageBucket: "my-demo-f85d3.appspot.com",
  projectId: "my-demo-f85d3"
});

// const myStorage = admin.storage().bucket();

module.exports = { Db: Db, Bucket: admin.storage().bucket() };
// module.exports.bucket = admin.storage().bucket();
