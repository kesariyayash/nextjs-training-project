
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <br />
      <p>Welcome to my <b>next.js</b> Learning Project!!!</p>
      <p className="text-sm text-white bg-blue-600 border-black mt-5 px-2 rounded-lg w-fit">stlyed using <b>tailwind css</b></p>
      <p className="text-sm text-white bg-blue-600 border-black mt-2 px-2 rounded-lg w-fit">created by <b>yash kesariya</b></p>

      {/* Route Index */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Route Index</h2>

        <div className="space-y-6">
          {/* Public Routes */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Public Route Group Routes List : </h3>
            <ul className="space-y-2 ml-4">

              <li>
                <Link href="/" className="text-blue-500 hover:text-red-300 mr-3">
                  /
                </Link>
                <span className="text-gray-400 text-sm"> → Home - Index Page</span>
              </li>

              <li>
                <Link href="/about" className="text-blue-400 hover:text-red-300 mr-3">
                  /about
                </Link>
                <span className="text-gray-400 text-sm"> → Error Handling using <b>error.js</b>. </span>
              </li>

              <li>
                <Link href="/blog" className="text-blue-400 hover:underline">
                  /blog
                </Link>
                <span className="text-gray-400 text-sm"> → implemented <b>fetch() api</b> with an <b>external resource</b>, a <b>file based DB</b> that <b>mimics MONGO</b>, links to dyanamic blog pages.</span>
              </li>

              <li className="flex flex-row flex-wrap">
                <span className="text-sm mr-1 text-blue-400">/blog/[slug] (not a link)</span>
                <span className="text-gray-400 text-sm">→ implemented <b>notFound()</b> in this dynamic blog page, reading blog post data from a file-based DB, nav links to change the slug(blog) &amp; to add params in the URL for displaying <b>params</b> on the UI implemented using <b>searchParams</b>.</span>
              </li>

              <li className="flex flex-row flex-wrap">
                <span className="text-sm mr-1 text-blue-400">/blog/[slug]/comments/[commentId] (not a link)</span>
                <span className="text-gray-400 text-sm">→ it is a nested dynamic route page where the slug(blog) and the other nested slug(comments) within it is printed on the screen using <b>params</b>.</span>
              </li>

            </ul>
          </div>

          <hr className="text-white opacity-80" />

          {/* Protected Routes */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Protected Route Group Routes List : </h3>
            <ul className="space-y-2 ml-4">

              <li>
                <Link href="/dashboard" className="text-blue-400 hover:underline">
                  /dashboard
                </Link>
                <span className="text-gray-400 text-sm"> → implemented a dashboard visit logger, used a <b>client component that uses useEffect() to trigger a server action</b> to log the visit.</span>
              </li>

              <li>
                <Link href="/dashboard/settings" className="text-blue-400 hover:underline">
                  /dashboard/settings
                </Link>
                <span className="text-gray-400 text-sm"> → implemented an admin-user role update <b>form wired with a server action</b> to update in DB, used another client component that triggers a <b>server action passed as a prop</b> to it.</span>
              </li>

              <li>
                <Link href="/dashboard/setup" className="text-blue-400 hover:underline">
                  /dashboard/setup
                </Link>
                <span className="text-gray-400 text-sm"> → implemented a <b>client component based form </b>wired<b> with a server action</b> and <b>useActionState()</b> hook to update cookies using <b>.set(), redirect(), refresh()</b> are also implemented on the same page.</span>
              </li>

              <li>
                <Link href="/dashboard/profile" className="text-blue-400 hover:underline">
                  /dashboard/profile
                </Link>
                <span className="text-gray-400 text-sm"> → fetched details stored in the cookieStore and displayed cookies it on the page.</span>
              </li>

              <li>
                <Link href="/admin" className="text-blue-400 hover:underline">
                  /admin
                </Link>
                <span className="text-gray-400 text-sm"> → implemented client side fetching and updating on data using <b>use(), SWR(stale while revalidate), React Query - useQuery()
                  &amp; useMuation()</b>, via <b>GET, PUT, POST, DELETE</b> http methods.</span>
              </li>

            </ul>
          </div>

          <hr className="text-white opacity-80" />

          {/* Cache Demo Routes */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Cache Demo Route Group Routes List : </h3>
            <ul className="space-y-2 ml-4">
              <li>
                <Link href="/cachetag" className="text-blue-400 hover:underline">
                  /cachetag
                </Link>
                <span className="text-gray-400 text-sm"> → implemented <b>revalidateTag, updateTag, revalidatePath</b> using a demo time data and custom API.</span>
              </li>
              <li>
                <Link href="/fetch" className="text-blue-400 hover:underline">
                  /fetch
                </Link>
                <span className="text-gray-400 text-sm"> → implemented <b>fetch()</b> api with three different cache strategies i.e. <b>default, force-cache, no-store</b>.</span>
              </li>
            </ul>
          </div>

          <hr className="text-white opacity-80" />

          {/* CSS Examples */}
          <div>
            <h3 className="text-xl font-semibold mb-3">CSS Examples</h3>
            <ul className="space-y-2 ml-4">
              <li>
                <Link href="/css/images" className="text-blue-400 hover:underline">
                  /css/images
                </Link>
                <span className="text-gray-400 text-sm"> → implemented a <b>local image, remote image, remote fonts</b> on the UI aligned with <b>tailwind css</b>.</span>
              </li>
              <li>
                <Link href="/css/modules" className="text-blue-400 hover:underline">
                  /css/modules
                </Link>
                <span className="text-gray-400 text-sm"> → a page with an integrated css module, created this to understand integration of <b>module css, tailwind, font-awesome</b>.</span>
              </li>
            </ul>
          </div>

          <hr className="text-white opacity-80" />

          {/* API Routes */}
          <div>
            <h3 className="text-xl font-semibold mb-3">API Routes</h3>
            <ul className="space-y-2 ml-4">
              <li>
                <Link href="/api/admin-users" className="text-blue-400 hover:underline">
                  /api/admin-users
                </Link>
                <span className="text-gray-400 text-sm"> → implemented BASIC data fetching and updating using <b>GET, POST, PUT, PATCH, DELETE</b>.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}