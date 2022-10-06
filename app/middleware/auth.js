export default function ({ app, redirect, store, route }) {
  if (!store.state.user) {
    if (route.path !== "/login") {
      redirect("/login");
    }
  }
}
