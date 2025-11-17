const btnTopo = document.getElementById('btnTopo');

window.addEventListener('scroll', () => {
  btnTopo.style.display = window.scrollY > 300 ? 'block' : 'none';
});

btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const toggleTheme = document.getElementById('toggleTheme');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  toggleTheme.textContent = '☀️';
}

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    toggleTheme.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    toggleTheme.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});

const form = document.getElementById('form-contato');
const feedback = document.getElementById('feedback');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      feedback.textContent = "Mensagem enviada com sucesso!";
      feedback.style.color = "green";
      form.reset();
    } else {
      feedback.textContent = "Ocorreu um erro. Tente novamente mais tarde.";
      feedback.style.color = "red";
    }
  } catch (error) {
    feedback.textContent = "Erro de conexão. Verifique sua internet.";
    feedback.style.color = "red";
  }
});
