# online-store-v2

## Окружение и зависимости

Проект использует Yarn Classic **1.22.22** и Node.js **22.23.1**.
Версия Node указана в `.nvmrc`. Если установлен nvm, в корне проекта выполните:

```sh
nvm install
nvm use
yarn install --frozen-lockfile
yarn dev
```

`nvm install` устанавливает указанную версию, если её ещё нет, и выбирает её
для текущего терминала. В дальнейшем после открытия нового терминала достаточно
`nvm use`. Сам файл `.nvmrc` не включает автоматическое переключение версий.
Node.js можно установить другим способом, сохранив указанную версию.

Прямые зависимости закреплены точными стабильными версиями; `yarn.lock`
фиксирует дерево зависимостей. При обновлении проверяются не только версии,
но и `engines`, `peerDependencies` и руководства по миграции.

TypeScript закреплён на **6.0.3**: Vue tooling и typescript-eslint требуют
совместимый программный API, которого пока нет в стабильном TypeScript 7.
См. [ограничение для Vue в объявлении TypeScript 7](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#typescript-and-embedded-languages).
`@types/node` обновляется в ветке 22, соответствующей целевому Node.js.

## Формы и валидация

Формы авторизации используют стабильные **TanStack Form 1** и **Zod 4**.
TanStack Form управляет значениями, состоянием полей и запуском проверок.
Схемы Zod находятся в `src/features/auth/model` и содержат правила проверки
и преобразования данных.

Перед вызовом API обработчик отправки явно вызывает `schema.parse(value)`:
проверка TanStack Form сама не подставляет преобразованный результат схемы.
Email очищается от пробелов по краям и переводится в нижний регистр;
пароли передаются без изменения пробелов и регистра.

## Вход и восстановление доступа

Google и email/password — способы входа в один аккаунт. Повторный `signUp`
не устанавливает пароль существующему пользователю. После входа через Google
откройте Account → Set or change password (`/update-password`): пароль сохраняется
через `auth.updateUser`, без создания второго пользователя. После сохранения
можно выйти и проверить вход по email/password.

`Forgot password?` запрашивает письмо и показывает нейтральное подтверждение,
не раскрывающее наличие аккаунта. Письмо возвращает пользователя на
`/update-password`. Без сессии эта страница показывает ссылки на вход и запрос
нового письма; форма доступна только при наличии сессии, а смену пароля
авторизует Supabase Auth. Истёкшая ссылка не является разрешением на смену пароля.

В Supabase → Authentication → URL Configuration необходимо разрешить
`http://localhost:5173/update-password` и точный URL этой страницы на production.
Если используется собственный шаблон recovery-письма, он должен сохранять
переданный redirect URL. Доставка писем зависит от SMTP-настроек проекта.
Секретные токены из ссылок и пароли нельзя публиковать в логах или примерах.

Имя при регистрации передаётся как `options.data.name`. Существующий триггер
`handle_new_auth_user` читает это поле и создаёт `public.auth_users` вместе
с `auth.users`; отдельный UPDATE профиля из браузера больше не нужен.
Метаданные имени не используются для выдачи прав доступа.

Ошибки Auth преобразуются по коду в безопасные сообщения; неизвестные ошибки
не выводятся пользователю как исходный текст backend. API-тесты используют
подменённый клиент и не регистрируют пользователей в production.

## Проверки

После выбора подходящего Node.js:

```sh
yarn install --frozen-lockfile
yarn build
yarn lint:check
yarn test
yarn fsd --watch=false
```

`build` проверяет типы приложения, Vue-компонентов и тестов, затем собирает
production-версию. `lint:check` проверяет код без исправления файлов;
`lint` сохраняет прежний режим с автоматическими исправлениями.
`test` запускает проверки схем и их интеграции с TanStack Form без запросов
к production Auth и без изменения данных Supabase.

У стабильного `vite-plugin-vue-devtools` 8.2.1 некоторые вложенные пакеты
пока объявляют peer dependency только на Vite 6/7, хотя сам плагин объявляет
поддержку Vite 8. Yarn сообщает об этом при установке. Принудительные
подмены основных версий вложенных пакетов не используются; запуск приложения
и панели DevTools проверяются отдельно.

## Импорты и публичные API

Внешние потребители используют экспорты `index.ts` соответствующего сегмента
Shared. Например, клиент импортируется из `@/shared/api`, типы маршрутов —
из `@/shared/config`, базовые компоненты — из `@/shared/ui`.
Внутренние файлы сегмента используют относительные импорты.
`export type` обозначает типы, которые не добавляют runtime-зависимость.

Проверка границ FSD: `./node_modules/.bin/steiger ./src --watch=false`.
При ошибке watcher `EMFILE` в локальном окружении добавьте `CHOKIDAR_USEPOLLING=1`.

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
