import firebase from "firebase";

export default class Settings {
  constructor() {
    this.firebaseInit();
  }

  firebaseInit() {
    var config = {
      apiKey: "AIzaSyCWGzXonsUTZQL3LvdGvK1Bg-M9b7mOXig",
      authDomain: "plympics-scoreboard.firebaseapp.com",
      databaseURL: "https://plympics-scoreboard.firebaseio.com",
      projectId: "plympics-scoreboard",
      storageBucket: "plympics-scoreboard.appspot.com",
      messagingSenderId: "1041146103470"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    console.log(database);
  }
}
