module.exports.Sirala = (DataD, supportD, confidenceD, liftD) => {
  let yedekC = 0,
    yedekS = 0,
    yedekL = 0,
    yedekD = 0;
  let minIndex = 0;
  for (let i = 0; i < supportD.length; i++) {
    minIndex = i;
    for (let j = i; j < supportD.length; j++) {
      if (supportD[j] > supportD[minIndex]) {
        minIndex = j;
      }
    }
    yedekC = confidenceD[i];
    yedekS = supportD[i];
    yedekD = DataD[i];
    yedekL = liftD[i];
    confidenceD[i] = confidenceD[minIndex];
    supportD[i] = supportD[minIndex];
    DataD[i] = DataD[minIndex];
    liftD[i] = liftD[minIndex];
    confidenceD[minIndex] = yedekC;
    supportD[minIndex] = yedekS;
    DataD[minIndex] = yedekD;
    liftD[minIndex] = yedekL;
  }

  SiralaConfidence = (DataD, supportD, confidenceD, liftD) => {
    let yedekC = 0,
      yedekS = 0,
      yedekL = 0,
      yedekD = 0;
    let minIndex = 0;
    for (let i = 0; i < confidenceD.length; i++) {
      minIndex = i;
      for (let j = i; j < confidenceD.length; j++) {
        if (confidenceD[j] > confidenceD[minIndex]) {
          minIndex = j;
        }
      }
      yedekC = confidenceD[i];
      yedekS = supportD[i];
      yedekD = DataD[i];
      yedekL = liftD[i];
      confidenceD[i] = confidenceD[minIndex];
      supportD[i] = supportD[minIndex];
      DataD[i] = DataD[minIndex];
      liftD[i] = liftD[minIndex];
      confidenceD[minIndex] = yedekC;
      supportD[minIndex] = yedekS;
      DataD[minIndex] = yedekD;
      liftD[minIndex] = yedekL;
    }
  };
  SiralaConfidence(DataD, supportD, confidenceD, liftD);
  return { DataD, supportD, confidenceD, liftD };
};
