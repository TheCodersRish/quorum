import type { Issue } from "@/lib/types"

export const ISSUES: Issue[] = [
  {
    id: "meal-debt",
    name: "Unpaid school meals",
    who: "Students in the cafeteria line",
    problem:
      "In some cafeterias, an unpaid balance becomes a stamp, a different tray, or a separate line. The point of a bill is to stop the public part, not to invent a national dollar figure you cannot source.",
    shortTitle: "Student Meal Dignity Act",
    officialTitle:
      "to prohibit a school that receives federal meal funds from publicly identifying a student because of an unpaid meal charge, and for other purposes.",
    findings: [
      "The National School Lunch Program is administered by the United States Department of Agriculture. Schools that take those funds already operate under federal meal rules.",
      "Some school districts still use a visible mark, a separate line, or a different meal when a student's account has an unpaid charge. Local policies often forbid the practice. The practice still gets reported.",
      "The Community Eligibility Provision lets high-poverty schools serve meals without an application from each family. It does not, by itself, decide what a cafeteria does about an unpaid charge in a school outside that program.",
    ],
    provisions: [
      {
        heading: "PUBLIC IDENTIFICATION",
        text: "A local educational agency that receives federal funds for school meals shall not publicly identify a student, including by a stamp, a wristband, a token, a separate line, or a different meal, because the student has an unpaid meal charge.",
      },
      {
        heading: "HOUSEHOLD NOTICE",
        text: "The agency shall send a notice about an unpaid charge to the household, and shall not require the student to carry that notice as the only copy.",
      },
      {
        heading: "REPORT",
        text: "Within 18 months after the date of enactment, the Secretary of Agriculture shall report to the committees of jurisdiction on compliance. The report shall not name individual students.",
      },
    ],
    payFor:
      "This draft authorizes such sums as may be necessary for the report. It does not appropriate money, and it does not create a new meal benefit. A real introduction would go to the Congressional Budget Office before anyone claimed a cost.",
    clerkNote:
      "Do not write a dollar figure for school meal debt unless you can hand someone the source. Your own district's unpaid-meal policy is a stronger finding than a number from a headline.",
    check: "Your district's unpaid meal charge policy, or a conversation with a school nutrition director.",
  },
  {
    id: "after-school",
    name: "The hours after the bell",
    who: "Students whose adults are still at work",
    problem:
      "Dismissal and the end of a shift are not the same hour. A grant priority can favor programs that stay open. It cannot promise every student a seat.",
    shortTitle: "Three to Six Act",
    officialTitle:
      "to give priority, in community learning center grants, to programs that stay open until the end of the local workday, and for other purposes.",
    findings: [
      "The 21st Century Community Learning Centers program is authorized in title IV, part B, of the Elementary and Secondary Education Act. It is a competition for grants, not a guarantee of an after-school seat.",
      "The hours between dismissal and the end of a shift are when a student is least likely to have both a building that is open and an adult who is free.",
      "A grant priority changes who wins money Congress may decide to provide. It does not create a new individual right.",
    ],
    provisions: [
      {
        heading: "PRIORITY",
        text: "When awarding grants for community learning centers, the Secretary of Education shall give priority to an eligible application that keeps a site open until at least 6 p.m. on school days and describes a way home.",
      },
      {
        heading: "NO NEW RIGHT",
        text: "Nothing in this Act entitles a student to a seat. An agency that does not receive a grant is not, for that reason, in violation of this Act.",
      },
      {
        heading: "FAMILIES",
        text: "An application shall describe how families helped choose the hours. The Secretary shall not dictate the activities, except that they must be consistent with the program being funded.",
      },
    ],
    payFor:
      "This draft does not appropriate funds. It changes a priority inside a program that receives money, if at all, through a separate appropriations bill. If Congress appropriates nothing, the priority has nothing to act on.",
    clerkNote:
      "Authorized and appropriated are different verbs. A bill can create authority that never receives a dollar. Say which one you mean.",
    check: "Whether your own school is open, with an adult and a way home, between dismissal and 6 p.m.",
  },
  {
    id: "school-water",
    name: "The tap at school",
    who: "Students drinking from school fountains",
    problem:
      "A test at the treatment plant is not a test at the fountain on the second floor. Parents cannot avoid an outlet nobody has posted.",
    shortTitle: "School Tap Act",
    officialTitle:
      "to require testing and public posting of lead results for drinking water outlets in schools, and for other purposes.",
    findings: [
      "The Safe Drinking Water Act regulates public water systems. Compliance at a treatment plant does not tell a parent what is coming out of a fountain inside a school.",
      "Lead can enter water from plumbing inside a building, including where the water system meets the standard at the plant.",
      "A result that stays in a binder is not a public result.",
    ],
    provisions: [
      {
        heading: "TESTING",
        text: "A local educational agency that receives federal elementary or secondary education funds shall test drinking water outlets in each school building for lead, on a schedule set by the Administrator of the Environmental Protection Agency, using the action level the Administrator has established under the Safe Drinking Water Act.",
      },
      {
        heading: "POSTING",
        text: "The agency shall post each result, in plain language, at the outlet and on the agency's website within 30 days. The posting shall not name individual students.",
      },
      {
        heading: "REMEDY",
        text: "An outlet that exceeds the action level shall be taken out of service, or fitted with a certified filter, until a new test is at or below that level.",
      },
    ],
    payFor:
      "Testing and filters are paid by the local agency unless Congress appropriates funds for this Act. The draft authorizes such sums as may be necessary. It does not pretend those sums have been appropriated.",
    clerkNote:
      "Do not invent a parts-per-billion number. Point at the action level the Administrator has set, so the statute does not go stale when the rule changes.",
    check: "Whether your school posts a water test, and the Environmental Protection Agency's current lead action level.",
  },
  {
    id: "evening-bus",
    name: "The last bus",
    who: "People whose shift outlasts the route",
    problem:
      "A bus that stops before the last shift is a policy choice, not a fact of nature. Federal transit law is picky about paying drivers, so this draft is a pilot instead of a slogan.",
    shortTitle: "Last Bus Home Act",
    officialTitle:
      "to establish a pilot for evening transit service serving public schools and hospitals, and for other purposes.",
    findings: [
      "Federal transit assistance is governed largely by chapter 53 of title 49, United States Code. Much of that help buys vehicles and builds facilities. Paying the driver of a bus that already exists is a different, narrower authority.",
      "A route that ends before the last shift, or before a student activity is over, leaves the rider to walk, to wait, or to skip the trip.",
      "A pilot can answer a factual question: if the bus ran later, who would ride? A permanent program should not be written before that question has a number from the route itself.",
    ],
    provisions: [
      {
        heading: "PILOT",
        text: "The Secretary of Transportation shall carry out a competitive pilot for additional evening service on existing routes that stop at a public secondary school or a hospital.",
      },
      {
        heading: "MEASURE",
        text: "A grant recipient shall publish boardings during the added hours and compare them with the hour before the extension.",
      },
      {
        heading: "SUNSET",
        text: "The authority in this section expires five years after the date of enactment. Nothing in this Act requires a recipient to keep the service after the pilot ends.",
      },
    ],
    payFor:
      "This draft authorizes appropriations for the pilot. It does not rewrite the general operating-assistance rules, except for recipients selected for the pilot and only for the added hours. A real draft would be checked, line by line, against chapter 53 of title 49.",
    clerkNote:
      "Look up operating assistance before you fall in love with the sentence. If you skip it, a counsel's office will find it, and the bill will come back.",
    check: "The last scheduled trip on a route you have actually taken.",
  },
  {
    id: "hot-classrooms",
    name: "Heat dismissal",
    who: "Students sent home because the building is too hot",
    problem:
      "A district that already cools its buildings does not need this bill. A district that closes for heat does. The draft creates a grant. It does not pretend the grant already exists.",
    shortTitle: "Cool the Classroom Act",
    officialTitle:
      "to make competitive grants for cooling and shade at public schools that dismiss students because of heat, and for other purposes.",
    findings: [
      "Some school districts release students early, or close a building, when classrooms cannot be cooled. The lost day is the harm. It does not need an adjective.",
      "Cooling a building is a capital cost. The districts that can already afford it are not the ones sending students home.",
      "Shade in a schoolyard can be cheaper than a chiller, and it is still a use of the same grant.",
    ],
    provisions: [
      {
        heading: "GRANTS",
        text: "The Secretary of Education shall award competitive grants to local educational agencies that dismissed students, or closed a building, because of heat in any of the previous three school years.",
      },
      {
        heading: "USES",
        text: "A grant may be used for cooling equipment, the electrical work that equipment requires, shade structures, and repair of windows that are supposed to open. It may not be used for a sports facility.",
      },
      {
        heading: "MATCH",
        text: "The Secretary may waive a local match for an agency that shows it cannot pay one, and shall publish the reason for each waiver.",
      },
    ],
    payFor:
      "The draft authorizes such sums as may be necessary for five fiscal years. The grants are discretionary. An agency that does not win one has not been promised a cooled building.",
    clerkNote:
      "“Some districts” is a weak finding. Your own district's heat policy, with the date it was adopted, is a strong one. Replace the general sentence if you have it.",
    check: "Your district's heat or early-release policy, and which buildings have no working cooling.",
  },
  {
    id: "civic-lab",
    name: "A town with no newsroom",
    who: "Students in a place that cannot read about itself",
    problem:
      "A library can host a student reporting lab. A federal grant for that lab is only safe if no official gets to approve the story.",
    shortTitle: "Civic Lab Act",
    officialTitle:
      "to support student civic reporting labs at public libraries, and to forbid official control of their coverage, and for other purposes.",
    findings: [
      "A town can lose its newspaper without losing its need to know what the school board did. A public library is one of the last buildings open to everyone.",
      "A government grant that pays for reporting becomes a censorship program if an official can direct, review, or kill a story as a condition of the money.",
      "Students can learn to interview, request records, and correct errors without a federal employee becoming their editor.",
    ],
    provisions: [
      {
        heading: "GRANTS",
        text: "The Institute of Museum and Library Services shall make competitive grants to public libraries for a student civic reporting lab, including training, recording equipment, and the cost of keeping the lab open to the public.",
      },
      {
        heading: "FIREWALL",
        text: "No officer or employee of the Federal Government, and no official of a grant recipient acting in an official capacity, may direct, review, approve, or suppress a story as a condition of a grant under this Act. A violation is grounds for recovering the funds.",
      },
      {
        heading: "EDITOR",
        text: "The lab shall have an adult editor who is not an elected official and not a press officer. The editor's duty is accuracy.",
      },
    ],
    payFor:
      "The draft authorizes such sums as may be necessary. It does not tell a library what to publish. A later appropriations bill that added that condition would have to answer this section.",
    clerkNote:
      "The firewall is the bill. A grant for “media literacy” that lets an office approve stories is a different and worse idea. Do not blur them.",
    check: "Whether your town still has a local newsroom, and the text of the First Amendment.",
  },
  {
    id: "own",
    name: "A problem from your town",
    who: "People you can name",
    problem:
      "Start from something you have seen: a route, a building, a fee, a wait. A finding is stronger when you could take a member of Congress to the place.",
    shortTitle: "",
    officialTitle: "",
    findings: ["", ""],
    provisions: [{ heading: "PURPOSE", text: "" }],
    payFor: "",
    clerkNote:
      "Say who would carry the work out, which committee would claim it, and whether the money is authorized, appropriated, or simply hoped for.",
    check: "One person who deals with this problem, and one document they already use.",
  },
]

export function getIssue(id: string): Issue | undefined {
  return ISSUES.find((issue) => issue.id === id)
}
