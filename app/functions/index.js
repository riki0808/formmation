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
        ref, //データをjoinするドキュメントのリファレンス
        "users", //データをjoinして欲しいIDが配列として格納されているフィールドの名前
        "users", //joinしたいコレクションの名前
        "id" //IDが格納されているフィールドの名前
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

exports.getUser = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { userId } = data;

      const doc = await db.collection("users").doc(userId).get();
      const user = doc.data();

      return {
        status: 200,
        res: user,
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

exports.updateUser = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { userId, sei, mei } = data;

      await db.collection("users").doc(userId).update({
        sei: sei,
        mei: mei,
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

exports.addForms = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { formId, postData, inputForms, inputFormId } = data;

      await db.collection("forms").doc(formId).set(postData);

      if (inputFormId) {
        await db.collection("inputForms").doc(inputFormId).set(inputForms);
      }

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

exports.addInputForms2Forms = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { postData, inputFormId } = data;

      await db.collection("inputForms").doc(inputFormId).set(postData);

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

exports.updateInputForms = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { inputFormId, postData } = data;

      await db
        .collection("inputForms")
        .doc(inputFormId)
        .update({
          ...postData,
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

exports.addCompleteForms2Forms = functions.https.onCall(
  async (data, context) => {
    try {
      if (context.auth) {
        const { postData, completeFormId } = data;

        await db.collection("completeForms").doc(completeFormId).set(postData);

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
  }
);

exports.updateCompleteForms = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { completeFormId, postData } = data;

      await db
        .collection("completeForms")
        .doc(completeFormId)
        .update({
          ...postData,
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

exports.addWorkflows2Forms = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { postData, workflowId } = data;

      await db.collection("workflows").doc(workflowId).set(postData);

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

exports.updateCompleteForms = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { completeFormId, postData } = data;

      await db
        .collection("completeForms")
        .doc(completeFormId)
        .update({
          ...postData,
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

exports.updateWorkflows = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { workflowId, postData } = data;

      await db
        .collection("workflows")
        .doc(workflowId)
        .update({
          ...postData,
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

exports.getForm = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      // formsのデータを取得
      const { formId } = data;
      const doc = await db.collection("forms").doc(formId).get();
      let form = doc.data();

      // inputFormsのデータを取得
      const inputDoc = await db
        .collection("inputForms")
        .doc(form.inputFormId)
        .get();
      const inputForm = inputDoc.data();
      if (inputForm) {
        form["inputForm"] = inputForm;
      }

      // completeFormsのデータを取得
      const completeDoc = await db
        .collection("completeForms")
        .doc(form.completeFormId)
        .get();
      const completeForm = completeDoc.data();
      if (completeForm) {
        form["completeForm"] = completeForm;
      }

      const workflowDoc = await db
        .collection("workflows")
        .doc(form.workflowId)
        .get();
      const workflow = workflowDoc.data();
      if (workflow) {
        form["workflow"] = workflow;
      }

      // console.log(form);

      return {
        status: 200,
        res: form,
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

exports.getFormInfo = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { teamId } = data;

      const snapshot = await db
        .collection("forms")
        .where("teamId", "==", teamId)
        .get();

      // console.log("snapshot", snapshot);
      // console.log("snapshot.docs", snapshot.docs[0]);

      const forms = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      return {
        status: 200,
        res: forms,
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

exports.deleteForm = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { formId } = data;

      const formsDoc = await db.collection("forms").doc(formId).get();
      const forms = formsDoc.data();

      await db.collection("forms").doc(formId).delete();
      await db.collection("inputForms").doc(forms.inputFormId).delete();
      await db.collection("completeForms").doc(forms.completeFormId).delete();
      await db.collection("workflows").doc(forms.workflowId).delete();

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

exports.updateFormTitle = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { formId, title } = data;

      await db.collection("forms").doc(formId).update({
        title: title,
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

// 顧客管理用
exports.getInputFormsItem = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { formId } = data;

      const doc = await db.collection("forms").doc(formId).get();
      let form = doc.data();

      // inputFormsのデータを取得
      const inputDoc = await db
        .collection("inputForms")
        .doc(form.inputFormId)
        .get();
      const inputForm = inputDoc.data();

      return {
        status: 200,
        res: inputForm,
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

// form送信時のapi

exports.addFormAnswers = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { postData } = data;

      await db.collection("formAnswers").add(postData);

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
