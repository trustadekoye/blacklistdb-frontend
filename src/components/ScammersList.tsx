import React, { useState } from "react";
import { useScamReports } from "../context/ScamReportsContext";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { motion } from "framer-motion";
import { formatDate } from "../utils/formatDate";
import { Button } from "./ui/button";
import ScammersDetailsDialog from "./ScammersDetailsDialog";

const ScammerListPage: React.FC = () => {
  const { reports, loading, error } = useScamReports();
  const [selectedScammer, setSelectedScammer] = useState<string | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const handleViewDetails = (scammerId: string) => {
    setSelectedScammer(scammerId);
    setIsDetailsDialogOpen(true);
  };

  // Return spinning loader if loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
        <p className="text-sm text-gray-600">Loading scammers...</p>
      </div>
    );
  }

  // Return error message if there is an error
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-sm text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-6">
          Scammers <span className="text-[#812018]">List</span>
        </h1>
      </motion.div>

      {reports.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600 font-regular">
            No scammers have been reported yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scammer Name</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Date Reported</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-regular">
                    {report.scammers_name}
                  </TableCell>
                  <TableCell className="font-regular">
                    {report.business_name}
                  </TableCell>
                  <TableCell className="font-regular">
                    {report.scammers_account}
                  </TableCell>
                  <TableCell className="font-regular">
                    {formatDate(report.date_occurred)}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(report.id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Details Dialog */}
      {selectedScammer && (
        <ScammersDetailsDialog
          scammerId={selectedScammer}
          open={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default ScammerListPage;
