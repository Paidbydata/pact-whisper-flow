## Task Observer (skill-improvement logging)

Invoke the task-observer skill at the start of every substantive task (tools, decisions or deliverables). Its log lives in the private repo `Paidbydata/skill-observations` (`skill-observations/log.md`, branch `main`) — never in this repo or the session workspace. Full rule: global OS v3.6, `ai-operating-center/os/CLAUDE.md` → Active Skills → task-observer.

If the global OS isn't loaded (e.g. Claude Code on the web): fetch the log fresh before appending, add the next `### Observation N:` at the end with `**Status:** OPEN`, push; on rejection, re-fetch and renumber. If the log repo isn't reachable, say so and hand the observations to Roy at session end.
