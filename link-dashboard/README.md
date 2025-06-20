# Dashboard de Links Personalizados

Aplicação React + TypeScript criada com Vite e Tailwind CSS. A autenticação e o armazenamento de dados são feitos via Supabase.

## Configuração

1. Copie o arquivo `.env.example` para `.env` e preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` com as credenciais do seu projeto Supabase.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Funcionalidades

- Login com email e senha usando Supabase Auth.
- Dashboard protegido com listagem, criação e exclusão de links do usuário logado.
- Links são salvos na tabela `links` do Supabase e visíveis apenas para o usuário autenticado.

Estrutura de pastas principal:

```
/src
 ├─ /components
 │   ├─ LinkCard.tsx
 │   └─ AddLinkForm.tsx
 ├─ /pages
 │   ├─ Login.tsx
 │   └─ Dashboard.tsx
 ├─ /lib
 │   └─ supabase.ts
 ├─ App.tsx
 └─ main.tsx
```
