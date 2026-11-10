export type StationChoice = {
  label: string
  result: string
}

export type Station = {
  id: string
  kicker: string
  title: string
  body: string[]
  aside?: string
  choice?: {
    prompt: string
    options: StationChoice[]
  }
}

export const STATIONS: Station[] = [
  {
    id: "member",
    kicker: "Before the text",
    title: "Only a member can introduce it",
    body: [
      "A student, a mayor, a lobbyist, or an aide can write a bill. None of them can introduce one. Introduction is an act of a member of Congress, in that member's own chamber.",
      "That is why the letter at the end of Quorum asks an office what is wrong with the draft. It does not pretend you have filed anything.",
    ],
    aside: "If you remember one limit in this app, remember this one.",
  },
  {
    id: "hopper",
    kicker: "Introduction",
    title: "The hopper, the number, the title",
    body: [
      "In the House, a member introduces a bill by placing it in the hopper. It receives a number, H.R. followed by digits, and a short title people can say out loud. The official title is the long “to” sentence.",
      "The Senate uses S. followed by digits. The number is not a measure of importance. It is the order of introduction.",
    ],
  },
  {
    id: "referral",
    kicker: "Parliamentarian",
    title: "Someone decides which committee gets it",
    body: [
      "After introduction, the bill is referred to a committee. In the House, the Parliamentarian refers it according to the committee's jurisdiction, the subject matter written into the rules.",
      "A bill about school meals, buses, and newsrooms at once will be pulled apart, or it will annoy every chair who receives a piece of it. Narrow text is not a lack of ambition. It is how referral stays clean.",
    ],
  },
  {
    id: "committee",
    kicker: "Where most bills stop",
    title: "Hearing, markup, or silence",
    body: [
      "A committee can hold a hearing, debate and amend the bill in a markup, and report it to the floor. It can also do nothing. Most introduced bills receive no further action. No rule requires a chair to schedule yours.",
      "A hearing is not passage. A markup is not passage. “Reported” means the committee sent the bill forward. The House still has to take it up.",
    ],
    choice: {
      prompt: "The chair never schedules your bill. You staff the member. What do you do?",
      options: [
        {
          label: "Collect cosponsors",
          result:
            "Cosponsors are a way to show the chair that other members will be annoyed by the silence. They are not a vote, and they do not force a hearing. They change the politics of doing nothing.",
        },
        {
          label: "Rewrite it to fit the chair's jurisdiction",
          result:
            "A bill the committee recognizes as its own work is easier to schedule than a bill that wanders into two other committees. You may have to cut the sentence you loved.",
        },
        {
          label: "Issue a press release",
          result:
            "The release is public. The bill is still in the committee. Attention can raise the cost of silence. It can also make the chair less willing to do you a favor.",
        },
      ],
    },
  },
  {
    id: "floor-rules",
    kicker: "Getting to the floor",
    title: "The House and the Senate do not open the door the same way",
    body: [
      "In the House, the Rules Committee usually writes a rule for major bills: how long the debate lasts, and which amendments are in order. A closed rule allows no amendments. A structured rule allows only the ones listed. An open rule is rare for the bills people have heard of.",
      "The Senate has no Rules Committee playing that part. Floor time is usually set by unanimous consent. A single senator can object. To end a filibuster, the Senate usually needs cloture, three-fifths of the senators duly chosen and sworn. With no vacancies, that number is 60. It is not 51, and it is not 218.",
    ],
    aside: "Quorum's floor is a House floor. Do not take its aye count and pretend it is the Senate.",
  },
  {
    id: "vote",
    kicker: "The roll",
    title: "A quorum and a majority are different numbers",
    body: [
      "Article I, section 5 says a majority of each house “shall constitute a Quorum to do Business.” In a House of 435 voting members, a majority is 218. Without a quorum, the House is not supposed to legislate.",
      "Passage of an ordinary bill is a majority of the members voting aye or nay, if a quorum is present. If 300 members vote and the rest are absent or silent, 151 ayes can pass it. You can also lose with 200 ayes, if 201 members vote no. Suspension of the rules, and a veto override, are different: those take two-thirds.",
    ],
  },
  {
    id: "other",
    kicker: "The other chamber",
    title: "The same words, or it is not the same bill",
    body: [
      "A bill must pass the House and the Senate in identical form. If the second chamber amends it, the first chamber has to agree, or the two chambers appoint conferees and try to write one text.",
      "Until the words match, there is nothing to send to the President. A stirring House vote is a House vote.",
    ],
    choice: {
      prompt: "The Senate passes your bill, then strikes the operative section and substitutes its own. What now?",
      options: [
        {
          label: "Ask the House to swallow the Senate text",
          result:
            "If the House agrees to the Senate amendment, the words match and the bill can be enrolled. Your member has to decide whether the remaining text is still worth passing.",
        },
        {
          label: "Ask for a conference",
          result:
            "Conferees from each chamber negotiate a report. Both chambers then have to agree to that report. Conference is a place bills improve, and a place they stall.",
        },
        {
          label: "Start over in the next Congress",
          result:
            "A bill dies at the end of a Congress if it has not been enacted. The 119th Congress ends with 2026. A draft can be introduced again. It does not keep its old number.",
        },
      ],
    },
  },
  {
    id: "presentment",
    kicker: "Article I, section 7",
    title: "The President has the next move",
    body: [
      "The enrolled bill is presented to the President. The President can sign it, and it becomes law. The President can veto it and return it, with objections, to the chamber where it originated. Or the President can do nothing.",
      "If Congress is in session and ten days pass, Sundays excepted, an unsigned bill becomes law. If Congress has adjourned in a way that prevents the return of the bill, an unsigned bill does not become law. That situation is called a pocket veto. The edges of it are more complicated than the nickname, which is why a real veto fight is a lawyer's problem.",
    ],
  },
  {
    id: "after",
    kicker: "After the signature",
    title: "A statute still needs people, money, and time",
    body: [
      "An agency may have to write a procedure before anyone's life changes. A criminal statute and a grant program do not “take effect” in the same way. Read the effective-date section.",
      "If your bill authorizes money but the appropriations bill never includes it, the authority can sit on the page. Passage is the beginning of administration, not the end of the story.",
    ],
    aside: "The simulated vote in Quorum stops at the House. The rest of this path is still in front of any draft you keep.",
  },
]
