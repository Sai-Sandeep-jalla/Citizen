import {
    MapPin,
    Phone,
    Mail,
    Clock,
} from "lucide-react";

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="py-20 bg-surface-bg"
        >
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}

                <div className="text-center mb-14">

                    <span className="text-highlight-orange-primary font-semibold uppercase tracking-widest">
                        Contact Us
                    </span>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        For any queries regarding the Citizen Grievance Redressal Portal,
                        please contact the helpdesk during working hours.
                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-10">

                    {/* Contact Cards */}

                    <div className="grid sm:grid-cols-2 gap-6">

                        <div className="bg-white rounded-2xl shadow-md p-6 border border-border-neutral">
                            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 mb-4">
                                <MapPin size={28} />
                            </div>

                            <h3 className="font-semibold text-xl text-govt-blue-navy mb-2">
                                Office Address
                            </h3>

                            <p className="text-gray-600 leading-7">
                                Government of Andhra Pradesh
                                <br />
                                Secretariat,
                                <br />
                                Amaravati, Andhra Pradesh
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-6 border border-border-neutral">
                            <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-green-700 mb-4">
                                <Phone size={28} />
                            </div>

                            <h3 className="font-semibold text-xl text-govt-blue-navy mb-2">
                                Helpline
                            </h3>

                            <p className="text-gray-600">
                                1800-XXX-XXXX
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-6 border border-border-neutral">
                            <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
                                <Mail size={28} />
                            </div>

                            <h3 className="font-semibold text-xl text-govt-blue-navy mb-2">
                                Email
                            </h3>

                            <p className="text-gray-600">
                                support@ap.gov.in
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-6 border border-border-neutral">
                            <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 mb-4">
                                <Clock size={28} />
                            </div>

                            <h3 className="font-semibold text-xl text-govt-blue-navy mb-2">
                                Office Hours
                            </h3>

                            <p className="text-gray-600">
                                Monday - Friday
                                <br />
                                10:00 AM - 5:00 PM
                            </p>
                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="bg-white rounded-2xl shadow-md border border-border-neutral p-8 flex flex-col justify-center">

                        <h3 className="text-2xl font-heading font-bold text-govt-blue-navy mb-5">
                            Citizen Helpdesk
                        </h3>

                        <p className="text-gray-600 leading-8 mb-6">
                            Our support team is available to assist citizens with
                            portal-related queries, grievance registration guidance,
                            and technical support.
                        </p>

                        <div className="bg-blue-50 rounded-xl h-72 flex items-center justify-center text-blue-700 font-semibold text-lg">
                            Google Map / Office Location
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}