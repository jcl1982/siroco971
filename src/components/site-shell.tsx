import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function TitreSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-7 w-1.5 shrink-0 bg-primary" />
      <h2 className="font-impact text-[1.65rem] font-bold uppercase leading-none text-foreground">{children}</h2>
    </div>
  );
}

export function EnTetePage({ titre, sousTitre, image }: { titre: string; sousTitre: string; image: string }) {
  return (
    <section className="relative overflow-hidden bg-foreground text-primary-foreground">
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--foreground)_10%,color-mix(in_oklab,var(--foreground)_55%,transparent)_100%)]" />
      <div className="relative mx-auto max-w-[1440px] px-6 py-16 lg:px-12 lg:py-20">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.45em] text-primary-foreground/80">Siroco Abymes</p>
        <h1 className="font-brush text-[3.4rem] uppercase italic leading-[0.8] sm:text-[4.5rem]">{titre}</h1>
        <div className="mt-5 h-1 w-40 -skew-x-12 bg-primary" />
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-primary-foreground/85">{sousTitre}</p>
      </div>
    </section>
  );
}
