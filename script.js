document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("add-relative-form");
    const nameInput = document.getElementById("name");
    const surnameInput = document.getElementById("surname");
    const patronymicInput = document.getElementById("patronymic");
    const dobInput = document.getElementById("dob");
    const dodInput = document.getElementById("dod");
    const photoInput = document.getElementById("photo");
    const familyTreeContainer = document.getElementById("family-tree");

    // Функция для отображения дерева
    function renderFamilyTree() {
        familyTreeContainer.innerHTML = '';

        const familyData = JSON.parse(localStorage.getItem("familyData")) || [];

        familyData.forEach(function(relative) {
            const relativeDiv = document.createElement("div");
            relativeDiv.classList.add("relative");

            // Если у родственника есть фото, показываем его
            if (relative.photo) {
                const img = document.createElement("img");
                img.src = relative.photo;
                relativeDiv.appendChild(img);
            }

            const name = document.createElement("h3");
            name.textContent = `${relative.surname} ${relative.name} ${relative.patronymic}`;
            relativeDiv.appendChild(name);

            const dob = document.createElement("p");
            dob.textContent = `Дата рождения: ${relative.dob}`;
            relativeDiv.appendChild(dob);

            // Если есть дата смерти, показываем её
            if (relative.dod) {
                const dod = document.createElement("p");
                dod.textContent = `Дата смерти: ${relative.dod}`;
                relativeDiv.appendChild(dod);
            }

            familyTreeContainer.appendChild(relativeDiv);
        });
    }

    // Функция для добавления родственника
    function addRelative(event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const surname = surnameInput.value.trim();
        const patronymic = patronymicInput.value.trim();
        const dob = dobInput.value;
        const dod = dodInput.value;
        const photo = photoInput.files[0];

        if (name && surname && patronymic && dob) {
            const familyData = JSON.parse(localStorage.getItem("familyData")) || [];

            const relative = {
                name,
                surname,
                patronymic,
                dob,
                dod: dod || null,
                photo: photo ? URL.createObjectURL(photo) : null
            };

            familyData.push(relative);
            localStorage.setItem("familyData", JSON.stringify(familyData));

            renderFamilyTree();

            // Очищаем форму
            nameInput.value = '';
            surnameInput.value = '';
            patronymicInput.value = '';
            dobInput.value = '';
            dodInput.value = '';
            photoInput.value = '';
        }
    }

    form.addEventListener("submit", addRelative);

    // Инициализация дерева на загрузке страницы
    renderFamilyTree();
});
