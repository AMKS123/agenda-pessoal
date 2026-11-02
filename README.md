# Agenda Pessoal

Agenda pessoal simples, feita como projeto de aprendizado com ajuda de IA.

**Abrir:** https://amks123.github.io/agenda-pessoal/

## O que tem
- **Agenda:** uma página por dia com tarefas (horário fixo ou móvel, cor de prioridade, check de feita, excluir), anotações do dia e calendário do mês.
- **Lista:** coisas sem data, em ordem de prioridade, com reordenação, negrito e cores.
- Fundo branco, pastel ou escuro; avisos do navegador no horário das tarefas fixas.
- Layout para celular, 1080p e 4K.

## Como funciona
Tudo fica em um único arquivo, `index.html` (HTML, CSS e JavaScript, sem instalar nada).
Os dados ficam salvos no navegador (localStorage) e, com o botão ☁ (Entrar com Google), também no Firebase (Firestore), sincronizando computador e celular.

## Quem pode usar a nuvem (bloqueio por e-mail)
Desde 02/11/2026 a nuvem é **restrita**: só os e-mails liberados nas regras do Firestore podem ler e gravar.
Assim ninguém de fora gasta a cota gratuita do Firebase.

- Qualquer pessoa ainda consegue abrir o site e clicar em **Entrar**, mas se o e-mail não estiver liberado o botão mostra **"Sem acesso"**. A agenda continua funcionando só naquele aparelho, sem nuvem.
- As regras ficam no **Console do Firebase** (projeto `agenda-pessoal-8d1ad`) > **Firestore Database** > aba **Regras**. Uma cópia de referência está em [`firestore.rules`](firestore.rules) (a cópia não é aplicada sozinha; o que vale é o que está publicado no console).

### Para liberar outra pessoa
1. Abra https://console.firebase.google.com, projeto **agenda-pessoal-8d1ad** > **Firestore Database** > **Regras**.
2. Na lista de e-mails, acrescente o da pessoa, por exemplo: `'meu@gmail.com', 'amigo@gmail.com'`.
3. Clique em **Publicar**. Em até 1 minuto ela pode clicar em Sair e Entrar de novo no site.

Cada pessoa liberada tem seus próprios dados (pasta `usuarios/{uid}`); ninguém vê a agenda do outro.
Se a pessoa for usar muito, lembre que todos dividem a mesma cota gratuita do projeto.
