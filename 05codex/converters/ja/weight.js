// 각 단위 1개에 해당하는 그램 값입니다. 온스와 파운드는 상용 단위입니다.
const gramsPerUnit = {
  mg: 0.001,
  g: 1,
  kg: 1000,
  t: 1000000,
  oz: 28.349523125,
  lb: 453.59237,
};

const inputs = Object.keys(gramsPerUnit).map((id) => document.getElementById(id));
const feedback = document.getElementById("feedback");
const numericPattern = /^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:e[+-]?\d+)?$/i;

function updateConversions(event) {
  const source = event.currentTarget;
  const rawValue = source.value.trim();
  const value = numericPattern.test(rawValue) ? Number(rawValue.replace(",", ".")) : NaN;
  const valid = Number.isFinite(value) && !rawValue.startsWith("-");
  let overflow = false;

  for (const input of inputs) {
    input.removeAttribute("aria-invalid");
    if (input === source) continue;

    const factor = gramsPerUnit[source.id] / gramsPerUnit[input.id];
    const result = value * factor;

    if (valid && Number.isFinite(result)) {
      // 유효숫자 15자리로 반올림하고 불필요한 끝자리 0을 제거합니다.
      input.value = String(Number(result.toPrecision(15)));
    } else {
      input.value = "";
      overflow ||= valid;
    }
  }

  if (rawValue && !valid) {
    source.setAttribute("aria-invalid", "true");
    feedback.textContent = "0 이상의 숫자를 입력해 주세요.";
  } else {
    feedback.textContent = overflow ? "일부 단위의 변환 결과가 표시 범위를 넘었습니다." : "";
  }
}

for (const input of inputs) {
  input.addEventListener("input", updateConversions);
}

document.getElementById("reset").addEventListener("click", () => {
  for (const input of inputs) {
    input.value = "";
    input.removeAttribute("aria-invalid");
  }
  feedback.textContent = "";
});
