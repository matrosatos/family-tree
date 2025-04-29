const form = document.getElementById("relative-form");
const treeContainer = document.getElementById("tree-container");

function getRelatives() {
  return JSON.parse(localStorage.getItem("relatives") || "[]");
}

function saveRelatives(data) {
  localStorage.setItem("relatives", JSON.stringify(data));
}

function createCard(relative, index) {
  const div = document.createElement("div");
  div.className = "card";

  if (relative.photo) {
    const img = document.createElement("img");
    img.src = relative.photo;
    div.appendChild(img);
  }

  const name = document.createElement("p");
  name.innerHTML = `<strong>${relative.surname} ${relative.name} ${relative.patronymic}</strong>`;
  div.appendChild(name);

  const dob = document.createElement("p");
  dob.textContent = `Дата рождения: ${relative.dob}`;
  div.appendChild(dob);

  if (relative.dod) {
    const dod = document.createElement("p");
    dod.textContent = `Дата смерти: ${relative.dod}`;
    div.appendChild(dod);
  }

  const delBtn = document.createElement("button");
  delBtn.textContent = "Удалить";
  delBtn.onclick = () => {
    const data = getRelatives();
    data.splice(index, 1);
    saveRelatives(data);
    renderTree();
  };
  div.appendChild(delBtn);

  return div;
}

function renderTree() {
  const data = getRelatives();
  treeContainer.innerHTML = "";

  const levels = [[], [], [], [], []]; // 5 уровней (можно увеличить)

  data.forEach((rel, i) => {
    const level = rel.level || 0;
    levels[level].push(createCard(rel, i));
  });

  levels.forEach(levelCards => {
    if (levelCards.length > 0) {
      const levelDiv = document.createElement("div");
      levelDiv.className = "tree-level";
      levelCards.forEach(card => levelDiv.appendChild(card));
      treeContainer.appendChild(levelDiv);
    }
  });
}

form.addEventListener("submit", async e => {
  e.preventDefault();

  const surname = document.getElementById("surname").value.trim();
  const name = document.getElementById("name").value.trim();
  const patronymic = document.getElementById("patronymic").value.trim();
  const dob = document.getElementById("dob").value;
  const dod = document.getElementById("dod").value;
  const photoFile = document.getElementById("photo").files[0];

  let photoUrl = null;

  if (photoFile) {
    photoUrl = await readFile(photoFile);
  }

  const relatives = getRelatives();
  const level = Math.floor(relatives.length / 2); // простое определение уровня
  relatives.push({ surname, name, patronymic, dob, dod: dod || null, photo: photoUrl, level });

  saveRelatives(relatives);
  renderTree();
  form.reset();
});

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

renderTree();
