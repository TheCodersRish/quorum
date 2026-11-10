import type { Bill } from "@/lib/types"

export type BillSection = {
  heading: string
  body: string
}

export function billSections(bill: Bill): BillSection[] {
  const findings = bill.findings
    .map((finding) => finding.trim())
    .filter(Boolean)
    .map((finding, index) => `(${index + 1}) ${finding}`)

  const sections: BillSection[] = [
    {
      heading: "SECTION 1. SHORT TITLE.",
      body: `This Act may be cited as the "${bill.shortTitle.trim() || "Untitled Act"}".`,
    },
    {
      heading: "SECTION 2. FINDINGS.",
      body:
        findings.length > 0
          ? `Congress finds the following:\n${findings.join("\n\n")}`
          : "Congress finds the following: [the findings are still blank].",
    },
  ]

  bill.provisions.forEach((provision, index) => {
    const heading = provision.heading.trim() || "UNTITLED"
    const text = provision.text.trim() || "[This section is still blank.]"
    sections.push({
      heading: `SECTION ${index + 3}. ${heading}.`,
      body: text,
    })
  })

  sections.push({
    heading: `SECTION ${bill.provisions.length + 3}. FUNDING.`,
    body: bill.payFor.trim() || "[The funding section is still blank.]",
  })

  return sections
}

export function billPlainText(bill: Bill): string {
  const sections = billSections(bill)
    .map((section) => `${section.heading}\n${section.body}`)
    .join("\n\n")
  const notes =
    bill.amendmentNotes.length > 0
      ? `\n\nClerk's annotation. Amendments offered on the simulated floor:\n${bill.amendmentNotes
          .map((note, index) => `(${index + 1}) ${note}`)
          .join("\n")}`
      : ""

  return [
    "119th CONGRESS",
    "2d Session",
    "",
    "H.R. ____",
    "",
    `${displayTitle(bill.officialTitle)}.`,
    "",
    "IN THE HOUSE OF REPRESENTATIVES",
    "",
    "A student draft, for a simulated session. Not introduced.",
    "",
    bill.amended ? "A BILL, as amended in a simulated House" : "A BILL",
    "",
    `${displayTitle(bill.officialTitle)}.`,
    "",
    "Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled,",
    "",
    sections,
    notes,
  ].join("\n")
}

export function displayTitle(title: string): string {
  const trimmed = title.trim().replace(/\.$/, "")
  if (!trimmed) return "[the official title is still blank]"
  if (/^to\s/i.test(trimmed)) {
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  }
  return `To ${trimmed}`
}

export function letterText(bill: Bill): string {
  const place = bill.state.trim() || "[your state]"
  const name = bill.sponsorName.trim() || "[your name]"
  const title = bill.shortTitle.trim() || "an untitled draft"
  const provisions = bill.provisions
    .filter((provision) => provision.heading.trim() || provision.text.trim())
    .slice(0, 3)
    .map((provision) => `• ${provision.heading.trim() || "Section"}. ${provision.text.trim()}`)
    .join("\n")

  return [
    `Dear Representative,`,
    "",
    `My name is ${name}. I am a student in ${place}. I am writing about a draft I prepared, the "${title}." It is not a bill until a member of Congress introduces it. I am asking your office to tell me what is wrong with it.`,
    "",
    `The draft would do the following:`,
    provisions || "• [The operative sections are still blank.]",
    "",
    `On money, the draft says: ${bill.payFor.trim() || "[the funding section is still blank]."}`,
    "",
    "I have not treated the findings as finished. I can bring a source for each one I keep. If the drafting is the problem, I would rather hear that than receive a form letter that praises the topic.",
    "",
    "Thank you for the time your staff gives to mail from students.",
    "",
    "Sincerely,",
    name,
    place,
  ].join("\n")
}
