import {
  Landmark,
  Shield,
  Building2,
  HeartPulse,
  GraduationCap,
  Bus,
  Lightbulb,
  Droplets,
  ArrowRight,
} from "lucide-react";

const departments = [
  {
    title: "Revenue",
    description: "Land records, certificates, pensions and revenue-related citizen services.",
    icon: Landmark,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Police",
    description: "Law & order, public safety and police-related grievance services.",
    icon: Shield,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Municipal Administration",
    description: "Sanitation, roads, streetlights and municipal civic services.",
    icon: Building2,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Health",
    description: "Government hospitals, health schemes and medical services.",
    icon: HeartPulse,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Education",
    description: "Schools, scholarships and higher education services.",
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Transport",
    description: "Driving licences, vehicle registration and transport services.",
    icon: Bus,
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    title: "Electricity",
    description: "Power supply, billing and electricity complaint services.",
    icon: Lightbulb,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Water Resources",
    description: "Water supply, irrigation and drinking water services.",
    icon: Droplets,
    color: "bg-sky-100 text-sky-700",
  },
];

export default function Departments() {
  return (
    <section id="departments" className="py-20 bg-surface-bg">
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}

        <div className="text-center mb-12">

          <span className="text-highlight-orange-primary font-semibold uppercase tracking-widest">
            Government Departments
          </span>

          <h2 className="text-4xl font-heading font-bold text-govt-blue-navy mt-2">
            Departments Covered
          </h2>

          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            Citizens can submit grievances related to various government
            departments through a single integrated platform.
          </p>

        </div>

        {/* Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {departments.map((dept, index) => {

            const Icon = dept.icon;

            return (

              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border-neutral p-6"
              >

                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${dept.color}`}>
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-semibold text-govt-blue-navy mt-5">
                  {dept.title}
                </h3>

                <p className="text-gray-600 text-sm mt-3 leading-6">
                  {dept.description}
                </p>

                <button className="flex items-center gap-2 mt-6 text-highlight-orange-primary font-semibold hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight size={18} />
                </button>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}