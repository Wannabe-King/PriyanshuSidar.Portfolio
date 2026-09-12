import type { Metadata } from "next";
import Home from "../(landing)/page";

/**
 * The landing page again, served at a second path purely so the visit can be
 * attributed. A link opened from the PDF resume arrives with no Referer header
 * - PDF viewers do not send one - so in Web Analytics it is indistinguishable
 * from someone typing the domain in, and both land in "Direct". The path is the
 * one marker that survives the trip: query strings and UTM tags are not broken
 * out on the Hobby plan, but the Pages panel lists paths on every plan. So
 * every hit counted against /r is a resume click.
 *
 * Deliberately a real route rather than a redirect or a rewrite. A 3xx redirect
 * never renders, so the tracking script would never run and the visit would go
 * unrecorded; a rewrite leaves which path gets reported up to router internals.
 *
 * The nav links are absolute ("/#about"), so the visitor's first navigation
 * moves them onto "/" and the rest of the session records as usual.
 */
export const metadata: Metadata = {
  // A duplicate of "/" that must not compete with it in search results.
  robots: { index: false, follow: true },
};

export default Home;
