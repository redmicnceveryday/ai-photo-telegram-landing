# AI-Photo в Telegram — Landing Page

Готовый одностраничный лендинг для AI-сервиса в Telegram. Привлекает поисковый/рекламный трафик и переводит пользователя в Telegram. Светлая премиальная витрина, Telegram-blue акценты, один тёмный блок.

Собран 20.05.2026, доработан 21.05.2026 и 27.05.2026. Домен: `aiplatformimage.online`.

---

## Состав проекта

```
landing/
├── index.html      (926 строк)  — главная страница, все 12 блоков
├── privacy.html     (89 строк)  — политика конфиденциальности
├── terms.html       (94 строки) — пользовательское соглашение
├── robots.txt       (3 строки)  — правила индексации
├── sitemap.xml      (33 строки) — карта сайта (6 URL)
├── css/
│   └── style.css   (1522 строки) — все стили
├── js/
│   └── main.js     (197 строк)  — интерактивность (sticky header, меню, scroll spy, fade-in, аналитика)
├── images/
│   ├── og-image.jpg   (181 KB)  — 1200×630, для Open Graph
│   ├── examples/      (9 × .webp, 450×600) — фото для галереи и hero
│   └── popular/       (6 × .webp, 450×600) — фото для блока «Сейчас популярно»
└── en/              (АНГЛИЙСКАЯ ВЕРСИЯ)
    ├── index.html   (923 строки) — английский лендинг
    ├── privacy.html  (86 строк)  — английская политика
    └── terms.html    (91 строка) — английское соглашение
```

## Как открыть

Открыть `landing/index.html` в браузере — работает сразу, без сервера, без Node.js, без сборки.

## Структура главной страницы

| # | Блок | Якорь | Содержание |
|---|------|-------|------------|
| 1 | **Header** | — | Sticky, glass-blur, логотип «AI Photo», навигация, кнопка «Открыть Telegram» |
| 2 | **Hero** | — | H1, кнопка «Перейти в форум» (`t.me/ai_platform_image`), кнопка «Смотреть примеры», сетка 2×3 фото |
| 3 | **Галерея** | `#examples` | 8 карточек 3:4: фото + плашка-стекло (ховер) с названием, хэштегами и синей кнопкой |
| 4 | **Возможности** | `#features` | 6 feature-карточек с иконками и CTA (ведут на форум) |
| 5 | **Как работает** | `#how-it-works` | 3 шага + плашка «Если умеете писать промпты» |
| 6 | **Популярное** | `#popular` | Тёмный блок `#0E1117`, 6 карточек 3:4: плашка-стекло (ховер) |
| 7 | **Бизнесу** | `#business` | 4 направления + CTA на форум |
| 8 | **Креаторам** | `#creators` | Flow: Промпт → Картинка → Песочница → Голоса → Каталог |
| 9 | **Приватность** | — | 4 иконки: Сохранить, Перегенерировать, Удалить, Опубликовать |
| 10 | **FAQ** | `#faq` | 10 вопросов на нативном `<details>/<summary>` |
| 11 | **Финальный CTA** | — | «Попробуйте создать первое AI-фото» + кнопки |
| 12 | **Footer** | — | Логотип, ссылки на Telegram/Privacy/Terms, копирайт |

## Поведение карточек

**Галерея и Популярное — hover-раскрытие:**
- По умолчанию: только фото, без текста, без фона
- При наведении: появляется стеклянная плашка (50% прозрачности, `backdrop-filter: blur(16px)`) с названием, хэштегами/описанием и CTA
- Карточки портретные — `aspect-ratio: 3/4`, фото 450×600
- Фото не обрезаются, не деформируются

**Ссылки:**
- Нижняя синяя кнопка в галерее → форум (пост-референс)
- Оверлей по центру → удалён
- Feature-карточки → форум
- Business CTA → форум
- Популярное → бот (генерация)
- Hero «Перейти в форум» → `t.me/ai_platform_image`

## CSS — дизайн-система

