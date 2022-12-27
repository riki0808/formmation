const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
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

exports.getAnswersInfo = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth) {
      const { teamId } = data;

      const snapshotAnswers = await db
        .collection("formAnswers")
        .where("teamId", "==", teamId)
        .get();

      const answers = snapshotAnswers.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return {
        status: 200,
        res: answers,
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

      const snapshotForms = await db
        .collection("forms")
        .where("teamId", "==", teamId)
        .get();

      const forms = snapshotForms.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return {
        status: 200,
        res: forms,
        // anss: answers
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
      const { postData, formAnswersId } = data;

      await db.collection("formAnswers").doc(formAnswersId).set(postData);

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

function doMail(ans, step) {
  console.log("??????");
  const workflow = ans.workflowData.actions;
  const targetEmail = ans.email;
  console.log("誰宛てのメールだ？？→", targetEmail);
  const { senderAddress, body, footer, sender, subject } = workflow[step];
  console.log("送信者のアドレス", senderAddress);
  console.log("本文", body);
  console.log("署名", footer);
  console.log("件名", subject);
  // メールを送る
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: targetEmail,
    from: senderAddress,
    subject: subject,
    text: `${body}\n${footer}`,
    html: body,
  };
  console.log("メール送信だよおお");
  sgMail.send(msg);
  console.log("??????");
}

async function doDelay(ans, step) {
  const workflow = ans.workflowData.actions;
  // delayを進める
  let hours = Number(workflow[step].day * 24) + Number(workflow[step].hour);
  console.log("!!!!!");
  console.log("現在のhours→", hours);
  hours -= 1;
  console.log("hoursを-1→", hours);
  let day = Math.floor(hours / 24);
  let hour = hours % 24;
  // DBに保存する
  let workflowData = ans.workflowData;
  workflowData.actions[step].day = day;
  workflowData.actions[step].hour = hour;
  await db.collection("formAnswers").doc(ans.id).update({
    workflowData: workflowData,
  });
  if (hours > 0) {
    console.log("hoursが0より大きかったからtrue(現在のhours→", hours);
    console.log("!!!!!");
    return true;
  }
  console.log("hoursが0より小さかったからfalse(現在のhours→", hours);
  console.log("!!!!!");
  return false;
}

async function doStep(ans, step) {
  const workflow = ans.workflowData.actions;
  if (step >= workflow.length) return;

  let isDelay = false;
  console.log("isDelayの初期値", isDelay);

  if (workflow[step].action == "start") {
    console.log("actionがstartの時(ちなみに現在のstepは→)", step);
    step += 1;
    console.log("actionがstartのstep増加(増加後→)", step);
  } else if (workflow[step].action == "delay") {
    // delayの処理をする関数
    console.log("actionがdelayの時(ちなみに現在のstepは→)", step);
    isDelay = await doDelay(ans, step);
    console.log("doDelayの結果現在のisDelay→", isDelay);

    if (!isDelay) {
      console.log("isDleayがfalseやったから発火、現在のisDelay→", isDelay);
      step += 1;
      console.log("isDleayがfalseやったからstep増加→", step);
    }
  } else if (workflow[step].action == "mail") {
    console.log("actionがmailの時(ちなみに現在のstepは→)", step);
    doMail(ans, step);
    step += 1;
    console.log("actionがmailのstep増加(増加後→)", step);
  }

  console.log("------");
  console.log("------");
  console.log("------");
  console.log("doStepの現在のstepは→", step);
  console.log("workflow.lengthの数値は→", workflow.length);
  // ここら辺に終了の条件を書く;
  if (isDelay) return;
  console.log("isDelayがfalseだった(現在のisDelay→", isDelay);

  console.log("ここまできたのでstepをDBに書き込んでいこう", step);
  //stepをDBに上書き
  await db.collection("formAnswers").doc(ans.id).update({ step: step });
  if (step >= workflow.length) return;
  console.log("stepがworkflow.lengthより小さかった(現在のstep→", step);

  console.log("じゃあもう一回doStep関数行ってみよう(現在のstep→", step);

  console.log("------");
  console.log("------");
  console.log("------");
  doStep(ans, step);
}

exports.onProcessObserver = functions
  .runWith({ memory: "2GB", timeoutSeconds: 90 })
  .pubsub.schedule("0 * * * *")
  .timeZone("Asia/Tokyo")
  .onRun(async (data, context) => {
    // まず、未処理の送信データを全て取得する
    // for文で全てのデータを見ていく
    // switchとかの条件分けで実行する関数を切り替える
    const ansSnapshots = await db.collection("formAnswers").get();
    // 全てのformAnswerデータにidを追加させる
    const anss = ansSnapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    for (const ans of anss) {
      let step = ans.step;
      doStep(ans, step);
    }
    return {
      status: 200,
      success: true,
    };
  });
