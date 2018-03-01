export function merge(...objects) {
  return Object.assign({}, ...objects);
}

export function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

export function renderDiff(title, diff) {
  console.group(title);

  const colors = {
    E: "#6a67ce",
    N: "#3be8b0",
    D: "#fc636b",
    A: "#ffb900"
  };

  const render = elem => {
    const { kind, path, lhs, rhs, index, item } = elem;

    switch (kind) {
      case "E":
        return `${path.join(".")} ${lhs} → ${rhs}`;
      case "N":
        return `${path.join(".")} ${rhs}`;
      case "D":
        return `${path.join(".")}`;
      case "A":
        return [`${path.join(".")}[${index}]`, item];
      default:
        return null;
    }
  };

  diff.forEach(elem => {
    const { kind } = elem;
    const output = render(elem);

    if (output) {
      console.log(
        `%c ${kind}`,
        `color: ${colors[kind]}; font-weight:bold`,
        output
      );
    }
  });

  console.groupEnd();
}
