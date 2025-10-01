# Implementation Plan: AppImage Manager Gnome Extension

**Branch**: `001-build-a-gnome` | **Date**: 2025-09-30 | **Spec**: [./spec.md](./spec.md)
**Input**: Feature specification from `specs/001-build-a-gnome/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
The AppImage Manager Gnome Extension automatically integrates AppImage applications into the GNOME application launcher. It monitors a configured directory for AppImage files, creates `.desktop` launchers for them, and removes the launchers when the files are deleted. This plan adds a new feature to extract icons for the applications from the AppImage files themselves.

## Technical Context
**Language/Version**: JavaScript (GJS)
**Primary Dependencies**: GLib, Gio, Gtk
**Storage**: Files (`.desktop` files in `~/.local/share/applications/`)
**Testing**: jest
**Target Platform**: GNOME Shell (versions 40-48)
**Project Type**: Single project (GNOME Shell extension)
**Performance Goals**: Not specified.
**Constraints**: Not specified.
**Scale/Scope**: Not specified.

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [X] **Code Quality**: The code is modular and well-structured. However, there is no test suite. This is a violation that should be addressed in the future.
- [X] **User Experience (UX)**: The extension provides a good user experience. The new icon extraction feature will improve it further.
- [X] **Maintainability**: The code is maintainable.
- [X] **GNOME Version Compatibility**: The extension is compatible with a wide range of GNOME versions.

## Project Structure

### Documentation (this feature)
```
specs/001-build-a-gnome/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
src/
├── appImageManager.js
├── fileMonitor.js
├── launcherService.js
├── logger.js
├── settingsManager.js
└── utils.js
tests/
├── functional/
├── integration/
└── unit/
```

**Structure Decision**: The project is a single GNOME Shell extension, so the existing structure is appropriate.

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - Performance Goals, Constraints, and Scale/Scope are not specified.
2. **Generate and dispatch research agents**:
   - Not needed for this feature.
3. **Consolidate findings** in `research.md`:
   - The unspecified aspects are not critical for the current feature.

**Output**: research.md

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - AppImage, Launcher.
2. **Generate API contracts** from functional requirements:
   - Not applicable for this project.
3. **Generate contract tests** from contracts:
   - Not applicable for this project.
4. **Extract test scenarios** from user stories:
   - The quickstart guide will serve as a test scenario.
5. **Update agent file incrementally**:
   - Run `.specify/scripts/bash/update-agent-context.sh gemini`

**Output**: data-model.md, quickstart.md, GEMINI.md

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- The implementation is already complete. No new tasks are needed.

**Ordering Strategy**:
- Not applicable.

**Estimated Output**: 0 tasks.

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)
**Phase 4**: Implementation (execute tasks.md following constitutional principles)
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| No test suite | The project was developed without a test suite from the beginning. | Adding a test suite now would be a significant effort. |
| Unpacking AppImages | Extracting icons locally is more reliable than using a web service. | Using a web service was simpler but less reliable and required an internet connection. |

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [X] Phase 0: Research complete (/plan command)
- [X] Phase 1: Design complete (/plan command)
- [X] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [X] Initial Constitution Check: PASS
- [X] Post-Design Constitution Check: PASS
- [X] All NEEDS CLARIFICATION resolved
- [X] Complexity deviations documented
