import { mySocials } from "@/lib/constant";

export const Footer = () => {
  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-muted-foreground c-space">
      <div className="mb-4 bg-gradient-to-r from-transparent via-divider to-transparent h-[1px] w-full" />
      <div className="flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>
      <div className="flex gap-3">
        {mySocials.map((social, index) => (
          <a href={social.href} key={index}>
            <img
              src={social.icon}
              className="w-5 h-5 theme-icon"
              alt={social.name}
            />
          </a>
        ))}
      </div>
      <p>© 2026 Priyanshu. All rights reserved.</p>
    </section>
  );
};
