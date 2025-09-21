export default function GiftsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-6 text-center">
        <h1 className="text-sage mb-4 font-serif text-5xl font-light tracking-wide dark:text-amber-400">
          Wedding Gifts
        </h1>
        <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-400/30"></div>
        <p className="text-gray-600 dark:text-gray-300">
          Your presence at our wedding is the greatest gift of all. However, if
          you wish to give a gift, we would be grateful for contributions to our
          honeymoon fund or future home.
        </p>
      </div>

      {/* Cash Gifts Section */}
      <section id="cash-gifts" className="mb-16">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-800">
          <div className="space-y-6">
            <div className="rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
              <h4 className="text-sage mb-4 font-serif text-lg">
                Honeymoon Fund
              </h4>
              <p className="mb-4 text-gray-700 dark:text-gray-200">
                Help us create unforgettable memories on our honeymoon. Your
                contribution will help us enjoy special experiences and create
                lasting memories together.
              </p>
              <a
                href="https://donate.stripe.com/5kQ8wP7p6fYFayHf0U0co02"
                className="border-sage text-sage hover:bg-sage/10 inline-block w-full rounded-md border-2 bg-white px-6 py-3 text-center text-base font-medium transition-colors dark:bg-zinc-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribute to Honeymoon Fund
              </a>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
              <h4 className="text-sage mb-4 font-serif text-lg">
                Future Home Fund
              </h4>
              <p className="mb-4 text-gray-700 dark:text-gray-200">
                Help us build our future together. Your contribution will go
                towards our dream home and the life we&apos;re building.
              </p>
              <a
                href="https://donate.stripe.com/dRm14nfVC3bTdKT5qk0co03"
                className="border-sage text-sage hover:bg-sage/10 inline-block w-full rounded-md border-2 bg-white px-6 py-3 text-center text-base font-medium transition-colors dark:bg-zinc-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribute to Future Home Fund
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
