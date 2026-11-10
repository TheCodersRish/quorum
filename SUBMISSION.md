# Submission packet

This file is a worksheet. It is not a filing. The 2026 Congressional App Challenge closed on October 26, 2026, at 9:00 p.m. ET. Hack Club's published Capitol deadline for that round was the same day. Use this when the next window is open, and only after you have changed the project yourself.

## What only you can do

- Create the public GitHub repository under your account, if this project is not already there.
- Register with your own email, home address, school, congressional district, and a parent or guardian's contact. School email addresses are not accepted for registration.
- Record the demo video with your name and your face or voice. A written script is below. The recording has to be yours.
- Install Hackatime in your editor and spend an hour or more editing this project under the name `quorum`. Time spent by an agent does not appear on your account.
- Disclose the AI assistance in your own words.

## Congressional App Challenge

Rules and registration: [congressionalappchallenge.us](https://www.congressionalappchallenge.us/students/student-registration/).

| Field | Draft you can edit |
| --- | --- |
| App name | Quorum |
| Platform | Web |
| Languages | TypeScript, CSS |
| Purpose, one sentence | Quorum teaches how a bill actually moves by letting a student draft one and whip a simulated House vote. |
| Who it is for | Students who want to understand Congress well enough to write to their member. |
| Tools | Next.js, React, and Cursor's coding agent. Say what you changed after the agent draft. |

Short description you can start from, then rewrite:

> Quorum is a classroom model of the U.S. House. A student picks a local problem, writes it as a bill, and answers objections on a simulated floor. The simulation uses the real quorum rule: 218 members must be present, and an ordinary bill passes by a majority of those voting, not by 218 ayes. The app then drafts a letter, because a student cannot introduce a bill.

Technical difficulty: answer this from a bug you hit while editing. If you have not hit one yet, change `src/lib/debate.ts` until a careless path fails and a careful path passes, and write about that.

What still needs work: the floor is only the House. A Senate model would need cloture. Findings in the starter issues are prompts, not sourced research.

### Demo video, 1 to 3 minutes

Record the screen, with your voice. Upload it publicly on YouTube or Vimeo.

1. Say your name, and the name Quorum.
2. Say the purpose in one sentence, and that it is for students.
3. Say you used TypeScript and Next.js, and say plainly what the AI drafted and what you changed.
4. Show the chamber and the line that 218 is a quorum, not a victory.
5. Open a draft, show a finding, and show the clerk's note that tells you to check it.
6. Send it to the floor, pick two different answers, and show the whip count move.
7. Show the result and the letter. Say that you still have to look up your member.

## Hack Club

When submissions are open:

1. The repository is public and includes this README, the screenshots, and `LICENSE`.
2. The playable link is the deployed site.
3. The Hackatime project name is `quorum`.
4. Send the repository from the page at [capitol.hackclub.com/certificate](https://capitol.hackclub.com/certificate), or ask in the Hack Club Slack channel `#hackatime-help` if the form is not obvious. The program mailbox is capitol@hackclub.com.

## Hackatime, on your machine

Follow [the Cursor guide](https://hackatime.hackclub.com/docs/editors/cursor). Install the WakaTime extension, not an unofficial "Hackatime" extension. The API key stays in `~/.wakatime.cfg` on your computer. This repo only names the project, in `.wakatime-project`.
