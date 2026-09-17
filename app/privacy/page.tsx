import { PageHero } from "@/components/ui/page-hero";
import { site } from "@/content/site";
import { clubEmail, consultingEmail } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "What the Spartan Math Club website collects (nothing), what it stores in your browser, and how email to the club is handled.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const email = clubEmail();
  const consulting = consultingEmail();

  return (
    <main id="content" tabIndex={-1}>
      <PageHero
        eyebrow="Privacy"
        title={
          <>
            Data collected: <em>∅.</em>
          </>
        }
      />
      <section className="section surface-paper">
        <div className="container prose">
          <h2>This website</h2>
          <p>
            This site does not use analytics, advertising, tracking pixels, or cookies, and it has no accounts. Nothing
            you type on this site is sent to us.
          </p>
          <h2>Your browser</h2>
          <p>
            When you solve a problem, the archive remembers which problems you&apos;ve solved using your browser&apos;s
            local storage so it can show a ✓. That record never leaves your device, and clearing your site data removes
            it.
          </p>
          <h2>Consulting inquiries and email</h2>
          <p>
            The consulting form does not submit anything to this website. It opens your own email app with a drafted
            message, and nothing is sent unless you send it.
            {consulting
              ? ` Messages to ${consulting}${email && email !== consulting ? ` or ${email}` : ""} are read by the club officers who manage those inboxes, used only to respond to you, and deleted on request.`
              : " Once the club inbox is published here, messages will be read only by the officers who manage it and used only to respond to you."}{" "}
            Please don&apos;t send sensitive personal information or confidential data in a first message.
          </p>
          <h2>External links</h2>
          <p>
            Links to services such as Discord, Instagram, Sammy, or RSVP forms take you off this site. Those services
            apply their own privacy practices.
          </p>
          <p className="muted">Last updated {site.privacyUpdatedOn}.</p>
        </div>
      </section>
    </main>
  );
}
