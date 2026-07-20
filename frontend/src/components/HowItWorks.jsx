import {
  FileText,
  ClipboardCheck,
  Building2,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Submit Grievance",
    description:
      "Citizen submits a grievance through the Citizen Portal after logging in.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: ClipboardCheck,
    title: "Verification",
    description:
      "The grievance is verified and categorized by the concerned authority.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Building2,
    title: "Department Action",
    description:
      "The grievance is assigned to the appropriate department for resolution.",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: CheckCircle,
    title: "Resolution",
    description:
      "The department resolves the grievance and updates the citizen with the final status.",
    color: "bg-emerald-100 text-emerald-700",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-18 bg-white"
    >
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="text-highlight-orange-primary font-semibold uppercase tracking-widest">
            Process
          </span>

          <h2 className="text-4xl font-heading font-bold text-govt-blue-navy mt-2">
            How It Works
          </h2>

          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            The grievance redressal process is designed to ensure
            transparency, accountability, and timely resolution.
          </p>

        </div>

        {/* Timeline */}

        <div className="grid md:grid-cols-4 gap-8">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="relative text-center"
              >
                <div
                  className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${step.color}`}
                >
                  <Icon size={34} />
                </div>

                {index !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-1 bg-gray-300"></div>
                )}

                <h3 className="text-xl font-semibold text-govt-blue-navy mt-6">
                  {step.title}
                </h3>

                <p className="text-gray-600 mt-3 leading-7 text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}