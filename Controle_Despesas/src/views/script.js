const apiBaseUrl = "http://localhost:3001/api"; // Ajuste conforme o backend

// Função para carregar os eventos
async function loadEvents() {
  const response = await fetch(`${apiBaseUrl}/eventos`);
  const events = await response.json();

  const eventList = document.getElementById("event-list");
  eventList.innerHTML = ""; // Limpa a lista

  events.forEach(event => {
    const eventDiv = document.createElement("div");
    eventDiv.className = "event-item";

    eventDiv.innerHTML = `
      <h3>${event.titulo}</h3>
      <p>${event.descricao || "Sem descrição"}</p>
      <p><strong>Data:</strong> ${new Date(event.data).toLocaleDateString()}</p>
      <p><strong>Local:</strong> ${event.local}</p>
      <p><strong>Valor:</strong> R$ ${event.valor.toFixed(2)}</p>
      <button onclick="deleteEvent('${event._id}')">Excluir</button>
    `;

    eventList.appendChild(eventDiv);
  });
}

// Função para criar um novo evento
async function createEvent(event) {
  event.preventDefault();

  const form = document.getElementById("create-event-form");
  const formData = new FormData(form);

  const newEvent = {
    titulo: formData.get("titulo"),
    descricao: formData.get("descricao"),
    data: formData.get("data"),
    local: formData.get("local"),
    valor: parseFloat(formData.get("valor")),
  };

  await fetch(`${apiBaseUrl}/eventos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEvent),
  });

  form.reset();
  loadEvents();
}

// Função para deletar um evento
async function deleteEvent(id) {
  await fetch(`${apiBaseUrl}/eventos`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  loadEvents();
}

// Inicialização
document.getElementById("create-event-form").addEventListener("submit", createEvent);
loadEvents();
