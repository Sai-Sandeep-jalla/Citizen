import {
  FileText,
  Building2,
  UserCheck,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function HomeSection() {
  return (
    <section
      id="home"
      className="bg-surface-bg py-10 lg:py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6" lg: px-8>

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left Content */}

          <div>

            <span className="inline-block bg-highlight-orange-light text-highlight-orange-dark px-4 py-2 rounded-full font-semibold text-sm">
              Citizen First • Transparent • Digital
            </span>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-govt-blue-navy">
              Citizen Grievance
              <br />
              Redressal Portal
            </h1>

            <p className="mt-5 text-gray-600 text-base sm:text-lg leading-8">
              The Citizen Grievance Redressal Portal provides a single
              platform for citizens to raise public grievances and enables
              government departments to resolve them efficiently and
              transparently.

              <br />
              <br />

              This initiative strengthens accountability,
              improves public service delivery,
              and enhances citizen satisfaction through a secure,
              transparent and citizen-friendly digital platform.
            </p>

            {/* Mobile Workflow */}

            <div className="lg:hidden mt-8">

              <div className="bg-white rounded-2xl shadow-lg border border-border-neutral p-5 space-y-4">

                <div className="flex items-center gap-3">
                  <FileText className="text-highlight-orange-primary" />
                  <span className="font-medium">
                    Complaint Submitted
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Building2 className="text-highlight-orange-primary" />
                  <span className="font-medium">
                    Department Assigned
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <UserCheck className="text-highlight-orange-primary" />
                  <span className="font-medium">
                    Officer Review
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-600" />
                  <span className="font-medium">
                    Complaint Resolved
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* Desktop Animation */}

          <div className="hidden lg:flex relative items-center justify-center min-h-[520px]">

            {/* Center */}

            <div className="relative z-20 w-60 h-60 rounded-full bg-white border-4 border-highlight-orange-primary shadow-2xl flex flex-col items-center justify-center animate-pulse">

              <ShieldCheck
                size={70}
                className="text-highlight-orange-primary"
              />

              <h2 className="mt-3 text-2xl font-bold text-govt-blue-navy">
                Citizen Portal
              </h2>

              <p className="text-gray-500">
                Public Dashboard
              </p>

            </div>
                        {/* Top Card */}

            <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-float">

              <div className="bg-white w-40 rounded-2xl shadow-lg border border-border-neutral p-5 text-center">

                <FileText
                  size={34}
                  className="mx-auto text-highlight-orange-primary mb-3"
                />

                <h3 className="font-semibold text-govt-blue-navy">
                  Complaint
                </h3>

                <p className="text-sm text-gray-500">
                  Submitted
                </p>

              </div>

            </div>

            {/* Left Card */}

            <div className="absolute left-0 top-1/2 -translate-y-1/2 animate-float-delay">

              <div className="bg-white w-40 rounded-2xl shadow-lg border border-border-neutral p-5 text-center">

                <Building2
                  size={34}
                  className="mx-auto text-highlight-orange-primary mb-3"
                />

                <h3 className="font-semibold text-govt-blue-navy">
                  Department
                </h3>

                <p className="text-sm text-gray-500">
                  Assigned
                </p>

              </div>

            </div>

            {/* Right Card */}

            <div className="absolute right-0 top-1/2 -translate-y-1/2 animate-float-delay2">

              <div className="bg-white w-40 rounded-2xl shadow-lg border border-border-neutral p-5 text-center">

                <UserCheck
                  size={34}
                  className="mx-auto text-highlight-orange-primary mb-3"
                />

                <h3 className="font-semibold text-govt-blue-navy">
                  Officer
                </h3>

                <p className="text-sm text-gray-500">
                  Reviewing
                </p>

              </div>

            </div>

            {/* Bottom Card */}

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-float">

              <div className="bg-white w-40 rounded-2xl shadow-lg border border-border-neutral p-5 text-center">

                <CheckCircle2
                  size={34}
                  className="mx-auto text-green-600 mb-3"
                />

                <h3 className="font-semibold text-govt-blue-navy">
                  Resolved
                </h3>

                <p className="text-sm text-gray-500">
                  Completed
                </p>

              </div>

            </div>

            {/* Connecting Lines */}

            <div className="absolute left-1/2 top-24 -translate-x-1/2 w-1 h-28 bg-border-neutral"></div>

            <div className="absolute left-1/2 bottom-24 -translate-x-1/2 w-1 h-28 bg-border-neutral"></div>

            <div className="absolute left-28 top-1/2 -translate-y-1/2 h-1 w-36 bg-border-neutral"></div>

            <div className="absolute right-28 top-1/2 -translate-y-1/2 h-1 w-36 bg-border-neutral"></div>

          </div>

        </div>
                {/* Statistics Section */}

        <div className="mt-8 lg:mt-12">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

            {/* Total Complaints */}

            <div className="bg-white rounded-2xl border border-border-neutral shadow-md p-4 lg:p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-highlight-orange-light flex items-center justify-center mb-4">

                <FileText
                  size={28}
                  className="text-highlight-orange-primary"
                />

              </div>

              <h2 className="text-2xl lg:text-4xl font-bold text-govt-blue-navy">
                15,420+
              </h2>

              <p className="mt-2 text-sm lg:text-base text-gray-500 font-medium">
                Total Complaints
              </p>

            </div>

            {/* Resolved */}

            <div className="bg-white rounded-2xl border border-border-neutral shadow-md p-4 lg:p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">

                <CheckCircle2
                  size={28}
                  className="text-green-600"
                />

              </div>

              <h2 className="text-2xl lg:text-4xl font-bold text-govt-blue-navy">
                12,850+
              </h2>

              <p className="mt-2 text-sm lg:text-base text-gray-500 font-medium">
                Resolved Complaints
              </p>

            </div>

            {/* Pending */}

            <div className="bg-white rounded-2xl border border-border-neutral shadow-md p-4 lg:p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">

                <UserCheck
                  size={28}
                  className="text-yellow-600"
                />

              </div>

              <h2 className="text-2xl lg:text-4xl font-bold text-govt-blue-navy">
                2,570
              </h2>

              <p className="mt-2 text-sm lg:text-base text-gray-500 font-medium">
                Pending Complaints
              </p>

            </div>

            {/* Departments */}

            <div className="bg-white rounded-2xl border border-border-neutral shadow-md p-4 lg:p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-govt-blue-soft flex items-center justify-center mb-4">

                <Building2
                  size={28}
                  className="text-govt-blue-royal"
                />

              </div>

              <h2 className="text-2xl lg:text-4xl font-bold text-govt-blue-navy">
                26
              </h2>

              <p className="mt-2 text-sm lg:text-base text-gray-500 font-medium">
                Departments
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}