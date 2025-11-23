# 🌍 CityNavigator

## 📱 Sobre o app
O **CityNavigator** é um aplicativo móvel desenvolvido com **Expo** para as plataformas Android/iOS.  
O objetivo do app é permitir que o usuário explore cidades ao redor do mundo, visualize detalhes turísticos e culturais, favorite cidades e faça avaliações.

### ✨ Funcionalidades
- [x] Listar cidades mais visitadas do mundo  
- [x] Visualizar detalhes de uma cidade (descrição, clima, avaliações, fotos)  
- [x] Favoritar/desfavoritar cidades  
- [x] Adicionar comentários e avaliações de usuários  
- [x] Visualizar cidades favoritas em uma aba dedicada  
- [x] Buscar cidades pelo nome  
- [ ] Exibir cidades no mapa (integração com mapas)  
- [x] Autenticação de usuários (login/registro)  
- [ ] Integração com API externa de clima e turismo  

### 🚀 Funcionalidades futuras
- Compartilhamento de cidades favoritas  
- Sistema de gamificação (quiz de capitais/conhecimento gerais sobre cidades)  
- Sugestões de roteiros personalizados
- Integração com uma API de pontos turísticos para cada cidade  

---

#### ⚙️ Configuração Inicial
1. **Crie o arquivo `.env`:**
   ```bash
   cp .env.example .env
   ```
2. ```bash
   yarn add expo
    ```
3. ```bash
   npx expo start
   ```
## 🔗 API Utilizada
Este aplicativo consome a API do city-navigator-api,
Na .env.example já está o caminho padrão dessa api
[Repositório da API](https://github.com/nicolasjveiga/city-navigator-api) 

   
## 🎨 Protótipos de tela
Os protótipos foram criados no **Figma** e representam a navegação básica do app.

🔗 [Protótipo no Figma](https://www.figma.com/design/pv5imjCz4HVCe9PpETqg3c/city-navigator?node-id=0-1&t=TVgeemnbgcUK6loU-1) 

### Exemplos de telas
![Tela Detalhes](https://res.cloudinary.com/dqbxxyyza/image/upload/v1757275849/imagem_2025-09-07_171047415_tgbiky.png)  
![Tela Início](https://res.cloudinary.com/dqbxxyyza/image/upload/v1757275732/imagem_2025-09-07_170849920_u5tuj1.png)  
![Tela Favoritos](https://res.cloudinary.com/dqbxxyyza/image/upload/v1757275764/imagem_2025-09-07_170923306_blm9vv.png)  

---

## 🗄️ Modelagem do banco
O aplicativo utilizará um banco de dados para armazenar informações das cidades e interações dos usuários.

🔗 [Modelo do banco](https://dbdiagram.io/d/68bddd9961a46d388edaad3b)

### Modelo relacional (exemplo)
![Modelo Banco](https://res.cloudinary.com/dqbxxyyza/image/upload/v1757276019/imagem_2025-09-07_171338419_oqvbvu.png)  



---

## 📅 Planejamento de Sprints

| Sprint | Período | Entregas previstas |
|--------|---------|--------------------|
| **Sprint 1** | Semana 1 | Configuração do projeto Expo, setup do repositório GitHub, criação de componentes iniciais (CityCard, Header) |
| **Sprint 2** | Semana 2 | Implementar listagem de cidades e tela de detalhes (descrição, imagem, avaliações, clima fixo) |
| **Sprint 3** | Semana 3 | Implementar funcionalidade de favoritar/desfavoritar cidades e tela de favoritos |
| **Sprint 4** | Semana 4 | Implementar sistema de comentários e avaliações de usuários |
| **Sprint 5** | Semana 5 | Implementar busca de cidades e integração com API de clima |
| **Sprint 6** | Semana 6 | Ajustes finais, testes e documentação completa |

---

## 🌟 Resultado Final
![Tela Inicio](https://res.cloudinary.com/dqbxxyyza/image/upload/v1763940829/Captura_de_tela_de_2025-11-23_20-33-34_zofva8.png)
![Tela Detalhes](https://res.cloudinary.com/dqbxxyyza/image/upload/v1763940807/Captura_de_tela_de_2025-11-23_20-33-16_ygiyu3.png)
![Tela Favoritos](https://res.cloudinary.com/dqbxxyyza/image/upload/v1763940982/Captura_de_tela_de_2025-11-23_20-36-12_rbwapl.png)
