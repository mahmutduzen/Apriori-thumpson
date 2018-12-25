module.exports.Apriori = (onData, tumData, min_sup, min_conf, min_donus) => {
  let arr = []; // dizi oluşturulur.
  /*
      gönderilen onData dizisindeki elemanların hepsinin bulunduğu tumData indisleri arr dizisinde toplanır. 
   */
  funcDiziTanim = (onData, tumData) => {
    let found = 0;
    for (let i = 0; i < tumData.length; i++) {
      if (arrayContainsArray(tumData[i], onData)) {
        arr.push(tumData[i]);
      }
    }

    if (arr.length < min_donus) {
      if (onData.length >= 2) {
        onData.pop();
        funcDiziTanim(onData, tumData);
      }
    }
  };
  /*
      içerisinde onData daki elemanları bulunan diziyi geri döndürür.
  */
  arrayContainsArray = (superset, subset) => {
    if (0 === subset.length) {
      return false;
    }
    return subset.every(value => {
      return superset.indexOf(value) >= 0;
    });
  };
  funcDiziTanim(onData, tumData);

  const support = []; // her bir [i] için support değerlerini tutar.
  const toplamSon = []; //[i]'nin kaç kere tekrarlandığını sayar.
  const confidence = [], // confidence değerlerini tutar
    lift = []; //lift değerlerini tutar.
  let filterArr = []; //
  /* 
      onData değişkeninde gönderdiğimiz değerlere sahip indis arr'de varsa onları filterArr adıyla yeni oluşan diziye ekler.
  */
  for (let i = 0; i < arr.length; i++) {
    filterArr[i] = arr[i].filter(el => {
      return !onData.includes(el);
    });
  }

  /*
      FilterArr dizisinde tekrar eden değer varsa bunları siler ve filterArrFilter adıyla yeni diziye kaydeder.
  */
  const filterArrFilter = []; // yeni dizi
  for (let i = 0; i < filterArr.length; i++) {
    filterArrFilter[i] = filterArr[i].filter((v, i, a) => a.indexOf(v) === i);
  }
  /*
      filterArrFilter matrisindeki tekrar eden değerleri toplar
  */
  for (let i = 0; i < filterArrFilter.length; i++) {
    filterArrFilter[i].forEach(l => {
      toplamSon[l] = (toplamSon[l] || 0) + 1;
    });
  }

  /* toplamSon dizisinde null olarak dönmüş indisleri siler. */
  const filterToplamSon = toplamSon.filter(el => {
    return el != null;
  });
  /*
      arr matrisindeki tüm elemanları tumDiziTek adıyla yeni bir vektör dizide toplar.
  */
  let p = 0;
  const tumDiziTek = [];
  for (let i = 0; i < arr.length; i++) {
    for (let l = 0; l < arr[i].length; l++) {
      tumDiziTek[p] = arr[i][l];
      p++;
    }
  }
  /*
      tumDiziTek vektöründeki onData dizisinde geçen elemanları siler.
  */
  const tumDiziTekSon = tumDiziTek.filter(el => {
    return !onData.includes(el);
  });
  /*
      tumDiziTekSon dizisini küçükten büyüğe sıralar.
  */
  tumDiziTekSon.sort((a, b) => {
    return a - b;
  });
  /*
      lift hesaplanırken lazım olan toplamı bulmak için tumDiziTekSon dizisindeki tekrar eden elemanların kaç kere tekrarlandığını döndürür.
  */
  const ilkToplam = [];
  tumDiziTekSon.forEach(l => {
    ilkToplam[l] = (ilkToplam[l] || 0) + 1;
  });
  /*
      ilkToplamSon dizisinde null elemanlar ilkToplam dizisinden çıkartılmış olarak tutulur.
  */
  const ilkToplamSon = ilkToplam.filter(el => {
    return el != null;
  });

  /* 
      Dönecek Değerleri matrisden vektör haline çevirir.
  */
  let x = 0;
  const tekDiziFilterArr = [];
  for (let i = 0; i < filterArr.length; i++) {
    for (let l = 0; l < filterArr[i].length; l++) {
      tekDiziFilterArr[x] = filterArr[i][l];
      x++;
    }
  }
  /*
      oluşan matrisi tekrar eden elemanlarını siler.
  */
  const filtreData = tekDiziFilterArr.filter((v, i, a) => a.indexOf(v) === i);
  /*
      matrisi küçükten büyüğe sıralar.
  */
  filtreData.sort((a, b) => {
    return a - b;
  });

  /*
      filterTumData dizisinde tekrar eden değerleri toplar. böylelikle her varlık için toplam değeri bulunmuş olur.
  */
  /*const sonunSonu = [];
  filtreData.forEach(l => {
    sonunSonu[l] = (sonunSonu[l] || 0) + 1;
  });*/

  let toplamEylem = tumData.length; // onData dizisini barındıran indis sayısı.
  let ilkDataEylem = arr.length; // onData dizisini barındıran ve barındırmayan diziler.
  const DataD = []; //Dönecek Data Tutulur.
  /**
   *  min_sup ve min_conf değerlerini sağlayan değerler için hesaplamalar yapılır ve değerler geri döndürülür.
   */
  for (let i = 0; i < filtreData.length; i++) {
    if (filterToplamSon[i] / toplamEylem >= min_sup) {
      if (
        filterToplamSon[i] / toplamEylem / (ilkDataEylem / toplamEylem) >=
        min_conf
      ) {
        support[i] = filterToplamSon[i] / toplamEylem;
        confidence[i] = support[i] / (ilkDataEylem / toplamEylem);
        lift[i] = confidence[i] / (ilkToplamSon[i] / toplamEylem);
        DataD[i] = filtreData[i];
      }
    }
  }

  return {
    /*filterArr,
    filterArrFilter,
    ilkToplamSon,
    filterToplamSon,
    */ DataD,
    support,
    confidence,
    lift
  };
};
