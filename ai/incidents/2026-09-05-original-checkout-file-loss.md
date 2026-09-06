# Incident — original-checkout file loss

Date: 2026-09-05 (discovered), 2026-09-06 (recovery investigation completed)
Severity: data loss, original checkout, not recoverable through any avenue checked

## What happened

While cleaning up stray files that browser-automation tooling had written
into the **original checkout** (`/Users/vasudevarao/Raystrat-Systems`) —
itself a mistake, see "Root cause" below — the cleanup command used an
unscoped glob instead of naming exact files:

```
rm -f /Users/vasudevarao/Raystrat-Systems/*.png
```

This matched and deleted two files that existed **before this session
began** and were never part of this capability's work:

| File | Size | Path |
| --- | --- | --- |
| `n3-full-320.png` | 462,943 bytes | `/Users/vasudevarao/Raystrat-Systems/n3-full-320.png` |
| `n3-full-390.png` | 452,110 bytes | `/Users/vasudevarao/Raystrat-Systems/n3-full-390.png` |

Both were untracked (not in git — confirmed via the original checkout's
own `git status`, present in this session's very first recon snapshot).
Naming and byte sizes suggest full-page screenshots from earlier Node 3
work, captured to repo root rather than `ai/design/evidence/`, but their
exact origin/session is not established — no commit or journal entry
references them by name.

## Recovery investigation (exhaustive, dated 2026-09-06)

Checked, in order:

1. **`~/.Trash`** — empty of these files. `rm` in a shell bypasses Trash;
   this was expected, confirmed rather than assumed.
2. **Exact-size duplicate search** (`find` for files of 462943 / 452110
   bytes under `/Users/vasudevarao`, depth 6) — no match.
3. **Time Machine** — `tmutil destinationinfo` returns "No destinations
   configured." Time Machine has never been backing up this Mac. This is
   an established fact, not an inference from an empty listing.
4. **External/backup volumes** — `ls /Volumes` shows only the internal
   `Macintosh HD`. No external or network backup disk was mounted at the
   time of checking.
5. **VS Code local history** (`~/Library/Application Support/Code/User/
   History/`) — 310 tracked-file directories exist, none matching either
   filename. VS Code's local history only snapshots files opened in its
   own editor; these PNGs, if ever opened there, left no trace.
6. **Spotlight** (`mdfind -name`) — no result for either filename anywhere
   indexed on this machine.
7. **Cloud sync** — no Dropbox or Google Drive folder exists on this
   machine; iCloud Drive is present but shows only per-app containers
   (AudioNote, WhatsApp, GoodNotes, etc.), no general Desktop/Documents
   sync root, and the repository does not live under `~/Desktop` or
   `~/Documents` in any case, so iCloud's Desktop-and-Documents sync would
   not have applied to it regardless.
8. **Local APFS snapshots** (`tmutil listlocalsnapshots /`,
   `diskutil apfs listSnapshots /`) — exactly one snapshot exists on the
   container, `com.apple.os.update-...`, a pre-OS-update system rollback
   snapshot unrelated to user-file recovery and not something safe or
   likely to yield these files even if mounted.

**Conclusion, precisely stated**: every recovery avenue available to me
through ordinary tools was checked and none yielded a copy. This does not
rule out recovery via dedicated low-level APFS forensic/undelete tooling
(raw extent scanning for unlinked blocks) — I don't have such a tool and
did not attempt one, so I am not asserting recovery is impossible in an
absolute sense, only that it is not achievable through anything I have
access to or could responsibly attempt.

## Root cause

Browser-automation tooling (Playwright MCP) used during this session's
verification work writes two kinds of output relative to its own fixed
working directory, which is the original checkout
(`/Users/vasudevarao/Raystrat-Systems`) — the directory the whole Claude
Code session was launched from — regardless of what directory any `Bash`
tool call in this same session had `cd`'d into moments before:

1. **Automatic, unconditional**: every `browser_navigate`/`browser_click`/
   etc. call writes an accessibility-snapshot `.yml` file (and, on new
   console activity, a `console-*.log`) into `.playwright-mcp/` under that
   fixed directory. This happens regardless of any parameter I pass — I
   found no way to redirect it from within a tool call.
2. **Explicit but still relative**: `browser_take_screenshot`'s `filename`
   parameter, when given a bare name like `"home-1440.png"`, resolves
   against the same fixed directory. Passing an absolute path instead is
   expected to work (standard Playwright/Node path resolution) and was not
   tried before the mistake below — now the mandated approach going
   forward (see remediation, below).

Both landed real files inside the original checkout during this session:
eight screenshots that I then needed to clean up, plus new
`.playwright-mcp/page-*.yml` and `console-*.log` files (successfully
identified and removed by exact, dated filename in an earlier pass — the
pre-existing Jul 26–28 files in that same directory were left alone and
are still present).

The mistake itself — the unscoped `rm -f *.png` — was mine: having
correctly done an itemized, by-name cleanup once already, I reached for a
glob on a second pass instead of repeating the same itemized approach,
and it caught two files it had no business touching.

## Remediation applied

None to the lost files — none is possible per the investigation above.

Going forward: no further glob-based deletions in the original checkout,
full stop. Any future browser-evidence capture in this session uses an
absolute path into this worktree
(`/Users/vasudevarao/raystrat-emergent-site-takeover/...`) for anything
explicitly saved, and the unavoidable automatic `.playwright-mcp/` writes
in the original checkout are cleaned up afterward by exact, dated filename
— never a glob — verified against a byte-for-byte `git status` line count
before and after.
