
// =============================
// Animações ao rolar (scroll)
// =============================

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

// aplica nas seções que tiverem a classe .reveal
document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  
  // Adiciona a classe se rolar mais que 50px, remove se voltar ao topo
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// =============================
// CARROSSEL
// =============================

const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const dots = document.querySelectorAll(".carousel-dots .dot");

let currentSlide = 0;
let autoSlideInterval;

// Define imagens como background (substitui o texto que você colocou no HTML)
const imagens = [
  "./assets/slide1.jpg",
  "./assets/slide2.jpg",
  "./assets/slide3.jpg",
  "./assets/slide4.jpg",
  "./assets/slide5.jpg"
];

slides.forEach((slide, index) => {
  slide.style.backgroundImage = `url(${imagens[index]})`;
});


// Função para atualizar slides
function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  currentSlide = index;
}


// Próximo slide
function nextSlide() {
  let next = currentSlide + 1;
  if (next >= slides.length) next = 0;
  showSlide(next);
}


// Slide anterior
function prevSlide() {
  let prev = currentSlide - 1;
  if (prev < 0) prev = slides.length - 1;
  showSlide(prev);
}


// Clique nos botões
if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });
}


// Clique nas bolinhas
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.getAttribute("data-slide"));
    showSlide(index);
    resetAutoSlide();
  });
});


// Auto slide
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 5000); // troca a cada 5 segundos
}


// Reset do auto slide
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}


// Inicializa
if (slides.length > 0) {
  startAutoSlide();
}

// =============================
// Validação simples do formulário
// =============================

const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    const nome = form.querySelector("input[name='nome']");
    const telefone = form.querySelector("input[name='telefone']");
    const mensagem = form.querySelector("textarea[name='mensagem']");

    if (!nome.value.trim() || !telefone.value.trim() || !mensagem.value.trim()) {
      e.preventDefault();
      alert("Por favor, preencha nome, telefone e mensagem.");
      return;
    }

    // alert("Mensagem enviada com sucesso (Demonstração).");
  });
}

// =============================
// Menu mobile (apenas UX leve)
// =============================

const menuToggle = document.getElementById("menu-toggle");

if (menuToggle) {
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.checked = false;
    });
  });
}

document.getElementById('whatsapp-form').addEventListener('submit', function(event) {
        // 1. Evita que a página recarregue ao enviar o formulário
        event.preventDefault();

        // 2. CONFIGURAÇÃO: Insira seu número do WhatsApp aqui (Apenas números: País + DDD + Número)
        // Exemplo: 5548999999999
        const numeroWhatsApp = "5548996535921"; 

        // 3. Captura os valores digitados pelo usuário
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const mensagem = document.getElementById('mensagem').value;

        // 4. Monta a mensagem que chegará no seu WhatsApp (com quebras de linha)
        const textoFormatado = `Olá! Meu nome é ${nome}.\n\n` +
                               `${mensagem}`;

        // 5. Codifica o texto para o formato de URL (transforma espaços e quebras de linha em caracteres válidos)
        const textoCodificado = encodeURIComponent(textoFormatado);

        // 6. Cria o link final da API do WhatsApp
        const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${textoCodificado}`;

        // 7. Abre o WhatsApp em uma nova aba
        window.open(urlWhatsApp, '_blank');
    });