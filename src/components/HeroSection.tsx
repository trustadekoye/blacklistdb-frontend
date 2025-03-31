import React, { useState } from "react";
import { Button } from "./ui/button";
import HeroImage from "../assets/images/heroimg.png";
import ReportScammerDialog from "./ReportScammerDialog";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  return (
    <>
      <section className="min-h-[calc(100vh-4rem)] md:min-h-[cal(100vh-5rem)] flex items-center">
        <div className="container mx-auto px-4 py-10 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div>
              <p className="text-sm md:text-base font-regular mb-2 text-gray-600">
                The Blacklist Database
              </p>

              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Empowering Shoppers
                <span className="block text-[#812018]">Exposing Scams</span>
              </h1>

              <p className="text-sm md:text-base font-regular text-gray-600 mb-6 leading-relaxed">
                Join a community dedicated to sharing experiences, exposing
                scams, and safeguarding each other against financial fraud.
                Together, let's build a safer digital world.
              </p>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  variant="default"
                  className="p-6"
                  onClick={() => setIsReportDialogOpen(true)}
                >
                  Report Scammer
                </Button>

                <Button
                  className="p-6"
                  variant="outline"
                  onClick={() => navigate("/scammerslist")}
                >
                  See list of scammers
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="hidden md:block">
              <img
                src={HeroImage}
                alt="Hero Image"
                className="w-3/4 mx-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Report Scammer dialog */}
      <ReportScammerDialog
        isOpen={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
      />
    </>
  );
};

export default HeroSection;
