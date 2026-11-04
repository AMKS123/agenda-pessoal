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

## Reuniões compartilhadas
Ao criar uma **Reunião**, o campo **Convidar** permite escolher uma pessoa (precisa estar na lista de e-mails liberados).
Sem convidado, a reunião fica só na sua agenda, como antes.

- O convidado vê o convite em **Convites de Reunião** (no dia de hoje e no dia da reunião) e escolhe **Aceitar** ou **Recusar**.
- Aceitou: a reunião aparece na agenda dele, com as anotações, que se atualizam sozinhas. Ele pode marcar como feita (só para ele) ou clicar em "Não vou participar".
- Só quem criou edita (texto, data, hora, anotações) e apaga. Apagar a reunião, ou tirar o convidado, some com ela para o convidado também.
- Quem criou vê na linha da reunião a resposta: ⏳ aguardando, ✓ confirmou, ✗ recusou.
- Os e-mails já usados ficam guardados na sua lista de convidados (e quem te convidou entra nela também).

Na nuvem, cada reunião compartilhada fica em `reunioes/{id}` (os dados pessoais continuam em `usuarios/{uid}`).
Isso precisa da parte `match /reunioes/{id}` das regras (ver [`firestore.rules`](firestore.rules)). Sem ela, o resto da agenda funciona normalmente; só o convite não é enviado.