- **Фон:** `#FAFAFA` / `#F7F7F5` (светлая база)
- **Текст:** `#111111` (primary), `#6B7280` (secondary), `#9CA3AF` (tertiary)
- **Акцент:** `#2AABEE` (Telegram-blue, CTA)
- **Тёмный блок:** `#0E1117` (#popular)
- **Доп. цвета:** `#8B5CF6` (violet), `#F4A7C5` (pink), `#DDF4FF` (light blue), `#FFF5E8` (cream)
- **Шрифт:** Inter (Google Fonts, подгружается асинхронно)
- **Радиусы:** карточки 24 px, кнопки 999 px (pill)
- **Стекло:** `rgba(255,255,255,0.5)` + `blur(16px)` (галерея), `rgba(0,0,0,0.5)` + `blur(16px)` (популярное)
- **Адаптив:** mobile 360–767 px, tablet 768–1023 px, desktop 1024–1439 px, wide 1440+
- **Анимации:** CSS transitions/animations, Intersection Observer для fade-in

## JS — интерактивность (197 строк, vanilla)

| Функция | Описание |
|---------|----------|
| Sticky Header | Добавляет класс `.scrolled` при прокрутке > 20px |
| Mobile Menu | Бургер-кнопка, закрытие по Escape, ресайзу и клику по ссылке |
| Scroll Spy | Intersection Observer подсвечивает активный пункт навигации |
| Fade-in | Intersection Observer добавляет `.visible` секциям при появлении |
| Scroll Depth | Отслеживает 50% и 90% скролла |
| Analytics | `trackEvent()` для GTM (dataLayer) + Яндекс Метрики (reachGoal) |

## SEO

| Инструмент | Статус |
|------------|--------|
| `<title>` | «AI-фото в Telegram — фотосессии, аватары, карточки товара и восстановление фото» |
| `<meta description>` | С ключами из семантического ядра |
| `<meta keywords>` | 7 ключей |
| `<meta robots>` | index, follow |
| Canonical | `https://aiplatformimage.online/` |
| Open Graph | title, description, type, url, image (1200×630), locale (ru_RU) |
| Twitter Card | summary_large_image |
| JSON-LD WebSite | schema.org WebSite |
| JSON-LD SoftwareApplication | schema.org SoftwareApplication |
| JSON-LD FAQPage | 10 вопросов schema.org FAQPage |
| Alt-тексты | На всех 20 изображениях |
| robots.txt | Allow + Sitemap |
| sitemap.xml | Главная + privacy.html + terms.html |
| hreflang | ru (/) + en (/en/) + x-default (/) — двусторонние ссылки на всех страницах |

## Аналитика

| Система | ID | Размещение |
|---------|-----|-----------|
| Google Tag Manager | `GTM-W935FF33` | `<head>` + noscript в `<body>` |
| Яндекс Метрика | `109350622` | Перед `</body>`, webvisor, clickmap, ecommerce, trackLinks |
| data-event | 43 элемента | На всех CTA + scroll depth 50%/90% |

## События аналитики

43 элемента размечены атрибутом `data-event`:

- `click_telegram_header`
- `click_telegram_hero`
- `click_hero_examples`
- `click_example_card` (8 карточек, с `data-card`)
- `click_feature_card` (6 карточек, с `data-card`)
- `click_popular_card` (6 карточек, с `data-card`)
- `click_business_cta`
- `click_creator_cta`
- `click_final_cta`
- `click_final_cta_examples`
- `scroll_50`
- `scroll_90`

## Настройка перед деплоем

Ничего менять не нужно — все плейсхолдеры заменены:

- **`DOMAIN`** → `aiplatformimage.online` (11 вхождений)
- **`BOT_USERNAME`** → `ai_platform_image_bot` (все ссылки)
- **`G-XXXXXXXXXX`** → заменён на GTM `GTM-W935FF33`
- **Яндекс Метрика** → `109350622` (добавлена)
- **SVG-плейсхолдеры** → заменены на реальные `.webp` (16 файлов)
- **`og:image`** → `images/og-image.jpg` (1200×630, 181 KB)

## Деплой

### GitHub Pages
Залить содержимое папки `landing/` в ветку `gh-pages` или настроить GitHub Actions.

### Vercel / Netlify
Перетащить папку `landing/` в интерфейс — работает из коробки.

### Любой хостинг (nginx, Apache, Caddy)
Скопировать содержимое `landing/` в корень сайта. Настроек не требуется.

### Локально
Просто открыть `index.html` в браузере.

## Хронология доработок (21.05.2026)

1. SVG-плейсхолдеры заменены на реальные `.webp` (16 файлов)
2. Все ссылки заменены: `BOT_USERNAME` → `ai_platform_image_bot`, `landing_*` → `scenario_*`
3. Карточки переведены на портретный формат `aspect-ratio: 3/4` (фото 450×600)
4. Добавлен hover-эффект: плашка-стекло с текстом появляется при наведении
5. Убран центральный оверлей «Хочу также»
6. Нижняя кнопка галереи — скрыта по умолчанию, появляется при наведении
7. Ссылки: нижняя кнопка → форум, популярное → бот
8. Feature-карточки и Business CTA перенаправлены на форум
9. Hero-кнопка «Открыть в Telegram» → «Перейти в форум» (`t.me/ai_platform_image`)
10. Прозрачность плашек: 50% opacity + `backdrop-filter: blur(16px)`
11. Домен прописан: `aiplatformimage.online`
12. GA4 заменён на Google Tag Manager `GTM-W935FF33`
13. Добавлена Яндекс Метрика `109350622`
14. Финальная проверка: 0 плейсхолдеров, 16 изображений, 20 ссылок .webp в HTML

## Хронология доработок (27.05.2026) — английская локализация

1. Добавлена английская версия сайта в поддиректорию `en/` (3 страницы: index, privacy, terms)
2. Реализовано авто-определение языка через `navigator.language` (встроенный скрипт в `<head>`)
3. Русский браузер на `/en/` → авто-редирект на `/`, английский браузер на `/` → авто-редирект на `/en/`
4. Добавлен ручной переключатель EN/RU в хедере (десктоп) и мобильном меню
5. Выбор языка сохраняется в `sessionStorage` (флаг `lang_override`) до закрытия вкладки
6. CSS: добавлены стили `.lang-switch`, `.lang-switch-desktop`, версия поднята до v=15
7. SEO: hreflang-ссылки на всех 6 страницах, `og:locale:alternate`, x-default → русская версия
8. Английские страницы используют общие CSS/JS/images через относительные пути `../`
9. JSON-LD полностью переведён на английский (WebSite, SoftwareApplication, FAQPage — 10 Q&A)
10. Все `data-event`/`data-card` атрибуты сохранены для единой аналитики
11. sitemap.xml расширен до 6 URL (3 русских + 3 английских)

## Мультиязычность

Сайт поддерживает русский и английский языки. Определение языка происходит автоматически по `navigator.language`:

- **Авто-определение:** скрипт в `<head>` (до отрисовки) проверяет язык браузера и при несовпадении делает `location.replace()` на нужную версию
- **Ручной переключатель:** кнопка EN/RU в хедере (десктоп: между навигацией и CTA; мобильное: в бургер-меню)
- **Сохранение выбора:** при ручном переключении ставится `sessionStorage.lang_override`, авто-редирект отключается
- **Без JS:** ручной переключатель работает как обычная ссылка (авто-определение без JS не срабатывает)

URL-структура:
- Русский: `https://aiplatformimage.online/`, `/privacy.html`, `/terms.html`
- Английский: `https://aiplatformimage.online/en/`, `/en/privacy.html`, `/en/terms.html`

CSS, JS и изображения общие для обоих языков (не дублируются).

## Технические детали

- **Статический HTML** — без фреймворков, без сборщиков, без Node.js
- **FAQ на `<details>`** — работает без JavaScript
- **CSS Custom Properties** — все дизайн-токены в `:root`
- **Intersection Observer** — для fade-in и scroll spy (нет слушателей scroll для этого)
- **Passive scroll listeners** — для sticky header и scroll depth
- **Не используется:** jQuery, React, Vue, Bootstrap, Tailwind, Webpack, Vite, npm
