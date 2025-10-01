# Tasks: AppImage Manager Gnome Extension

**Input**: Design documents from `/specs/001-build-a-gnome/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Phase 3.1: Setup
- [x] T001 [P] Configure ESLint and Prettier for the project in `.eslintrc.json` and `.prettierrc.json`.

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T002 [P] Implement unit tests for `AppImageManager` in `tests/unit/test_appImageManager.js`.
- [x] T003 [P] Implement unit tests for `FileMonitor` in `tests/unit/test_fileMonitor.js`.
- [x] T004 [P] Implement unit tests for `LauncherService` in `tests/unit/test_launcherService.js`.
- [x] T005 [P] Implement integration test for adding and removing an AppImage in `tests/integration/test_quickstart.js`.

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T006 Implement the `AppImage` entity in `src/appImageManager.js`.
- [x] T007 Implement the `Launcher` entity in `src/launcherService.js`.
- [x] T008 Implement the `MonitoredDirectory` entity in `src/fileMonitor.js`.
- [x] T009 Implement the `addAppImage` function in `src/appImageManager.js`.
- [x] T010 Implement the `removeAppImage` function in `src/appImageManager.js`.
- [x] T011 Implement the `start` function in `src/fileMonitor.js`.
- [x] T012 Implement the `stop` function in `src/fileMonitor.js`.
- [x] T013 Implement the `createLauncher` function in `src/launcherService.js`.
- [x] T014 Implement the `removeLauncher` function in `src/launcherService.js`.

## Phase 3.4: Integration
- [x] T015 Integrate `FileMonitor` with `AppImageManager` in `extension.js`.
- [x] T016 Integrate `AppImageManager` with `LauncherService` in `src/appImageManager.js`.

## Phase 3.5: Polish
- [x] T017 [P] Update `README.md` with usage instructions.
- [x] T018 [P] Run manual tests as described in `specs/001-build-a-gnome/quickstart.md`.

## Dependencies
- Tests (T002-T005) before implementation (T006-T014)
- T006, T007, T008 can be done in parallel.
- T009-T014 depend on T006, T007, T008.
- T015 depends on T011, T012, T009, T010.
- T016 depends on T009, T010, T013, T014.

## Parallel Example
```
# Launch T002-T005 together:
Task: "Implement unit tests for AppImageManager in tests/unit/test_appImageManager.js"
Task: "Implement unit tests for FileMonitor in tests/unit/test_fileMonitor.js"
Task: "Implement unit tests for LauncherService in tests/unit/test_launcherService.js"
Task: "Implement integration test for adding and removing an AppImage in tests/integration/test_quickstart.js"
```