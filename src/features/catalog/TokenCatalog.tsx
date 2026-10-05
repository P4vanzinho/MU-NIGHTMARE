import { Translated } from "@/i18n/Translated";
export function TokenCatalog() {
  return (
    <div className="grid-cards">
      <div className="panel">
        <h2 className="text-xl font-bold mb-6">
          <Translated text="Cores" />
        </h2>
        {[
          ["Background", "#101014"],
          ["Surface", "#1b1b22"],
          ["Primary", "#f7ff19"],
          ["Muted", "#a2a2b1"],
        ].map(([label, color]) => (
          <div className="data-row" key={label}>
            <span>
              <Translated text={label} />
            </span>
            <span className="flex items-center gap-3">
              <Translated text={color} />
              <i className="h-8 w-8 rounded" style={{ background: color }} />
            </span>
          </div>
        ))}
      </div>
      <div className="panel">
        <h2 className="text-xl font-bold mb-6">
          <Translated text="Espaçamento · base 4 px" />
        </h2>
        {[4, 8, 12, 16, 24, 32, 48, 64].map((size) => (
          <div className="data-row" key={size}>
            <span>
              <Translated text={size} />
              <Translated text="px" />
            </span>
            <i className="h-3 bg-primary" style={{ width: size }} />
          </div>
        ))}
      </div>
      <div className="panel">
        <h2 className="text-xl font-bold mb-6">
          <Translated text="Tipografia" />
        </h2>
        <p className="brand-font text-4xl">
          <Translated text="Almendra" />
        </p>
        <p className="muted mt-3">
          <Translated text="Marca e hero" />
        </p>
        <p className="mt-6 text-2xl font-bold">
          <Translated text="Source Sans 3" />
        </p>
        <p className="muted mt-3">
          <Translated text="Interface, conteúdo e números" />
        </p>
        <p className="muted mt-6">
          <Translated text="Raio: 8 / 12 px. Cards: gap 24 px; notícias: 16 px. Seções: 64 px, 40 px no mobile. Margem lateral compartilhada: 20 a 64 px." />
        </p>
      </div>
    </div>
  );
}
