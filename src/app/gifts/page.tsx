export default function GiftsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-6 text-center">
        <h1 className="text-sage mb-4 font-serif text-5xl font-light tracking-wide dark:text-amber-400">
          Wedding Gifts
        </h1>
        <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-400/30"></div>
        <p className="text-gray-600 dark:text-gray-300">
          Your presence at our wedding was the greatest gift of all. For guests
          who wanted to give something extra, we shared honeymoon and home fund
          options on this page before the wedding.
        </p>
      </div>

      <section id="cash-gifts" className="mb-16">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-800">
          <div className="mb-6 rounded-lg border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
            This archive no longer accepts contributions. The funds below were
            open before the wedding; links are retired on this preserved site.
          </div>
          <div className="space-y-6">
            <div className="rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
              <h4 className="text-sage mb-4 font-serif text-lg dark:text-amber-400">
                Honeymoon Fund
              </h4>
              <p className="text-gray-700 dark:text-gray-200">
                Guests who wished to contribute could help fund honeymoon
                experiences and memories from the trip that followed the wedding.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
              <h4 className="text-sage mb-4 font-serif text-lg dark:text-amber-400">
                Home Fund
              </h4>
              <p className="text-gray-700 dark:text-gray-200">
                Guests could also contribute toward home projects as we settled
                into married life.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
