export function MethodologyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Methodology</h1>

      <p className="mt-4 text-base text-muted-foreground">
        AECO AI Strategy Canvas ranks AI use cases using a transparent weighted scoring model. Scores reflect
        strategic objective alignment, digital maturity fit, and base value potential. The intent is to support
        disciplined portfolio decisions, not produce a single “right answer.”
      </p>

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold">Scoring Model</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
            <li>40% Strategic Objective Alignment</li>
            <li>30% Digital Maturity Fit</li>
            <li>30% Base ROI / Value Potential</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">How to Interpret Results</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
            <li>Higher scores suggest better near-term fit for investment and execution.</li>
            <li>Complexity and data dependency should inform sequencing and resourcing.</li>
            <li>Use the roadmap to balance quick wins with platform-level capability building.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Assumptions</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Scores are directional and based on generalized AECO patterns. Adjust weighting and use cases to reflect
            your organization’s actual workflows, data readiness, and constraints.
          </p>
        </section>
      </div>
    </div>
  );
}
