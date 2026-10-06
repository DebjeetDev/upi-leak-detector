/* ============================================================
   Debjeet ka reduce practice — STAGE 1 se 4 tak
   (Updated 6 Oct 2026)
   ============================================================ */

const upi = [
  ["05 Oct", "Zomato", "240"],
  ["05 Oct", "Netflix", 499],
  ["06 Oct", "Swiggy", 180],
  ["06 Oct", "Chai Shop", 30],
  ["07 Oct", "Amazon", 2499],
  ["07 Oct", "Chai Shop", 25],
];

function cleanArray(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.reduce((acc, cur) => {
    if (!Array.isArray(cur)) return acc;          // 1st check: Array
    const amount = Number(cur[2]);                // 2nd: string→number
    if (!Number.isFinite(amount)) return acc;     // 3rd: garbage hatao
    acc.push([cur[0], cur[1], amount]);
    return acc;
  }, []);
}

function sumAll(numberArray) {
  if (!Array.isArray(numberArray)) {
    return { ok: false, status: 400, error: "Input must be a valid array!" };
  }
  const total = numberArray.reduce((acc, cur) => {
    if (!Number.isFinite(cur)) return acc;
    return acc + cur;
  }, 0);
  return { ok: true, status: 200, data: total };
}

function getTotalSpend(rows) {
  if (!Array.isArray(rows)) {
    return { ok: false, status: 400, error: "Input must be a valid array!" };
  }
  const total = rows.reduce((acc, cur) => {
    if (!Array.isArray(cur)) return acc;
    if (!Number.isFinite(cur[2])) return acc;
    return acc + cur[2];
  }, 0);
  return { ok: true, status: 200, data: total };
}

function getCount(rows) {
  if (!Array.isArray(rows)) {
    return { ok: false, status: 400, error: "Input must be a valid array!" };
  }
  const count = rows.reduce((acc) => acc + 1, 0);
  return { ok: true, status: 200, data: count };
}

function getBiggestSpend(rows) {
  if (!Array.isArray(rows)) {
    return { ok: false, status: 400, error: "Input must be a valid array!" };
  }
  const biggest = rows.reduce((acc, cur) => {
    if (!Array.isArray(cur)) return acc;
    if (!Number.isFinite(cur[2])) return acc;
    return cur[2] > acc ? cur[2] : acc;
  }, 0);
  return { ok: true, status: 200, data: biggest };
}

function getSmallSpendTotal(rows) {
  if (!Array.isArray(rows)) {
    return { ok: false, status: 400, error: "Input must be a valid array!" };
  }
  const total = rows.reduce((acc, cur) => {
    if (!Array.isArray(cur)) return acc;
    if (!Number.isFinite(cur[2])) return acc;
    return cur[2] < 100 ? acc + cur[2] : acc;
  }, 0);
  return { ok: true, status: 200, data: total };
}

function getSmallSpendCount(rows) {
  if (!Array.isArray(rows)) {
    return { ok: false, status: 400, error: "Input must be a valid array!" };
  }
  const count = rows.reduce((acc, cur) => {
    if (!Array.isArray(cur)) return acc;
    if (!Number.isFinite(cur[2])) return acc;
    return cur[2] < 100 ? acc + 1 : acc;
  }, 0);
  return { ok: true, status: 200, data: count };
}

function buildSpendReport(rows) {
  if (!Array.isArray(rows)) {
    return {
      status: 400,
      ok: false,
      error: "input must be an array!",
    };
  }
  const cleanData = cleanArray(rows);

  const totalResult = getTotalSpend(cleanData);
  const countResult = getCount(cleanData);
  const biggestResult = getBiggestSpend(cleanData);
  const smallTotalResult = getSmallSpendTotal(cleanData);
  const smallCountResult = getSmallSpendCount(cleanData);
  
  let total = totalResult?.data ;
  let count = countResult?.data ;
  let biggest= biggestResult?.data;
  let smallTotal=smallTotalResult?.data;
  let smallCount=smallCountResult?.data

    let average = 0;
  if (count > 0) {
    average = Math.round((total / count) * 100) / 100;
  }

  return{
    status: 200,
    ok: true,
    data: {
      total,
      count,     
      biggest,          
      smallTotal,         
      smallCount,      
      average,     
    }
  }
}

console.log(buildSpendReport(upi))