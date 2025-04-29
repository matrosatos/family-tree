document.addEventListener("DOMContentLoaded", function () {
    // Ссылка на форму и на контейнер для отображения родственников
    const form = document.getElementById("add-relative-form");
    const nameInput = document.getElementById("name");
    const relationshipInput = document.getElementById("relationship");
    const familyTreeContainer = document.getElementById("family-tree");

    // Функция для отображения дерева
    function renderFamilyTree() {
        // Очистим текущий список
        familyTreeContainer.innerHTML = '';

        // Получаем данные из LocalStorage
        const familyData = JSON.parse(localStorage.getItem("familyData")) || [];

        // Отображаем каждого родственника
        familyData.forEach(function(relative) {
            const newRelative = document.createElement("li");
            newRelative.textContent = `${relative.name} (${relative.relationship})`;
            familyTreeContainer.appendChild(newRelative);
        });
    }

    // Функция для добавления родственника
    function addRelative(event) {
        event.preventDefault(); // Отменяем стандартное поведение формы

        const name = nameInput.value.trim();
        const relationship = relationshipInput.value.trim();

        if (name && relationship) {
            // Получаем текущие данные из LocalStorage
            const familyData = JSON.parse(localStorage.getItem("familyData")) || [];

            // Добавляем нового родственника
            familyData.push({ name: name, relationship: relationship });

            // Сохраняем обновленные данные в LocalStorage
            localStorage.setItem("familyData", JSON.stringify(familyData));

            // Обновляем отображение дерева
            renderFamilyTree();

            // Очищаем форму
            nameInput.value = '';
            relationshipInput.value = '';
        }
    }

    // Добавляем обработчик события на форму
    form.addEventListener("submit", addRelative);

    // Инициализация дерева на загрузке страницы
    renderFamilyTree();
});
