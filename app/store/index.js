import { db } from "~/plugins/firebase";

export const state = () => ({
  user: null,
});
//stateでデータを設定します。月別での記事を検索する前は月は選ばれていないのでnullと設定しました。

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};
//setSelectedDay(state, selectedDay) の第1引数で状態（state）を取得します。
//第2引数でselectedDayの値をstate（情報源）に渡します。ここでは例えばselectedDayを４月とします。
//すると、setSelectedDay(state, selectedDay) {}の中身では
//selectedDayがnullだったものを４月とデータを更新していることになります（state.selectedDay = selectedDayがそれ）。

export const actions = {
  async initializeUser({ commit }, userId) {
    const doc = await db.collection("users").doc(userId).get();
    const data = doc.data();
    commit("setUser", { uid: userId, ...data });
  },
  //setSelectedDay({ commit }, selectedDay)の第1引数でmutationsとcommitします。
  //Actions は、状態は変更せず、 Mutations を commitし、Mutations を commit することで状態(State)を更新します。：引用（参考記事/[Vue.js] Vuexの使い方を知る）
  //commit('setSelectedDay', selectedDay)では、第１引数に呼び出す関数の名前を入れてます。
  //第２引数では該当mutationsで使用する値（selectedDay）をいれています。
};
