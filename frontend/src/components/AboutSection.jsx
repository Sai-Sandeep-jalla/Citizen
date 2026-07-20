import {
  ShieldCheck,
  Users,
  Building2,
  BadgeCheck,
} from "lucide-react";

export default function AboutSection() {

  const features = [
    {
      icon: <ShieldCheck size={26} />,
      title: "Transparent Governance",
      description:
        "Provides a transparent and accountable grievance redressal system for every citizen.",
    },
    {
      icon: <Users size={26} />,
      title: "Citizen Centric",
      description:
        "Designed to improve communication between citizens and government departments.",
    },
    {
      icon: <Building2 size={26} />,
      title: "Multi Department",
      description:
        "A unified platform connecting multiple government departments for faster grievance handling.",
    },
    {
      icon: <BadgeCheck size={26} />,
      title: "Quick Resolution",
      description:
        "Ensures complaints are resolved within the prescribed timelines.",
    },
  ];

  return (
    <section
      id="about"
      className="py-12 lg:py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-block bg-highlight-orange-light text-highlight-orange-dark px-4 py-2 rounded-full text-sm font-semibold">
            About Portal
          </span>

          <h2 className="mt-4 text-3xl lg:text-5xl font-bold text-govt-blue-navy">
            Citizen Grievance Portal
          </h2>

          <p className="mt-5 text-gray-600 leading-7">
            The Citizen Grievance Redressal Portal enables citizens to
            register grievances online, monitor complaint status and
            receive timely resolutions from government departments.
            It promotes transparency, accountability and efficient
            public service delivery.
          </p>

        </div>

        {/* Feature Cards */}

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((item, index) => (

            <div
              key={index}
              className="
                bg-surface-bg
                rounded-xl
                border
                border-border-neutral
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
                p-5 lg:p-6
                flex
                flex-col
                h-full
              "
            >

              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg bg-highlight-orange-light flex items-center justify-center text-highlight-orange-primary mb-4">

                {item.icon}

              </div>

              <h3 className="text-lg lg:text-xl font-semibold text-govt-blue-navy mb-3">

                {item.title}

              </h3>

              <p className="text-sm lg:text-base text-gray-600 leading-6 flex-grow">

                {item.description}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}