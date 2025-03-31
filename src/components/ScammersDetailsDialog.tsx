import React from "react";
import { useScamReports } from "../context/ScamReportsContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { formatDate } from "../utils/formatDate";
import { Button } from "./ui/button";

interface ScammersDetailsDialogProps {
  scammerId: string;
  open: boolean;
  onClose: () => void;
}

const ScammersDetailsDialog: React.FC<ScammersDetailsDialogProps> = ({
  scammerId,
  open,
  onClose,
}) => {
  const { reports } = useScamReports();
  const scammerDetails = reports.find((report) => report.id === scammerId);

  if (!scammerDetails) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Scammer Details: {scammerDetails.scammers_name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-col-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Scammer Information</h3>

            <div>
              <p className="text-sm text-gray-500 font-regular">Name</p>
              <p className="font-regular">{scammerDetails.scammers_name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 font-regular">Bank</p>
              <p className="font-regular">{scammerDetails.scammers_bank}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 font-regular">
                Account Number
              </p>
              <p className="font-regular">{scammerDetails.scammers_account}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 font-regular">Phone Number</p>
              <p className="font-regular">
                {scammerDetails.scammers_phone || "Not provided"}
              </p>
            </div>

            {scammerDetails.scammers_instagram && (
              <div>
                <p className="text-sm text-gray-500 font-regular">Instagram</p>
                <p className="font-regular">
                  {scammerDetails.scammers_instagram}
                </p>
              </div>
            )}

            {scammerDetails.scammers_twitter && (
              <div>
                <p className="text-sm text-gray-500 font-regular">Twitter</p>
                <p className="font-regular">
                  {scammerDetails.scammers_twitter}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Report Information</h3>

            <div>
              <p className="text-sm text-gray-500 font-regular">Reported by</p>
              <p className="font-regular">{scammerDetails.reporters_name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date Occurred</p>
              <p className="font-regular">
                {formatDate(scammerDetails.date_occurred)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-lg mb-2">Description of Incident</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>{scammerDetails.description}</p>
          </div>
        </div>

        {scammerDetails.scammers_image && (
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-2">Scammer's Image</h3>
            <div className="max-w-sm mx-auto">
              <img
                src={scammerDetails.scammers_image}
                alt={scammerDetails.scammers_name}
                className="rounded-lg border shadow"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScammersDetailsDialog;
