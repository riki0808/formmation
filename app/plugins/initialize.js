import { auth } from "~/plugins/firebase";

export default async ({ store, route, app, redirect }) => {
  // console.log("[plugin/init]");
  //Authの生成を待つ
  let user = await new Promise((resolve, reject) => {
    auth.onAuthStateChanged(async (user) => {
      resolve(user);
    });
  });

  if (user) {
    await store.dispatch("initializeUser", user.uid);
    // console.log(user);
  }
};
