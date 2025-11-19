import { LearnedTile } from "./_components/learnedTile";

export default function TodayILearned() {
  return (
    <main className="flex bg-red-500 max-w-5xl mx-auto justify-center my-20">
      <div className="fixed top-20 left-0 right-0  font-extrabold text-9xl -z-10 text-center">
        TODAY I LEARNED
      </div>
      <div className="">
        <LearnedTile />
      </div>
    </main>
  );
}
