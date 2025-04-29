document.addEventListener("DOMContentLoaded", function () {
    // Ссылка на форму и на контейнер для отображения родственников
    const form = document.getElementById("add-relative-form");
    const nameInput = document.getElementById("name");
    const relationshipInput = document.getElementById("relationship");
    const familyTreeContainer = document.getElementById("family-tree");

    // Функция для добавления родственника
    function addRelative(event) {
        event.preventDefault(); // Отменяем стандартное поведение формы

        const name = nameInput.value.trim();
        const relationship = relationshipInput.value.trim();

        if (name && relationship) {
            // Создаём элемент списка для нового родственника
            const newRelative = document.createElement("li");
            newRelative.textContent = `${name} (${relationship})`;

            // Добавляем его в дерево
            familyTreeContainer.appendChild(newRelative);

            // Очищаем форму
            nameInput.value = '';
            relationshipInput.value = '';
        }
    }

    // Добавляем обработчик события на форму
    form.addEventListener("submit", addRelative);
});
