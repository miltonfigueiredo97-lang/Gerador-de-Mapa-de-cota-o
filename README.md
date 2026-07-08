# Gerador de Mapa de Cotação

Ferramenta que lê orçamentos em PDF (texto ou escaneado), monta a lista de insumos automaticamente e gera o mapa de cotação comparativo em .xlsx.

## Como funciona

- `index.html` — a ferramenta em si (roda no navegador).
- `api/claude.js` — uma function serverless que guarda sua chave de API da Anthropic **no servidor** e repassa as chamadas. O navegador nunca vê a chave.

Isso é necessário porque uma chave de API colocada direto no HTML ficaria visível pra qualquer pessoa que abrisse o "ver código-fonte" da página — daria pra roubar e usar sua chave. Por isso a chamada passa por essa function.

## Passo a passo para colocar no ar (Vercel)

### 1. Pegue uma chave de API da Anthropic
Isso é diferente da sua conta do claude.ai — é uma chave específica para uso via API, com cobrança própria (separada do seu plano do Claude.ai).

1. Acesse **https://console.anthropic.com**
2. Crie uma conta (ou entre na sua) e adicione um método de pagamento em **Billing** (a API é paga por uso, não tem plano gratuito equivalente ao claude.ai).
3. Vá em **API Keys** → **Create Key**.
4. Copie a chave (começa com `sk-ant-...`). **Guarde num lugar seguro — ela some da tela depois de criada.**

### 2. Configure a chave na Vercel (nunca no código)

1. No painel da Vercel, abra o projeto deste repositório.
2. Vá em **Settings → Environment Variables**.
3. Adicione:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: a chave `sk-ant-...` que você copiou
   - **Environment**: Production (e Preview, se quiser testar em branches)
4. Salve.
5. Vá em **Deployments** e clique em **Redeploy** no último deploy (variáveis de ambiente só valem a partir do próximo deploy).

### 3. Pronto
Depois do redeploy, acesse a URL do projeto — a ferramenta já deve conseguir ler os PDFs normalmente.

## Se algo der errado

- **Erro "ANTHROPIC_API_KEY não configurada no servidor"** → a variável de ambiente não foi salva ou o deploy foi feito antes de você configurá-la. Confirme o nome exato (`ANTHROPIC_API_KEY`) e refaça o deploy.
- **Erro de crédito/limite da API** → isso já seria um limite da sua conta paga na console.anthropic.com (não do claude.ai). Verifique o saldo em Billing.
- **PDFs muito grandes ou muitos de uma vez** → a ferramenta processa no máximo 2 arquivos ao mesmo tempo para não sobrecarregar o navegador.

## Segurança

- Nunca coloque a chave de API diretamente em `index.html` ou em qualquer arquivo commitado no GitHub.
- Se qualquer chave ou token for exposto por engano (por exemplo, colado num chat ou commitado sem querer), revogue-o e gere um novo imediatamente.
