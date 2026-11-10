import type { Amendment, Bill, Tally } from "@/lib/types"

export type Reply = {
  id: string
  label: string
  speech: string
  clerk: string
  delta: Partial<Tally>
  note?: string
  amendment?: Amendment
  recommit?: boolean
}

export type Round = {
  id: string
  member: string
  role: string
  speech: string
  replies: Reply[]
}

export function roundsFor(bill: Bill): Round[] {
  const title = bill.shortTitle.trim() || "this untitled draft"
  const place = bill.state.trim() || "the member's state"
  const purpose = bill.officialTitle.trim().replace(/\.$/, "") || "do the thing named in the blank title"

  return [
    {
      id: "cosponsor",
      member: "Rep. Elias Ward",
      role: "A simulated cosponsor",
      speech: `I reserved this time because the aide has a short bill. The title is the “${title}.” The text can be read in one sitting. I ask my colleagues to stay on the floor long enough to hear the objection, not only the praise.`,
      replies: [
        {
          id: "listen",
          label: "Ask the chamber to stay",
          speech:
            "I thank the gentleman. Colleagues, this is a short text. Please hear the next two speakers before you decide it belongs to someone else.",
          clerk: "Courtesy is not a vote. People who stay, though, can still be counted.",
          delta: { aye: 16 },
        },
        {
          id: "local",
          label: "Add a local finding",
          speech: `I ask unanimous consent to add one finding: students and families in ${place} are among the people this draft is written for, and the office will attach a local source before any real introduction.`,
          clerk:
            "On a real floor you would need the rule, or unanimous consent, to change the text. The finding is only as good as the source you attach later.",
          delta: { aye: 12 },
          note: `Added a finding naming ${place}, with a promise to attach a local source.`,
          amendment: {
            kind: "finding",
            text: `People in ${place} are among those affected, and any real introduction of this draft should attach a local source for that claim.`,
          },
        },
        {
          id: "yield",
          label: "Yield back",
          speech: "I yield back the balance of my time.",
          clerk: "Yielding back ends the turn. It does not pass the bill, and it does not answer anyone.",
          delta: { aye: 2 },
        },
      ],
    },
    {
      id: "cost",
      member: "Rep. Helen Voss",
      role: "Watching the cost",
      speech: `I do not quarrel with the problem. I quarrel with the last section. It talks about money without a score from the Congressional Budget Office. I will not vote for a number nobody has produced. What does the gentleman say the “${title}” costs?`,
      replies: [
        {
          id: "pilot",
          label: "Cut it to a pilot",
          speech:
            "I offer an amendment. The new authority is a five-year pilot. This Act does not appropriate funds. When the pilot ends, the authority ends with it.",
          clerk:
            "A pilot is easier to vote for because it expires. It is also easier to forget. You gave up size to keep the bill alive.",
          delta: { aye: 22, nay: -12 },
          note: "Limited the new authority to a five-year pilot and struck any implication that funds are already appropriated.",
          amendment: {
            kind: "appendPayFor",
            text: "As amended on the simulated floor: the new authority is limited to a five-year pilot, and this Act does not appropriate funds.",
          },
        },
        {
          id: "defend",
          label: "Defend the full text",
          speech:
            "The cost of leaving the problem alone is the cost I came here to talk about. I oppose the gentlewoman's cut.",
          clerk:
            "A speech about need does not answer a question about score. Members who were undecided just heard that there is no limit.",
          delta: { aye: 2, nay: 18 },
        },
        {
          id: "honest",
          label: "Admit there is no score",
          speech:
            "The gentlewoman is right. This draft has not been scored. I will not invent a dollar figure. The words are an authorization, not an appropriation, and a real introduction would wait for the Congressional Budget Office.",
          clerk: "Honesty picked up votes. Members would rather hear “I do not know” than a fake number.",
          delta: { aye: 12, nay: -4 },
        },
      ],
    },
    {
      id: "committee",
      member: "Rep. Chris Pell",
      role: "From the committee of jurisdiction",
      speech:
        "The committee of jurisdiction already has a program that touches this subject. I do not want a second office doing the first office's job under a new name. Tell me why this text should not come back to us.",
      replies: [
        {
          id: "narrow",
          label: "Narrow it so it does not duplicate",
          speech:
            "I offer an amendment. Nothing in this Act authorizes a new office to perform work an existing program already performs. The text covers only the gap named in the findings.",
          clerk:
            "Jurisdiction fights kill more bills than loud debates do. Narrowing the text is how staff make a chair less hostile.",
          delta: { aye: 18, nay: -8 },
          note: "Added a rule of construction so the bill cannot duplicate work an existing program already does.",
          amendment: {
            kind: "provision",
            heading: "RULE OF CONSTRUCTION",
            text: "Nothing in this Act authorizes a new office to perform work an existing federal program already performs. This Act covers only the gap described in the findings.",
          },
        },
        {
          id: "recommit",
          label: "Move to recommit",
          speech:
            "I move to recommit the bill to committee, with instructions to hold a hearing before it returns to the floor.",
          clerk:
            "Recommittal is not defeat, and it is not passage. The bill leaves the floor. Most bills that go back to committee stay there, unless someone schedules them.",
          delta: {},
          recommit: true,
        },
        {
          id: "insist",
          label: "Tell the committee it has waited long enough",
          speech: "With respect, the committee has had years. I want a vote today.",
          clerk:
            "Picking a fight with the committee of jurisdiction is a reliable way to lose members who were ready to say aye.",
          delta: { nay: 28 },
        },
      ],
    },
    {
      id: "whip",
      member: "Rep. Marisol Vega",
      role: "Counting the undecided votes",
      speech: `I have counted heads. The members still in the cloakroom are not waiting for another speech about the problem. They want one sentence on what the “${title}” does, and then they want to vote. Give them the sentence.`,
      replies: [
        {
          id: "sentence",
          label: "One sentence, then the vote",
          speech: `One sentence. This is a bill ${
            purpose.toLowerCase().startsWith("to ") ? purpose : `to ${purpose}`
          }. I ask for the yeas and nays.`,
          clerk:
            "In the real House, the previous question is how debate ends. You did the smaller thing: you stopped talking.",
          delta: { aye: 12 },
        },
        {
          id: "clarify",
          label: "Delay the effective date",
          speech:
            "I offer a clarifying amendment. This Act takes effect on the date the Secretary publishes the implementing procedure in the Federal Register, and not before.",
          clerk:
            "A delayed effective date gives nervous members, and the agency, time. It also means the problem continues until that notice exists.",
          delta: { aye: 10, nay: -2 },
          note: "Delayed the effective date until the agency publishes a procedure in the Federal Register.",
          amendment: {
            kind: "provision",
            heading: "EFFECTIVE DATE",
            text: "This Act takes effect on the date the Secretary publishes the implementing procedure in the Federal Register.",
          },
        },
        {
          id: "gallery",
          label: "Speak to the people you came for",
          speech: `I came to this sitting with a student from ${place}. I am not going to pretend the only thing in the room is the count.`,
          clerk:
            "The gallery is not the House. A few members liked the reminder. A few wanted you to call the vote.",
          delta: { aye: 6, nay: 4 },
        },
      ],
    },
  ]
}
