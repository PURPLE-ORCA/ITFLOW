import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head, Link } from "@inertiajs/react";
import AnimatedBackground from "@/Components/AnimatedBackground";
import AnimatedSection from "@/Components/AnimatedSection";
import AnimatedCard from "@/Components/AnimatedCard";
import Header from "@/Components/Header";
import HeroSection from "@/Components/HeroSection";
import FeaturesSection from "@/Components/FeaturesSection";
import AboutUs from "@/Components/AboutUs";
import LearnMore from "@/Components/LearnMore";
import Footer from "@/Components/Footer";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="">
                <AnimatedBackground />
                <Header auth={auth} />

                <main className="mt-6">
                    <HeroSection />
                    <FeaturesSection />
                    <AboutUs />
                    <LearnMore />
                </main>

                <Footer />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
            </div>
        </>
    );
}
