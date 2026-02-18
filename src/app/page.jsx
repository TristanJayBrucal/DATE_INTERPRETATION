import DeckShell from "@/components/deck/DeckShell";
import { deck } from "@/data/surveyDeck";

export default function Page() {
  return <DeckShell deck={deck} />;
}
