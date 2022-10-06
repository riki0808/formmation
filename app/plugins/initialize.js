import { auth } from "~/plugins/firebase";

export default async ({ store, route, app }) => {
  // console.log("[plugin/init]");
  //Authの生成を待つ
  let user = await new Promise((resolve, reject) => {
    auth.onAuthStateChanged(async (user) => resolve(user));
  });

  if (user) {
    const doc = await app.$firestore.collection("users").doc(user.uid).get();
    const data = doc.data();
    await store.dispatch("setUser", data);
  }
};
