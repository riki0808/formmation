const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const {
  firestoreJoin2ArrayRef,
  firestoreJoin2Array,
  firestoreJoin2ArrayRefSingle,
} = require("./v-join");

const auth = admin.auth();
const db = admin.firestore();

exports.createTeamAccount = functions.https.onRequest(
  async (request, response) => {
    const { body } = request;
    const { email, password, sei, mei, teamName } = body;

    const user = await auth.createUser({
      email: email,
      password: password,
    });

    await db.collection("users").doc(user.uid).set({
      email: email,
      sei: sei,
      mei: mei,
    });

    const teamDoc = await db.collection("teams").add({
      name: teamName,
      users: [user.uid],
    });

    await db.collection("users").doc(user.uid).update({
      teamId: teamDoc.id,
    });

    response.send("OK");
  }
);

exports.getTeamInfo = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { teamId } = data;

      const ref = db.collection("teams").doc(teamId);

      const res = await firestoreJoin2ArrayRefSingle(
        ref,
        "users",
        "users",
        "id"
      );

      return {
        status: 200,
        res: res,
      };
    } else {
      throw new functions.https.HttpsError("permission-denied", "Auth Error");
    }
  } catch (err) {
    console.log(err);
    return {
      status: 999,
      error: err,
    };
  }
});

exports.addUser2Team = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { teamId, email, password, sei, mei } = data;

      const user = await auth.createUser({
        email: email,
        password: password,
      });

      await db.collection("users").doc(user.uid).set({
        email: email,
        sei: sei,
        mei: mei,
        teamId: teamId,
      });

      await db
        .collection("teams")
        .doc(teamId)
        .update({
          users: admin.firestore.FieldValue.arrayUnion(user.uid),
        });

      return {
        status: 200,
      };
    } else {
      throw new functions.https.HttpsError("permission-denied", "Auth Error");
    }
  } catch (err) {
    console.log(err);
    return {
      status: 999,
      error: err,
    };
  }
});

exports.deleteUserFromTeam = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { teamId, userId } = data;

      const promises = [];

      promises.push(db.collection("users").doc(userId).delete());
      promises.push(
        db
          .collection("teams")
          .doc(teamId)
          .update({
            users: admin.firestore.FieldValue.arrayRemove(userId),
          })
      );
      promises.push(auth.deleteUser(userId));

      await Promise.all(promises);

      return {
        status: 200,
      };
    } else {
      throw new functions.https.HttpsError("permission-denied", "Auth Error");
    }
  } catch (err) {
    console.log(err);
    return {
      status: 999,
      error: err,
    };
  }
});
