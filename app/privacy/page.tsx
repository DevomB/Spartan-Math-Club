import { PageHero } from "@/components/ui/page-hero";
import { site } from "@/content/site";
import { clubEmail } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How the Spartan Mathematics Club website handles site data, local problem progress, and external links.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const email = clubEmail();

  return (
    <main id="content" tabIndex={-1}>
      <PageHero eyebrow="Privacy" title="A small site with limited data collection." />
      <section className="section">
        <div className="container prose">
          <h2>This website</h2>
          <p>
            This site does not use analytics, advertising, tracking pixels, cookies, or user accounts. It does not send
            information you type to a server.
          </p>
          <h2>Problem progress</h2>
          <p>
            The problem archive can remember which problems you have solved using local storage in your browser. That
            record stays on your device and is removed when you clear the site&apos;s local data.
          </p>
          <h2>External forms and links</h2>
          <p>
            The Applied Math interest form is hosted by Google Forms, and the community invitation opens Discord.
            Information submitted to those services is handled under their respective privacy practices. Do not include
            confidential company information or sensitive personal data in an initial form response or Discord message.
          </p>
          <h2>Email</h2>
          <p>
            Messages sent to the club email are received by Spartan Mathematics Club officers and used to respond to
            the inquiry. Avoid sending sensitive personal information or confidential project data by email.
          </p>
          {email ? <p>Questions about this notice can be sent to <a className="text-link" href={`mailto:${email}`}>{email}</a>.</p> : null}
          <p className="muted">Last updated {site.privacyUpdatedOn}.</p>
        </div>
      </section>
    </main>
  );
}
