import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import API_CONFIG from "../config/api-config";
import { Bank } from "../types";

type ScamReport = {
  id: string;
  reporters_name: string;
  reporters_email: string;
  reporters_phone: string;

  scammers_name: string;
  business_name: string;
  scammers_account: string;
  scammers_bank: string;
  scammers_phone: string;
  scammers_instagram?: string;
  scammers_twitter?: string;

  date_occurred: string;
  description: string;
  scammers_image?: string;
  other_documents?: string;
  created_at: string;
};

type ScamReportsContextType = {
  reports: ScamReport[];
  loading: boolean;
  error: string | null;
  fetchReports: () => Promise<void>;
  createReport: (reportData: FormData) => Promise<void>;
  banks: Bank[];
  fetchBanks: () => Promise<void>;
};

const ScamReportsContext = createContext<ScamReportsContextType | undefined>(
  undefined
);

// Create the provider
export const ScamReportsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reports, setReports] = useState<ScamReport[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create axios instance with base URL
  const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
  });

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.SCAMMERS);
      setReports(response.data);
    } catch (err) {
      setError("Failed to fetch scam reports");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBanks = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.BANKS);
      setBanks(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Failed to fetch banks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createReport = async (reportData: FormData) => {
    setLoading(true);
    try {
      const response = await apiClient.post(
        API_CONFIG.ENDPOINTS.SCAMMERS,
        reportData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setReports((prev) => [response.data, ...prev]);
    } catch (err) {
      setError("Failed to create scam report");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    fetchBanks();
  }, []);

  return (
    <ScamReportsContext.Provider
      value={{
        reports,
        loading,
        error,
        fetchReports,
        createReport,
        banks,
        fetchBanks,
      }}
    >
      {children}
    </ScamReportsContext.Provider>
  );
};

// Export the hook
export const useScamReports = () => {
  const context = useContext(ScamReportsContext);
  if (context === undefined) {
    throw new Error("useScamReports must be used within a ScamReportsProvider");
  }
  return context;
};
