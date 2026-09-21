import { leadership } from "@/content/leadership";
import Image from "next/image";

export function LeadershipList({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={compact ? "leadership-list leadership-list--compact" : "leadership-list"}>
      {leadership.map((leader) => (
        <li key={leader.name}>
          <div className="leader-portrait">
            {leader.image ? (
              <Image
                src={leader.image}
                alt={`Headshot of ${leader.name}`}
                fill
                sizes="(max-width: 44rem) 100vw, 33vw"
              />
            ) : (
              <span className="leader-initials" aria-hidden="true">{leader.initials}</span>
            )}
          </div>
          <span className="leader-role">{leader.role}</span>
          <span className="leader-name">{leader.name}</span>
          <span className="leader-degree">{leader.degree}</span>
        </li>
      ))}
    </ol>
  );
}
