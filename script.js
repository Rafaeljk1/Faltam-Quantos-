let eventDate = new Date();
let eventTitle = "Faltam para o Natal!";
let targetDate = new Date(eventDate.getFullYear(), 11, 25); // Data inicial para o Natal

// Função para atualizar a contagem regressiva
function updateCountdown() {
    const now = new Date();

    const diff = targetDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days + " <span>dias</span>";
    document.getElementById("hours").innerHTML = hours + " <span>horas</span>";
    document.getElementById("minutes").innerHTML = minutes + " <span>minutos</span>";
    document.getElementById("seconds").innerHTML = seconds + " <span>segundos</span>";

    // Atualiza o título de acordo com o evento
    document.getElementById("title").textContent = eventTitle;
    
    // Altera o fundo com base no evento
    if (eventTitle === "Faltam para o Natal!") {
        document.body.style.backgroundImage = "url('natal.jpg')";
    } else {
        document.body.style.backgroundImage = "url('anonovo.jpg')";  // Troque 'anonovo.jpg' pela imagem do Ano Novo
    }
}

// Função para alternar entre Natal e Ano Novo
function toggleEvent() {
    if (eventTitle === "Faltam para o Natal!") {
        eventTitle = "Faltam para o Ano Novo!";
        targetDate = new Date(eventDate.getFullYear() + 1, 0, 1); // Data para o Ano Novo
        document.getElementById("toggleButton").textContent = "Mudar para o Natal";
    } else {
        eventTitle = "Faltam para o Natal!";
        targetDate = new Date(eventDate.getFullYear(), 11, 25); // Data para o Natal
        document.getElementById("toggleButton").textContent = "Mudar para o Ano Novo";
    }
    updateCountdown();  // Atualiza a contagem quando a data é trocada
}

// Função para gerar flocos de neve
function createSnowflakes() {
    const snowContainer = document.getElementById('snow');
    const flake = document.createElement('div');
    flake.classList.add('snowflake');
    flake.style.left = Math.random() * 100 + 'vw';
    flake.style.animationDuration = Math.random() * 3 + 3 + 's'; // Duração aleatória para os flocos caírem
    snowContainer.appendChild(flake);

    // Remover o floco de neve após ele cair
    setTimeout(() => {
        snowContainer.removeChild(flake);
    }, 10000);  // Remover após 10 segundos
}

// Gerar flocos de neve a cada 100ms
setInterval(createSnowflakes, 100);

// Atualiza a contagem a cada segundo
setInterval(updateCountdown, 1000);
updateCountdown();
