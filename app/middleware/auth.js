export default function ({ app, redirect, store, route }) {
  if (!store.state.user) {
    if (route.path !== "/login") {
      redirect("/login");
    }
  }

  app.$fireAuth.onAuthStateChanged(async (user) => {
    if (!user) {
      if (route.path !== "/login") {
        redirect("/login");
      }
    }
  });
}
