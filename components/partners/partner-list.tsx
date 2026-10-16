import { partners } from "@/content/partners";
import Image from "next/image";

export function PartnerList() {
  return (
    <ul className="partner-list">
      {partners.map((partner) => (
        <li key={partner.name}>
          <a className="partner-logo" href={partner.href} target="_blank" rel="noopener noreferrer">
            <Image
              src={partner.logo.src}
              alt={partner.name}
              width={partner.logo.width}
              height={partner.logo.height}
            />
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          <p>{partner.description}</p>
        </li>
      ))}
    </ul>
  );
}
