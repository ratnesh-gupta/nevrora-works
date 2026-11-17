"use client";

import React, { useState } from "react";
import type { ServiceProcessStep } from "@nevrora/types";
import { CheckCircle2 } from "lucide-react";

interface ProcessStepperProps {
  steps: ServiceProcessStep[];
  serviceTitle: string;
}

export function ProcessStepper({ steps, serviceTitle }: ProcessStepperProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="stepper-container my-12 rounded-2xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="font-display text-xl font-bold text-[#0B1020]">
          Engagement & Delivery Process
        </h3>
        <p className="text-sm text-slate-600">
          A disciplined, milestone-governed delivery framework tailored for{" "}
          {serviceTitle}.
        </p>
      </div>

      <ol className="process-stepper grid grid-cols-1 md:grid-cols-4 gap-4 list-none p-0 m-0">
        {steps.map((step, idx) => {
          const isSelected = activeStep === idx;
          return (
            <li
              key={step.step}
              className={`stepper-item cursor-pointer rounded-xl border p-4 transition-all ${
                isSelected
                  ? "border-blue-600 bg-blue-50/50 shadow-md scale-[1.02]"
                  : "border-slate-200/80 bg-slate-50/50 hover:border-blue-400"
              }`}
              data-step={step.step}
              onClick={() => setActiveStep(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveStep(idx);
                }
              }}
              aria-current={isSelected ? "step" : undefined}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-blue-700 px-2 py-0.5 rounded bg-blue-100/60 border border-blue-200">
                  PHASE {step.step}
                </span>
                {isSelected && (
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                )}
              </div>
              <h4 className="font-display text-base font-semibold text-[#0B1020] mb-1">
                {step.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>

      {/* Active Phase Deep Dive */}
      <div className="mt-6 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
        <span>
          Currently viewing: Phase {steps[activeStep]?.step} &bull;{" "}
          {steps[activeStep]?.title}
        </span>
        <span className="text-blue-600 font-medium">
          Click any phase above to inspect
        </span>
      </div>
    </div>
  );
}
