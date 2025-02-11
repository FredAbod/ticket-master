import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LocationState {
  ticketCount: string;
  // ...other existing state properties
}

const TransferForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const ticketCount = state?.ticketCount || "1"; // fallback to "1" if not provided
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    note: "",
    ticketCount: ticketCount, // Use the passed ticketCount instead of hardcoded value
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('transfers').insert([{
        first_name: formData.firstName,
        last_name: formData.lastName,
        contact: formData.contact,
        note: formData.note,
        quantity: Number(formData.ticketCount),
      }]).select();

      if (error) throw error;
      navigate("/success");
    } catch (error) {
      console.error('Error creating transfer:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-ticket-blue hover:bg-blue-50 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          BACK
        </Button>
      </div>

      <Card className="p-6 hover:shadow-xl transition-all duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center hover:text-ticket-blue transition-colors">{ticketCount} Tickets Selected</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">First Name</label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
              placeholder="First Name"
            />
          </div>

          <div className="group">
            <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">Last Name</label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
              placeholder="Last Name"
            />
          </div>

          <div className="group">
            <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">
              Email or Mobile Number
            </label>
            <Input
              name="contact"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
              placeholder="email@example.com"
            />
          </div>

          <div className="group">
            <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">Note</label>
            <Input
              name="note"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
              placeholder="Add a note (optional)"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-ticket-blue hover:bg-ticket-darkBlue text-white py-3 rounded-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Transfer {ticketCount} Tickets
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default TransferForm;
