const admin = require("firebase-admin");
const db = admin.firestore();

/**
 * 配列 arr を n 個ずつに分けて返す
 **/
function divideArrIntoPieces(arr, n) {
  var arrList = [];
  var idx = 0;
  while (idx < arr.length) {
    arrList.push(arr.splice(idx, idx + n));
  }
  return arrList;
}

exports.firestoreJoin2Array = firestoreJoin2Array;
async function firestoreJoin2Array(
  originDatas,
  originField,
  joinColName,
  joinTermsField
) {
  let keys = [];
  for (const originData of originDatas) {
    keys = [...keys, ...originData[originField]];
  }

  keys = [...new Set(keys)];
  keys = divideArrIntoPieces(keys, 10);

  let joinDatas = [];
  const promises = [];

  for (const key of keys) {
    promises.push(
      db
        .collection(joinColName)
        .where(
          joinTermsField == "id"
            ? admin.firestore.FieldPath.documentId()
            : joinTermsField,
          "in",
          key
        )
        .get()
    );
  }

  await Promise.all(promises).then((snapshots) => {
    for (const snapshot of snapshots) {
      let tmpDatas = snapshot.docs.map((doc) => {
        let data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      joinDatas = [...joinDatas, ...tmpDatas];
    }
  });

  for (let origin of originDatas) {
    let tmpJoin = {};
    for (let item of origin[originField]) {
      let fieldName = item;
      for (const joinData of joinDatas) {
        if (joinData[joinTermsField] == item) {
          tmpJoin[fieldName] = joinData;
        }
      }
    }
    origin[originField] = tmpJoin;
  }

  return originDatas;
}

exports.firestoreJoin2ArrayRef = async (
  originColRef,
  originField,
  joinColName,
  joinTermsField
) => {
  const originSnapshot = await originColRef.get();

  let originDatas = originSnapshot.docs.map((doc) => {
    let data = doc.data();
    data["id"] = doc.id;
    return data;
  });

  return firestoreJoin2Array(
    originDatas,
    originField,
    joinColName,
    joinTermsField
  );
};

exports.firestoreJoin2ArrayRefSingle = async (
  originColRef,
  originField,
  joinColName,
  joinTermsField
) => {
  const doc = await originColRef.get();

  let data = doc.data();
  data["id"] = doc.id;

  const res = await firestoreJoin2Array(
    [data],
    originField,
    joinColName,
    joinTermsField
  );
  return res[0];
};
