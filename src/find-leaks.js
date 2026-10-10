// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

function findLeaks(bills) {
  if (!Array.isArray(bills)) {
    return {
      status: 400,
      ok: false,
      error: "input bills must be an array",
    };
  }
  // Step 1: Clean invalid rows
  const cleanArray = bills.reduce((acc, cur) => {
    if (!Array.isArray(cur)) return acc;
    if (
      typeof cur[0] !== "string" ||
      cur[0].trim() === "" ||
      typeof cur[1] !== "string" ||
      cur[1].trim() === ""
    ) {
      return acc;
    }

    if (typeof cur[2] !== "number" || !Number.isFinite(cur[2])) {
      return acc;
    }

    acc.push([cur[0], cur[1], cur[2]]);
    return acc;
  }, []);

  const pairCounts = cleanArray.reduce((acc, bill) => {
    const name = bill[1];
    const amount = bill[2];

    const key = JSON.stringify([name, amount]);
    console.log("key is", key);
    acc[key] = (acc[key] || 0) + 1;
    console.log("acc is", acc);
    return acc;
  }, {});

  const seen = new Set();

  const data = cleanArray.reduce((acc, bill) => {
    const name = bill[1];
    const amount = bill[2];

    const key = JSON.stringify([name, amount]);

    if (pairCounts[key] >= 3 && !seen.has(key)) {
      acc.push([name, amount]);
      seen.add(key);
    }

    return acc;
  }, []);

  // Step 4: Return final response
  return {
    status: 200,
    ok: true,
    data,
    leaksCount: data.length,
  };
}

const bills = [
  ["Sep", "Netflix", 499],
  ["Sep", "Spotify", 119],
  ["Sep", "Gym", 800],
  ["Oct", "Netflix", 499],
  ["Oct", "Spotify", 119],
  ["Oct", "Gym", 800],
  ["Oct", "Prime", 1499],
  ["Nov", "Netflix", 499],
  ["Nov", "Gym", 800],
  ["Nov", "Hotstar", 899],
];

let data = findLeaks(bills);
console.log(data);
