function recommender(ratings, user) {
  function dotproduct(a, b) {
    var n = 0,
      lim = Math.min(a.length, b.length);
    for (var i = 0; i < lim; i++) n += a[i] * b[i];
    return n;
  }

  function norm2(a) {
    var sumsqr = 0;
    for (var i = 0; i < a.length; i++) sumsqr += a[i] * a[i];
    return Math.sqrt(sumsqr);
  }

  function similarity(x, y) {
    var xnorm = norm2(x);
    if (!xnorm) return 0;
    var ynorm = norm2(y);
    if (!ynorm) return 0;
    return dotproduct(x, y) / (xnorm * ynorm);
  }
  console.table(ratings);
  const ujung = ratings[ratings.length - 1][1] + 1;
  const originalMatrix = [];
  for (let row of ratings) {
    const u = row[1];
    const i = row[0];
    const rating = row[2];
    originalMatrix[i] = originalMatrix[i] || new Array(ujung).fill(null);
    originalMatrix[i][u] = rating;
  }

  console.table(originalMatrix);

  const normalizedMatrix = [];
  const normalizes = [];
  for (let u = 0; u < originalMatrix[0].length; u++) {
    let total = 0;
    let sum = 0;
    for (let i = 0; i < originalMatrix.length; i++) {
      if (originalMatrix[i][u] !== null) {
        total++;
        sum += originalMatrix[i][u];
      }
    }

    const normalize = sum / total;
    normalizes[u] = normalize;

    for (let i = 0; i < originalMatrix.length; i++) {
      normalizedMatrix[i] = normalizedMatrix[i] || [];
      if (originalMatrix[i][u] !== null) {
        normalizedMatrix[i][u] = originalMatrix[i][u] - normalize;
      } else {
        normalizedMatrix[i][u] = 0;
      }
    }
  }

  //console.log(normalizes);
  console.table(normalizedMatrix);

  const similarityMatrix = [];
  for (let ua = 0; ua < normalizedMatrix[0].length; ua++) {
    const uav = [];
    for (let i = 0; i < normalizedMatrix.length; i++) {
      uav[i] = normalizedMatrix[i][ua];
    }

    for (let ub = 0; ub < normalizedMatrix[0].length; ub++) {
      const ubv = [];
      for (let i = 0; i < normalizedMatrix.length; i++) {
        ubv[i] = normalizedMatrix[i][ub];
      }

      similarityMatrix[ua] = similarityMatrix[ua] || [];
      similarityMatrix[ua][ub] = similarity(uav, ubv);
    }
  }

  console.table(similarityMatrix);

  const k = 2;
  const predictNormalizedMatrix = [...normalizedMatrix];
  for (let i = 0; i < normalizedMatrix.length; i++) {
    for (let u = 0; u < normalizedMatrix[i].length; u++) {
      if (normalizedMatrix[i][u] === 0) {
        //			console.log('--------------------------')
        //			console.log('missing u' + u + '.i' + i)
        const similarities = {};
        for (let uv = 0; uv < normalizedMatrix[i].length; uv++) {
          if (normalizedMatrix[i][uv] !== 0) {
            //					console.log('had u' + u + ' vs u' + uv + ' = ' + similarityMatrix[u][uv])

            similarities[u + "." + uv] = similarityMatrix[u][uv];
          }
        }

        //			console.log('similarities', similarities)

        const nearSimilarities = {};
        let currentTotalSimilarities = 0;
        while (currentTotalSimilarities < k) {
          let maxKey = Object.keys(similarities)[0];
          let max = similarities[maxKey];

          //				console.log('init max = ' + maxKey + ' => ' + max)

          for (let vs in similarities) {
            //					console.log('-> checking ' + vs + ' => ' + similarities[vs], vs !== maxKey, Object.keys(nearSimilarities).indexOf(vs) === -1, similarities[vs] > max)
            if (
              vs !== maxKey &&
              Object.keys(nearSimilarities).indexOf(vs) === -1 &&
              similarities[vs] > max
            ) {
              //						console.log('--> good')

              maxKey = vs;
              max = similarities[maxKey];
            }
          }

          nearSimilarities[maxKey] = max;
          currentTotalSimilarities++;
          delete similarities[maxKey];
        }

        //			console.log(nearSimilarities)
        const normalizedRatings = {};
        for (let vs in nearSimilarities) {
          const u = vs.split(".")[1];
          normalizedRatings[nearSimilarities[vs]] = normalizedMatrix[i][u];
        }

        let total = 0;
        let sum = 0;
        for (let similarity in normalizedRatings) {
          const rating = normalizedRatings[similarity];
          total += Math.abs(similarity);
          sum += similarity * rating;
        }

        const normalizedPredictRating = sum / total;
        predictNormalizedMatrix[i][u] = normalizedPredictRating;
      }
    }
  }

  console.table(predictNormalizedMatrix);

  const predictMatrix = [...predictNormalizedMatrix];
  for (let i = 0; i < predictNormalizedMatrix.length; i++) {
    for (let u = 0; u < predictNormalizedMatrix[i].length; u++) {
      predictMatrix[i][u] += normalizes[u];
    }
  }

  console.table(predictMatrix);
  const arrayColumn = (arr, n) => arr.map((x) => x[n]);
  console.log(arrayColumn(predictMatrix, user))
  return arrayColumn(predictMatrix, user);
}
function giveid(ratings) {
  var userid = new Array();
  var ids = 0;
  for (var i = 0; i < ratings.length; i++) {
    if (i === 0) {
      userid.push([ratings[i][1], ids]);
    } else {
      if (ratings[i][1] !== ratings[i - 1][1]) {
        ids = ids + 1;
        userid.push([ratings[i][1], ids]);
      } else {
        userid.push([ratings[i][1], ids]);
      }
    }
  }
  return userid;
}
function nratings(ratings) {
  var newratings = new Array();
  var nrids = 0;
  for (var i = 0; i < ratings.length; i++) {
    if (i === 0) {
      newratings.push([ratings[i][0], nrids, ratings[i][2]]);
    } else {
      if (ratings[i][1] !== ratings[i - 1][1]) {
        nrids = nrids + 1;
        newratings.push([ratings[i][0], nrids, ratings[i][2]]);
      } else {
        newratings.push([ratings[i][0], nrids, ratings[i][2]]);
      }
    }
  }
  return newratings;
}
function users(owner, userid) {
  for (var j = 0; j < userid.length; j++) {
    if (owner === userid[j][0]) {
      return userid[j][1];
    }
  }
}

