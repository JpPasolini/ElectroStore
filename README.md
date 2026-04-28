# ⚡ ElectroStore

Aplicativo mobile desenvolvido em React Native com Expo, consumindo a [Fake Store API](https://fakestoreapi.com) como trabalho da disciplina de React Native.

---

## 📱 Sobre o app

O **ElectroStore** é uma loja de eletrônicos que permite:
- Fazer login com usuários reais da Fake Store API
- Navegar por produtos com filtro por categoria
- Ver detalhes completos de cada produto
- Logout a qualquer momento

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org) instalado (versão LTS)
- App **Expo Go** no celular:
  - [Android – Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS – App Store](https://apps.apple.com/app/expo-go/id982107779)

### Passo a passo

**1. Clone o repositório:**
```bash
git clone https://github.com/SEU_USUARIO/electrostore.git
cd electrostore
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Inicie o projeto:**
```bash
npx expo start
```

**4. Escaneie o QR Code:**
- **iPhone:** abra a câmera e aponte para o QR Code
- **Android:** abra o Expo Go e escaneie o QR Code

---

## 👤 Usuários disponíveis para login

Para ver todos os usuários disponíveis, acesse:
```
https://fakestoreapi.com/users
```

Sugestões de login para teste rápido:

| Usuário | Senha |
|---------|-------|
| `johnd` | `m38rmF$` |
| `mor_2314` | `83r5^_` |
| `kevinryan` | `kev02937@` |
| `donero` | `ewedon` |

---

## 📁 Estrutura do projeto

```
ElectroStore/
├── App.js                          ← Configuração da navegação
├── src/
│   └── screens/
│       ├── LoginScreen.js          ← Tela de login
│       ├── HomeScreen.js           ← Listagem de produtos + filtro
│       ├── ProductDetailScreen.js  ← Detalhes do produto
│       └── InfoScreen.js           ← Informações do grupo
├── app.json
├── babel.config.js
├── package.json
└── README.md
```

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Uso |
|------------|-----|
| React Native + Expo | Base do app mobile |
| JavaScript | Linguagem de programação |
| React Navigation (Stack) | Navegação entre telas |
| Axios | Consumo da API |
| Fake Store API | Dados de produtos e autenticação |
| useState / useEffect | Controle de estado e efeitos |

---

## 👥 Integrantes do Grupo

| Nome | RA |
|------|----|
| Gustavo Marcante Vazzoler | 1138009 |
| João Paulo Pasolini | 1138273 |
| Luis Eduardo Moroso | 1138541 |
| Pedro Henrique Renosto | 1138042 |
