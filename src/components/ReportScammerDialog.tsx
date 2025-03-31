import React, { useState } from "react";
import { useScamReports } from "../context/ScamReportsContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

// Define the props type
interface ReportScammerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReportScammerDialog: React.FC<ReportScammerDialogProps> = ({
  isOpen,
  onOpenChange,
}): JSX.Element => {
  const { createReport, banks, loading } = useScamReports();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    reporters_name: "",
    reporters_email: "",
    reporters_phone: "",
    scammers_name: "",
    scammers_account: "",
    scammers_bank: "",
    scammers_phone: "",
    scammers_instagram: "",
    scammers_twitter: "",
    date_occurred: "",
    description: "",
  });
  const [scammersImage, setScammersImage] = useState<File | null>(null);
  const [otherDocuments, setOtherDocuments] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "image" | "documents"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      fileType === "image" ? setScammersImage(file) : setOtherDocuments(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    // Append files if they exist
    if (scammersImage) {
      formDataToSubmit.append("scammers_image", scammersImage);
    }
    if (otherDocuments) {
      formDataToSubmit.append("other_documents", otherDocuments);
    }

    try {
      await createReport(formDataToSubmit);
      toast.success("Report submitted successfully!", {
        description:
          "We've received your report and will review it as soon as possible.",
      });

      // Reset form and close dialog
      setFormData({
        reporters_name: "",
        reporters_email: "",
        reporters_phone: "",
        scammers_name: "",
        scammers_account: "",
        scammers_bank: "",
        scammers_phone: "",
        scammers_instagram: "",
        scammers_twitter: "",
        date_occurred: "",
        description: "",
      });
      setScammersImage(null);
      setOtherDocuments(null);
      onOpenChange(false);
    } catch (error) {
      toast.error("Error", {
        description:
          "Something went wrong while submitting your report. Please try again later.",
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Report a Scammer</DialogTitle>
          <DialogDescription>
            Bear in mind that we won't publish your name for any reason. We
            promise to keep your information private and secure.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Reporters Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="reporters_name">Your Name</Label>
              <Input
                id="reporters_name"
                name="reporters_name"
                value={formData.reporters_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reporters_email">Your Email</Label>
              <Input
                id="reporters_email"
                name="reporters_email"
                type="email"
                value={formData.reporters_email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Scammers Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="scammers_name">Scammer's Name</Label>
              <Input
                id="scammers_name"
                name="scammers_name"
                value={formData.scammers_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="scammers_bank">Scammer's Bank</Label>
              <Select
                name="scammers_bank"
                value={formData.scammers_bank}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    scammers_bank: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank.code} value={bank.name}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="scammers_account">Scammer's Account Number</Label>
              <Input
                id="scammers_account"
                name="scammers_account"
                value={formData.scammers_account}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="scammers_phone">Scammer's Phone</Label>
              <Input
                id="scammers_phone"
                name="scammers_phone"
                value={formData.scammers_phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Social Media */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="scammers_instagram">
                Scammer's Instagram Handle
              </Label>
              <Input
                id="scammers_instagram"
                name="scammers_instagram"
                value={formData.scammers_instagram}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="scammers_twitter">Scammer's Twitter Handle</Label>
              <Input
                id="scammers_twitter"
                name="scammers_twitter"
                value={formData.scammers_twitter}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid gap-2">
            <Label htmlFor="date_occurred">Date it Happened</Label>
            <Input
              id="date_occurred"
              name="date_occurred"
              type="date"
              value={formData.date_occurred}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Tell us how it happened</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Please describe the incident in detail"
              required
            />
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="scammers_image">Scammer's Image</Label>
              <Input
                id="scammers_image"
                name="scammers_image"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "image")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="other_documents">Other Documents</Label>
              <Input
                id="other_documents"
                name="other_documents"
                type="file"
                onChange={(e) => handleFileChange(e, "documents")}
              />
            </div>
          </div>

          {/* Submit Button */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportScammerDialog;