function namabarang(nratings, databarang) {
  var namabarang = new Array();
  for (var k = 0; k < nratings.length; k++) {
    for (var l = 0; l < databarang.length; l++) {
      if (nratings[k][0] === databarang[l][1]) {
        namabarang.push([databarang[l][0], nratings[k][1], nratings[k][2]]);
      }
    }
  }
  return namabarang;
}

function namaid(toprec, databarang) {
  var namaid = new Array();
  for (var k = 0; k < toprec.length; k++) {
    for (var l = 0; l < toprec.length; l++) {
      if (toprec[k][0] === databarang[l][0]) {
        namaid.push([databarang[l][1], toprec[k][0], toprec[k][1]]);
      }
    }
  }
  return namaid;
}

function topn(ratings, barang, owner) {
  ratings.sort((a, b) => a[1].localeCompare(b[1]));
  console.log(ratings);

  var userid = giveid(ratings);
  var user = users(owner, userid);
  var newratings = nratings(ratings);

  console.log(userid);
  console.log(user);
  console.log(newratings);

  console.log(barang);
  var idbarang = namabarang(newratings, barang);
  console.log(idbarang);

  var ratingresult = recommender(idbarang, user);
  console.log(ratingresult)
  var topnrec = new Array();
  for (var f = 0; f < ratingresult.length; f++) {
    topnrec.push([f, ratingresult[f]]);
  }
  topnrec = topnrec.sort((a, b) => b[1] - a[1]);
  return namaid(topnrec, barang);
}

export { recommender, giveid, users, nratings, namabarang, topn };
