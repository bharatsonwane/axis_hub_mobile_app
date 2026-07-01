# Axis Hub Mobile — Run Guide

## Prerequisites

- Node.js `>= 22.11.0` (see `.nvmrc`)
- Xcode (iOS) or Android Studio (Android)
- CocoaPods (`gem install cocoapods`) for iOS
- Watchman (recommended): `brew install watchman`

## First-time setup

```bash
cd axis_hub_mobile_app
npm install
cp .env.sample .env
cd ios && pod install && cd ..
```

Edit `.env` if you need a different API URL. Rebuild the native app after changing `.env`.

## Start Metro

```bash
npm start
```

## Run on a device or simulator

```bash
# iOS
npm run ios

# Android
npm run android
```

## Quality checks

```bash
npm test
npm run lint
```

## Project entry

- JS entry: `index.js` → `src/app/App.tsx`
- Path alias: `@/` → `src/`

## Auth flow (Phase 1)

1. Launch app → session restore reads JWT from Keychain → `GET /api/auth/profile`
2. No token or invalid session → **Login** screen
3. Sign in → token stored in Keychain → profile fetch → portal context set from `getDefaultPortalDestination`
4. **Log out** from the home placeholder screen, or via 401 from any API call

Ensure `.env` `API_BASE_URL` points at a reachable backend before testing login.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Env vars not updating | Rebuild native app (`npm run ios` / `android`) after `.env` changes |
| iOS build fails after new native deps | `cd ios && pod install && cd ..` |
| Metro cache issues | `npm start -- --reset-cache` |
