# Aplicativo de notificações locais — Expo SDK 58

## Requisitos

- Node.js `^22.13.0 || ^24.3.0 || >=26.0.0` (recomendado: Node 22 LTS).
- npm compatível com a versão do Node instalada.
- Para executar no iPhone com SDK 58, use um development build compatível. A disponibilidade do Expo Go depende da versão publicada na App Store.

## Instalar dependências

Na pasta `notificacaoApp`:

```bash
npm install
npx expo install --fix
npx expo-doctor
```

## Executar

```bash
npx expo start
```

## Notificações

A tela inicial solicita permissão e agenda uma notificação local imediata usando exclusivamente `expo-notifications`.

Não há Firebase, servidor, Expo Push Token ou envio remoto. O plugin está configurado com `enableRemoteNotifications: false` para iOS.

Como o plugin altera a configuração nativa, gere/recompile o development build depois de adicionar ou alterar essa configuração.
