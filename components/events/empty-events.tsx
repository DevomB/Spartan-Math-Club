import { Tex } from "@/components/math/tex";
import { socialLinks } from "@/lib/links";

export function EmptyEvents({ compact = false }: { compact?: boolean }) {
  const socials = socialLinks();
  return (
    <div className={compact ? "empty-events empty-events--compact" : "empty-events"}>
      <Tex display className="empty-events-math">{String.raw`\{\, e \in \text{Events} : e \text{ is upcoming} \,\} = \varnothing`}</Tex>
      <p>
        The next events are being scheduled. For now the set is empty — but not for long.
        {socials.length ? " Follow along so you hear first:" : " Check back soon."}
      </p>
      {socials.length ? (
        <ul className="inline-links">
          {socials.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
