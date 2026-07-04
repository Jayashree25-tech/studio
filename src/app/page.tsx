"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, User, Phone, Clock } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    duration: "1", // default to 1 hour
  });
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving your booking...");
    
    // TODO: Connect Firebase database pushing logic here
    console.log("Saving to Firebase:", formData);
    
    setTimeout(() => {
      setStatus("Booking saved successfully! 🎉");
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
        <div className="text-center mb-8">
          <Calendar className="h-14 w-14 mx-auto text-blue-600 mb-3" />
          <h1 className="text-3xl font-bold text-slate-800">Rental Platform</h1>
          <p className="text-sm text-slate-500 mt-1">Book your time slot below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-800"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-800"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          {/* Rental Duration Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Rental Time Period</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-slate-800 appearance-none"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              >
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="4">4 Hours</option>
                <option value="8">Half Day (8 Hours)</option>
                <option value="24">Full Day (24 Hours)</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-all">
            Confirm Booking
          </Button>
        </form>

        {status && (
          <p className="text-center text-sm font-medium text-blue-600 mt-4 animate-pulse">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
