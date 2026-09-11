# ✦ Portfólio — Giovanna Alonso

Portfólio pessoal desenvolvido para apresentar meus projetos, experiências e habilidades como **Desenvolvedora Full Stack**, com foco em desenvolvimento front-end, UI/UX e criação de experiências digitais.

O projeto foi desenvolvido com uma abordagem minimalista e moderna, utilizando animações sutis, transições suaves, suporte a temas claro/escuro e layout totalmente responsivo.

## ✨ Preview

> Portfólio pessoal com seções de apresentação, sobre mim, projetos, habilidades, experiência profissional e contato.

🌐 **Acesse o portfólio:** em breve

---

## 🚀 Tecnologias

* **Angular** — framework principal
* **TypeScript** — desenvolvimento da aplicação
* **Tailwind CSS** — estilização e layout responsivo
* **PrimeNG** — componentes e ícones
* **GSAP** — animações e transições
* **HTML5**
* **CSS3**
* **Git & GitHub**
* **Vercel** — deploy

---

## 🎨 Características

* Design moderno e minimalista
* Layout totalmente responsivo
* Tema claro e escuro
* Persistência da preferência de tema
* Suporte a português e inglês
* Navegação suave entre seções
* Menu mobile fullscreen
* Animações e microinterações
* Seções com elementos visuais e efeitos sutis
* Favicon personalizado
* Acessibilidade com suporte a `prefers-reduced-motion`
* Estrutura baseada em componentes Angular

---

## 📌 Seções

### Hero

Apresentação inicial com:

* Nome
* Cargo
* Introdução
* Descrição profissional
* Links para projetos e contato
* Elementos visuais e animações

### About

Seção dedicada à apresentação profissional, incluindo informações sobre minha trajetória e alguns indicadores de experiência.

### Work

Área destinada aos principais projetos desenvolvidos, apresentando:

* Nome do projeto
* Categoria
* Ano
* Tecnologias utilizadas
* Descrição
* Imagem do projeto

### Skills

Apresentação das principais tecnologias e ferramentas utilizadas no desenvolvimento.

### Experience

Linha do tempo com experiências profissionais e atividades de desenvolvimento.

### Contact

Seção final para contato e acesso às redes profissionais.

---

## 🌐 Internacionalização

O portfólio possui suporte para dois idiomas:

* 🇧🇷 Português
* 🇺🇸 Inglês

A preferência de idioma é armazenada no navegador para que a escolha seja mantida entre as sessões.

---

## 🌓 Tema

O projeto possui suporte a:

* ☀️ Light Mode
* 🌙 Dark Mode

A preferência do usuário é armazenada no `localStorage`.

O tema também é aplicado antecipadamente durante o carregamento da página para evitar flashes visuais indesejados.

---

## 📱 Responsividade

O layout foi desenvolvido pensando em diferentes tamanhos de tela:

* Desktop
* Notebook
* Tablet
* Smartphone

No mobile, a navegação é substituída por um menu fullscreen com animações e controles de idioma e aparência.

---

## 📂 Estrutura

A aplicação utiliza uma arquitetura baseada em componentes standalone do Angular.

```text
src/
├── app/
│   ├── components/
│   │   ├── navbar/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── work/
│   │   ├── skills/
│   │   ├── experience/
│   │   ├── contact/
│   │   ├── scroll-arrow/
│   │   └── page-reveal/
│   │
│   ├── core/
│   │   └── services/
│   │       └── language.service.ts
│   │
│   └── i18n/
│       ├── en.ts
│       └── pt.ts
│
├── public/
│   ├── images/
│   │   └── work/
│   └── favicon.ico
│
└── index.html
```

---

## ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/Alonsogio/giovanna-portfolio.git
```

Entre na pasta:

```bash
cd giovanna-portfolio
```

Instale as dependências:

```bash
npm install
```

---

## 💻 Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
npx ng serve
```

Depois acesse:

```text
http://localhost:4200/
```

A aplicação será recarregada automaticamente sempre que os arquivos forem modificados.

---

## 🏗️ Build

Para gerar a versão de produção:

```bash
npx ng build
```

Os arquivos otimizados serão gerados no diretório:

```text
dist/
```

---

## 🚀 Deploy

O projeto pode ser publicado utilizando a **Vercel** com integração ao GitHub.

Fluxo de deploy:

```text
Código
   ↓
Git
   ↓
GitHub
   ↓
Vercel
   ↓
🌐 Portfólio online
```

Após a configuração inicial, novos commits enviados para a branch principal podem gerar novos deploys automaticamente.

---

## 🛠️ Scripts

Principais comandos disponíveis:

```bash
npm start
```

Inicia o servidor de desenvolvimento.

```bash
npx ng serve
```

Inicia o servidor Angular localmente.

```bash
npx ng build
```

Gera o build de produção.

```bash
npx ng test
```

Executa os testes da aplicação.

---

## 👩🏻‍💻 Sobre mim

Sou **Giovanna Alonso**, Desenvolvedora Full Stack com foco em desenvolvimento front-end, UI/UX e criação de experiências digitais.

Tenho interesse em construir aplicações que combinem **tecnologia, design e usabilidade**, buscando sempre escrever código organizado, performático e sustentável.

---

## 📬 Contato

**GitHub**
https://github.com/Alonsogio

**LinkedIn**
https://www.linkedin.com/in/giovanna-alonso-b98165240/

**E-mail**
[ogiovanna162@gmail.com](mailto:ogiovanna162@gmail.com)

---

## 📄 Licença

Este projeto representa meu portfólio pessoal e seu código é disponibilizado principalmente para fins de apresentação profissional e aprendizado.

---
