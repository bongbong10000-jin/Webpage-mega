// 각 단위 1개에 해당하는 미터 값
const metersPerUnit = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  inch: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};

const inputs = Object.keys(metersPerUnit).map((unit) => document.getElementById(unit));
const numericPattern = /^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:e[+-]?\d+)?$/i;

function updateConversions(event) {
  const source = event.currentTarget;
  const rawValue = source.value.trim();
  const value = numericPattern.test(rawValue) ? Number(rawValue.replace(",", ".")) : NaN;

  for (const input of inputs) {
    if (input === source) continue;

    const factor = metersPerUnit[source.id] / metersPerUnit[input.id];
    const converted = value * factor;

    // 유효숫자 15자리로 반올림하고 불필요한 끝자리 0을 제거합니다.
    input.value = Number.isFinite(converted)
      ? String(Number(converted.toPrecision(15)))
      : "";
  }
}

for (const input of inputs) {
  input.addEventListener("input", updateConversions);
}

document.getElementById("reset").addEventListener("click", () => {
  for (const input of inputs) {
    input.value = "";
  }
});
