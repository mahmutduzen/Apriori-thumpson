const PD = require("probability-distributions");
module.exports.Thombson = data => {
  let toplam = 0,
    secilenler = [],
    birler = Array(data[0].length).fill(0),
    sifirlar = Array(data[0].length).fill(0);
  let odul = 0;
  for (let i = 1; i < data.length; i++) {
    let yazi = 0,
      max_th = 0;
    for (let k = 0; k < data[0].length; k++) {
      let beta = PD.rbeta(1, birler[k] + 1, sifirlar[k] + 1);
      if (beta > max_th) {
        max_th = beta;
        yazi = k;
      }
    }
    secilenler.push(yazi);
    odul = data[i][yazi];
    if (odul == 1) {
      birler[yazi] = birler[yazi] + 1;
    } else {
      sifirlar[yazi] = sifirlar[yazi] + 1;
    }
    toplam = toplam + odul;
  }

  /*
      filterArrFilter matrisindeki tekrar eden değerleri toplar
  */
  const toplamSon = [];
  secilenler.forEach(l => {
    toplamSon[l] = (toplamSon[l] || 0) + 1;
  });
  /*
      ilkToplamSon dizisinde null elemanlar ilkToplam dizisinden çıkartılmış olarak tutulur.
  */
  const toplamDolu = toplamSon.filter(el => {
    return el != null;
  });
  const denemedizi = [];
  for (let i = 0; i < toplamDolu.length; i++) {
    denemedizi[i + 1] = toplamDolu[i];
  }
  denemedizi.sort();
  denemedizi.reverse();

  SiralaSec = (dizi, Dolu) => {
    const sonDeneme = [],
      secilens = [];
    let xSayac = 0;
    for (let i = 1; i < dizi.length; i++) {
      if (!secilens.includes(Dolu.indexOf(dizi[i]))) {
        sonDeneme.push(Dolu.indexOf(dizi[i]));
        secilens.push(Dolu.indexOf(dizi[i]));
      } else {
        if (!secilens.includes(Dolu.indexOf(dizi[i], i + xSayac))) {
          sonDeneme.push(Dolu.indexOf(dizi[i], i + xSayac));
          secilens.push(Dolu.indexOf(dizi[i], i + xSayac));
          xSayac++;
        }
      }
    }
    return sonDeneme;
  };

  const SiraliGelen = SiralaSec(denemedizi, toplamDolu);

  const SiraliGelenFilter = SiraliGelen.filter(el => {
    return el != -1;
  });

  if (SiraliGelenFilter.length < 6) {
    Thombson(data);
  }
  for (let i = 0; i < SiraliGelenFilter.length; i++) {
    SiraliGelenFilter[i] = SiraliGelenFilter[i] + 1;
  }

  return SiraliGelenFilter;
  /* toplam, birler, sifirlar */
};
